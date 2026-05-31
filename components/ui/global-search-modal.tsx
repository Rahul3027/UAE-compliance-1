'use client';
import { useGlobalSearch } from '@/hooks/use-global-search';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, ArrowRight, Play, Compass, Keyboard } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getBlogs, getFaqs, getServices } from '@/lib/supabase/db';
import { BlogPost, FAQItem, ServiceItem } from '@/data/cms-content';

interface SearchItem {
  title: string;
  type: 'Blog' | 'Service' | 'FAQ' | 'Action' | 'Tool';
  href: string;
  desc?: string;
}

export function GlobalSearchModal() {
  const { isOpen, closeSearch, toggleSearch } = useGlobalSearch();
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load items dynamically at runtime
  useEffect(() => {
    async function loadData() {
      const dbBlogs = await getBlogs();
      const dbFaqs = await getFaqs();
      const dbServices = await getServices();

      const searchable: SearchItem[] = [
        // Quick Actions & Tools
        { title: 'Launch Interactive UBL Sandbox', type: 'Tool', href: '/sandbox-testing-center', desc: 'Create and test mock compliance XML files.' },
        { title: 'Run UAE Validation Simulator', type: 'Tool', href: '/validation-engine-simulator', desc: 'Pre-flight XML schemas against Schematron rules.' },
        { title: 'Auditing 5-Corner Model Flow', type: 'Tool', href: '/peppol-5-corner', desc: 'Learn how invoices route to the tax authority.' },
        { title: 'ERP Compliance Readiness Wizard', type: 'Action', href: '/assessments/erp-readiness', desc: 'Generate custom integration scorecards.' },
        { title: 'Invoicing Compliance Checklist', type: 'Action', href: '/assessments/compliance', desc: 'Technical VAT business checklist.' },
        { title: 'Request Enterprise Demo', type: 'Action', href: '/demo', desc: 'Book scheduling consulting sessions.' },
        
        // Dynamic Content
        ...dbBlogs.map(b => ({ title: b.title, type: 'Blog' as const, href: `/blog/${b.slug}`, desc: b.excerpt })),
        ...dbServices.map(s => ({ title: s.title, type: 'Service' as const, href: `/services/${s.slug}`, desc: s.description })),
        ...dbFaqs.map(f => ({ title: f.question, type: 'FAQ' as const, href: `/faq`, desc: f.answer.slice(0, 100) + '...' })),
      ];
      setItems(searchable);
    }
    
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  // Keyboard events: Toggle modal & arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        closeSearch();
      }
      
      const filtered = query.length > 0 
        ? items.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) || 
            (item.desc || '').toLowerCase().includes(query.toLowerCase())
          )
        : items.slice(0, 5); // Default recommendations

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[activeIndex]) {
          router.push(filtered[activeIndex].href);
          closeSearch();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, items, activeIndex, toggleSearch, closeSearch, router]);

  // Reset index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const filteredResults = query.length > 0 
    ? items.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        (item.desc || '').toLowerCase().includes(query.toLowerCase())
      )
    : items.slice(0, 5); // Display default suggestions

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="absolute inset-0 bg-background/60 dark:bg-black/85 backdrop-blur-md"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Input Header */}
            <div className="flex items-center border-b border-border/80 px-4 py-3 bg-muted/10">
              <Search className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, FAQs, checklists..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm h-7"
              />
              <button 
                onClick={closeSearch} 
                className="p-1 rounded-md hover:bg-muted/40 text-muted-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Command Results */}
            <div className="max-h-[50vh] overflow-y-auto p-2 space-y-2">
              {query.length === 0 && (
                <div className="px-3 pt-2 pb-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 font-mono">
                  <Compass className="w-3.5 h-3.5" /> Recommended Commands
                </div>
              )}

              {query.length > 0 && filteredResults.length === 0 && (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  No matching rules, updates, or articles found.
                </div>
              )}

              {filteredResults.length > 0 && (
                <div className="space-y-0.5">
                  {filteredResults.map((item, idx) => {
                    const isSelected = activeIndex === idx;
                    return (
                      <Link 
                        key={idx} 
                        href={item.href}
                        onClick={closeSearch}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                          isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/15'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold leading-normal">{item.title}</p>
                            {item.desc && (
                              <p className={`text-[10px] leading-relaxed line-clamp-1 ${
                                isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                              }`}>
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[8px] font-bold rounded font-mono uppercase border ${
                            isSelected 
                              ? 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground' 
                              : 'bg-muted/20 border-border/40 text-muted-foreground'
                          }`}>
                            {item.type}
                          </span>
                          <ArrowRight className={`w-3.5 h-3.5 transition-all ${
                            isSelected ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-1'
                          }`} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyboard shortcuts footer */}
            <div className="px-4 py-2 border-t border-border/60 bg-muted/10 flex justify-between items-center text-[9px] text-muted-foreground font-mono">
              <span className="flex items-center gap-1">
                <Keyboard className="w-3 h-3" /> Navigation Shortcut keys
              </span>
              <div className="flex items-center gap-3">
                <span><kbd className="border rounded bg-card px-1 font-bold">↑↓</kbd> Navigate</span>
                <span><kbd className="border rounded bg-card px-1 font-bold">Enter</kbd> Select</span>
                <span><kbd className="border rounded bg-card px-1 font-bold">Esc</kbd> Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
