'use client';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronRight, ChevronLeft, Database, Server, Building2, Users } from 'lucide-react';

interface ModelStep {
  id: number;
  title: string;
  from: string;
  to: string;
  desc: string;
  dataPayload: string;
}

const steps: ModelStep[] = [
  {
    id: 1,
    title: '1. C1 (Seller) ➔ C2 (Sender AP)',
    from: 'C1',
    to: 'C2',
    desc: 'The seller\'s ERP system (C1) generates the transaction details and transmits them to their Access Point (C2).',
    dataPayload: 'POST /api/v1/invoices { docType: 380, total: 3150.00 AED, supplierTrn: "100234567800003" }'
  },
  {
    id: 2,
    title: '2. C2 (Sender AP) ➔ C3 (Receiver AP)',
    from: 'C2',
    to: 'C3',
    desc: 'The Sender Access Point (C2) validates the document schema and immediately dispatches the invoice across the PEPPOL network to the Buyer\'s Access Point (C3) using secure AS4 protocol.',
    dataPayload: 'PEPPOL AS4 Transmission. Payload: Signed UBL XML Invoice Document.'
  },
  {
    id: 3,
    title: '3. C2 (Sender AP) ➔ C5 (FTA Outbound Report)',
    from: 'C2',
    to: 'C5',
    desc: 'In parallel with the C2-to-C3 delivery, the Sender AP (C2) extracts the mandatory Tax Data Document (TDD) metadata and transmits it to the Federal Tax Authority (C5) for real-time outbound transaction tracking.',
    dataPayload: 'PEPPOL CTC TDD Report: { supplierTrn: "100234567800003", taxAmount: 150.00, hash: "0ef8291ba..." }'
  },
  {
    id: 4,
    title: '4. C3 (Receiver AP) ➔ C4 (Buyer ERP)',
    from: 'C3',
    to: 'C4',
    desc: 'C3 receives the inbound AS4 invoice package and routes the structured UBL XML directly into the buyer\'s ERP (C4) for automated ledger booking and three-way matching.',
    dataPayload: 'XML Ingested. Matching with PO-2026-9011. Response status set to RECEIVED.'
  },
  {
    id: 5,
    title: '5. C3 (Receiver AP) ➔ C5 (FTA Inbound Report)',
    from: 'C3',
    to: 'C5',
    desc: 'In parallel with the C3-to-C4 delivery, the Buyer Access Point (C3) transmits the corresponding inbound Tax Data Document (TDD) status report to the Federal Tax Authority (C5), confirming receipt compliance.',
    dataPayload: 'PEPPOL CTC TDD Status: { recipientTrn: "100876543200003", status: "RECEIVED", parentHash: "0ef8291ba..." }'
  }
];

