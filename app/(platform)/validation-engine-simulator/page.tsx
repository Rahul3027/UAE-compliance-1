'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Play, AlertTriangle, Check, Code } from 'lucide-react';
import { xmlSamples } from '@/data/xml-samples';

export default function ValidationSimulator() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [xmlContent, setXmlContent] = useState('');
  
  // Validation Results State
  const [isValidating, setIsValidating] = useState(false);
  const [results, setResults] = useState<{ id: string; name: string; status: 'pass' | 'fail'; msg: string }[] | null>(null);

  const isOman = mounted && country === 'om';

  // Get active base XML template
  const getBaseTemplate = () => {
    const baseXml = xmlSamples[0].code;
    if (country === 'om') {
      return baseXml
        .replaceAll('urn:peppol:pint:billing-ae:1.0', 'urn:peppol:pint:billing-om:1.0')
        .replaceAll('<cbc:DocumentCurrencyCode>AED</cbc:DocumentCurrencyCode>', '<cbc:DocumentCurrencyCode>OMR</cbc:DocumentCurrencyCode>')
        .replaceAll('100234567800003', 'OM1234567890')
        .replaceAll('100876543200003', 'OM9876543210')
        .replaceAll('<cbc:IdentificationCode>AE</cbc:IdentificationCode>', '<cbc:IdentificationCode>OM</cbc:IdentificationCode>')
        .replaceAll('Al-Desert Tech Solutions LLC', 'Mazoon Trade & Logistics SAOC')
        .replaceAll('Gulf Retail Enterprises PJSC', 'Salalah Trading Enterprises LLC')
        .replaceAll('Dubai', 'Muscat')
        .replaceAll('Abu Dhabi', 'Salalah');
    }
    return baseXml;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync XML editor content when country changes
  useEffect(() => {
    if (mounted) {
      setXmlContent(getBaseTemplate());
      setResults(null);
    }
  }, [country, mounted]);

  const isCompleted = mounted && completedModules.includes('validation-engine-simulator');

  const runValidation = () => {
    setIsValidating(true);
    setResults(null);

    setTimeout(() => {
      const assertions: { id: string; name: string; status: 'pass' | 'fail'; msg: string }[] = [];

      // 1. CustomizationID Check
      const targetCustomization = isOman ? 'urn:peppol:pint:billing-om:1.0' : 'urn:peppol:pint:billing-ae:1.0';
      const hasCustomization = xmlContent.includes(targetCustomization);
      assertions.push({
        id: isOman ? 'OM-VAL-001' : 'AE-VAL-001',
        name: isOman ? 'Oman Customization Specification Match' : 'UAE Customization Specification Match',
        status: hasCustomization ? 'pass' : 'fail',
        msg: hasCustomization 
          ? `CustomizationID matches ${isOman ? 'Oman' : 'UAE'} PINT billing specifications.` 
          : `FATAL: CustomizationID must be exactly "${targetCustomization}".`
      });

      // 2. TRN/VATIN Length validation (15 digits for UAE / OM + 10 digits for Oman)
      const supplierPartyMatch = xmlContent.match(/<cac:AccountingSupplierParty>[\s\S]*?<\/cac:AccountingSupplierParty>/);
      let taxIdMatch = null;
      if (supplierPartyMatch) {
        const companyIdMatch = supplierPartyMatch[0].match(/<cbc:CompanyID>(.*?)<\/cbc:CompanyID>/);
        if (companyIdMatch) {
          taxIdMatch = companyIdMatch[1];
        }
      }

      const isTaxIdValid = isOman 
        ? (taxIdMatch && /^OM\d{10}$/.test(taxIdMatch)) 
        : (taxIdMatch && /^\d{15}$/.test(taxIdMatch));

      assertions.push({
        id: isOman ? 'OM-R-002' : 'UAE-R-002',
        name: isOman ? 'Supplier VAT Identification Number (VATIN) Format' : 'Supplier Tax Registration Number (TRN) Format',
        status: isTaxIdValid ? 'pass' : 'fail',
        msg: isTaxIdValid
          ? `Supplier ${isOman ? 'VATIN' : 'TRN'} "${taxIdMatch}" matches regional format requirements.`
          : isOman
            ? `FATAL: VATIN must start with "OM" followed by 10 digits. Found: "${taxIdMatch || 'None'}"`
            : `FATAL: TRN must be exactly 15 digits. Found: "${taxIdMatch || 'None'}"`
      });

      // 3. InvoiceTypeCode validation (380, 381, 388, 480)
      const typeCodeMatch = xmlContent.match(/<cbc:InvoiceTypeCode>(.*?)<\/cbc:InvoiceTypeCode>/);
      const typeCode = typeCodeMatch ? typeCodeMatch[1] : '';
      const isTypeCodeValid = ['380', '381', '388', '480'].includes(typeCode);
      assertions.push({
        id: isOman ? 'OM-R-008' : 'UAE-R-008',
        name: 'UBL Document Type Code validation',
        status: isTypeCodeValid ? 'pass' : 'fail',
        msg: isTypeCodeValid
          ? `Document Type code "${typeCode}" is supported regional code.`
          : `FATAL: Document Type code "${typeCode || 'None'}" is unsupported. Use 380, 381, 388, or 480.`
      });

      // 4. Currency check
      const currencyMatch = xmlContent.match(/<cbc:DocumentCurrencyCode>(.*?)<\/cbc:DocumentCurrencyCode>/);
      const currency = currencyMatch ? currencyMatch[1] : '';
      const targetCurrency = isOman ? 'OMR' : 'AED';
      const isCurrencyValid = currency === targetCurrency || xmlContent.includes(`<cbc:TaxCurrencyCode>${targetCurrency}</cbc:TaxCurrencyCode>`);
      assertions.push({
        id: isOman ? 'OM-R-003' : 'UAE-R-003',
        name: isOman ? 'Mandatory Omani Rial (OMR) Reporting' : 'Mandatory UAE Dirham (AED) Reporting',
        status: isCurrencyValid ? 'pass' : 'fail',
        msg: isCurrencyValid
          ? `Document reports in standard regional currency: "${currency || targetCurrency}".`
          : `FATAL: The invoice must report in ${targetCurrency} or include a TaxCurrencyCode converting foreign totals to ${targetCurrency}.`
      });

      setResults(assertions);
      setIsValidating(false);

      // If all passed, complete the module
      const allPassed = assertions.every(a => a.status === 'pass');
      if (allPassed && completeModule) {
        completeModule('validation-engine-simulator', 150);
      }
    }, 1200);
  };

  const loadBadTrnTemplate = () => {
    const template = getBaseTemplate();
    const badId = isOman ? 'OM12345' : '1002345';
    const originalId = isOman ? 'OM1234567890' : '100234567800003';
    const modified = template.replace(originalId, badId);
    setXmlContent(modified);
    setResults(null);
  };

  const loadBadCustomizationTemplate = () => {
    const template = getBaseTemplate();
    const targetCustomization = isOman ? 'urn:peppol:pint:billing-om:1.0' : 'urn:peppol:pint:billing-ae:1.0';
    const modified = template.replace(targetCustomization, 'urn:peppol:pint:billing-eu:1.0');
    setXmlContent(modified);
    setResults(null);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 4: Hands-On Practice</span>
        <h1 className="apple-h1">Validation Engine Simulator</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Test XML payloads against {isOman ? 'Oman' : 'UAE'} Schematron rules. Paste your own UBL invoice XML or load templates with intentional errors to see the validator block delivery.
        </p>
      </div>

      {/* Template Quickloaders */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setXmlContent(getBaseTemplate()); setResults(null); }}
          className="btn-apple-secondary text-[10px] py-1.5"
        >
          Load Standard Invoice
        </button>
        <button
          onClick={loadBadTrnTemplate}
          className="btn-apple-secondary text-[10px] py-1.5 text-red-400 border-red-500/20"
        >
          Load Invalid {isOman ? 'VATIN' : 'TRN'} (Failure)
        </button>
        <button
          onClick={loadBadCustomizationTemplate}
          className="btn-apple-secondary text-[10px] py-1.5 text-red-400 border-red-500/20"
        >
          Load Invalid Customization ID (Failure)
        </button>
      </div>

      {/* Simulator Workspace */}
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
        {/* XML Editor */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
          <div className="bg-[#121214] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-mono text-textSecondary flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> UBL XML Editor
            </span>
            <button
              onClick={runValidation}
              disabled={isValidating || !xmlContent}
              className="btn-apple-primary text-[10px] px-4 py-1 flex items-center gap-1.5 disabled:opacity-40"
            >
              <Play className="w-3 h-3" /> Validate XML
            </button>
          </div>
          
          <textarea
            value={xmlContent}
            onChange={(e) => setXmlContent(e.target.value)}
            spellCheck={false}
            className="w-full h-[400px] p-4 bg-black text-[#dcdcdc] font-mono text-[11px] leading-relaxed resize-none focus:outline-none"
          />
        </div>

        {/* Validation Results */}
        <div className="space-y-4">
          <div className="apple-panel p-5 space-y-4 min-h-[300px]">
            <h4 className="text-xs font-semibold text-textPrimary">Validation Report</h4>
            
            {isValidating && (
              <div className="flex flex-col items-center justify-center py-12 space-y-3 font-mono text-xs text-textSecondary">
                <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span>Running Schematron Assertions...</span>
              </div>
            )}

            {!isValidating && results === null && (
              <p className="text-xs text-textSecondary leading-relaxed text-center py-12">
                Click "Validate XML" to audit the editor contents against {isOman ? 'Oman' : 'UAE'} compliance constraints.
              </p>
            )}

            {!isValidating && results !== null && (
              <div className="space-y-3">
                {results.map((res) => (
                  <div
                    key={res.id}
                    className={`p-3 rounded-lg border text-xs leading-relaxed flex items-start gap-3 ${
                      res.status === 'pass'
                        ? 'border-green-500/10 bg-green-500/[0.01] text-green-400'
                        : 'border-red-500/10 bg-red-500/[0.01] text-red-400'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {res.status === 'pass' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-textPrimary">{res.name} ({res.id})</p>
                      <p className="text-textSecondary text-[11px]">{res.msg}</p>
                    </div>
                  </div>
                ))}

                {results.every(r => r.status === 'pass') ? (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center text-xs font-semibold">
                    Success: Invoice matches {isOman ? 'Oman' : 'UAE'} compliance requirements!
                  </div>
                ) : (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center text-xs font-semibold">
                    Failed: Correct the errors in the XML and validate again.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 150 XP for verifying a fully compliant invoice.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
