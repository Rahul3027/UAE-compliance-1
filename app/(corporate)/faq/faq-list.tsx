'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageSquare, HelpCircle, AlertCircle } from 'lucide-react';
import { FAQItem } from '@/data/cms-content';
import Link from 'next/link';

interface FAQListProps {
  faqs: FAQItem[];
}

type CategoryFilter = 'All' | 'General' | 'Technical' | 'Pricing';

export function FAQList({ faqs }: FAQListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  // Filter FAQs based on search query and category
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, searchQuery, activeCategory]);

  const categories: CategoryFilter[] = ['All', 'General', 'Technical', 'Pricing'];

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Input */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-muted/10 p-4 border border-border/80 rounded-2xl">
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null); // Reset open states during search
            }}
            className="w-full bg-background border border-border/85 rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 focus:outline-none ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background border-border/85 text-muted-foreground hover:text-foreground hover:border-border-light-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={faq.question}
                  layout="position"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-305 ${
                    isOpen
                      ? 'bg-card border-accent/50 shadow-md shadow-accent/5'
                      : 'bg-background border-border hover:border-border-light-hover hover:bg-muted/5'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                      }`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm md:text-base text-foreground leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      isOpen
                        ? 'border-accent bg-accent/10 text-accent rotate-180'
                        : 'border-border/60 text-muted-foreground group-hover:text-foreground'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed text-sm border-t border-border/40 pt-4 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 border border-dashed border-border rounded-2xl text-center space-y-3"
            >
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto animate-pulse" />
              <h4 className="text-sm font-bold">No results found</h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                We couldn't find any questions matching "{searchQuery}" under "{activeCategory}".
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Still Have Questions CTA */}
      <div className="p-6 rounded-2xl bg-muted/15 border border-border/80 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xs font-bold text-foreground">Still have questions?</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Can't find the answer you are looking for? Reach out to our integration team.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-8 px-5 text-xs font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/95 transition-all focus:outline-none shrink-0"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
