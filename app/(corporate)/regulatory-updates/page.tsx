import { getRegulatoryUpdates } from '@/lib/supabase/db';
import { RegulatoryTabs } from './regulatory-tabs';

export const revalidate = 60; // Revalidate every minute

export default async function RegulatoryUpdatesPage() {
  const uaeUpdates = await getRegulatoryUpdates('ae');
  const omanUpdates = await getRegulatoryUpdates('om');

  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-mono font-bold mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Verified Source: FTA & OTA Official Publications (Last Updated: May 2026)
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-4 block">
            Mandate Timeline
          </span>
          <h1 className="apple-h1 leading-tight">
            Regulatory Updates
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Chronological compliance schedules, technical specifications, and key rollout phases dictated by the UAE Federal Tax Authority (FTA) and Oman Tax Authority (OTA).
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-16">
        <RegulatoryTabs uaeUpdates={uaeUpdates} omanUpdates={omanUpdates} />
      </section>
    </main>
  );
}
