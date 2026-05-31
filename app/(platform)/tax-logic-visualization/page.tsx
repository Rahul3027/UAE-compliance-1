'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { uaeTaxCategories, omanTaxCategories } from '@/data/compliance-content';
import { quizzes } from '@/data/quiz-data';
import { QuizCard } from '@/components/ui/quiz-card';
import { CheckCircle2, Calculator, ArrowRight } from 'lucide-react';

export default function TaxLogic() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  // Calculator State
  const [amount, setAmount] = useState(1000);
  const [categoryCode, setCategoryCode] = useState('S');
  const [isForeignCurrency, setIsForeignCurrency] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(3.6725); // USD to AED default

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('tax-logic-visualization');
  const isOman = mounted && country === 'om';
  const taxCategories = isOman ? omanTaxCategories : uaeTaxCategories;

  // Sync default exchange rates and ensure category code is valid when taxCategories changes
  useEffect(() => {
    if (mounted) {
      setExchangeRate(country === 'om' ? 0.3845 : 3.6725);
      // reset to standard category code to avoid mismatch
      setCategoryCode('S');
    }
  }, [country, mounted]);

  // Math variables
  const category = taxCategories.find(c => c.code === categoryCode) || taxCategories[0];
  const rate = category.rate / 100;
  
  const txnTaxable = amount;
  const txnTaxAmount = amount * rate;
  const txnTotal = amount + txnTaxAmount;

  const localTaxable = isForeignCurrency ? amount * exchangeRate : amount;
  const localTaxAmount = isForeignCurrency ? txnTaxAmount * exchangeRate : txnTaxAmount;
  const localTotal = isForeignCurrency ? txnTotal * exchangeRate : txnTotal;

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 2: Core Concepts</span>
        <h1 className="apple-h1">{isOman ? 'Oman VAT & Tax Logic' : 'UAE VAT & Tax Logic'}</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          {isOman ? 'Oman e-invoices must compute VAT according to strict OTA rules, including specific category codes, exchange rate conversions, and rounding boundaries.' : 'UAE e-invoices must compute VAT according to strict FTA rules, including specific category codes, exchange rate conversions, and rounding boundaries.'}
        </p>
      </div>

      {/* Tax Category Definitions */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          VAT Categories
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {taxCategories.map((c) => (
            <div key={c.code} className="apple-panel p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-textPrimary">{c.name}</span>
                <span className="text-[10px] font-mono text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                  Category {c.code} ({c.rate}%)
                </span>
              </div>
              <p className="text-[11px] text-textSecondary leading-relaxed">{c.description}</p>
              <p className="text-[10px] text-textSecondary/60 italic font-sans leading-relaxed">
                Example: {c.example}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tax Calculator */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Interactive VAT & Currency Auditor
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Input an invoice line value and select options to calculate tax results. Observe the mandatory exchange rate audit fields required by the {isOman ? 'OTA' : 'FTA'} when foreign currencies are used.
        </p>

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          {/* Controls */}
          <div className="apple-panel p-5 space-y-5">
            <h4 className="text-xs font-semibold text-textPrimary flex items-center gap-2">
              <Calculator className="w-4 h-4 text-accent" /> Tax Calculations Input
            </h4>

            <div className="space-y-4">
              {/* Line amount */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-textSecondary">Line Extension Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary font-mono focus:outline-none focus:border-accent"
                />
              </div>

              {/* VAT Category Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-textSecondary">VAT Category</label>
                <select
                  value={categoryCode}
                  onChange={(e) => setCategoryCode(e.target.value)}
                  className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary font-mono focus:outline-none focus:border-accent"
                >
                  {taxCategories.map(c => (
                    <option key={c.code} value={c.code}>{c.name} ({c.rate}%)</option>
                  ))}
                </select>
              </div>

              {/* Toggle Foreign Currency */}
              <label className="flex items-center gap-3 cursor-pointer text-xs text-textSecondary hover:text-textPrimary pt-1">
                <input
                  type="checkbox"
                  checked={isForeignCurrency}
                  onChange={(e) => setIsForeignCurrency(e.target.checked)}
                  className="rounded bg-black border-white/20 text-accent focus:ring-accent"
                />
                <span>Invoice in foreign currency (e.g. USD)</span>
              </label>

              {/* Exchange rate input if checked */}
              {isForeignCurrency && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-textSecondary">Central Bank Exchange Rate (to {isOman ? 'OMR' : 'AED'})</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(Number(e.target.value))}
                    className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary font-mono focus:outline-none focus:border-accent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results Sheet */}
          <div className="apple-panel p-5 space-y-4 bg-white/[0.01]">
            <h4 className="text-xs font-semibold text-textPrimary">Calculated Legal Monetary Totals</h4>
            
            <div className="space-y-3 font-mono text-[10px]">
              {/* Transaction Currency */}
              <div className="border-b border-white/[0.04] pb-2">
                <p className="text-textSecondary text-[8px] uppercase tracking-wider">Transaction Totals ({isForeignCurrency ? 'USD' : isOman ? 'OMR' : 'AED'})</p>
                <div className="grid grid-cols-2 gap-2 mt-1.5 text-textPrimary">
                  <span>Taxable: {txnTaxable.toFixed(2)}</span>
                  <span>VAT Rate: {(rate * 100)}%</span>
                  <span>Calculated VAT: {txnTaxAmount.toFixed(2)}</span>
                  <span className="font-semibold text-accent">Payable Amount: {txnTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Converted Audit Sheet (Required for FTA/OTA) */}
              {isForeignCurrency && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-accent">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span className="text-[9px] uppercase tracking-wider font-semibold">{isOman ? 'OTA' : 'FTA'} Audit Sheet ({isOman ? 'OMR' : 'AED'} Converted)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1 text-textPrimary/80">
                    <span>Taxable ({isOman ? 'OMR' : 'AED'}): {localTaxable.toFixed(2)}</span>
                    <span>Exchange Rate: {exchangeRate.toFixed(4)}</span>
                    <span className="font-semibold text-accent">Calculated VAT ({isOman ? 'OMR' : 'AED'}): {localTaxAmount.toFixed(2)}</span>
                    <span className="font-semibold">Payable ({isOman ? 'OMR' : 'AED'}): {localTotal.toFixed(LocalTotalDecimalDigits(isOman))}</span>
                  </div>
                </div>
              )}
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
          moduleId="tax-logic-visualization" 
          questions={quizzes['tax-logic-visualization']} 
          onComplete={() => completeModule('tax-logic-visualization')} 
        />
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for mastering {isOman ? 'Oman' : 'UAE'} Tax Logic.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LocalTotalDecimalDigits(isOman: boolean) {
  return isOman ? 3 : 2;
}
