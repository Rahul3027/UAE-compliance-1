'use client';

import { BlogPost } from '@/data/cms-content';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, CheckCircle2, AlertTriangle, BookOpen, ChevronRight, FileCode, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface BlogArticleContentProps {
  blog: BlogPost;
  allBlogs: BlogPost[];
}

export function BlogArticleContent({ blog, allBlogs }: BlogArticleContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDiagramActive, setIsDiagramActive] = useState(false);

  // Monitor scroll for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const otherBlogs = allBlogs.filter(b => b.id !== blog.id);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Reading Progress Bar - fixed right below sticky nav */}
      <div className="fixed top-14 md:top-16 left-0 right-0 h-1 bg-muted z-[48] pointer-events-none">
        <div 
          className="h-full bg-accent transition-all duration-75" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        
        {/* Breadcrumbs */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-10 focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to insights directory
        </Link>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: Related Learning Tracks (Left Sidebar) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 hidden lg:block">
            <div className="space-y-2">
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">
                Learning Modules
              </span>
              <h4 className="text-xs font-bold text-foreground">Compliance Tracks</h4>
            </div>

            <div className="space-y-2.5">
              {allBlogs.map((b) => {
                const isActive = b.id === blog.id;
                return (
                  <Link
                    key={b.id}
                    href={`/blog/${b.slug}`}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'border-accent bg-accent/5 font-bold text-foreground'
                        : 'border-border/60 bg-transparent hover:bg-muted/10 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <BookOpen className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? 'text-accent' : 'text-muted-foreground/60'}`} />
                    <div className="text-[11px] leading-snug">
                      <p className="font-semibold line-clamp-2">{b.title}</p>
                      <span className="text-[9px] font-mono opacity-80 mt-1 block uppercase tracking-wide">
                        {b.category} • {b.readTime}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* COLUMN 2: Main Article Content (Center) */}
          <article className="lg:col-span-6 space-y-8">
            {/* Header */}
            <header className="space-y-4 pb-6 border-b border-border/80">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                  <Calendar className="w-3 h-3" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                  <Clock className="w-3 h-3" />
                  {blog.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                {blog.title}
              </h1>

              <div className="flex items-center gap-3 pt-4">
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">{blog.author}</p>
                  <p className="text-[9px] text-muted-foreground mt-1">Senior Compliance Architect</p>
                </div>
              </div>
            </header>

            {/* Intro excerpt */}
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              {blog.excerpt}
            </p>

            {/* Compliance Callout (Alert box) */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">Compliance Advisory Alert</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Taxpayers falling within designated Phase 1 categories are legally required to finalize billing middleware configurations. Failing Schematron pre-flight audits can delay clearing validations at the tax gateway.
                </p>
              </div>
            </div>

            {/* Interactive Data Mapping Diagram */}
            <div className="p-6 rounded-2xl border border-border bg-muted/15 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground">Interactive UBL Compilation Diagram</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Click Node to see payload compilation states.</p>
                </div>
                <button
                  onClick={() => setIsDiagramActive(!isDiagramActive)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold focus:outline-none"
                >
                  <FileCode className="w-3 h-3" />
                  {isDiagramActive ? 'Reset Data' : 'Trace Data Pipeline'}
                </button>
              </div>

              {/* Pipeline Nodes */}
              <div className="grid grid-cols-3 gap-2 text-center py-4 relative">
                {/* Node 1 */}
                <div className={`p-3 rounded-xl border transition-all ${isDiagramActive ? 'bg-accent/10 border-accent' : 'bg-background border-border/80'}`}>
                  <span className="text-[10px] font-mono uppercase tracking-wide block text-muted-foreground">Step 1</span>
                  <span className="text-xs font-bold text-foreground mt-1 block">ERP JSON</span>
                </div>
                {/* Node 2 */}
                <div className={`p-3 rounded-xl border transition-all ${isDiagramActive ? 'bg-primary/20 border-primary font-bold' : 'bg-background border-border/80'}`}>
                  <span className="text-[10px] font-mono uppercase tracking-wide block text-muted-foreground">Step 2</span>
                  <span className="text-xs font-bold text-foreground mt-1 block">XML Transpile</span>
                </div>
                {/* Node 3 */}
                <div className={`p-3 rounded-xl border transition-all ${isDiagramActive ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-background border-border/80'}`}>
                  <span className="text-[10px] font-mono uppercase tracking-wide block text-muted-foreground">Step 3</span>
                  <span className="text-xs font-bold mt-1 block">Cleared UBL</span>
                </div>
              </div>

              {isDiagramActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-[#0d1117] border border-border p-3.5 rounded-xl font-mono text-[10px] text-green-400 space-y-1"
                >
                  <p>&gt; Loading local invoice records...</p>
                  <p>&gt; Mapping fields: taxExclusiveAmount (1,250.00 AED) -&gt; Calculated TAX (62.50 AED)</p>
                  <p className="text-white">&gt; Executing EN 16931 ruleset clearance...</p>
                  <p className="text-green-500">[SUCCESS] Schema validation completed. Output file generated.</p>
                </motion.div>
              )}
            </div>

            {/* Main content body */}
            <div id="content-body" className="prose prose-invert prose-primary max-w-none text-muted-foreground leading-relaxed text-sm space-y-4">
              {blog.content.split('\n\n').map((para, i) => {
                let sectionId = '';
                if (i === 1) sectionId = 'sec-summary';
                if (i === 2) sectionId = 'sec-mandates';
                if (i === 3) sectionId = 'sec-integration';
                if (i === 4) sectionId = 'sec-workflows';

                return (
                  <div key={i} id={sectionId} className="scroll-mt-24">
                    {/* Add visual section anchors */}
                    {sectionId && (
                      <h3 className="text-base font-bold text-foreground uppercase tracking-wider font-mono mt-6 mb-2 flex items-center gap-1.5 border-b border-border/50 pb-2">
                        <ChevronRight className="w-3.5 h-3.5 text-accent" />
                        {sectionId === 'sec-summary' && '1. Executive Summary'}
                        {sectionId === 'sec-mandates' && '2. Regulatory Mandates'}
                        {sectionId === 'sec-integration' && '3. Integration Guidelines'}
                        {sectionId === 'sec-workflows' && '4. Compliance Workflows'}
                      </h3>
                    )}
                    <p>{para}</p>
                  </div>
                );
              })}
            </div>

            {/* Key Takeaways Card */}
            <div id="sec-takeaways" className="scroll-mt-24 p-6 rounded-2xl bg-card border border-accent/40 shadow-lg shadow-accent/5 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="w-5 h-5" />
                <h4 className="text-xs font-extrabold uppercase tracking-widest font-mono">Key Takeaways</h4>
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Mandate compliance requires localized PEPPOL PINT structures (PINT AE for UAE, PINT OM for Oman).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Interactive validations reduce development overhead by pre-flight auditing schemas prior to clearing gateway submissions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Continuous integration testbeds help developers map fields with deterministic tax calculations and currency rounding accuracy.</span>
                </li>
              </ul>
            </div>
          </article>

          {/* COLUMN 3: Sticky Table of Contents (Right Sidebar) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 hidden lg:block">
            <div className="space-y-2">
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground">
                Document Navigation
              </span>
              <h4 className="text-xs font-bold text-foreground">Table of Contents</h4>
            </div>

            <div className="space-y-2 font-mono text-[10px] text-muted-foreground">
              {[
                { id: 'sec-summary', label: '1. Executive Summary' },
                { id: 'sec-mandates', label: '2. Regulatory Mandates' },
                { id: 'sec-integration', label: '3. Integration Guidelines' },
                { id: 'sec-workflows', label: '4. Compliance Workflows' },
                { id: 'sec-takeaways', label: '5. Key Takeaways' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className="flex items-center gap-1 hover:text-foreground hover:translate-x-1 transition-all text-left focus:outline-none w-full py-0.5"
                >
                  <ChevronRight className="w-3 h-3 text-accent shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Support info card */}
            <div className="p-4 rounded-xl border border-border bg-muted/10 space-y-3 text-center">
              <span className="text-base">💬</span>
              <h5 className="text-[10px] font-bold">Integration questions?</h5>
              <p className="text-[9px] text-muted-foreground leading-relaxed">
                Connect with our compliance architects to discuss ERP mapping.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center w-full h-7 rounded bg-primary text-primary-foreground hover:bg-primary/95 text-[9px] font-bold transition-all focus:outline-none"
              >
                Schedule Consult
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
