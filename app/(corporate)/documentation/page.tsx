export default function DocumentationPage() {
  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-sm font-mono uppercase tracking-widest text-primary font-semibold mb-4 block">
            Developer Docs
          </span>
          <h1 className="apple-h1 leading-tight">
            Platform API Reference
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Integrate the Compliance Intelligence engine directly into your CI/CD pipeline or ERP middleware.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-16 flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-64 shrink-0 space-y-2 font-medium">
          <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-md">Authentication</div>
          <div className="px-3 py-1.5 text-muted-foreground hover:text-foreground cursor-pointer">Generate XML</div>
          <div className="px-3 py-1.5 text-muted-foreground hover:text-foreground cursor-pointer">Validate UBL</div>
          <div className="px-3 py-1.5 text-muted-foreground hover:text-foreground cursor-pointer">Error Codes</div>
        </div>
        
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Authentication</h2>
            <p className="text-muted-foreground">Authenticate your API requests using Bearer tokens.</p>
            
            <div className="bg-[#0d1117] border border-border/50 rounded-lg p-4 font-mono text-sm overflow-x-auto text-green-300">
              curl -X POST https://api.compliance.intelligence/v1/validate \<br/>
              &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br/>
              &nbsp;&nbsp;-H "Content-Type: application/xml" \<br/>
              &nbsp;&nbsp;-d @invoice.xml
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
