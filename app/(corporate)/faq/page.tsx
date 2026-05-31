import { getFaqs } from '@/lib/supabase/db';
import { FAQList } from './faq-list';
import { MessageCircleQuestion } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function FAQPage() {
  const faqsData = await getFaqs();

  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h1 className="apple-h1 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about the UAE FTA and Oman OTA PEPPOL mandates, and how our sandbox helps you prepare.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-16">
        <FAQList faqs={faqsData} />
      </section>
    </main>
  );
}
