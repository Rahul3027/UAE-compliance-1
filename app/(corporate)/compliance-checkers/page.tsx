import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function ComplianceCheckersPage() {
  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="apple-h1 leading-tight">
            Compliance Checkers
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Run automated diagnostics against your generated PEPPOL XML files.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/validation-engine-simulator" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:border-green-500/50 transition-colors flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors">UBL Schema Validator</h3>
              <p className="text-sm text-muted-foreground">Upload or paste XML to check against EN 16931 CIUS rules.</p>
            </div>
            <div className="inline-flex items-center text-sm font-medium">
              Run Check <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
          
          <Link href="/error-rejection-simulator" className="group p-8 rounded-2xl bg-muted/5 border border-border hover:border-red-500/50 transition-colors flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">Error Rejection Simulator</h3>
              <p className="text-sm text-muted-foreground">Trigger deliberate API rejections to test your ERP's fallback handling.</p>
            </div>
            <div className="inline-flex items-center text-sm font-medium">
              Run Check <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
