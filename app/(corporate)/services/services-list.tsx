'use client';

import { ServiceItem } from '@/data/cms-content';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers, ShieldCheck, CheckCircle2, Cpu, Database, Network, Send, Landmark, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface ServicesListProps {
  services: ServiceItem[];
}

const iconMap: Record<string, any> = {
  Layers: Layers,
  ShieldCheck: ShieldCheck,
  CheckCircle2: CheckCircle2,
  Cpu: Cpu
};

export function ServicesList({ services }: ServicesListProps) {
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  const pipelineSteps = [
    {
      icon: Database,
      title: '1. Schema Mapping',
      desc: 'Connects your native ERP billing databases to PEPPOL structures. Converts Oracle/SAP output columns to clean, standardized JSON objects.',
      payload: `{
  "invoiceNumber": "INV-2026-004",
  "issueDate": "2026-05-31",
  "taxExclusiveAmount": 1500.00
}`
    },
    {
      icon: ShieldCheck,
      title: '2. Tax Computation',
      desc: 'Executes localized VAT validations (5% standard rate, zero-rated, exempt checks) and checks decimal-rounding rules specific to FTA/OTA rules.',
      payload: `{
  "taxExclusiveAmount": 1500.00,
  "taxCategory": "S",
  "calculatedTax": 75.00
}`
    },
    {
      icon: Network,
      title: '3. Schematron Validation',
      desc: 'Performs pre-flight validation against official national Schematrons (UAE PINT AE / Oman PINT OM) to ensure zero data anomalies exist.',
      payload: `<cbc:TaxAmount currencyID="AED">75.00</cbc:TaxAmount>
<!-- SCHEMATRON CHECK: PASS -->
<!-- PINT RULES CLEARANCE: OK -->`
    },
    {
      icon: Send,
      title: '4. Corner-4 Routing',
      desc: 'Resolves recipient endpoints and transmits cleared UBL invoices directly to the customer gateway via secure AS4 PEPPOL protocols.',
      payload: `STATUS: CLEARED (200 OK)
ENDPOINT: peppol-c4-ae-1002
TRANSMISSION_HASH: sha256:7f08cd...`
    }
  ];

  return (
    <div className="space-y-24">
      {/* 1. Bento Services Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service) => {
          const IconComponent = iconMap[service.icon] || Layers;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 0.98 }}
              className="group relative rounded-3xl border border-border bg-card/55 hover:border-primary/50 transition-all flex flex-col justify-between overflow-hidden shadow-sm"
            >
              {/* Decorative radial blur background */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

              <Link href={`/services/${service.slug}`} className="p-8 md:p-10 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-3">
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-border/40">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-8 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Product Details</span>
                  <span className="inline-flex items-center text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    Explore Capabilities <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 2. Interactive Peppol Transaction Flow Widget */}
      <section className="p-6 md:p-8 rounded-3xl border border-border bg-muted/10 space-y-8 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
            Pipeline Explorer
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">The UBL Invoice Generation Lifecycle</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            See how raw ERP database tables are dynamic converted and transmitted as secure, cleared Peppol UBL XML payloads.
          </p>
        </div>

        {/* Step Picker Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pipelineSteps.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = activePipelineStep === i;
            return (
              <button
                key={i}
                onClick={() => setActivePipelineStep(i)}
                className={`p-4 rounded-2xl border text-left transition-all focus:outline-none flex items-center gap-3 ${
                  isActive
                    ? 'border-accent bg-accent/5 ring-1 ring-accent'
                    : 'border-border bg-background hover:bg-muted/15 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  <StepIcon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">{step.title.split('. ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel */}
        <div className="grid md:grid-cols-12 gap-8 items-center bg-card border border-border/80 rounded-2xl p-6 relative z-10">
          <div className="md:col-span-7 space-y-4">
            <h4 className="font-bold text-base text-foreground">
              {pipelineSteps[activePipelineStep].title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {pipelineSteps[activePipelineStep].desc}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/50">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>ACTIVE COMPILER NODE: ONLINE</span>
            </div>
          </div>

          {/* Simulated Code Panel */}
          <div className="md:col-span-5 h-44 rounded-xl bg-[#0d1117] border border-border/60 p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary" />
            <pre className="text-[10px] text-green-400 font-mono overflow-y-auto leading-normal whitespace-pre-wrap select-all">
              {pipelineSteps[activePipelineStep].payload}
            </pre>
            <div className="text-[8px] text-muted-foreground font-mono text-right mt-2 border-t border-border/40 pt-1">
              INPUT STATE: VALID
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
