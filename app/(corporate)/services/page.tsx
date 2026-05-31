import { getServices } from '@/lib/supabase/db';
import { ServicesList } from './services-list';
import { Cpu } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function ServicesPage() {
  const servicesData = await getServices();

  return (
    <main className="flex-1 pb-24 overflow-hidden">
      {/* Premium Hero Header Section */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-border bg-muted/5">
        {/* Dynamic ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-[80px] rounded-[100%]" />
        </div>
        
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:32px_32px] pointer-events-none mask-image-radial" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-2">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
            Integration Toolsets
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/60 leading-tight">
            Comprehensive Tax Technology Solutions
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            From API integration middleware to pre-production schema validation, we offer end-to-end tooling for standardizing your e-invoicing pipelines.
          </p>
        </div>
      </section>

      {/* Services list area */}
      <section className="max-w-5xl mx-auto px-6 pt-16 relative z-10">
        <ServicesList services={servicesData} />
      </section>
    </main>
  );
}
