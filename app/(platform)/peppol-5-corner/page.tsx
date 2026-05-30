'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { fiveCornerRoles } from '@/data/compliance-content';
import { quizzes } from '@/data/quiz-data';
import { QuizCard } from '@/components/ui/quiz-card';
import { FlowDiagram } from '@/components/ui/flow-diagram';
import { CornerModel } from '@/components/ui/corner-model';
import { CheckCircle2 } from 'lucide-react';

export default function Peppol5Corner() {
  const { completeModule, completedModules } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('peppol-5-corner');

  // Map roles to match FlowDiagram input format
  const diagramNodes = fiveCornerRoles.map((role) => ({
    id: role.id,
    label: role.name.split(':')[0], // e.g. "Corner 1"
    sublabel: role.id === 'C5' ? 'Authority (FTA)' : 'Network Node',
    description: role.description,
    details: role.techDetails
  }));

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 1: Getting Started</span>
        <h1 className="apple-h1">PEPPOL 5-Corner Model</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Traditional PEPPOL networks use a 4-corner model (Seller → AP1 → AP2 → Buyer). The UAE introduces a **5-Corner Model**, integrating the Federal Tax Authority (FTA) directly into the network.
        </p>
      </div>

      {/* Interactive 5-Corner visual simulation model (added at top) */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          5-Corner Live Flow Animator
        </h3>
        <CornerModel />
      </div>

      {/* Interactive Role Inspector */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Role Details & Capabilities Directory
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Click on any node (C1 through C5) to inspect its specific roles, responsibilities, and technical actions in the e-invoicing transmission process.
        </p>
        <FlowDiagram nodes={diagramNodes} />
      </div>

      {/* 4-Corner vs 5-Corner Comparison */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Architecture Comparison
        </h3>
        <div className="apple-panel overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                <th className="p-4 font-semibold text-textPrimary">Feature</th>
                <th className="p-4 font-semibold text-textPrimary">Standard 4-Corner Model</th>
                <th className="p-4 font-semibold text-textPrimary text-accent">UAE 5-Corner Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="p-4 font-medium text-textPrimary">Tax Authority Integration</td>
                <td className="p-4 text-textSecondary">Authority is offline or receives reports in batch mode later.</td>
                <td className="p-4 text-textSecondary text-accent">Real-time reporting. Corner 5 (FTA) audits the invoice on transmit.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-textPrimary">Validation Engine</td>
                <td className="p-4 text-textSecondary">Access Points only validate schemas.</td>
                <td className="p-4 text-textSecondary">Double validation at AP levels and central FTA schema auditing.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-textPrimary">Network Decoupling</td>
                <td className="p-4 text-textSecondary">Seller & buyer must coordinate access point protocols.</td>
                <td className="p-4 text-textSecondary">Standards are enforced nationally, simplifying ERP onboarding.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Check Your Knowledge
        </h3>
        <QuizCard 
          moduleId="peppol-5-corner" 
          questions={quizzes['peppol-5-corner']} 
          onComplete={() => completeModule('peppol-5-corner')} 
        />
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for mastering PEPPOL 5-Corner model.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
