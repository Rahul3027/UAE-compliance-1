'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedBadge } from '@/components/ui/animated-badge';
import { HeroCodePreview } from '@/components/ui/hero-code-preview';
import { BentoGrid } from '@/components/ui/bento-grid';

export default function LandingPage() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Deep dynamic lighting (Linear style) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-[100px] rounded-[100%]" />
        </div>
        
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none mask-image-radial" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-8 flex flex-col items-center">
          <AnimatedBadge text="UAE PINT AE & Oman PINT OM Supported" />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight max-w-5xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50 leading-[1.1]"
          >
            Engineering <br className="hidden md:block" /> Middle East Compliance.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            The enterprise-grade infrastructure for navigating the Federal Tax Authority (FTA) and Oman Tax Authority (OTA) PEPPOL 5-Corner frameworks.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="w-full sm:w-auto text-base h-12 px-8 rounded-full">
              <Link href="/dashboard">
                Start Building <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8 rounded-full border-border/50 hover:bg-muted/50">
              <Link href="/documentation">
                <Terminal className="mr-2 w-4 h-4 text-muted-foreground" />
                Read the Docs
              </Link>
            </Button>
          </motion.div>

          <HeroCodePreview />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border/50 bg-muted/10 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
            Trusted by Enterprise Architecture Teams
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Using text blocks as simulated logos */}
            <span className="text-xl font-black font-sans tracking-tighter">ORACLE</span>
            <span className="text-xl font-black font-sans tracking-tighter">SAP</span>
            <span className="text-xl font-bold font-serif italic">Microsoft Dynamics</span>
            <span className="text-xl font-bold font-mono">NETSUITE</span>
            <span className="text-xl font-bold font-sans">SAGE</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <BentoGrid />
      
    </main>
  );
}
