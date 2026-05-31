'use client';

import { usePreferences } from '@/hooks/use-preferences';
import { motion } from 'framer-motion';
import { Sliders } from 'lucide-react';

export function PreferencesToggle() {
  const { openPreferences, preferences } = usePreferences();
  const isReduced = preferences.motion === 'reduced';

  return (
    <button
      onClick={openPreferences}
      className="relative w-9 h-9 rounded-full bg-muted/20 hover:bg-muted/40 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Preferences Settings"
      title="Open Preferences"
    >
      <motion.div
        whileHover={isReduced ? {} : { rotate: 30 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="flex items-center justify-center"
      >
        <Sliders className="w-4 h-4" />
      </motion.div>
    </button>
  );
}