export function CornerModel() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-playing steps loop
  useEffect(() => {
    if (isPlaying) {
      playTimer.current = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
      }, 5000);
    } else {
      if (playTimer.current) clearInterval(playTimer.current);
    }
    return () => {
      if (playTimer.current) clearInterval(playTimer.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
    setIsPlaying(false);
  };

  const currentStep = steps[activeStep];

  // Helper to determine path animation states
  const getPathStatus = (from: string, to: string) => {
    if (currentStep.from === from && currentStep.to === to) return 'active';
    return 'inactive';
  };

  return (
    <div className="apple-panel p-6 space-y-6 relative overflow-hidden transition-all duration-300">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
            Visual workflow simulator
          </span>
          <h3 className="apple-h3 text-base">UAE PEPPOL 5-Corner Routing Model</h3>
        </div>
      </div>

      {/* Visual Canvas using a scalable SVG viewBox */}
      <div className="relative w-full bg-panelLight/10 border border-borderLight rounded-xl p-4 overflow-hidden">
        <svg 
          viewBox="0 0 800 240" 
          className="w-full h-auto max-w-full text-textPrimary"
        >
          {/* Connection Lines (Drawn behind the nodes) */}
          {/* C1 -> C2 */}
          <path
            d="M 100 42 L 270 42"
            stroke={getPathStatus('C1', 'C2') === 'active' ? '#dcb24c' : 'var(--border-light)'}
            strokeWidth="2"
            fill="none"
            className="transition-colors duration-300"
          />
          {getPathStatus('C1', 'C2') === 'active' && (
            <circle r="4" fill="#dcb24c">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 100 42 L 270 42" />
            </circle>
          )}

          {/* C2 -> C5 */}
          <path
            d="M 270 42 Q 320 100 400 152"
            stroke={getPathStatus('C2', 'C5') === 'active' ? '#dcb24c' : 'var(--border-light)'}
            strokeWidth="2"
            fill="none"
            className="transition-colors duration-300"
          />
          {getPathStatus('C2', 'C5') === 'active' && (
            <circle r="4" fill="#dcb24c">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 270 42 Q 320 100 400 152" />
            </circle>
          )}

          {/* C2 -> C3 */}
          <path
            d="M 270 42 L 530 42"
            stroke={getPathStatus('C2', 'C3') === 'active' ? '#dcb24c' : 'var(--border-light)'}
            strokeWidth="2"
            fill="none"
            className="transition-colors duration-300"
          />
          {getPathStatus('C2', 'C3') === 'active' && (
            <circle r="4" fill="#dcb24c">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 270 42 L 530 42" />
            </circle>
          )}

          {/* C3 -> C4 */}
          <path
            d="M 530 42 L 700 42"
            stroke={getPathStatus('C3', 'C4') === 'active' ? '#dcb24c' : 'var(--border-light)'}
            strokeWidth="2"
            fill="none"
            className="transition-colors duration-300"
          />
          {getPathStatus('C3', 'C4') === 'active' && (
            <circle r="4" fill="#dcb24c">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 530 42 L 700 42" />
            </circle>
          )}

          {/* C3 -> C5 */}
          <path
            d="M 530 42 Q 480 100 400 152"
            stroke={getPathStatus('C3', 'C5') === 'active' ? '#dcb24c' : 'var(--border-light)'}
            strokeWidth="2"
            fill="none"
            className="transition-colors duration-300"
          />
          {getPathStatus('C3', 'C5') === 'active' && (
            <circle r="4" fill="#dcb24c">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 530 42 Q 480 100 400 152" />
            </circle>
          )}

          {/* C1 Node (Seller) */}
          <foreignObject x="40" y="20" width="120" height="100">
            <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              currentStep.from === 'C1' ? 'scale-105' : 'opacity-70'
            }`}>
              <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center bg-panel transition-all ${
                currentStep.from === 'C1' ? 'border-accent text-accent shadow-[0_0_10px_rgba(220,178,76,0.15)]' : 'border-borderLight text-textSecondary'
              }`}>
                <Database className="w-5 h-5" />
              </div>
              <div className="text-center font-sans">
                <p className="text-[10px] font-bold text-textPrimary">C1</p>
                <p className="text-[8px] text-textSecondary font-mono uppercase">Seller ERP</p>
              </div>
            </div>
          </foreignObject>

          {/* C2 Node (Sender AP) */}
          <foreignObject x="210" y="20" width="120" height="100">
            <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              currentStep.from === 'C2' || currentStep.to === 'C2' ? 'scale-105' : 'opacity-70'
            }`}>
              <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center bg-panel transition-all ${
                (currentStep.from === 'C2' || currentStep.to === 'C2') ? 'border-accent text-accent shadow-[0_0_10px_rgba(220,178,76,0.15)]' : 'border-borderLight text-textSecondary'
              }`}>
                <Server className="w-5 h-5" />
              </div>
              <div className="text-center font-sans">
                <p className="text-[10px] font-bold text-textPrimary">C2</p>
                <p className="text-[8px] text-textSecondary font-mono uppercase">Sender AP</p>
              </div>
            </div>
          </foreignObject>

          {/* C5 Node (FTA Authority) */}
          <foreignObject x="340" y="130" width="120" height="100">
            <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              currentStep.from === 'C5' || currentStep.to === 'C5' ? 'scale-105' : 'opacity-70'
            }`}>
              <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center bg-panel transition-all ${
                (currentStep.from === 'C5' || currentStep.to === 'C5') ? 'border-accent text-accent shadow-[0_0_10px_rgba(220,178,76,0.15)]' : 'border-borderLight text-textSecondary'
              }`}>
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-center font-sans">
                <p className="text-[10px] font-bold text-textPrimary">C5</p>
                <p className="text-[8px] text-textSecondary font-mono uppercase">FTA Authority</p>
              </div>
            </div>
          </foreignObject>

          {/* C3 Node (Receiver AP) */}
          <foreignObject x="470" y="20" width="120" height="100">
            <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              currentStep.from === 'C3' || currentStep.to === 'C3' ? 'scale-105' : 'opacity-70'
            }`}>
              <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center bg-panel transition-all ${
                (currentStep.from === 'C3' || currentStep.to === 'C3') ? 'border-accent text-accent shadow-[0_0_10px_rgba(220,178,76,0.15)]' : 'border-borderLight text-textSecondary'
              }`}>
                <Server className="w-5 h-5" />
              </div>
              <div className="text-center font-sans">
                <p className="text-[10px] font-bold text-textPrimary">C3</p>
                <p className="text-[8px] text-textSecondary font-mono uppercase">Receiver AP</p>
              </div>
            </div>
          </foreignObject>

          {/* C4 Node (Buyer ERP) */}
          <foreignObject x="640" y="20" width="120" height="100">
            <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              currentStep.to === 'C4' ? 'scale-105' : 'opacity-70'
            }`}>
              <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center bg-panel transition-all ${
                currentStep.to === 'C4' ? 'border-accent text-accent shadow-[0_0_10px_rgba(220,178,76,0.15)]' : 'border-borderLight text-textSecondary'
              }`}>
                <Users className="w-5 h-5" />
              </div>
              <div className="text-center font-sans">
                <p className="text-[10px] font-bold text-textPrimary">C4</p>
                <p className="text-[8px] text-textSecondary font-mono uppercase">Buyer ERP</p>
              </div>
            </div>
          </foreignObject>
        </svg>

        {/* Console step bar at bottom of canvas */}
        <div className="w-full flex justify-between items-center text-[9px] font-mono text-textSecondary border-t border-borderLight pt-2 mt-2">
          <span>Active Pipeline: {currentStep.title}</span>
          <span>Step {currentStep.id} of {steps.length}</span>
        </div>
      </div>

      {/* Explanations card mapping the flow data details */}
      <div className="apple-panel p-5 bg-panelLight/10 space-y-4">
        <div className="space-y-1 font-sans">
          <span className="text-[9px] font-mono uppercase tracking-wider text-accent bg-accent/15 px-2 py-0.5 rounded">
            Technical Action Explanation
          </span>
          <h4 className="text-xs font-semibold text-textPrimary mt-2">
            {currentStep.title}
          </h4>
          <p className="text-xs text-textSecondary leading-relaxed">
            {currentStep.desc}
          </p>
        </div>

        {/* Technical Data payload console */}
        <div className="bg-black rounded-lg border border-borderLight p-3 space-y-1">
          <p className="text-[8px] font-mono text-textSecondary/70 uppercase tracking-wider">Transmitted Data Payload Snippet</p>
          <code className="text-[10px] font-mono text-accent block break-all whitespace-pre-wrap leading-relaxed">
            {currentStep.dataPayload}
          </code>
        </div>
      </div>

      {/* Control Navigation & Play Button (Bottom Right) */}
      <div className="flex justify-between items-center pt-2">
        {/* Navigation Step Toggles */}
        <div className="flex gap-1 bg-panelLight/20 border border-borderLight rounded-lg p-1 font-mono">
          <button
            onClick={handlePrev}
            disabled={activeStep === 0}
            className="p-1 rounded text-textSecondary hover:text-textPrimary disabled:opacity-30 disabled:hover:text-textSecondary"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
              className={`w-5 h-5 rounded text-[9px] flex items-center justify-center transition-all ${
                idx === activeStep ? 'bg-accent/10 text-accent font-bold' : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              {s.id}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            className="p-1 rounded text-textSecondary hover:text-textPrimary disabled:opacity-30 disabled:hover:text-textSecondary"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Play Button - Placed at bottom right */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`btn-apple-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.2)]`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" /> Pause Auto-Flow
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Play Auto-Flow
            </>
          )}
        </button>
      </div>
    </div>
  );
}
