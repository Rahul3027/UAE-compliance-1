'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { insertLead } from '@/lib/supabase/db';
import { ShieldCheck, ArrowRight, ArrowLeft, Send, Award, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ComplianceQuestion {
  id: string;
  question: string;
  category: 'tax' | 'archiving' | 'technical';
  complianceValue: boolean; // What answer represents compliance
  tip: string;
}

export default function ComplianceChecklistPage() {
  const [step, setStep] = useState<number>(0); // 0: Intro, 1: Quiz, 2: Lead, 3: Results
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
  });

  const checklist: ComplianceQuestion[] = [
    {
      id: 'trn_valid',
      question: 'Are your customers and supplier TRNs verified for active registrations before generating invoices?',
      category: 'tax',
      complianceValue: true,
      tip: 'The FTA Schematron rules (UAE-R-002) mandate exactly 15 digits for TRNs. Invalid numbers will trigger instantaneous AS4 rejection.',
    },
    {
      id: 'aed_reporting',
      question: 'Do you convert and output tax amount totals in AED (or OMR for Oman) when billing in foreign currencies?',
      category: 'tax',
      complianceValue: true,
      tip: 'Tax amounts MUST be reported in the national currency. E.g., rule UAE-R-003 requires AED reporting or matching Document Currency.',
    },
    {
      id: 'credit_linkage',
      question: 'Are credit notes (XML type 381) structurally linked back to the original cleared invoice ID in your system?',
      category: 'technical',
      complianceValue: true,
      tip: 'Rules like UAE-R-008 make it fatal to submit a credit note without referencing at least one original invoice document reference.',
    },
    {
      id: 'zero_vat_exempt',
      question: 'Do your Zero-Rated (Z) or Exempt (E) supplies display a 0% tax rate with correct category codes (like Z, E, O)?',
      category: 'tax',
      complianceValue: true,
      tip: 'VAT category mismatch is a top rejection trigger. Standard rate is exactly 5%, while Z, E, and O must specify 0% with schema category tags.',
    },
    {
      id: 'local_archiving',
      question: 'Are digital XML records archived in a secure, tamper-proof repository for the statutory 10-year period?',
      category: 'archiving',
      complianceValue: true,
      tip: 'FTA regulations require electronic invoices to be archived locally in a secure, non-editable format (PDF/A or UBL XML) for audit history.',
    },
  ];

  const handleAnswer = (questionId: string, val: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  const isAllAnswered = checklist.every(q => answers[q.id] !== undefined);

  const calculateScore = () => {
    let score = 0;
    const details: { question: string; compliant: boolean; tip: string }[] = [];

    checklist.forEach(q => {
      const isCompliant = answers[q.id] === q.complianceValue;
      if (isCompliant) score += 20;
      details.push({
        question: q.question,
        compliant: isCompliant,
        tip: q.tip,
      });
    });

    return { score, details };
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.firstName || !leadInfo.lastName || !leadInfo.email || !leadInfo.company) {
      toast.warning('Please complete all required fields.');
      return;
    }

    setLoading(true);
    const scoreData = calculateScore();

    try {
      const res = await insertLead({
        type: 'compliance_assessment',
        first_name: leadInfo.firstName,
        last_name: leadInfo.lastName,
        email: leadInfo.email,
        company: leadInfo.company,
        phone: leadInfo.phone,
        message: `Compliance score: ${scoreData.score}%. Answers: ${JSON.stringify(answers)}`,
        metadata: {
          score: scoreData.score,
          answers: answers,
        }
      });

      if (res.success) {
        setStep(3);
        toast.success('Audit complete! Your scorecard is now available.');
      } else {
        toast.error('Failed to submit compliance assessment.');
      }
    } catch (err) {
      toast.error('Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const scoreData = step === 3 ? calculateScore() : null;

  return (
    <main className="flex-1 pb-24">
      {/* Header */}
      <section className="relative py-20 overflow-hidden border-b border-border bg-muted/5">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Interactive Tools</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">E-Invoicing Compliance Checklist</h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Audit your tax invoicing workflows against national Schematron validation guidelines to ensure zero billing rejections.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-12">
        <div className="bg-muted/10 border border-border/80 rounded-3xl p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* Step 0: Intro */}
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 flex-1 flex flex-col justify-center animate-fade-in"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold">Instant Technical Compliance Audit</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Avoid costly tax penalties and transactional rejections. Our automated validation checklists map your operations against the exact Schematron guidelines defined by local tax authorities.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Answer 5 quick operations questions to identify compliance vulnerabilities in your invoicing schema.
                </p>
                <div className="pt-4">
                  <Button onClick={() => setStep(1)} className="rounded-full px-6 h-11 text-sm bg-green-600 hover:bg-green-700 text-white">
                    Start Audit <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 1: Checklist Questions */}
            {step === 1 && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground border-b border-border/40 pb-4">
                  <span>COMPLIANCE DIAGNOSTIC CHECKLIST</span>
                  <span>5 AUDIT RULES</span>
                </div>

                <div className="space-y-6">
                  {checklist.map((q, idx) => (
                    <div key={q.id} className="p-5 rounded-2xl bg-background border border-border/50 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-xs font-bold font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                          RULE 0{idx + 1}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAnswer(q.id, true)}
                            className={`px-3 py-1 text-xs rounded transition-all font-semibold ${answers[q.id] === true ? 'bg-green-600 text-white' : 'bg-muted/30 text-muted-foreground'}`}
                          >
                            YES
                          </button>
                          <button
                            onClick={() => handleAnswer(q.id, false)}
                            className={`px-3 py-1 text-xs rounded transition-all font-semibold ${answers[q.id] === false ? 'bg-red-600/90 text-white' : 'bg-muted/30 text-muted-foreground'}`}
                          >
                            NO
                          </button>
                        </div>
                      </div>
                      <p className="font-bold text-sm leading-snug">{q.question}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-border/50 mt-8">
                  <Button variant="ghost" onClick={() => setStep(0)} className="text-sm">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (!isAllAnswered) {
                        toast.warning('Please answer all audit questions to continue.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="rounded-full px-6 text-sm bg-green-600 hover:bg-green-700 text-white"
                  >
                    Generate Report <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Lead Capture */}
            {step === 2 && (
              <motion.div
                key="lead"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>AUDIT SUMMARY</span>
                  <span>CONTACT DETAILS</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Secure Your Compliance Scorecard</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Enter your business contact details to generate your audit result dashboard. Your email will be logged to provide access to developer tools.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
                      <input
                        required
                        type="text"
                        value={leadInfo.firstName}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
                      <input
                        required
                        type="text"
                        value={leadInfo.lastName}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
                      <input
                        required
                        type="text"
                        value={leadInfo.company}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Contact Phone</label>
                      <input
                        type="tel"
                        value={leadInfo.phone}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Work Email</label>
                    <input
                      required
                      type="email"
                      value={leadInfo.email}
                      onChange={(e) => setLeadInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-8 border-t border-border/50 mt-8">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-sm">
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button type="submit" disabled={loading} className="rounded-full px-6 text-sm bg-green-600 hover:bg-green-700 text-white">
                      {loading ? 'Processing...' : 'Audit Scorecard'} <Send className="ml-2 w-3.5 h-3.5" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Scorecard Results */}
            {step === 3 && scoreData && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                  <Award className="w-8 h-8 text-green-500" />
                  <div>
                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Audit Scorecard</span>
                    <h3 className="text-lg font-bold">Compliance Strength: {scoreData.score}%</h3>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-muted/20 border border-border/50 text-center space-y-2">
                  <div className="text-3xl font-black text-primary">{scoreData.score}% Compliant</div>
                  <p className="text-xs text-muted-foreground">
                    {scoreData.score === 100
                      ? 'Congratulations! Your transactional workflows match all structural Schematron expectations.'
                      : 'We identified potential compliance gaps. Failure to correct these issues can block invoice clearance.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Gap Breakdown & Advice</h4>
                  <div className="space-y-3">
                    {scoreData.details.map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-background border border-border/40 text-xs flex gap-3">
                        {item.compliant ? (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1">
                          <p className="font-semibold">{item.question}</p>
                          <p className="text-muted-foreground leading-relaxed">{item.tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-border/50">
                  <Button asChild className="w-full sm:flex-1 rounded-full text-xs h-10 bg-green-600 hover:bg-green-700 text-white">
                    <Link href="/contact">Book Free Gap Analysis</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full sm:flex-1 rounded-full text-xs h-10 border-border/50 hover:bg-muted/50">
                    <Link href="/validation-engine-simulator">Launch Live XML Validator</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
