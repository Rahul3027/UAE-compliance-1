'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Menu, X, BookOpen, Network, FileCode, CheckSquare, Layers, HelpCircle, Landmark } from 'lucide-react';
import { useGlobalSearch } from '@/hooks/use-global-search';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';

export function CorporateNav() {
  const { openSearch } = useGlobalSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'learn' | 'resources' | null>(null);

  // Monitor scroll for header background blur transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const learnMenu = [
    { title: 'UAE E-Invoicing (PINT AE)', href: '/uae-overview', desc: 'Federal Tax Authority mandate rules.', icon: Landmark },
    { title: 'Oman E-Invoicing (PINT OM)', href: '/uae-overview?country=om', desc: 'Oman Fawtara roadmap specifications.', icon: Landmark },
    { title: 'PEPPOL 5-Corner Model', href: '/peppol-5-corner', desc: 'Interactive decentralized routing flow.', icon: Network },
    { title: 'Technical Glossary', href: '/glossary-technical-terms', desc: 'Reference definition directory.', icon: BookOpen },
  ];

  const resourcesMenu = [
    { title: 'API Documentation', href: '/documentation', desc: 'UBL schema developer guidelines.', icon: FileCode },
    { title: 'ERP Readiness Auditor', href: '/assessments/erp-readiness', desc: 'Custom database compliance scorecard.', icon: Layers },
    { title: 'Compliance Checklist', href: '/assessments/compliance', desc: 'Validate business tax rules.', icon: CheckSquare },
    { title: 'Compliance Blog', href: '/blog', desc: 'Latest mandate analyses and news.', icon: BookOpen },
    { title: 'Frequently Asked FAQs', href: '/faq', desc: 'Tax and pricing clarifications.', icon: HelpCircle },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-border/80 shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-lg tracking-tight select-none flex items-center gap-2">
            Compliance<span className="text-primary font-black">Intelligence</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/industries" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Industries
            </Link>

            {/* Dropdown 1: Learn */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('learn')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`flex items-center gap-1 text-xs font-semibold transition-colors focus:outline-none ${
                  activeDropdown === 'learn' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Learn <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${activeDropdown === 'learn' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'learn' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 p-4 bg-card border border-border shadow-2xl rounded-2xl grid gap-3 z-50 text-left"
                  >
                    {learnMenu.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link 
                          key={idx} 
                          href={item.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/15 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 2: Resources */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`flex items-center gap-1 text-xs font-semibold transition-colors focus:outline-none ${
                  activeDropdown === 'resources' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Resources <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 p-4 bg-card border border-border shadow-2xl rounded-2xl grid gap-3 z-50 text-left"
                  >
                    {resourcesMenu.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link 
                          key={idx} 
                          href={item.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/15 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search shortcut button */}
            <button 
              onClick={openSearch}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-xs border border-border/60 px-3 py-1.5 rounded-full bg-muted/20 focus:outline-none"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="pointer-events-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[9px] font-medium opacity-80 hidden sm:inline-flex">
                <span className="text-[9px]">Ctrl K</span>
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA button */}
            <Button asChild size="sm" className="rounded-full px-5 text-xs h-9">
              <Link href="/dashboard">Access Platform</Link>
            </Button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bg-background border-b border-border z-45 md:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6 space-y-6 flex flex-col">
              {/* Search button in mobile drawer */}
              <button 
                onClick={() => { setMobileMenuOpen(false); openSearch(); }}
                className="w-full text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-xs border border-border/80 px-4 py-2.5 rounded-xl bg-muted/10 justify-between focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" /> Search platform...
                </span>
                <kbd className="pointer-events-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">Ctrl K</kbd>
              </button>

              <div className="grid grid-cols-2 gap-6">
                {/* Learn list */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">Learn Tracks</h5>
                  <ul className="space-y-2 text-xs">
                    {learnMenu.map((item, idx) => (
                      <li key={idx}>
                        <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors block py-0.5">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources list */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">Tools & Data</h5>
                  <ul className="space-y-2 text-xs">
                    {resourcesMenu.map((item, idx) => (
                      <li key={idx}>
                        <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors block py-0.5">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/40">
                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-xs font-semibold block py-1">Services</Link>
                <Link href="/industries" onClick={() => setMobileMenuOpen(false)} className="text-xs font-semibold block py-1">Industries</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-xs font-semibold block py-1">About Us</Link>
              </div>

              <Button asChild className="w-full rounded-xl text-xs h-10 mt-4" onClick={() => setMobileMenuOpen(false)}>
                <Link href="/dashboard">Access Platform</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for sticky header */}
      <div className="h-16" />
    </>
  );
}
