'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, ShieldAlert, CheckSquare } from 'lucide-react';

export default function DevLearningCenter() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  // Checklist states
  const [checkedList, setCheckedList] = useState<Record<string, boolean>>({
    trn: false,
    tls: false,
    schema: false,
    smp: false,
    callbacks: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('developer-learning-center');
  const isOman = mounted && country === 'om';

  const toggleCheck = (key: string) => {
    const updated = { ...checkedList, [key]: !checkedList[key] };
    setCheckedList(updated);

    const allChecked = Object.values(updated).every((val) => val === true);
    if (allChecked && completeModule) {
      completeModule('developer-learning-center', 150);
    }
  };

  const checklistItems = [
    { 
      key: 'trn', 
      label: isOman ? 'Validate VAT Identification Numbers (VATIN)' : 'Validate Tax Registration Numbers (TRN)', 
      desc: isOman 
        ? 'Assert that all supplier and customer VATINs follow the Omani format: OM followed by exactly 10 digits.' 
        : 'Assert that all supplier and customer TRNs contain exactly 15 digits.' 
    },
    { key: 'tls', label: 'Verify Access Point TLS/AS4 certificates', desc: 'Secure connection tunnels between C2 and C3 with valid PEPPOL PKI certificates.' },
    { 
      key: 'schema', 
      label: 'Integrate Schematron Validator', 
      desc: isOman 
        ? 'Ensure invoices pass the custom Omani (Fawtara) rules locally before transmitting to the AP network.' 
        : 'Ensure invoices pass the custom UAE rules locally before transmitting to the AP network.' 
    },
    { key: 'smp', label: 'Verify SMP participant entries', desc: 'Confirm receiving buyer accounts are correctly queried in SML/SMP registries.' },
    { key: 'callbacks', label: 'Configure callback status hooks', desc: 'Ensure ApplicationResponses (Acceptances, Disputes) route correctly back into core ERP logs.' }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 4: Hands-On Practice</span>
        <h1 className="apple-h1">Developer Implementation Center</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Ready for production? Complete the go-live readiness checklist to audit your PEPPOL PINT {isOman ? 'OM' : 'AE'} integration.
        </p>
      </div>

      {/* Checklist Audit */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-accent" /> Go-Live Readiness Audit
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Review and check off compliance targets. Audit the entire implementation stack from registration {isOman ? 'VATINs' : 'TRNs'} down to AS4 networking.
        </p>

        <div className="space-y-2">
          {checklistItems.map((item) => {
            const isChecked = checkedList[item.key];
            return (
              <button
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 ${
                  isChecked
                    ? 'border-green-500/20 bg-green-500/[0.01] text-textPrimary'
                    : 'border-white/[0.06] bg-white/[0.01] text-textSecondary hover:bg-white/[0.02] hover:border-white/[0.1]'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-green-500 border-green-500 text-black'
                      : 'border-white/30'
                  }`}>
                    {isChecked && <span className="text-[9px] font-bold">✓</span>}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <h4 className={`text-xs font-semibold ${isChecked ? 'text-green-400' : 'text-textPrimary'}`}>
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-textSecondary leading-relaxed">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Production Guidelines */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-accent" /> Production Best Practices
        </h3>
        <div className="apple-panel p-5 space-y-3 text-xs leading-relaxed text-textSecondary">
          <p>
            • **Asynchronous Responses**: Treat invoice delivery as decoupled from invoice approvals. Always handle callbacks via decoupled API listeners rather than locking browser sessions.
          </p>
          <p>
            • **Audit Archiving**: Invoices must be archived in their original, cryptographically signed XML format for a minimum of 10 years (or as regulated by {isOman ? 'OTA' : 'FTA'} guidelines).
          </p>
          <p>
            • **Fail-safes**: Implement robust queue mechanisms to store and retry transfers if SML lookups or network handshakes experience intermittent timeouts.
          </p>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 150 XP for auditing your e-invoicing architecture.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
