'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { uaeBusinessRules } from '@/data/compliance-content';
import { quizzes } from '@/data/quiz-data';
import { QuizCard } from '@/components/ui/quiz-card';
import { CheckCircle2, Search, Filter, ShieldAlert } from 'lucide-react';

export default function BusinessRules() {
  const { completeModule, completedModules } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'fatal' | 'warning'>('all');
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('business-rules-explorer');

  const filteredRules = uaeBusinessRules.filter((rule) => {
    const matchesSearch = rule.id.toLowerCase().includes(search.toLowerCase()) ||
      rule.message.toLowerCase().includes(search.toLowerCase()) ||
      rule.context.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || rule.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 3: Technical Deep-Dives</span>
        <h1 className="apple-h1">Schematron Business Rules</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          The UAE Federal Tax Authority enforces strict mathematical, logical, and registration checks via Schematron assertions before allowing any network delivery.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-textSecondary/60" />
          <input
            type="text"
            placeholder="Search rules, messages, or XPaths..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white/[0.02] border border-white/[0.08] rounded-lg focus:outline-none focus:border-accent text-textPrimary placeholder:text-textSecondary/50 font-mono"
          />
        </div>

        <div className="flex gap-1.5 p-1 bg-white/[0.02] border border-white/[0.06] rounded-lg max-w-max self-start font-mono">
          {(['all', 'fatal', 'warning'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded text-[10px] uppercase font-semibold transition-all ${
                severityFilter === sev
                  ? 'bg-accent/10 text-accent font-bold'
                  : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Interactive Directory */}
      <div className="space-y-2">
        {filteredRules.map((rule) => {
          const isExpanded = expandedRule === rule.id;
          return (
            <div
              key={rule.id}
              className={`apple-panel transition-all overflow-hidden ${
                isExpanded ? 'border-accent/40 bg-accent/[0.01]' : ''
              }`}
            >
              {/* Header Toggle */}
              <button
                onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                className="w-full text-left p-4 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-accent">{rule.id}</span>
                    <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      rule.severity === 'fatal' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {rule.severity}
                    </span>
                  </div>
                  <h4 className="text-xs font-medium text-textPrimary leading-relaxed">
                    {rule.message}
                  </h4>
                </div>
              </button>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-white/[0.04] space-y-3 font-mono text-[10px] text-textSecondary bg-black/20">
                  <div>
                    <span className="text-[8px] text-textSecondary/50 uppercase tracking-wider block">XML XPath Context</span>
                    <code className="text-textPrimary mt-0.5 block bg-white/[0.02] p-1.5 rounded">{rule.context}</code>
                  </div>
                  <div>
                    <span className="text-[8px] text-textSecondary/50 uppercase tracking-wider block">Schematron Assertion Check</span>
                    <code className="text-accent mt-0.5 block bg-white/[0.02] p-1.5 rounded">{rule.test}</code>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Check Your Knowledge
        </h3>
        <QuizCard 
          moduleId="business-rules-explorer" 
          questions={quizzes['business-rules-explorer']} 
          onComplete={() => completeModule('business-rules-explorer')} 
        />
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for mastering UAE Schematron rules.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
