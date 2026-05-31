'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Layers, ArrowRight, ShieldCheck, Zap, Code2, Workflow } from 'lucide-react';
import Link from 'next/link';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  children?: ReactNode;
  delay?: number;
  href?: string;
}

function BentoCard({ title, description, icon: Icon, className = "", children, delay = 0, href }: BentoCardProps) {
  const content = (
    <>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        {href && (
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-foreground" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
      {children && <div className="mt-6 pt-6 border-t border-border/50">{children}</div>}
    </>
  );

  const wrapperClass = `group relative p-8 rounded-3xl bg-background border border-border overflow-hidden hover:border-primary/50 transition-colors flex flex-col ${className}`;

  if (href) {
    return (
      <Link href={href} className="block w-full h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay }}
          whileHover={{ scale: 0.98 }}
          className={wrapperClass}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={wrapperClass}
    >
      {content}
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 py-24">
      {/* Large Featured Card */}
      <BentoCard
        title="Interactive UBL Sandbox"
        description="Stop fighting with manual XML creation. Dynamically generate, validate, and preview compliant XML payloads for UAE PINT AE and Oman PINT OM specifications based on real business transaction data."
        icon={Layers}
        className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-background to-muted/20"
        delay={0.1}
        href="/sandbox-testing-center"
      >
        <div className="h-40 rounded-xl bg-[#0d1117] border border-border/50 p-4 relative overflow-hidden group-hover:border-primary/30 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
          <pre className="text-[10px] text-green-400 font-mono opacity-70">
            {`> Validating payload...
> Checking EN 16931 rules...
> Verifying UAE specific BR...
[SUCCESS] Payload is 100% compliant.
[XML_GENERATED] ae-invoice-102.xml`}
          </pre>
        </div>
      </BentoCard>

      {/* Standard Cards */}
      <BentoCard
        title="Live 5-Corner Model"
        description="Visualize the exact data flow of decentralized PEPPOL networks integrating in real-time."
        icon={Workflow}
        delay={0.2}
        href="/peppol-5-corner"
      />
      
      <BentoCard
        title="Validation Engine"
        description="Pre-flight your schemas against official tax authority rules before pushing to production."
        icon={ShieldCheck}
        delay={0.3}
        href="/validation-engine-simulator"
      />

      {/* Wide Bottom Card */}
      <BentoCard
        title="Developer API & Logic"
        description="Deep dive into the architecture of PINT AE. Understand how the middleware maps generic JSON to highly localized tax logic and rounding rules."
        icon={Code2}
        className="md:col-span-3 bg-muted/10"
        delay={0.4}
        href="/pint-ae-architecture"
      >
         <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-background border border-border">
              <Zap className="w-5 h-5 text-accent mb-2" />
              <p className="text-sm font-medium">Real-time Validation</p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-border">
              <ShieldCheck className="w-5 h-5 text-green-500 mb-2" />
              <p className="text-sm font-medium">Enterprise Security</p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-border">
              <Layers className="w-5 h-5 text-blue-500 mb-2" />
              <p className="text-sm font-medium">Zero-downtime Rollout</p>
            </div>
         </div>
      </BentoCard>
    </div>
  );
}
