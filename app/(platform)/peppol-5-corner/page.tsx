'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { fiveCornerRoles } from '@/data/compliance-content';
import { quizzes } from '@/data/quiz-data';
import { QuizCard } from '@/components/ui/quiz-card';
import { FlowDiagram } from '@/components/ui/flow-diagram';
import { AnimatedDataFlow } from '@/components/learning/animated-data-flow';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Peppol5Corner() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('peppol-5-corner');
  const isOman = mounted && country === 'om';

  const displayRoles = fiveCornerRoles.map(role => {
    if (isOman) {
      return {
        ...role,
        name: role.name.replace('Federal Tax Authority (FTA)', 'Oman Tax Authority (OTA)'),
        description: role.description.replace('UAE', 'Oman').replace('FTA', 'OTA'),
        techDetails: role.techDetails.map(detail =>
          detail.replaceAll('UAE', 'Oman')
                .replaceAll('FTA', 'OTA')
                .replaceAll('TRN', 'VATIN')
        )
      };
    }
    return role;
  });

  const diagramNodes = displayRoles.map((role) => ({
    id: role.id,
    label: role.name.split(':')[0], // e.g. "Corner 1"
    sublabel: role.id === 'C5' ? (isOman ? 'Authority (OTA)' : 'Authority (FTA)') : 'Network Node',
    description: role.description,
    details: role.techDetails
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-12 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">Track 1: Getting Started</span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{isOman ? 'Oman PEPPOL 5-Corner Model' : 'PEPPOL 5-Corner Model'}</h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Traditional PEPPOL networks use a 4-corner model (Seller → AP1 → AP2 → Buyer). {isOman ? 'Oman introduces a 5-Corner Model, integrating the Oman Tax Authority (OTA)' : 'The UAE introduces a 5-Corner Model, integrating the Federal Tax Authority (FTA)'} directly into the network.
        </p>
      </div>

      {/* Interactive 5-Corner visual simulation model */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest font-mono border-b border-border pb-2">
          5-Corner Live Flow Animator
        </h3>
        <AnimatedDataFlow isOman={isOman} />
      </div>

      {/* Interactive Role Inspector */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest font-mono border-b border-border pb-2">
          Role Details & Capabilities Directory
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Click on any node (C1 through C5) to inspect its specific roles, responsibilities, and technical actions in the e-invoicing transmission process.
        </p>
        <FlowDiagram nodes={diagramNodes} />
      </div>

      {/* 4-Corner vs 5-Corner Comparison */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest font-mono border-b border-border pb-2">
          Architecture Comparison
        </h3>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-4 font-semibold text-foreground">Feature</th>
                  <th className="p-4 font-semibold text-foreground">Standard 4-Corner Model</th>
                  <th className="p-4 font-semibold text-accent">{isOman ? 'Oman 5-Corner Model' : 'UAE 5-Corner Model'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">Tax Authority Integration</td>
                  <td className="p-4 text-muted-foreground">Authority is offline or receives reports in batch mode later.</td>
                  <td className="p-4 text-accent/90">Real-time reporting. Corner 5 ({isOman ? 'OTA' : 'FTA'}) audits the invoice on transmit.</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">Validation Engine</td>
                  <td className="p-4 text-muted-foreground">Access Points only validate schemas.</td>
                  <td className="p-4 text-muted-foreground">Double validation at AP levels and central {isOman ? 'OTA' : 'FTA'} schema auditing.</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">Network Decoupling</td>
                  <td className="p-4 text-muted-foreground">Seller & buyer must coordinate access point protocols.</td>
                  <td className="p-4 text-muted-foreground">Standards are enforced nationally, simplifying ERP onboarding.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Quiz Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest font-mono border-b border-border pb-2">
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/10"
        >
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm font-semibold text-foreground">Module Completed</p>
              <p className="text-xs text-muted-foreground">You earned 100 XP for mastering PEPPOL 5-Corner model.</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
