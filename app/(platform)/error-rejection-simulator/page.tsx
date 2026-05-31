'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Play, Terminal, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DebugLevel {
  id: number;
  title: string;
  xmlSnippet: string;
  question: string;
  choices: string[];
  correctIdx: number;
  explanation: string;
}

export default function ErrorSimulator() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  const [levelIdx, setLevelIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('error-rejection-simulator');
  const isOman = mounted && country === 'om';

  // Sync state when country changes
  useEffect(() => {
    if (mounted) {
      setLevelIdx(0);
      setSelectedChoice(null);
      setIsAnswered(false);
      setShowFinished(false);
    }
  }, [country, mounted]);

  const levels: DebugLevel[] = [
    {
      id: 1,
      title: isOman ? 'Level 1: The Short Company ID (VATIN)' : 'Level 1: The Short Company ID (TRN)',
      xmlSnippet: `<cac:PartyTaxScheme>
    <!-- Supplier ${isOman ? 'VATIN' : 'TRN'} -->
    <cbc:CompanyID>${isOman ? 'OM12345' : '1002345'}</cbc:CompanyID>
    <cac:TaxScheme>
        <cbc:ID>VAT</cbc:ID>
    </cac:TaxScheme>
</cac:PartyTaxScheme>`,
      question: 'Why will the Schematron validator reject this supplier tax scheme block?',
      choices: [
        'The TaxScheme ID must be "TAX" instead of "VAT".',
        isOman 
          ? 'The CompanyID (VATIN) does not follow Omani format: prefix "OM" followed by exactly 10 digits (Rule OM-R-002).'
          : 'The CompanyID (TRN) has only 8 digits instead of the mandatory 15 digits (Rule UAE-R-002).',
        isOman
          ? 'CompanyID must contain the supplier\'s email address.'
          : 'CompanyID must contain letters representing the Emirate.',
        'Postal address is missing inside the PartyTaxScheme.'
      ],
      correctIdx: 1,
      explanation: isOman
        ? 'Under Oman compliance rule OM-R-002, any CompanyID registered under the "VAT" scheme must contain exactly 10 digits prefixed with "OM".'
        : 'Under UAE compliance rule UAE-R-002, any CompanyID registered under the "VAT" scheme must contain exactly 15 digits.'
    },
    {
      id: 2,
      title: 'Level 2: The Mystery Document Code',
      xmlSnippet: `<cbc:CustomizationID>urn:peppol:pint:billing-${isOman ? 'om' : 'ae'}:1.0</cbc:CustomizationID>
<cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>
<cbc:ID>INV-1002</cbc:ID>
<cbc:IssueDate>2026-05-30</cbc:IssueDate>
<cbc:InvoiceTypeCode>501</cbc:InvoiceTypeCode>`,
      question: 'Which element is violating compliance rules in this header segment?',
      choices: [
        'The IssueDate cannot be in the future.',
        'ProfileID must be written in Arabic characters.',
        isOman
          ? 'The InvoiceTypeCode "501" is invalid. Oman PEPPOL supports 380, 381, 388, and 480.'
          : 'The InvoiceTypeCode "501" is invalid. UAE PEPPOL supports 380, 381, 388, and 480.',
        'Invoice ID cannot start with "INV-".'
      ],
      correctIdx: 2,
      explanation: isOman
        ? 'PEPPOL PINT OM Schematrons enforce that the InvoiceTypeCode must match designated codes: 380 (Invoice), 381 (Credit Note), 388 (Simplified), or 480 (Out of Scope).'
        : 'PEPPOL PINT AE Schematrons enforce that the InvoiceTypeCode must match designated codes: 380 (Invoice), 381 (Credit Note), 388 (Simplified), or 480 (Out of Scope).'
    },
    {
      id: 3,
      title: 'Level 3: The Tax Math Slip',
      xmlSnippet: `<cac:TaxTotal>
    <cbc:TaxAmount>10.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
        <cbc:TaxableAmount>1000.00</cbc:TaxableAmount>
        <cbc:TaxAmount>10.00</cbc:TaxAmount>
        <cac:TaxCategory>
            <cbc:ID>S</cbc:ID>
            <cbc:Percent>5</cbc:Percent>
        </cac:TaxCategory>
    </cac:TaxSubtotal>
</cac:TaxTotal>`,
      question: 'What calculation error will trigger a validation alert in this TaxTotal section?',
      choices: [
        'VAT Category "S" (Standard Rate) requires a 5% rate. 5% of 1,000.00 taxable is 50.00, but 10.00 was reported.',
        'TaxableAmount must be represented in USD.',
        isOman
          ? 'Percent must be omitted if the amount is less than 5 OMR.'
          : 'Percent must be omitted if the amount is less than 50 AED.',
        'TaxScheme is completely missing from the TaxCategory block.'
      ],
      correctIdx: 0,
      explanation: isOman
        ? 'Rule OM-R-004 verifies that Standard Rated supplies (Category S) have exactly 5% VAT rate. The reported TaxAmount (10.00) does not match 5% of the TaxableAmount (1,000.00 * 0.05 = 50.00).'
        : 'Rule UAE-R-004 verifies that Standard Rated supplies (Category S) have exactly 5% VAT rate. The reported TaxAmount (10.00) does not match 5% of the TaxableAmount (1,000.00 * 0.05 = 50.00).'
    }
  ];

  const currentLevel = levels[levelIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedChoice(idx);
  };

  const handleVerify = () => {
    if (selectedChoice === null) return;
    setIsAnswered(true);
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedChoice(null);
    if (levelIdx < levels.length - 1) {
      setLevelIdx((l) => l + 1);
    } else {
      setShowFinished(true);
      if (completeModule) {
        completeModule('error-rejection-simulator', 150);
      }
    }
  };

  const handleRestart = () => {
    setLevelIdx(0);
    setSelectedChoice(null);
    setIsAnswered(false);
    setShowFinished(false);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 4: Hands-On Practice</span>
        <h1 className="apple-h1">Error Rejection Debugger</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Gamified compliance debugging. Review the broken XML snippets in the terminal, identify the errors triggering Schematron rejections, and clear all levels to unlock your QA badge.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showFinished ? (
          <motion.div
            key={levelIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start"
          >
            {/* Terminal Window displaying XML */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
              <div className="bg-[#121214] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono text-red-400 flex items-center gap-1.5 animate-pulse">
                  <Terminal className="w-3.5 h-3.5" /> Validation Alert: Rule Rejection
                </span>
                <span className="text-[9px] font-mono text-textSecondary uppercase">
                  {currentLevel.title}
                </span>
              </div>
              <pre className="p-4 overflow-auto text-[10px] font-mono text-[#f87171] leading-relaxed h-[240px]">
                <code>{currentLevel.xmlSnippet}</code>
              </pre>
            </div>

            {/* Questions Panel */}
            <div className="apple-panel p-5 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
                <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-semibold">Debug Task</span>
                <span className="text-[10px] font-mono text-textSecondary">Level {levelIdx + 1} of {levels.length}</span>
              </div>

              <h4 className="text-xs font-semibold text-textPrimary leading-relaxed">
                {currentLevel.question}
              </h4>

              <div className="space-y-2">
                {currentLevel.choices.map((choice, idx) => {
                  let btnStyle = 'border-white/[0.06] hover:bg-white/[0.02]';
                  
                  if (isAnswered) {
                    if (idx === currentLevel.correctIdx) {
                      btnStyle = 'border-green-500/20 bg-green-500/10 text-green-400';
                    } else if (idx === selectedChoice) {
                      btnStyle = 'border-red-500/20 bg-red-500/10 text-red-400';
                    } else {
                      btnStyle = 'border-white/[0.04] opacity-50';
                    }
                  } else if (selectedChoice === idx) {
                    btnStyle = 'border-accent bg-accent/[0.03] text-textPrimary';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs leading-relaxed transition-all ${btnStyle}`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-3 bg-white/[0.01] border border-white/[0.06] rounded-lg text-[10px] text-textSecondary leading-relaxed">
                  <strong className="text-textPrimary block mb-0.5">Explanation:</strong>
                  {currentLevel.explanation}
                </div>
              )}

              <div className="flex justify-end pt-2">
                {!isAnswered ? (
                  <button
                    disabled={selectedChoice === null}
                    onClick={handleVerify}
                    className="btn-apple-primary text-xs px-5 py-2 disabled:opacity-40"
                  >
                    Verify Diagnosis
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="btn-apple-secondary text-xs px-5 py-2 flex items-center gap-1.5"
                  >
                    Next Level <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="apple-panel p-8 text-center max-w-md mx-auto space-y-6"
          >
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-textPrimary">All Errors Resolved!</h3>
              <p className="text-xs text-textSecondary leading-relaxed">
                You successfully diagnosed all Schematron calculation, format, and document type errors in the simulator.
              </p>
              <p className="text-[11px] font-mono text-accent font-semibold">
                +150 XP awarded for completing the Debugger challenge.
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="btn-apple-secondary text-xs flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Debugger
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 150 XP for passing the debugger game.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
