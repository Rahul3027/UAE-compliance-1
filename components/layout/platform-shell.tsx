'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navGroups } from '@/config/navigation';
import { ReactNode, useState, useEffect } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Award, Menu, X, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PlatformShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const { completedModules, xp, resetProgress } = useLearningStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent client hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#09090b] border-r border-white/[0.06] text-[#f5f5f7]">
      {/* Title Header */}
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={closeMobile}>
          <Layers className="w-5 h-5 text-accent" />
          <span className="font-semibold text-sm tracking-tight font-sans">UAE PEPPOL Lab</span>
        </Link>
      </div>

      {/* User Status */}
      {mounted && (
        <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-textSecondary font-mono">{xp} XP</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all compliance progress?')) {
                resetProgress();
              }
            }}
            className="text-[10px] text-textSecondary/60 hover:text-red-400 flex items-center gap-1 transition-colors"
            title="Reset Progress"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            Reset
          </button>
        </div>
      )}

      {/* Navigation Groupings */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.groupLabel} className="space-y-1.5">
            <h3 className="px-3 text-[10px] font-semibold text-textSecondary/50 uppercase tracking-widest font-mono">
              {group.groupLabel}
            </h3>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = path === item.href;
                const isCompleted = mounted && completedModules.includes(item.moduleId);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                      isActive
                        ? 'bg-white/[0.06] text-textPrimary font-medium border-l-2 border-accent'
                        : 'text-textSecondary hover:bg-white/[0.03] hover:text-textPrimary'
                    }`}
                  >
                    <span className="truncate pr-2">{item.label}</span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-[260px_1fr] bg-black text-[#f5f5f7]">
      {/* Mobile Header Bar */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-[#09090b] sticky top-0 z-40">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent" />
          <span className="font-semibold text-xs tracking-tight">UAE PEPPOL Lab</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-textPrimary hover:text-accent transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop Sidebar (Left column) */}
      <aside className="hidden md:block sticky top-0 h-screen overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[53px] z-30 md:hidden overflow-hidden"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area (Right column) */}
      <main className="w-full flex-1 overflow-x-hidden p-6 md:p-10 max-w-4xl mx-auto">
        <div className="space-y-12">
          {children}
        </div>
      </main>
    </div>
  );
}
