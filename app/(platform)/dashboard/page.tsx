'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { modulesMeta } from '@/data/compliance-content';
import { useLearningStore } from '@/hooks/use-learning-store';
import { Award, BookOpen, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const { completedModules, xp, quizScores, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Exclude dashboard itself from the learning module counts
  const contentModules = modulesMeta.filter(m => m.id !== 'dashboard');
  const totalCount = contentModules.length;
  const completedCount = mounted ? completedModules.filter(id => id !== 'dashboard').length : 0;
  
  const tracks = {
    'getting-started': {
      title: 'Getting Started',
      description: 'Foundations of regional e-invoicing and network models.',
      modules: contentModules.filter(m => m.category === 'getting-started')
    },
    'core-concepts': {
      title: 'Core Concepts',
      description: 'Understanding specifications, lifecycle stages, and tax math.',
      modules: contentModules.filter(m => m.category === 'core-concepts')
    },
    'technical': {
      title: 'Technical Deep-Dives',
      description: 'Deconstruct XML schemas, business validation rules, and APIs.',
      modules: contentModules.filter(m => m.category === 'technical')
    },
    'hands-on': {
      title: 'Hands-On Practice',
      description: 'Test XMLs, build compliant invoices, and solve real errors.',
      modules: contentModules.filter(m => m.category === 'hands-on')
    }
  };

  const isOman = mounted && country === 'om';

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
          Interactive Learning Platform
        </span>
        <h1 className="apple-h1 leading-tight">
          {isOman ? 'Oman PEPPOL PINT OM' : 'UAE PEPPOL PINT AE'} <br />Compliance Lab.
        </h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Learn regional e-invoicing compliance through hands-on simulations, interactive XML trees, calculations, and quizzes. No tedious paperwork—just practical engineering.
        </p>
      </motion.div>

      {/* Progress Cards */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="apple-panel p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center text-accent">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold font-mono">{completedCount} <span className="text-xs text-textSecondary">/ {totalCount}</span></p>
              <p className="text-[10px] text-textSecondary uppercase tracking-wider font-mono">Modules Completed</p>
            </div>
          </div>

          <div className="apple-panel p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center text-accent">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold font-mono text-accent">{xp}</p>
              <p className="text-[10px] text-textSecondary uppercase tracking-wider font-mono">Experience Points (XP)</p>
            </div>
          </div>

          <div className="apple-panel p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center text-accent">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold font-mono">{Object.keys(quizScores).length}</p>
              <p className="text-[10px] text-textSecondary uppercase tracking-wider font-mono">Quizzes Evaluated</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tracks Container */}
      <div className="space-y-8">
        <h2 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Learning Paths
        </h2>

        <div className="space-y-6">
          {Object.entries(tracks).map(([key, track], tIdx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * tIdx + 0.2, duration: 0.4 }}
              className="space-y-3"
            >
              <div>
                <h3 className="text-sm font-semibold text-textPrimary">{track.title}</h3>
                <p className="text-xs text-textSecondary">{track.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {track.modules.map((mod) => {
                  const isCompleted = mounted && completedModules.includes(mod.id);
                  const score = mounted ? quizScores[mod.id] : null;

                  // Adaptive titles for country
                  let title = mod.title;
                  let description = mod.description;
                  if (isOman) {
                    title = title.replace('UAE', 'Oman').replace('PINT AE', 'PINT OM');
                    description = description.replace('UAE', 'Oman').replace('PINT AE', 'PINT OM');
                  }

                  return (
                    <Link key={mod.id} href={`/${mod.id}`}>
                      <div className="group apple-panel-interactive p-4 h-full flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-lg">{mod.icon}</span>
                            <div className="flex gap-2">
                              {isCompleted && (
                                <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] px-1.5 py-0.5 rounded font-mono flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Done
                                </span>
                              )}
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${
                                mod.difficulty === 'beginner'
                                  ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                                  : mod.difficulty === 'intermediate'
                                  ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
                              }`}>
                                {mod.difficulty}
                              </span>
                            </div>
                          </div>
                          <h4 className="text-xs font-semibold text-textPrimary group-hover:text-accent transition-colors flex items-center gap-1">
                            {title}
                          </h4>
                          <p className="text-[11px] text-textSecondary leading-normal line-clamp-2">
                            {description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-white/[0.04] text-[10px] text-textSecondary font-mono">
                          <span>{mod.estimatedMinutes} min duration</span>
                          {score ? (
                            <span className="text-accent">{score.score}/{score.total} Score</span>
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-accent" />
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Spec reference */}
      <div className="apple-panel p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Official Specification Reference</p>
          <p className="text-xs text-textSecondary mt-0.5">
            {isOman ? 'PINT OM Draft spec · Oman Tax Authority' : 'PINT AE v1.0.2 · Released June 9, 2025'}
          </p>
        </div>
        <a
          href={isOman ? "https://peppol.org/" : "https://docs.peppol.eu/poac/ae/2025-Q2/pint-ae/"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-apple-secondary text-xs py-1.5"
        >
          View Spec ↗
        </a>
      </div>
    </div>
  );
}
