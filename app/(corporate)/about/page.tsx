'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, Globe, Building2, Calendar, Target, Award, Milestone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function AboutPage() {
  const [activeTimelineTab, setActiveTimelineTab] = useState<'ae' | 'om'>('ae');

  const uaeTimeline = [
    { phase: 'Phase 1', date: 'Q3 2025', title: 'Taxpayer Announcement', desc: 'FTA identifies large taxpayers required to join wave 1 and publishes final PINT AE specifications.' },
    { phase: 'Phase 2', date: 'Q1 2026', title: 'Developer Testing', desc: 'Pre-production validation testing opens for compliance billing vendors and ERP integration consultants.' },
    { phase: 'Phase 3', date: 'Q3 2026', title: 'Mandatory Production Rollout', desc: 'Production e-invoices must be transmitted and cleared by the FTA PEPPOL portal for designated enterprises.' }
  ];

  const omanTimeline = [
    { phase: 'Phase 1', date: 'Q4 2025', title: 'Fawtara Standard Release', desc: 'OTA defines PINT OM requirements and announces tax logic mapping guidelines.' },
    { phase: 'Phase 2', date: 'Q2 2026', title: 'Pilot Integrations', desc: 'ERP developers and pilot taxpayers register endpoint identifiers on the OTA clearing testbed.' },
    { phase: 'Phase 3', date: 'Q4 2026', title: 'Production Go-Live', desc: 'Mandatory clearing and verification of B2B/B2G transactions for phase 1 corporate tax entities.' }
  ];

  const timelineData = activeTimelineTab === 'ae' ? uaeTimeline : omanTimeline;

  return (
    <main className="flex-1 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border bg-muted/5">
        {/* Dynamic ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-[80px] rounded-[100%]" />
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:32px_32px] pointer-events-none mask-image-radial" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6 flex flex-col items-center">
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
            Our Vision
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/60 leading-[1.15]">
            Engineering Middle East <br /> Tax Technology
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We are tax technologists, enterprise architects, and compliance software developers. Our goal is to provide software development teams with public, state-of-the-art tools to integrate, test, and master UAE and Oman e-invoicing mandates.
          </p>
        </div>
      </section>

      {/* Values / Philosophy Section */}
      <section className="py-24 max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Core Engineering Principles</h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            How we translate complex regional legal structures into robust software implementations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: 'Absolute Precision', text: 'Deterministic tax computation and rounding rules configured to official FTA specifications.' },
            { icon: Globe, title: 'Regional Footprint', text: 'Deep structural expertise in PEPPOL PINT AE (UAE) and PINT OM (Oman) schemas.' },
            { icon: Users, title: 'Developer First', text: 'Open-access API specs, schemas, and live sandboxes to avoid PDF document hunting.' },
            { icon: Building2, title: 'Enterprise Sizing', text: 'Highly scalable architecture designed for tier-1 ERP ecosystems and transaction volumes.' }
          ].map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 0.98 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all flex flex-col items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <val.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">{val.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{val.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 border-y border-border/50 bg-muted/5 relative">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Compliance Roadmap Timeline</h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Track the upcoming milestone stages of e-invoicing rollouts. Toggle country to check.
            </p>

            {/* Toggle tabs */}
            <div className="inline-flex p-1 rounded-full border border-border/80 bg-background max-w-xs mx-auto">
              <button
                onClick={() => setActiveTimelineTab('ae')}
                className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none ${
                  activeTimelineTab === 'ae' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                UAE (PINT AE)
              </button>
              <button
                onClick={() => setActiveTimelineTab('om')}
                className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none ${
                  activeTimelineTab === 'om' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Oman (PINT OM)
              </button>
            </div>
          </div>

          {/* Chronological Timeline Track */}
          <div className="relative border-l border-primary/20 pl-8 space-y-12 max-w-2xl mx-auto">
            {timelineData.map((evt, idx) => (
              <motion.div
                key={evt.phase}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Visual node pin */}
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </div>
                
                <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-accent/40 transition-colors flex flex-col md:flex-row gap-4">
                  <div className="md:w-32 shrink-0 space-y-1">
                    <span className="text-[10px] font-bold font-mono text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-0.5 rounded-full block text-center">
                      {evt.phase}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground block text-center mt-1">
                      {evt.date}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{evt.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">{evt.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Why Trust This Platform</h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Middle East e-invoicing is built on standard international PEPPOL structures. We operate on three core commitments:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-border bg-card text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold">100% Up-To-Date</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              We sync technical rules with the official guidelines of the FTA and OTA.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold">Verified Schemas</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Our sandbox validations are backed by schematron logic verified against PEPPOL PINT rules.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto">
              <Milestone className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold">No Register barriers</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              All timelines, mapping guides, and schemas are public and searchable.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 text-xs font-bold h-11 w-full sm:w-auto">
            <Link href="/dashboard">Access Platform</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-xs font-bold h-11 border-border/80 hover:bg-muted/50 w-full sm:w-auto">
            <Link href="/contact">Book Advisory Consult</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
