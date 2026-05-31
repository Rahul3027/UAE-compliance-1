import { getFaqs } from '@/lib/supabase/db';
import { FAQList } from './faq-list';
import { HelpCircle } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function FAQPage() {
  const faqsData = await getFaqs();

  return (
    <main className="flex-1 pb-24 overflow-hidden">
      {/* Premium Hero Header Section */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-border/60 bg-muted/5">
        {/* Dynamic ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-[80px] rounded-[100%]" />
        </div>
        
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:32px_32px] pointer-events-none mask-image-radial" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-2">
            <HelpCircle className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
            Knowledge Directory
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/60 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about the UAE FTA and Oman OTA PEPPOL mandates, technical schemas, and how our sandbox helps you prepare.
          </p>
        </div>
      </section>

      {/* Main FAQ list */}
      <section className="max-w-3xl mx-auto px-6 pt-16 relative z-10">
        <FAQList faqs={faqsData} />
      </section>
    </main>
  );
}
