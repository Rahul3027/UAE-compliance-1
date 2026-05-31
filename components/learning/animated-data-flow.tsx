'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Server, Building2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  { id: 1, label: 'Corner 1: Supplier ERP', icon: Building2 },
  { id: 2, label: 'Corner 2: Access Point', icon: Server },
  { id: 3, label: 'Corner 3: Access Point', icon: Server },
  { id: 4, label: 'Corner 4: Buyer ERP', icon: Building2 },
  { id: 5, label: 'Corner 5: Tax Authority', icon: Building2, highlight: true },
];

export function AnimatedDataFlow({ isOman = false }: { isOman?: boolean }) {
  const [activeStep, setActiveStep] = useState(1);

  // Auto-play the animation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="w-full bg-zinc-950/50 border-zinc-800 p-8 overflow-hidden relative">
      <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        LIVE SIMULATION
      </div>
      
      <div className="relative mt-8 max-w-4xl mx-auto h-[400px]">
        {/* Draw the Path lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {/* C1 to C2 */}
          <path d="M 100 150 L 300 150" stroke="#333" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          {/* C2 to C3 */}
          <path d="M 300 150 L 500 150" stroke="#333" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          {/* C3 to C4 */}
          <path d="M 500 150 L 700 150" stroke="#333" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          {/* C2 & C3 to C5 (Tax Authority) - Only for UAE/Oman specific clearance/reporting models */}
          <path d="M 300 150 Q 400 300 400 320" stroke="#333" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          <path d="M 500 150 Q 400 300 400 320" stroke="#333" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        </svg>

        {/* Nodes */}
        <Node x={100} y={150} step={steps[0]} active={activeStep >= 1} />
        <Node x={300} y={150} step={steps[1]} active={activeStep >= 2} />
        <Node x={500} y={150} step={steps[2]} active={activeStep >= 3} />
        <Node x={700} y={150} step={steps[3]} active={activeStep >= 4} />
        <Node x={400} y={320} step={steps[4]} active={activeStep >= 2} authority={isOman ? 'OTA' : 'FTA'} />

        {/* Moving Document C1 -> C2 */}
        {activeStep === 1 && <MovingDoc startX={100} startY={150} endX={300} endY={150} />}
        {/* Moving Document C2 -> C3 & C5 */}
        {activeStep === 2 && (
          <>
            <MovingDoc startX={300} startY={150} endX={500} endY={150} />
            <MovingDoc startX={300} startY={150} endX={400} endY={320} label="Clearance API" />
          </>
        )}
        {/* Moving Document C3 -> C4 */}
        {activeStep === 3 && <MovingDoc startX={500} startY={150} endX={700} endY={150} />}
      </div>
      
      <div className="mt-8 text-center max-w-2xl mx-auto">
        <h4 className="text-lg font-semibold mb-2">
          {activeStep === 1 && "Step 1: Supplier ERP generates e-Invoice"}
          {activeStep === 2 && `Step 2: Access Point validates & clears with ${isOman ? 'OTA' : 'FTA'}`}
          {activeStep === 3 && "Step 3: Document routed across PEPPOL Network"}
          {activeStep === 4 && "Step 4: Buyer Access Point receives payload"}
          {activeStep === 5 && "Step 5: Buyer ERP imports data automatically"}
        </h4>
        <p className="text-sm text-muted-foreground">
          The 5-Corner model ensures tax authorities have real-time visibility into transactions while maintaining decentralized B2B document exchange.
        </p>
      </div>
    </Card>
  );
}

function Node({ x, y, step, active, authority }: { x: number, y: number, step: any, active: boolean, authority?: string }) {
  const Icon = step.icon;
  return (
    <motion.div 
      className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y, zIndex: 10 }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: active ? 1.1 : 1, opacity: active ? 1 : 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 shadow-xl ${
        step.highlight ? 'bg-primary/10 border-primary text-primary' : 
        active ? 'bg-zinc-800 border-zinc-500 text-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-600'
      }`}>
        <Icon className="w-8 h-8" />
      </div>
      <div className="mt-3 text-xs font-semibold text-center whitespace-nowrap">
        {step.label}
        {authority && <span className="block text-primary">{authority}</span>}
      </div>
    </motion.div>
  );
}

function MovingDoc({ startX, startY, endX, endY, label }: { startX: number, startY: number, endX: number, endY: number, label?: string }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
      initial={{ left: startX, top: startY, opacity: 0, scale: 0.5 }}
      animate={{ left: endX, top: endY, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
      style={{ zIndex: 20 }}
    >
      <div className="bg-accent text-accent-foreground p-1.5 rounded shadow-lg shadow-accent/20">
        <FileText className="w-4 h-4" />
      </div>
      {label && <span className="absolute top-8 text-[10px] font-mono text-accent whitespace-nowrap bg-background/80 px-1 rounded">{label}</span>}
    </motion.div>
  );
}
