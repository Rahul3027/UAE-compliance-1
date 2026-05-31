import Link from 'next/link';
import { ShoppingBag, Truck, HeartPulse, Laptop, ArrowRight } from 'lucide-react';

interface IndustryItem {
  slug: string;
  title: string;
  description: string;
  icon: any;
  highlight: string;
}

const industries: IndustryItem[] = [
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    description: 'High-frequency transaction processing, POS terminal integrations, and real-time B2C e-receipt synchronization.',
    icon: ShoppingBag,
    highlight: 'Handles massive volume scaling and POS caching layers.',
  },
  {
    slug: 'logistics-supply-chain',
    title: 'Logistics & Supply Chain',
    description: 'Cross-border transport declarations, multi-currency VAT conversions, and multi-recipient billing routing.',
    icon: Truck,
    highlight: 'Links customs reference fields (SBDH metadata) automatically.',
  },
  {
    slug: 'healthcare-pharma',
    title: 'Healthcare & Pharma',
    description: 'Automatic verification of Zero-Rated pharmaceutical supplies vs. Standard-Rated medical devices.',
    icon: HeartPulse,
    highlight: 'Validates strict local medicine VAT code compliance.',
  },
  {
    slug: 'it-professional-services',
    title: 'IT & Professional Services',
    description: 'Automated recurring SLA subscription billing, milestone invoicing, and service duration records.',
    icon: Laptop,
    highlight: 'Supports customizable project billing and contract parameters.',
  }
];

export default function IndustriesPage() {
  return (
    <main className="flex-1 pb-24">
      {/* Hero Banner */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-sm font-mono uppercase tracking-widest text-primary font-semibold mb-4 block">
            Sector Solutions
          </span>
          <h1 className="apple-h1 leading-tight">
            Industry Compliance Tracks
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-sm">
            E-invoicing guidelines differ across operational sectors. Explore targeted technical blueprints, integration workflows, and validation rules tailored to your industry.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section className="max-w-5xl mx-auto px-6 pt-16">
        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group p-8 rounded-2xl bg-muted/5 border border-border hover:border-primary/50 transition-colors flex flex-col justify-between min-h-[260px]"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{ind.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ind.description}</p>
                  <p className="text-[10px] text-primary/80 font-semibold uppercase tracking-wider font-mono">{ind.highlight}</p>
                </div>
                <div className="pt-4 inline-flex items-center text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  Explore Blueprint <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  );
}
