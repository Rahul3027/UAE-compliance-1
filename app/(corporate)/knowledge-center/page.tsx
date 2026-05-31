import Link from 'next/link';
import { BookOpen, FileCode, Scale } from 'lucide-react';

export default function KnowledgeCenterPage() {
  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-sm font-mono uppercase tracking-widest text-primary font-semibold mb-4 block">
            Resources
          </span>
          <h1 className="apple-h1 leading-tight">
            Knowledge Center
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Everything you need to successfully integrate and deploy your e-invoicing solution.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pt-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/documentation" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:bg-muted/10 hover:border-primary/50 transition-colors flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">API Documentation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Technical specifications for our validation engine and sandbox APIs.</p>
          </Link>
          
          <Link href="/regulatory-updates" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:bg-muted/10 hover:border-primary/50 transition-colors flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Regulatory Updates</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Timeline and details for FTA Phase 1/2 and OTA mandates.</p>
          </Link>
          
          <Link href="/blog" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:bg-muted/10 hover:border-primary/50 transition-colors flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Compliance Blog</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Deep dives into PINT AE vs PINT OM business rules.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
