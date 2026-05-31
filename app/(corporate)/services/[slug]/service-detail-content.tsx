'use client';

import { ServiceItem } from '@/data/cms-content';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Cpu, Layers, ShieldCheck, Landmark, HelpCircle, Activity, Play, Workflow, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceDetailContentProps {
  service: ServiceItem;
}

export function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const [activeTab, setActiveTab] = useState<'retail' | 'logistics' | 'healthcare' | 'it'>('retail');
  const [activeNode, setActiveNode] = useState<number>(0);

  const architectureNodes = [
    { name: '1. ERP Source Data', desc: 'Raw financial databases dispatch invoicing variables (tax codes, line item values, dates).', state: 'INPUT_DISPATCHED' },
    { name: '2. PINT AE Mapper', desc: 'Middleware maps local variables to structured UAE PEPPOL standard tag conventions.', state: 'MAPPING_COMPILED' },
    { name: '3. Schematron validation', desc: 'Local Schematron files execute legal compliance audits (decimal validations, VAT totals).', state: 'VALIDATION_PASSED' },
    { name: '4. AS4 PEPPOL Gateway', desc: 'Fully encrypted AS4 secure protocol dispatches signed UBL XML to receiver network.', state: 'DISPATCH_CLEARED' }
  ];

  const industryDetails = {
    retail: {
      title: 'B2C & B2B Retail & E-Commerce Compliance',
      challenges: 'High transaction frequencies, fractional VAT decimals, POS integration sync.',
      rules: ['POS XML synchronization', 'Simplified Tax Invoice formats', 'QR Code generation for mobile audits']
    },
    logistics: {
      title: 'Logistics & Supply Chain Cargo Clearance',
      challenges: 'Cross-border PEPPOL routing, multiple transport declarations, VAT exemptions.',
      rules: ['Exempted tax category codes', 'Multi-currency conversion tables', 'Corner-3 / Corner-4 endpoint handshake verification']
    },
    healthcare: {
      title: 'Healthcare & Pharmaceutical Bill Clearing',
      challenges: 'Patient record privacy, insurance code conversions, government procurement invoicing.',
      rules: ['Standardized medical product code tables', 'Secure government clearing paths', 'Confidential patient ID hash mappings']
    },
    it: {
      title: 'IT & Professional Service Retainer Bills',
      challenges: 'Progressive milestone invoicing, multi-part retainer receipts, contract reference mappings.',
      rules: ['Purchase Order reference matching', 'Payment terms and bank IBAN mappings', 'Time-sheet verification attachment links']
    }
  };

  const rolloutTimeline = [
    { title: 'Phase 1: Discovery Mapping', desc: 'Our integration engineers analyze your ERP invoice tables and output variables (1-2 weeks).' },
    { title: 'Phase 2: Pre-flight Sandboxing', desc: 'We load mapped JSON structures into our pre-flight simulator to test FTA/OTA Schematron rules (2-3 weeks).' },
    { title: 'Phase 3: Gateway Integration', desc: 'We configure secure endpoints and handshake mechanisms with the Peppol AS4 directory (2 weeks).' },
    { title: 'Phase 4: Handoff & SLAs', desc: 'Go-live coordinates cleared transactions with automated error-recovery listeners and support SLAs (Ongoing).' }
  ];

  return (
    <div className="space-y-24">
      {/* 1. Header Hero section */}
      <section className="relative py-20 overflow-hidden border-b border-border bg-muted/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-20 pointer-events-none bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-[90px] rounded-[100%]" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6 flex flex-col items-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-2 focus:outline-none">
            <ArrowLeft className="w-3.5 h-3.5" /> All Integration Services
          </Link>
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Product Profile
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/60 leading-tight">
            {service.title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      {/* 2. Interactive SVG/CSS Architecture Data Pipeline */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Middleware Architecture Pipeline</h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Click on each processing node of the data architecture pipeline to explore payload compilation steps.
          </p>
        </div>

        {/* Dynamic Interactive Pipeline diagram */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Nodes selection List */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
            {architectureNodes.map((node, idx) => {
              const isActive = activeNode === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveNode(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all focus:outline-none flex items-start gap-4 ${
                    isActive
                      ? 'border-accent bg-accent/5 ring-1 ring-accent'
                      : 'border-border bg-card/65 hover:bg-muted/15 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isActive ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-tight text-foreground">{node.name}</h4>
                    <p className="text-[10.5px] text-muted-foreground mt-1 leading-normal line-clamp-1">{node.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Graphical Pipeline Monitor Console */}
          <div className="lg:col-span-7 bg-[#0d1117] border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />
            <div className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full">
                  Node Monitor Console
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  STATUS: {architectureNodes[activeNode].state}
                </span>
              </div>
              <h4 className="font-bold text-base text-white">{architectureNodes[activeNode].name}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{architectureNodes[activeNode].desc}</p>
            </div>

            {/* Graphic visual node steps flow */}
            <div className="pt-6 border-t border-border/40 mt-8 relative z-10">
              <div className="flex items-center justify-between gap-2 max-w-md mx-auto font-mono text-[9px] text-muted-foreground">
                {architectureNodes.map((n, i) => (
                  <div key={i} className="flex items-center gap-1.5 shrink-0">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[8px] font-bold ${
                      i <= activeNode ? 'border-accent bg-accent text-white' : 'border-border/80 text-muted-foreground'
                    }`}>
                      {i + 1}
                    </div>
                    <span className={i === activeNode ? 'text-accent font-bold' : ''}>{n.name.split('. ')[1].split(' ')[0]}</span>
                    {i < 3 && <ChevronRight className="w-2.5 h-2.5 text-muted-foreground/45" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Deliverables Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-y border-border/50 bg-muted/5 relative">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Key Service Deliverables</h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Every integration includes complete architectural handoffs, Schematron validations, and compliance audits.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {service.features.map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border/60 hover:border-accent/40 transition-colors flex items-start gap-4 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">{feature}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Fully automated mapping verified against EN 16931 rules, supporting zero-downtime compliance rollout.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industry Specific Tabs */}
      <section className="max-w-5xl mx-auto px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Industry Specific Blueprints</h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Choose your corporate sector to check target compliance variables.
          </p>
        </div>

        {/* Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto border-b border-border/50 pb-2 scrollbar-none justify-start md:justify-center">
          {[
            { id: 'retail', name: 'Retail / POS' },
            { id: 'logistics', name: 'Logistics' },
            { id: 'healthcare', name: 'Healthcare' },
            { id: 'it', name: 'IT Services' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all focus:outline-none shrink-0 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                {industryDetails[activeTab].title}
              </h3>
              <p className="text-xs text-muted-foreground">
                <strong>Primary Challenges:</strong> {industryDetails[activeTab].challenges}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border/40">
              {industryDetails[activeTab].rules.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/60 bg-muted/15 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-[11px] text-muted-foreground leading-normal">{rule}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 5. Chronological Delivery roadmap */}
      <section className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">The Integration Delivery Roadmap</h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Our step-by-step compliance rollout ensures a smooth transition to live PEPPOL clearing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {rolloutTimeline.map((item, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center text-accent font-bold font-mono text-xs">
                  {idx + 1}
                </div>
                <div className="h-px bg-border/80 flex-1 hidden sm:block" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground leading-tight">{item.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA booking Sales card */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-8 py-12 relative z-10">
        <div className="p-8 md:p-10 rounded-3xl border border-border bg-card/65 shadow-xl flex flex-col justify-center items-center text-center space-y-6 backdrop-blur-md">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <Workflow className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold">Need this integration for your enterprise?</h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-lg">
            Contact our e-invoicing solutions engineers to discuss deployment schedules, SLAs, and localized database mapping requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-full px-8 text-xs font-bold h-11 bg-accent hover:bg-accent/90 text-white w-full sm:w-auto">
              <Link href="/contact">
                Contact Technical Sales <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-xs font-bold h-11 border-border/80 hover:bg-muted/50 w-full sm:w-auto">
              <Link href="/dashboard">Access Technical Sandbox</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
