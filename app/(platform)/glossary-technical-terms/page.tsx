'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { glossaryTerms } from '@/data/compliance-content';
import { CheckCircle2, Search, BookOpen } from 'lucide-react';

export default function GlossaryTerms() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'peppol' | 'tax' | 'technical'>('all');

  useEffect(() => {
    setMounted(true);
    // Mark as completed when user reviews glossary
    if (completeModule) {
      completeModule('glossary-technical-terms', 50); // Smaller XP reward
    }
  }, []);

  const isCompleted = mounted && completedModules.includes('glossary-technical-terms');
  const isOman = mounted && country === 'om';

  // Map terms dynamically based on selected country
  const displayTerms = glossaryTerms.map((t) => {
    if (isOman) {
      if (t.term === 'PINT AE') {
        return {
          term: 'PINT OM',
          definition: 'The specific Oman customization of the PINT specification, implementing Oman Tax Authority (OTA) rules (like 5% VAT, VATIN, and Arabic requirements).',
          category: t.category
        };
      }
      if (t.term === 'TRN') {
        return {
          term: 'VATIN',
          definition: 'VAT Identification Number. A unique 10-digit identifier prefixed with "OM" issued by the OTA to businesses registered for VAT in Oman.',
          category: t.category
        };
      }
      return {
        ...t,
        definition: t.definition
          .replaceAll('UAE', 'Oman')
          .replaceAll('FTA', 'OTA')
          .replaceAll('TRN', 'VATIN')
      };
    }
    return t;
  });

  const filteredTerms = displayTerms.filter((term) => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 1: Getting Started</span>
        <h1 className="apple-h1">Glossary & Technical Terms</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Quick-reference database of technical terms, acronyms, and legal concepts used in the {isOman ? 'Oman' : 'UAE'} PEPPOL PINT compliance ecosystem.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-textSecondary/60" />
          <input
            type="text"
            placeholder="Search terms or definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white/[0.02] border border-white/[0.08] rounded-lg focus:outline-none focus:border-accent text-textPrimary placeholder:text-textSecondary/50 font-mono"
          />
        </div>

        {/* Category Toggles */}
        <div className="flex gap-1.5 p-1 bg-white/[0.02] border border-white/[0.06] rounded-lg max-w-max self-start font-mono">
          {(['all', 'peppol', 'tax', 'technical'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded text-[10px] uppercase font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-accent/10 text-accent font-bold'
                  : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <div key={term.term} className="apple-panel p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-textPrimary font-mono">{term.term}</h4>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                    {term.category}
                  </span>
                </div>
                <p className="text-xs text-textSecondary leading-relaxed">
                  {term.definition}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 border border-dashed border-white/[0.06] rounded-xl space-y-2">
            <BookOpen className="w-8 h-8 text-textSecondary/40 mx-auto" />
            <p className="text-xs text-textSecondary">No terms match your search filters.</p>
          </div>
        )}
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 50 XP for reviewing the technical glossary.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
