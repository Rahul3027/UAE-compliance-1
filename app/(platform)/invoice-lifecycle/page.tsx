'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { quizzes } from '@/data/quiz-data';
import { QuizCard } from '@/components/ui/quiz-card';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InvoiceLifecycle() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('invoice-lifecycle');
  const isOman = mounted && country === 'om';

  const lifecycleSteps = [
    {
      title: '1. Author (C1)',
      desc: 'The seller drafts the invoice in their local ERP or accounting system.',
      details: 'The data is typically structured as JSON or a database record.'
    },
    {
      title: '2. Transform (C1)',
      desc: 'The internal data is mapped and converted into a standard UBL XML payload.',
      details: 'A Standard Business Document Header (SBDH) envelope is constructed.'
    },
    {
      title: '3. Validate (C2)',
      desc: 'The Seller\'s Access Point audits the XML against Schematron rules.',
      details: 'Any syntax, structural, or business calculation errors reject the document immediately.'
    },
    {
      title: isOman ? '4. Clear (C5 / OTA)' : '4. Clear (C5 / FTA)',
      desc: isOman 
        ? 'C2 routes the invoice to the OTA validation engine for real-time clearance.'
        : 'C2 routes the invoice to the FTA validation engine for real-time clearance.',
      details: isOman 
        ? 'The OTA (Fawtara) audits the document or returns status checks.'
        : 'The FTA signs the document or returns status checks.'
    },
    {
      title: '5. Transmit (C2 → C3)',
      desc: 'C2 sends the XML securely to C3 (Buyer\'s Access Point) via AS4 protocol.',
      details: 'C3 responds with a Message Level Response (MLR).'
    },
    {
      title: '6. Deliver & Archive (C4)',
      desc: 'C3 serves the invoice to C4\'s ERP, where the customer reviews and archives it.',
      details: 'Buyer sends an Invoice Response (IR) indicating acceptance or dispute.'
    }
  ];

  const processes = [
    { code: 'P1', name: 'Standard billing', desc: 'Typical billing invoice generated for standard sales transactions.' },
    { code: 'P2', name: 'Corrective billing', desc: 'Credit Note issued to correct standard invoices.' },
    { code: 'P3', name: 'Simplified billing', desc: 'B2C retail billing.' },
    { code: 'P4', name: 'Deemed supply billing', desc: 'Declaring tax on self-supplies or gifts.' },
    { code: 'P5', name: 'Export billing', desc: 'Declaring tax-free sales to non-GCC entities.' },
    { code: 'P6', name: 'Self-billing', desc: 'Buyer creates invoice on behalf of the seller.' },
    { 
      code: 'P7', 
      name: isOman ? 'Special Economic Zone billing' : 'Free Trade Zone billing', 
      desc: isOman ? 'Billing within designated Omani zones (e.g., Duqm SEZ).' : 'Billing within designated UAE free zones.' 
    },
    { code: 'P8', name: 'Simplified Credit Note', desc: 'Corrective note for B2C invoices.' },
    { code: 'P9', name: 'Profit Margin billing', desc: 'Billing under the margin scheme.' }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 2: Core Concepts</span>
        <h1 className="apple-h1">E-Invoice Lifecycle</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          From the moment an invoice is created in your ERP to its final archiving on the buyer\'s ledger, a PEPPOL document moves through six distinct processing gates.
        </p>
      </div>

      {/* Interactive Lifecycle Roadmap */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Step-by-Step Processing Timeline
        </h3>
        
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 items-start">
          {/* List of Steps */}
          <div className="space-y-2">
            {lifecycleSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                  idx === activeStep
                    ? 'border-accent bg-accent/[0.03] text-textPrimary font-semibold'
                    : 'border-white/[0.04] bg-white/[0.01] text-textSecondary hover:bg-white/[0.03] hover:border-white/[0.08]'
                }`}
              >
                <span className="text-xs">{step.title}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${idx === activeStep ? 'text-accent rotate-90' : 'opacity-40'}`} />
              </button>
            ))}
          </div>

          {/* Details Card */}
          <div className="apple-panel p-6 space-y-4 min-h-[180px] flex flex-col justify-between">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <span className="text-[9px] font-mono uppercase tracking-wider text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                Stage Detail
              </span>
              <h4 className="text-sm font-semibold text-textPrimary">{lifecycleSteps[activeStep].title}</h4>
              <p className="text-xs text-textSecondary leading-relaxed">{lifecycleSteps[activeStep].desc}</p>
              <p className="text-xs text-textSecondary/60 italic leading-relaxed">{lifecycleSteps[activeStep].details}</p>
            </motion.div>

            {/* Stepper Dots */}
            <div className="flex gap-1.5 justify-center mt-4">
              {lifecycleSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === activeStep ? 'bg-accent w-4' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* P1 to P9 Processes */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          {isOman ? 'Oman' : 'UAE'} Invoice Processes (P1 - P9)
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {processes.map((p) => (
            <div key={p.code} className="apple-panel p-4 space-y-1.5">
              <span className="text-[10px] font-mono text-accent bg-accent/15 px-1.5 py-0.5 rounded">
                {p.code}
              </span>
              <h4 className="text-xs font-semibold text-textPrimary pt-1">{p.name}</h4>
              <p className="text-[10px] text-textSecondary leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Check Your Knowledge
        </h3>
        <QuizCard 
          moduleId="invoice-lifecycle" 
          questions={quizzes['invoice-lifecycle']} 
          onComplete={() => completeModule('invoice-lifecycle')} 
        />
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for mastering e-invoice lifecycle.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
