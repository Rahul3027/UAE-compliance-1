'use client';
import { motion } from 'framer-motion';
import { useLearningStore } from '@/hooks/use-learning-store';
import { uaeMandateTimeline } from '@/data/compliance-content';
import { quizzes } from '@/data/quiz-data';
import { QuizCard } from '@/components/ui/quiz-card';
import { CheckCircle2, Calendar, FileText, Landmark } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UaeOverview() {
  const { completeModule, completedModules } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('uae-overview');

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 1: Getting Started</span>
        <h1 className="apple-h1">UAE E-Invoicing Overview</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          The UAE Federal Tax Authority (FTA) is modernizing tax collection by mandating structured, digital e-invoicing for all business-to-business (B2B) and business-to-government (B2G) transactions.
        </p>
      </div>

      {/* Why UAE adopts PEPPOL */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="apple-panel p-5 space-y-2">
          <Landmark className="w-5 h-5 text-accent" />
          <h4 className="text-xs font-semibold text-textPrimary">Official Mandate</h4>
          <p className="text-[11px] text-textSecondary leading-relaxed">
            Regulated by the UAE Federal Tax Authority (FTA) to prevent tax evasion and automate tax compliance recording.
          </p>
        </div>

        <div className="apple-panel p-5 space-y-2">
          <FileText className="w-5 h-5 text-accent" />
          <h4 className="text-xs font-semibold text-textPrimary">Decentralized Trust</h4>
          <p className="text-[11px] text-textSecondary leading-relaxed">
            Instead of a centralized FTA portal for uploading, invoices flow through accredited Access Points directly between buyers and sellers.
          </p>
        </div>

        <div className="apple-panel p-5 space-y-2">
          <Calendar className="w-5 h-5 text-accent" />
          <h4 className="text-xs font-semibold text-textPrimary">Structured Standard</h4>
          <p className="text-[11px] text-textSecondary leading-relaxed">
            Adopts the global PEPPOL PINT standard, localized as PINT AE XML, replacing unstructured PDF or paper documents.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Implementation Roadmap
        </h3>

        <div className="relative border-l border-white/[0.08] ml-4 pl-6 space-y-8">
          {uaeMandateTimeline.map((evt, idx) => (
            <div key={idx} className="relative">
              {/* Bullet Node */}
              <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-black" />
              <div>
                <span className="text-[10px] font-mono text-accent font-semibold">{evt.date}</span>
                <h4 className="text-xs font-semibold text-textPrimary mt-0.5">{evt.title}</h4>
                <p className="text-xs text-textSecondary mt-1 leading-relaxed max-w-lg">
                  {evt.description}
                </p>
              </div>
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
          moduleId="uae-overview" 
          questions={quizzes['uae-overview']} 
          onComplete={() => completeModule('uae-overview')} 
        />
      </div>

      {/* Manual completion state banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for mastering UAE Overview.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
