'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Terminal, RefreshCw, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApiDataFlow() {
  const { completeModule, completedModules } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (completeModule) {
      completeModule('api-data-flow', 100);
    }
  }, []);

  const isCompleted = mounted && completedModules.includes('api-data-flow');

  const steps = [
    {
      title: '1. POST /api/v1/invoices',
      actor: 'ERP (C1) → Access Point (C2)',
      desc: 'The ERP sends the draft invoice (often in JSON) to the Access Point API to initiate mapping and validation.',
      code: `// POST /api/v1/invoices
{
  "invoiceNumber": "INV-2026-9004",
  "supplierTrn": "100234567800003",
  "customerTrn": "100876543200003",
  "issueDate": "2026-05-30",
  "items": [
    { "name": "Consulting Services", "qty": 5, "price": 200 }
  ]
}`
    },
    {
      title: '2. Compile UBL + SBDH',
      actor: 'Access Point (C2)',
      desc: 'The Access Point parses the JSON and builds the standard UBL XML payload wrapped inside a Standard Business Document Header (SBDH).',
      code: `<!-- SBDH Header & UBL Invoice -->
<StandardBusinessDocument>
  <StandardBusinessDocumentHeader>
    <Sender><Identifier>100234567800003</Identifier></Sender>
    <Receiver><Identifier>100876543200003</Identifier></Receiver>
  </StandardBusinessDocumentHeader>
  <Invoice>
     <!-- UBL XML body goes here -->
  </Invoice>
</StandardBusinessDocument>`
    },
    {
      title: '3. Real-time FTA Clearance',
      actor: 'Access Point (C2) ↔ FTA (C5)',
      desc: 'The Access Point routes the raw invoice to the central Federal Tax Authority audit endpoint for real-time clearance.',
      code: `// FTA Response (Clearance Status)
{
  "clearanceStatus": "CLEARED",
  "ftaSignature": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCg...",
  "qrCodeString": "https://fta.gov.ae/verify?invoice=INV-2026-9004"
}`
    },
    {
      title: '4. AS4 Dispatch',
      actor: 'AP (C2) → AP (C3)',
      desc: 'The cleared XML is signed, encrypted, and dispatched via Applicability Statement 4 (AS4) protocol to the buyer\'s Access Point.',
      code: `AS4 HTTP Request Headers:
Host: C3-AP-Endpoint.ae
Content-Type: multipart/related; boundary=MIMEBoundary
SOAPAction: "http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/ns/core/200704/oneWay"
Connection: Keep-Alive`
    },
    {
      title: '5. Delivery Confirmation (MLR)',
      actor: 'Access Point (C3) → AP (C2)',
      desc: 'C3 returns a Message Level Response (MLR) back to C2, acknowledging schema matching and secure arrival of the invoice.',
      code: `<!-- Message Level Response XML -->
<ApplicationResponse>
  <cbc:ID>MLR-0048291</cbc:ID>
  <cbc:DocumentResponse>
    <cac:Response>
      <cbc:ResponseCode>AP</cbc:ResponseCode> <!-- AP = Accepted -->
    </cac:Response>
  </cbc:DocumentResponse>
</ApplicationResponse>`
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 3: Technical Deep-Dives</span>
        <h1 className="apple-h1">API & Data Flow</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Interactive simulation of API endpoints, transaction routes, and data payload transitions as they travel through the 5-corner model.
        </p>
      </div>

      {/* Simulator Interface */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          API Sequence Sandbox
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Select steps below to simulate the API lifecycle, inspecting exact JSON/XML schemas transmitted during each sequence.
        </p>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-6 items-start">
          {/* Timeline Sequence */}
          <div className="space-y-2">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex flex-col gap-1 ${
                    isActive
                      ? 'border-accent bg-accent/[0.03] text-textPrimary'
                      : 'border-white/[0.04] bg-white/[0.01] text-textSecondary hover:bg-white/[0.03] hover:border-white/[0.08]'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-semibold font-mono">{step.title}</span>
                    <span className="text-[9px] uppercase tracking-wider text-textSecondary font-mono">{step.actor}</span>
                  </div>
                  <p className="text-[10px] text-textSecondary/60 mt-1 line-clamp-1">{step.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Code Output Panel */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
            <div className="bg-[#121214] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] font-mono text-accent flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> Payload Terminal
              </span>
              <span className="text-[9px] font-mono text-textSecondary uppercase tracking-wider">
                {steps[activeStep].actor}
              </span>
            </div>
            
            <div className="p-4 space-y-4">
              <p className="text-xs text-textSecondary leading-relaxed">
                {steps[activeStep].desc}
              </p>
              
              <pre className="p-3 bg-black rounded-lg border border-white/[0.04] overflow-auto text-[11px] font-mono text-[#dcdcdc] max-h-[260px] leading-relaxed">
                <code>{steps[activeStep].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for completing API & Data Flow.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
