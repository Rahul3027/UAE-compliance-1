'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Info, MailOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResponseStatusLifecycle() {
  const { completeModule, completedModules } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'AP' | 'RE' | 'IP' | 'CA'>('AP');

  useEffect(() => {
    setMounted(true);
    if (completeModule) {
      completeModule('response-status-lifecycle', 100);
    }
  }, []);

  const isCompleted = mounted && completedModules.includes('response-status-lifecycle');

  const statuses = [
    {
      code: 'AP',
      name: 'Approved (Accepted)',
      sender: 'Buyer (C4) → Seller (C1)',
      desc: 'The buyer accepts the invoice content without dispute and queues it for payment ledger processing.',
      xml: `<cac:DocumentResponse>
  <cac:Response>
    <cbc:ResponseCode>AP</cbc:ResponseCode>
    <cbc:Description>Invoice approved for payment</cbc:Description>
  </cac:Response>
</cac:DocumentResponse>`
    },
    {
      code: 'RE',
      name: 'Rejected',
      sender: 'Buyer (C4) → Seller (C1)',
      desc: 'The buyer rejects the invoice entirely (e.g. incorrect items or legal entities). Supplier must issue a corrective Credit Note.',
      xml: `<cac:DocumentResponse>
  <cac:Response>
    <cbc:ResponseCode>RE</cbc:ResponseCode>
    <cbc:Description>Incorrect delivery address listed</cbc:Description>
  </cac:Response>
</cac:DocumentResponse>`
    },
    {
      code: 'IP',
      name: 'In Process',
      sender: 'Buyer (C4) → Seller (C1)',
      desc: 'Acknowledges receipt of the document. Indicates that internal approval or matching is ongoing.',
      xml: `<cac:DocumentResponse>
  <cac:Response>
    <cbc:ResponseCode>IP</cbc:ResponseCode>
    <cbc:Description>Three-way matching in progress</cbc:Description>
  </cac:Response>
</cac:DocumentResponse>`
    },
    {
      code: 'CA',
      name: 'Conditionally Accepted',
      sender: 'Buyer (C4) → Seller (C1)',
      desc: 'Accepted with reservations (e.g. minor price adjustment agreed offline).',
      xml: `<cac:DocumentResponse>
  <cac:Response>
    <cbc:ResponseCode>CA</cbc:ResponseCode>
    <cbc:Description>Accepted pending discount adjustment</cbc:Description>
  </cac:Response>
</cac:DocumentResponse>`
    }
  ];

  const activeStatus = statuses.find(s => s.code === selectedStatus) || statuses[0];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 3: Technical Deep-Dives</span>
        <h1 className="apple-h1">Application Response Statuses</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Invoice transmission is only half the journey. The PEPPOL standard defines the `ApplicationResponse` schema, allowing buyers to communicate processing statuses back to the seller.
        </p>
      </div>

      {/* Interactive Status Inspector */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          UBL Response Status Explorer
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Select an invoice status code to view its definition, sender flow, and corresponding UBL ApplicationResponse XML snippet.
        </p>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-6 items-start">
          {/* Status Buttons */}
          <div className="space-y-2">
            {statuses.map((s) => (
              <button
                key={s.code}
                onClick={() => setSelectedStatus(s.code as any)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex flex-col gap-1 ${
                  s.code === selectedStatus
                    ? 'border-accent bg-accent/[0.03] text-textPrimary'
                    : 'border-white/[0.04] bg-white/[0.01] text-textSecondary hover:bg-white/[0.03] hover:border-white/[0.08]'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-semibold">{s.name}</span>
                  <span className="text-[10px] font-mono text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                    Code {s.code}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Details & Code View */}
          <div className="space-y-4">
            <div className="apple-panel p-5 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                  Response Details
                </span>
                <h4 className="text-sm font-semibold text-textPrimary mt-3">{activeStatus.name}</h4>
                <p className="text-xs text-textSecondary mt-1 leading-relaxed">{activeStatus.desc}</p>
                <p className="text-[10px] text-textSecondary/60 mt-2 font-mono uppercase tracking-wider">
                  Flow: {activeStatus.sender}
                </p>
              </div>
            </div>

            {/* XML code */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
              <div className="bg-[#121214] px-4 py-2 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono text-textSecondary flex items-center gap-1.5">
                  <MailOpen className="w-3.5 h-3.5 text-accent" /> ApplicationResponse XML
                </span>
              </div>
              <pre className="p-4 overflow-auto text-[11px] font-mono text-[#dcdcdc] leading-relaxed">
                <code>{activeStatus.xml}</code>
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
              <p className="text-[10px] text-textSecondary">You earned 100 XP for mastering response status lifecycles.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
