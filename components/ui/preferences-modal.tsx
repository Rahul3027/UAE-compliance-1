'use client';

import { FontSizePreference, usePreferences } from '@/hooks/use-preferences';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Monitor, Eye, RotateCcw, Sliders, Play, SquareEqual, ZoomIn } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function PreferencesModal() {
  const {
    preferences,
    updatePreference,
    resetPreferences,
    isPreferencesOpen,
    closePreferences,
  } = usePreferences();

  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on Esc key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreferencesOpen) {
        closePreferences();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreferencesOpen, closePreferences]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isPreferencesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPreferencesOpen]);

  const isReduced = preferences.motion === 'reduced';

  // Custom transition settings that respect the reduced-motion preference
  const backdropTransition = isReduced ? { duration: 0 } : { duration: 0.2 };
  const panelTransition = isReduced ? { duration: 0 } : { type: 'spring', damping: 24, stiffness: 220 };

  return (
    <AnimatePresence>
      {isPreferencesOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={closePreferences}
            className="fixed inset-0 bg-background/40 backdrop-blur-sm"
          />

          {/* Slide-over Panel Content */}
          <motion.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={panelTransition}
            role="dialog"
            aria-modal="true"
            aria-labelledby="prefs-panel-title"
            className="relative w-full max-w-md h-full bg-card/95 backdrop-blur-md border-l border-border shadow-2xl flex flex-col z-[101]"
          >
            {/* Header */}
            <div className="p-6 border-b border-border/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="prefs-panel-title" className="text-sm font-bold text-foreground">
                    Preferences
                  </h2>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Customize your experience. Saved automatically.
                  </p>
                </div>
              </div>
              <button
                onClick={closePreferences}
                className="w-8 h-8 rounded-full border border-border/60 bg-muted/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

              {/* SECTION 1: Theme Mode */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">
                    Color Theme
                  </label>
                  <span className="text-[10px] bg-muted/65 text-muted-foreground px-2 py-0.5 rounded-full font-mono">
                    {preferences.theme}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {/* Light Theme Card */}
                  <button
                    onClick={() => updatePreference('theme', 'light')}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-left transition-all ${preferences.theme === 'light'
                      ? 'border-accent bg-accent/5 ring-1 ring-accent'
                      : 'border-border bg-muted/10 hover:bg-muted/20 hover:border-border-light-hover'
                      }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <Sun className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-foreground">Light</span>
                  </button>

                  {/* Dark Theme Card */}
                  <button
                    onClick={() => updatePreference('theme', 'dark')}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-left transition-all ${preferences.theme === 'dark'
                      ? 'border-accent bg-accent/5 ring-1 ring-accent'
                      : 'border-border bg-muted/10 hover:bg-muted/20 hover:border-border-light-hover'
                      }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Moon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-foreground">Dark</span>
                  </button>

                  {/* System Theme Card */}
                  <button
                    onClick={() => updatePreference('theme', 'system')}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-left transition-all ${preferences.theme === 'system'
                      ? 'border-accent bg-accent/5 ring-1 ring-accent'
                      : 'border-border bg-muted/10 hover:bg-muted/20 hover:border-border-light-hover'
                      }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Monitor className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-foreground">System</span>
                  </button>
                </div>
              </div>

              {/* SECTION 2: Layout Density */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">
                    Layout Density
                  </label>
                  <span className="text-[10px] bg-muted/65 text-muted-foreground px-2 py-0.5 rounded-full font-mono">
                    {preferences.density === 'comfortable' ? 'Comfortable' : 'Compact'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Comfortable Density Card */}
                  <button
                    onClick={() => updatePreference('density', 'comfortable')}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${preferences.density === 'comfortable'
                      ? 'border-accent bg-accent/5 ring-1 ring-accent'
                      : 'border-border bg-muted/10 hover:bg-muted/20 hover:border-border-light-hover'
                      }`}
                  >
                    <div className="w-7 h-7 rounded-md bg-secondary/80 flex items-center justify-center text-muted-foreground shrink-0">
                      <SquareEqual className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Comfortable</h4>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-normal">
                        Default spacing, optimized for readibility and spacious layouts.
                      </p>
                    </div>
                  </button>

                  {/* Compact Density Card */}
                  <button
                    onClick={() => updatePreference('density', 'compact')}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${preferences.density === 'compact'
                      ? 'border-accent bg-accent/5 ring-1 ring-accent'
                      : 'border-border bg-muted/10 hover:bg-muted/20 hover:border-border-light-hover'
                      }`}
                  >
                    <div className="w-7 h-7 rounded-md bg-secondary/80 flex items-center justify-center text-muted-foreground shrink-0">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Compact</h4>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-normal">
                        Reduced margins, gaps, and heights. Ideal for tabular views and dashboard cockpits.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* SECTION 3: Motion & Transitions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">
                    Motion & Animations
                  </label>
                  <span className="text-[10px] bg-muted/65 text-muted-foreground px-2 py-0.5 rounded-full font-mono">
                    {preferences.motion === 'default' ? 'Enabled' : 'Reduced'}
                  </span>
                </div>
                <div className="bg-muted/15 border border-border p-4 rounded-xl space-y-3.5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Reduce Transitions</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                        Disable website transitions and animations for lower CPU usage and fast navigation.
                      </p>
                    </div>
                    <button
                      onClick={() => updatePreference('motion', preferences.motion === 'default' ? 'reduced' : 'default')}
                      role="switch"
                      aria-checked={preferences.motion === 'reduced'}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent/50 ${preferences.motion === 'reduced' ? 'bg-accent' : 'bg-muted-foreground/30'
                        }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${preferences.motion === 'reduced' ? 'translate-x-4' : 'translate-x-0'
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Font Size Scaling */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">
                    Font Size Scaling
                  </label>
                  <span className="text-[10px] bg-muted/65 text-muted-foreground px-2 py-0.5 rounded-full font-mono">
                    {preferences.fontSize === 'sm' && 'Small (87.5%)'}
                    {preferences.fontSize === 'md' && 'Medium (100%)'}
                    {preferences.fontSize === 'lg' && 'Large (112.5%)'}
                    {preferences.fontSize === 'xl' && 'Extra Large (125%)'}
                  </span>
                </div>

                <div className="bg-muted/15 border border-border p-4 rounded-xl space-y-4">
                  {/* Interactive Button Group / Scale Slider */}
                  <div className="flex items-center justify-between gap-2">
                    {(['sm', 'md', 'lg', 'xl'] as FontSizePreference[]).map((size) => (
                      <button
                        key={size}
                        onClick={() => updatePreference('fontSize', size)}
                        className={`flex-1 py-2 px-2.5 rounded-lg border text-center transition-all focus:outline-none ${preferences.fontSize === size
                          ? 'border-accent bg-accent/10 text-accent font-black'
                          : 'border-border bg-muted/10 hover:bg-muted/20 text-muted-foreground hover:text-foreground font-semibold'
                          }`}
                      >
                        <span className="text-xs font-mono select-none">
                          {size === 'sm' && 'A-'}
                          {size === 'md' && 'A'}
                          {size === 'lg' && 'A+'}
                          {size === 'xl' && 'A++'}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Sample Typography Preview */}
                  <div className="bg-muted/25 border border-border/80 p-3 rounded-lg flex items-center gap-3">
                    <Eye className="w-4 h-4 text-muted-foreground shrink-0" />
                    <p className="text-xs leading-normal text-muted-foreground italic select-none">
                      This is a live preview of compliance text scaling.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border/80 bg-muted/5 flex items-center justify-between">
              <button
                onClick={resetPreferences}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Defaults
              </button>
              <button
                onClick={closePreferences}
                className="px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
