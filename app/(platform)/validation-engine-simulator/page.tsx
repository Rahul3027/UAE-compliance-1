'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Play, AlertTriangle, Check, Code } from 'lucide-react';
import { xmlSamples } from '@/data/xml-samples';

export default function ValidationSimulator() {
  const { completeModule, completedModules } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [xmlContent, setXmlContent] = useState('');
  
  // Validation Results State
  const [isValidating, setIsValidating] = useState(false);
  const [results, setResults] = useState<{ id: string; name: string; status: 'pass' | 'fail'; msg: string }[] | null>(null);

  useEffect(() => {
    setMounted(true);
    // Pre-populate with standard sample
    setXmlContent(xmlSamples[0].code);
  }, []);

  const isCompleted = mounted && completedModules.includes('validation-engine-simulator');

  const runValidation = () => {
    setIsValidating(true);
    setResults(null);

    setTimeout(() => {
      const assertions: { id: string; name: string; status: 'pass' | 'fail'; msg: string }[] = [];

      // 1. CustomizationID Check
      const hasUaeCustomization = xmlContent.includes('urn:peppol:pint:billing-ae:1.0');
      assertions.push({
        id: 'AE-VAL-001',
        name: 'UAE Customization Specification Match',
        status: hasUaeCustomization ? 'pass' : 'fail',
        msg: hasUaeCustomization 
          ? 'CustomizationID matches UAE PINT billing specifications.' 
          : 'FATAL: CustomizationID must be exactly "urn:peppol:pint:billing-ae:1.0".'
      });

      // 2. TRN Length validation (15 digits)
      const supplierPartyMatch = xmlContent.match(/<cac:AccountingSupplierParty>[\s\S]*?<\/cac:AccountingSupplierParty>/);
      let trnMatch = null;
      if (supplierPartyMatch) {
        const companyIdMatch = supplierPartyMatch[0].match(/<cbc:CompanyID>(.*?)<\/cbc:CompanyID>/);
        if (companyIdMatch) {
          trnMatch = companyIdMatch[1];
        }
      }

      const isTrnValid = trnMatch && /^\d{15}$/.test(trnMatch);
      assertions.push({
        id: 'UAE-R-002',
        name: 'Supplier Tax Registration Number (TRN) Format',
        status: isTrnValid ? 'pass' : 'fail',
        msg: isTrnValid
          ? `Supplier TRN "${trnMatch}" contains exactly 15 digits.`
          : `FATAL: TRN must be exactly 15 digits. Found: "${trnMatch || 'None'}"`
      });

      // 3. InvoiceTypeCode validation (380, 381, 388, 480)
      const typeCodeMatch = xmlContent.match(/<cbc:InvoiceTypeCode>(.*?)<\/cbc:InvoiceTypeCode>/);
      const typeCode = typeCodeMatch ? typeCodeMatch[1] : '';
      const isTypeCodeValid = ['380', '381', '388', '480'].includes(typeCode);
      assertions.push({
        id: 'UAE-R-008',
        name: 'UBL Document Type Code validation',
        status: isTypeCodeValid ? 'pass' : 'fail',
        msg: isTypeCodeValid
          ? `Document Type code "${typeCode}" is supported in the UAE.`
          : `FATAL: Document Type code "${typeCode || 'None'}" is unsupported. Use 380, 381, 388, or 480.`
      });

      // 4. Currency check
      const currencyMatch = xmlContent.match(/<cbc:DocumentCurrencyCode>(.*?)<\/cbc:DocumentCurrencyCode>/);
      const currency = currencyMatch ? currencyMatch[1] : '';
      const isCurrencyValid = currency === 'AED' || xmlContent.includes('<cbc:TaxCurrencyCode>AED</cbc:TaxCurrencyCode>');
      assertions.push({
        id: 'UAE-R-003',
        name: 'Mandatory UAE Dirham (AED) Reporting',
        status: isCurrencyValid ? 'pass' : 'fail',
        msg: isCurrencyValid
          ? `Document reports in standard UAE currency: "${currency || 'AED'}".`
          : 'FATAL: The invoice must report in AED or include a TaxCurrencyCode converting foreign totals to AED.'
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
    // Modify the TRN in standard invoice to be short
    const modified = xmlSamples[0].code.replace('100234567800003', '1002345');
    setXmlContent(modified);
    setResults(null);
  };

  const loadBadCustomizationTemplate = () => {
    // Modify CustomizationID to match EU specifications
    const modified = xmlSamples[0].code.replace('urn:peppol:pint:billing-ae:1.0', 'urn:peppol:pint:billing-eu:1.0');
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
          Test XML payloads against UAE Schematron rules. Paste your own UBL invoice XML or load templates with intentional errors to see the validator block delivery.
        </p>
      </div>

      {/* Template Quickloaders */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setXmlContent(xmlSamples[0].code); setResults(null); }}
          className="btn-apple-secondary text-[10px] py-1.5"
        >
          Load Standard Invoice
        </button>
        <button
          onClick={loadBadTrnTemplate}
          className="btn-apple-secondary text-[10px] py-1.5 text-red-400 border-red-500/20"
        >
          Load Invalid TRN (Failure)
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
                Click "Validate XML" to audit the editor contents against UAE compliance constraints.
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
                    Success: Invoice matches UAE compliance requirements!
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
