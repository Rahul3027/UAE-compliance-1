'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { quizzes } from '@/data/quiz-data';
import { QuizCard } from '@/components/ui/quiz-card';
import { CheckCircle2, Sliders, FileSpreadsheet, Code2 } from 'lucide-react';

export default function PintAeArchitecture() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  // Transaction Calculator State
  const [isExport, setIsExport] = useState(false);
  const [isFreeZone, setIsFreeZone] = useState(false);
  const [isDeemedSupply, setIsDeemedSupply] = useState(false);
  const [isProfitMargin, setIsProfitMargin] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('pint-ae-architecture');
  const isOman = mounted && country === 'om';

  // Logic to determine compliance rules/codes
  let computedInvoiceType = '380 (Standard Tax Invoice)';
  let computedProfileId = 'urn:peppol:bis:billing';
  let computedCustomizationId = isOman ? 'urn:peppol:pint:billing-om:1.0' : 'urn:peppol:pint:billing-ae:1.0';
  let computedNoteRule = 'No special flags needed.';

  if (isExport) {
    computedInvoiceType = '380 (Tax Invoice)';
    computedNoteRule = 'Zero-rated VAT (Category Z) is required. Export documentation references should be added in BillingReference.';
  } else if (isDeemedSupply) {
    computedNoteRule = isOman
      ? 'Specific deemed supply indicators must be declared at the invoice header. Tax Category S (5%) still applies under Omani rules unless exempt.'
      : 'Specific deemed supply indicators must be declared at the invoice header. Tax Category S (5%) still applies unless exempt.';
  } else if (isFreeZone) {
    computedNoteRule = isOman
      ? 'Special Economic Zone (SEZ) rules apply. Out-of-Scope (Category O) or Zero-rated (Category Z) depending on mainland or zone-to-zone trade.'
      : 'Out-of-Scope (Category O) or Zero-rated (Category Z) depending on whether trade is with mainland or freezone-to-freezone.';
  } else if (isProfitMargin) {
    computedNoteRule = isOman
      ? 'Invoice must contain specific profit margin scheme indicators under Oman Tax Law.'
      : 'Invoice must contain specific Arabic/English profit margin notices (e.g. "Profit Margin Scheme - Space for notice").';
  }

  const documentTypes = [
    { 
      code: '380', 
      type: 'Tax Invoice', 
      desc: isOman 
        ? 'Standard B2B invoice where supplier and customer are registered tax entities in the Sultanate of Oman.' 
        : 'Standard B2B invoice where supplier and customer are registered tax entities in the UAE.' 
    },
    { code: '381', type: 'Credit Note', desc: 'Issued to correct errors or reduce payable amounts in original invoices.' },
    { 
      code: '388', 
      type: 'Simplified Invoice', 
      desc: isOman 
        ? 'Used for B2C transactions (retail). Buyer VATIN is not required.' 
        : 'Used for B2C transactions (retail). Buyer TRN is not required.' 
    },
    { 
      code: '480', 
      type: 'Out of Scope Invoice', 
      desc: isOman 
        ? 'Used for transactions outside the scope of Omani VAT (e.g. special economic zone transits).' 
        : 'Used for transactions outside the scope of UAE VAT (e.g. free zone transits).' 
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 2: Core Concepts</span>
        <h1 className="apple-h1">{isOman ? 'PINT OM Architecture' : 'PINT AE Architecture'}</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          PEPPOL PINT {isOman ? 'OM' : 'AE'} is a localized customization of the PEPPOL International Invoice (PINT). It introduces specific document identification, transaction codes, and regional requirements.
        </p>
      </div>

      {/* Document Types */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          UBL Document Codes
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {documentTypes.map((doc) => (
            <div key={doc.code} className="apple-panel p-5 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-semibold text-textPrimary">{doc.type}</h4>
                  <span className="text-[10px] font-mono text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                    Code {doc.code}
                  </span>
                </div>
                <p className="text-[11px] text-textSecondary leading-relaxed">{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Transaction Type Calculator */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          {isOman ? 'Oman Transaction Flag Calculator' : 'UAE Transaction Flag Calculator'}
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Select the business attributes of the trade to see how the XML schema elements, Profile IDs, and invoice types change.
        </p>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-6">
          {/* Controls */}
          <div className="apple-panel p-5 space-y-4">
            <h4 className="text-xs font-semibold text-textPrimary flex items-center gap-2">
              <Sliders className="w-4 h-4 text-accent" /> Select Transaction Attributes
            </h4>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer text-xs text-textSecondary hover:text-textPrimary">
                <input
                  type="checkbox"
                  checked={isExport}
                  onChange={(e) => {
                    setIsExport(e.target.checked);
                    if (e.target.checked) {
                      setIsFreeZone(false);
                      setIsDeemedSupply(false);
                      setIsProfitMargin(false);
                    }
                  }}
                  className="rounded bg-black border-white/20 text-accent focus:ring-accent"
                />
                <span>Export Transaction</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs text-textSecondary hover:text-textPrimary">
                <input
                  type="checkbox"
                  checked={isFreeZone}
                  onChange={(e) => {
                    setIsFreeZone(e.target.checked);
                    if (e.target.checked) {
                      setIsExport(false);
                      setIsDeemedSupply(false);
                      setIsProfitMargin(false);
                    }
                  }}
                  className="rounded bg-black border-white/20 text-accent focus:ring-accent"
                />
                <span>{isOman ? 'Special Economic Zone (SEZ) Sale' : 'Free Trade Zone (FTZ) Sale'}</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs text-textSecondary hover:text-textPrimary">
                <input
                  type="checkbox"
                  checked={isDeemedSupply}
                  onChange={(e) => {
                    setIsDeemedSupply(e.target.checked);
                    if (e.target.checked) {
                      setIsExport(false);
                      setIsFreeZone(false);
                      setIsProfitMargin(false);
                    }
                  }}
                  className="rounded bg-black border-white/20 text-accent focus:ring-accent"
                />
                <span>Deemed Supply</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs text-textSecondary hover:text-textPrimary">
                <input
                  type="checkbox"
                  checked={isProfitMargin}
                  onChange={(e) => {
                    setIsProfitMargin(e.target.checked);
                    if (e.target.checked) {
                      setIsExport(false);
                      setIsFreeZone(false);
                      setIsDeemedSupply(false);
                    }
                  }}
                  className="rounded bg-black border-white/20 text-accent focus:ring-accent"
                />
                <span>Profit Margin Scheme</span>
              </label>
            </div>
          </div>

          {/* Results Output */}
          <div className="apple-panel p-5 space-y-4">
            <h4 className="text-xs font-semibold text-textPrimary flex items-center gap-2">
              <Code2 className="w-4 h-4 text-accent" /> Schema Configuration
            </h4>

            <div className="space-y-3 font-mono text-[10px]">
              <div>
                <p className="text-textSecondary uppercase tracking-wider text-[8px]">UBL Invoice Type Code</p>
                <p className="text-textPrimary font-semibold text-[11px] mt-0.5 bg-black p-2 rounded border border-white/[0.04]">{computedInvoiceType}</p>
              </div>

              <div>
                <p className="text-textSecondary uppercase tracking-wider text-[8px]">PEPPOL Profile ID</p>
                <p className="text-textPrimary font-semibold mt-0.5 bg-black p-2 rounded border border-white/[0.04]">{computedProfileId}</p>
              </div>

              <div>
                <p className="text-textSecondary uppercase tracking-wider text-[8px]">PEPPOL Customization ID</p>
                <p className="text-textPrimary font-semibold mt-0.5 bg-black p-2 rounded border border-white/[0.04]">{computedCustomizationId}</p>
              </div>

              <div>
                <p className="text-textSecondary uppercase tracking-wider text-[8px]">Compliance Rules & Schematron Notes</p>
                <p className="text-textPrimary mt-0.5 bg-black p-2 rounded border border-white/[0.04] leading-relaxed">{computedNoteRule}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Check Your Knowledge
        </h3>
        <QuizCard 
          moduleId="pint-ae-architecture" 
          questions={quizzes['pint-ae-architecture']} 
          onComplete={() => completeModule('pint-ae-architecture')} 
        />
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for mastering PINT AE architecture.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
