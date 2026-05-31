import { getServices } from '@/lib/supabase/db';
import { ArrowRight, Layers, ShieldCheck, CheckCircle2, Cpu } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every minute

const iconMap: Record<string, any> = {
  Layers: Layers,
  ShieldCheck: ShieldCheck,
  CheckCircle2: CheckCircle2,
  Cpu: Cpu
};

export default async function ServicesPage() {
  const servicesData = await getServices();

  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-sm font-mono uppercase tracking-widest text-primary font-semibold mb-4 block">
            Enterprise Offerings
          </span>
          <h1 className="apple-h1 leading-tight">
            Comprehensive Tax Technology Solutions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            From API integration middleware to pre-production schema validation, we offer end-to-end tooling for standardizing your e-invoicing pipelines.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pt-16">
        <div className="grid md:grid-cols-2 gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Layers;
            return (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group p-8 rounded-2xl bg-muted/5 border border-border hover:bg-muted/10 transition-colors flex flex-col gap-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    View Details <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  );
}
