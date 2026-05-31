'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Globe, Search, Play, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AspCommunicationFlow() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  // Network Routing Simulation State
  const [buyerTrn, setBuyerTrn] = useState('100876543200003');
  const [routingState, setRoutingState] = useState<'idle' | 'sml-lookup' | 'smp-query' | 'as4-send' | 'success'>('idle');
  const [logMsgs, setLogMsgs] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOman = mounted && country === 'om';

  // Sync buyer ID default when country changes
  useEffect(() => {
    if (mounted) {
      setBuyerTrn(country === 'om' ? 'OM9876543210' : '100876543200003');
      setRoutingState('idle');
      setLogMsgs([]);
    }
  }, [country, mounted]);

  const isCompleted = mounted && completedModules.includes('asp-communication-flow');

  const startRouting = () => {
    setRoutingState('sml-lookup');
    setLogMsgs(['Initializing routing resolver...', `Target Buyer ${isOman ? 'VATIN' : 'TRN'}: ${buyerTrn}`]);

    setTimeout(() => {
      setRoutingState('smp-query');
      setLogMsgs((prev) => [
        ...prev,
        'SML (DNS Locator) queried successfully.',
        `Resolved SMP IP address: 194.22.108.41`,
        'Querying SMP (Metadata Publisher) for document capabilities...'
      ]);
    }, 1500);

    setTimeout(() => {
      setRoutingState('as4-send');
      setLogMsgs((prev) => [
        ...prev,
        `SMP confirmed Receiver is registered for: PEPPOL PINT ${isOman ? 'OM' : 'AE'} Invoice v1.0.`,
        `Recipient AP Endpoint resolved: https://ap.${isOman ? 'salalahtrading.om' : 'gulfretail.ae'}/as4`,
        'Establishing secure TLS AS4 session with target Access Point...',
        'Sending SOAP Envelope payload with digitally signed digest...'
      ]);
    }, 3000);

    setTimeout(() => {
      setRoutingState('success');
      setLogMsgs((prev) => [
        ...prev,
        'AS4 Handshake complete.',
        'HTTP 200 OK: Delivery receipt verified.',
        'Routing completed successfully!'
      ]);
      if (completeModule) {
        completeModule('asp-communication-flow', 100);
      }
    }, 4500);
  };

  const handleReset = () => {
    setRoutingState('idle');
    setLogMsgs([]);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 3: Technical Deep-Dives</span>
        <h1 className="apple-h1">Access Point Communication</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Access Points resolve target destinations dynamically. Instead of static routes, PEPPOL uses a decentralized DNS network lookup (SML/SMP) and secure AS4 protocol wrappers.
        </p>
      </div>

      {/* Network Simulator */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          SML / SMP Decentralized Routing Simulator
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Trigger a mock network packet route. Observe how the sender\'s AP queries the DNS locator (SML) to find where the receiver\'s service directory (SMP) is located, audits capabilities, and starts the AS4 stream.
        </p>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-6">
          {/* Controls */}
          <div className="apple-panel p-5 space-y-4">
            <h4 className="text-xs font-semibold text-textPrimary flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" /> Network Address
            </h4>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-textSecondary">Target Buyer {isOman ? 'VATIN' : 'TRN'}</label>
                <input
                  type="text"
                  disabled={routingState !== 'idle'}
                  value={buyerTrn}
                  onChange={(e) => setBuyerTrn(e.target.value)}
                  className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary font-mono focus:outline-none focus:border-accent disabled:opacity-50"
                />
              </div>

              {routingState === 'idle' ? (
                <button
                  onClick={startRouting}
                  className="w-full btn-apple-primary text-xs py-2 flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" /> Route Invoice Packet
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  disabled={routingState !== 'success'}
                  className="w-full btn-apple-secondary text-xs py-2 flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Routing
                </button>
              )}
            </div>
          </div>

          {/* Network Logs Output */}
          <div className="apple-panel p-5 space-y-4 bg-white/[0.01]">
            <h4 className="text-xs font-semibold text-textPrimary flex items-center gap-2">
              <Search className="w-4 h-4 text-accent" /> Network Resolver Console
            </h4>

            <div className="h-[200px] bg-black rounded-lg border border-white/[0.04] p-4 overflow-y-auto space-y-2 font-mono text-[10px] text-textSecondary">
              {logMsgs.map((msg, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-accent shrink-0">&gt;</span>
                  <span>{msg}</span>
                </div>
              ))}
              
              {routingState === 'sml-lookup' && (
                <div className="flex items-center gap-2 text-accent animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Resolving SML names...
                </div>
              )}
              {routingState === 'smp-query' && (
                <div className="flex items-center gap-2 text-accent animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Querying SMP directory...
                </div>
              )}
              {routingState === 'as4-send' && (
                <div className="flex items-center gap-2 text-accent animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Transferring via AS4...
                </div>
              )}
              {routingState === 'success' && (
                <div className="flex items-center gap-1.5 text-green-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure AS4 dispatch complete.
                </div>
              )}
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
              <p className="text-[10px] text-textSecondary">You earned 100 XP for mastering Access Point routing.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
