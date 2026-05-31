'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent } from '@/data/compliance-content';

interface RegulatoryTabsProps {
  uaeUpdates: TimelineEvent[];
  omanUpdates: TimelineEvent[];
}

export function RegulatoryTabs({ uaeUpdates, omanUpdates }: RegulatoryTabsProps) {
  const [activeTab, setActiveTab] = useState<'ae' | 'om'>('ae');
  const updates = activeTab === 'ae' ? uaeUpdates : omanUpdates;

  return (
    <div className="space-y-8">
      {/* Tab Header Selector */}
      <div className="flex justify-center gap-4 border-b border-border/40 pb-4 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('ae')}
          className={`flex-1 py-2 text-sm font-semibold rounded-full border transition-all ${activeTab === 'ae' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/10 border-border/40 text-muted-foreground'}`}
        >
          UAE (PINT AE)
        </button>
        <button
          onClick={() => setActiveTab('om')}
          className={`flex-1 py-2 text-sm font-semibold rounded-full border transition-all ${activeTab === 'om' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/10 border-border/40 text-muted-foreground'}`}
        >
          Oman (PINT OM)
        </button>
      </div>

      {/* Timeline rendering */}
      <div className="relative pl-8 border-l border-primary/30 space-y-12 max-w-xl mx-auto">
        {updates.map((evt, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary" />
            <span className="text-xs font-mono text-primary font-bold">{evt.date}</span>
            <h3 className="text-lg font-bold mt-1 leading-snug">{evt.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed mt-1">
              {evt.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
