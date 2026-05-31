'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Globe, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex-1 pb-24">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary font-semibold mb-4 block">
              Our Mission
            </span>
            <h1 className="apple-h1 leading-tight">
              Engineering the Future of Middle East Tax Compliance
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            We are a dedicated team of tax technologists, software engineers, and compliance experts building the definitive sandbox for UAE and Oman e-invoicing standards.
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Absolute Precision', text: 'We translate complex legal mandates into deterministic code.' },
            { icon: Globe, title: 'Regional Expertise', text: 'Deeply integrated with FTA and OTA technical specifications.' },
            { icon: Users, title: 'Developer First', text: 'Building tools that software engineering teams actually want to use.' },
            { icon: Building2, title: 'Enterprise Scale', text: 'Designed to handle high-volume compliance for tier-1 enterprises.' }
          ].map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-muted/20 border border-border flex flex-col items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg">{val.title}</h3>
              <p className="text-sm text-muted-foreground">{val.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 pt-12">
        <h2 className="text-3xl font-bold tracking-tight">Ready to test your integration?</h2>
        <p className="text-muted-foreground mb-8">Stop guessing with PDFs. Start testing real XML payloads in our sandbox.</p>
        <Button asChild size="lg">
          <Link href="/dashboard">Access the Platform</Link>
        </Button>
      </section>
    </main>
  );
}
