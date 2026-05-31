import Link from 'next/link';
import { Settings2, ArrowRight } from 'lucide-react';

export default function ToolsPage() {
  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Settings2 className="w-8 h-8" />
          </div>
          <h1 className="apple-h1 leading-tight">
            Developer Tools
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Test, validate, and simulate your e-invoicing pipelines using our suite of interactive compliance tools.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/sandbox-testing-center" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:bg-muted/10 transition-colors flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Interactive UBL Sandbox</h3>
              <p className="text-sm text-muted-foreground">Dynamically generate XML payloads.</p>
            </div>
            <div className="inline-flex items-center text-sm font-medium">
              Launch Tool <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
          
          <Link href="/validation-engine-simulator" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:bg-muted/10 transition-colors flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Validation Engine Simulator</h3>
              <p className="text-sm text-muted-foreground">Test payloads against FTA Business Rules.</p>
            </div>
            <div className="inline-flex items-center text-sm font-medium">
              Launch Tool <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
          
          <Link href="/peppol-5-corner" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:bg-muted/10 transition-colors flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">5-Corner Live Simulation</h3>
              <p className="text-sm text-muted-foreground">Visualize decentralized network data flow.</p>
            </div>
            <div className="inline-flex items-center text-sm font-medium">
              Launch Tool <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
          
          <Link href="/business-rules-explorer" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:bg-muted/10 transition-colors flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Business Rules Explorer</h3>
              <p className="text-sm text-muted-foreground">Browse all EN 16931 CIUS rules.</p>
            </div>
            <div className="inline-flex items-center text-sm font-medium">
              Launch Tool <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
