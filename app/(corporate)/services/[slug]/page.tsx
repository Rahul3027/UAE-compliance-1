import { getServiceBySlug, getServices } from '@/lib/supabase/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const allServices = await getServices();
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <h1 className="apple-h1 leading-tight">
            {service.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Key Deliverables</h2>
          <ul className="space-y-4">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/10 border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground leading-relaxed text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-8 rounded-2xl bg-muted/5 border border-border flex flex-col justify-center text-center space-y-6">
          <h3 className="text-xl font-bold">Need this for your enterprise?</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Contact our integration engineers to discuss timelines, SLAs, and technical requirements.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            Contact Sales
          </Link>
        </div>
      </section>
    </main>
  );
}
