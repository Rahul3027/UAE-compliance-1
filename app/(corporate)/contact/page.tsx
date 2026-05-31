'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, Sparkles, Database, Layers, Network, HeartHandshake, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { insertLead } from '@/lib/supabase/db';
import Link from 'next/link';

type ContactStep = 1 | 2 | 3 | 'success';

export default function ContactPage() {
  const [step, setStep] = useState<ContactStep>(1);
  const [loading, setLoading] = useState(false);
  
  // State for form values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    erpSystem: 'SAP',
    targetCountry: 'ae',
    urgency: 'planning',
    message: ''
  });

  const updateField = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
        toast.error('Please fill in all required enterprise fields.');
        return;
      }
    }
    if (step === 2) {
      // Step 2 has default selections, safe to proceed
    }
    setStep((prev) => (prev as number) + 1 as ContactStep);
  };

  const handleBack = () => {
    setStep((prev) => (prev as number) - 1 as ContactStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await insertLead({
        type: 'consultation',
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
        metadata: {
          erp_system: formData.erpSystem,
          target_country: formData.targetCountry,
          urgency: formData.urgency
        }
      });

      if (res.success) {
        toast.success('Consultation request registered!');
        setStep('success');
      } else {
        toast.error('Failed to submit request. Please verify connection.');
      }
    } catch (err) {
      toast.error('Error submitting consultation form.');
    } finally {
      setLoading(false);
    }
  };

  const erpSystems = ['SAP', 'Oracle', 'NetSuite', 'Microsoft Dynamics', 'Custom ERP'];
  const countries = [
    { code: 'ae', name: 'UAE (PINT AE)' },
    { code: 'om', name: 'Oman (PINT OM)' },
    { code: 'both', name: 'Both Jurisdictions' }
  ];
  const urgencyOptions = [
    { code: 'urgent', name: 'Urgent (< 3 Months)' },
    { code: 'planning', name: 'Planning (3-6 Months)' },
    { code: 'general', name: 'General Inquiry' }
  ];

  return (
    <main className="flex-1 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-border bg-muted/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-[80px] rounded-[100%]" />
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:32px_32px] pointer-events-none mask-image-radial" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6 flex flex-col items-center">
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
            Technical Advisory
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/60 leading-tight">
            Enterprise Consultation Request
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Schedule a session with our e-invoicing architects to map out system compatibility, schema compliance, and secure PEPPOL endpoint routing.
          </p>
        </div>
      </section>

      {/* Grid Layout: Form vs What Happens Next */}
      <section className="max-w-6xl mx-auto px-6 pt-16 grid lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left column: Side Context Map */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-foreground">The Integration Roadmap</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We guide enterprise IT and tax departments through a structured process to ensure zero compliance disruption during mandate go-lives.
            </p>
          </div>

          {/* Timeline points */}
          <div className="space-y-6 relative border-l border-border/80 pl-6 ml-3">
            {[
              { icon: Database, title: '1. Technical Discovery', desc: 'We analyze your billing tables, schemas, and tax computation fields.' },
              { icon: Layers, title: '2. Custom Payload Mapping', desc: 'Our mapping specialists generate structured JSON schemas compatible with PINT UBL.' },
              { icon: Network, title: '3. Pre-flight Validation', desc: 'Your team tests payloads against local Schematrons via our private sandbox.' },
              { icon: HeartHandshake, title: '4. Production Handshake', desc: 'We coordinate live transmission clearance directly with the FTA/OTA gateway.' }
            ].map((stepItem, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[37px] top-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground">
                  <stepItem.icon className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-foreground">{stepItem.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{stepItem.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border/60 pt-6 space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              <Mail className="w-4 h-4 text-accent" />
              <span>advisory@compliance.platform</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              <MapPin className="w-4 h-4 text-accent" />
              <span>DIFC, Innovation Hub, Dubai, UAE</span>
            </div>
          </div>
        </div>

        {/* Right column: Multi-Step Interactive Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-card/65 shadow-xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
            
            {/* Step Indicators */}
            {step !== 'success' && (
              <div className="flex items-center justify-between border-b border-border/60 pb-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">PROGRESS:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          num === step ? 'w-8 bg-accent' : num < step ? 'w-4 bg-primary/40' : 'w-2 bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  Step {step} of 3
                </span>
              </div>
            )}

            {/* Step Content */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold">Enterprise Contact</h3>
                      <p className="text-xs text-muted-foreground">Please provide your corporate details.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">First Name *</label>
                        <input
                          required
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateField('firstName', e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Last Name *</label>
                        <input
                          required
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateField('lastName', e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Work Email *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Company / Organisation *</label>
                        <input
                          required
                          type="text"
                          value={formData.company}
                          onChange={(e) => updateField('company', e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold">ERP & Compliance Scope</h3>
                      <p className="text-xs text-muted-foreground">Select your primary enterprise configuration.</p>
                    </div>

                    {/* ERP System Choice */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">ERP Billing Platform</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {erpSystems.map((system) => (
                          <button
                            key={system}
                            type="button"
                            onClick={() => updateField('erpSystem', system)}
                            className={`p-3 text-left border rounded-xl transition-all focus:outline-none flex flex-col justify-between h-20 ${
                              formData.erpSystem === system
                                ? 'border-accent bg-accent/5 ring-1 ring-accent text-foreground'
                                : 'border-border bg-background hover:bg-muted/15 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <span className="text-[10px] font-mono font-bold tracking-tight uppercase">ERP</span>
                            <span className="text-xs font-bold leading-tight">{system}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target Country Choice */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Compliance Jurisdiction</label>
                      <div className="grid grid-cols-3 gap-2">
                        {countries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => updateField('targetCountry', c.code)}
                            className={`p-3 text-left border rounded-xl transition-all focus:outline-none flex flex-col justify-between h-20 ${
                              formData.targetCountry === c.code
                                ? 'border-accent bg-accent/5 ring-1 ring-accent text-foreground'
                                : 'border-border bg-background hover:bg-muted/15 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <Globe className="w-4 h-4 text-accent/80" />
                            <span className="text-xs font-bold leading-tight">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold">Project Timeline</h3>
                      <p className="text-xs text-muted-foreground">Describe your integration goals.</p>
                    </div>

                    {/* Urgency */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Mandate Rollout Urgency</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {urgencyOptions.map((opt) => (
                          <button
                            key={opt.code}
                            type="button"
                            onClick={() => updateField('urgency', opt.code)}
                            className={`p-3 text-left border rounded-xl transition-all focus:outline-none flex items-center gap-3 ${
                              formData.urgency === opt.code
                                ? 'border-accent bg-accent/5 ring-1 ring-accent text-foreground'
                                : 'border-border bg-background hover:bg-muted/15 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full shrink-0 ${
                              opt.code === 'urgent' ? 'bg-red-500 animate-pulse' : opt.code === 'planning' ? 'bg-amber-500' : 'bg-green-500'
                            }`} />
                            <span className="text-xs font-bold">{opt.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Technical Brief / Message</label>
                      <textarea
                        rows={4}
                        placeholder="Please details your billing volume, current file export formats (JSON, XML, CSV), and any specific questions."
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-6 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                      <CheckCircle2 className="w-8 h-8 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Request Submitted!</h3>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                        We've received your request for an enterprise advisory session. A senior tax technologist will email you at <strong className="text-foreground">{formData.email}</strong> within 24 hours to schedule the session.
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-border/60 w-full max-w-md grid grid-cols-2 gap-4">
                      <Button asChild variant="outline" className="rounded-full text-xs font-bold h-9">
                        <Link href="/dashboard">Go to Sandbox</Link>
                      </Button>
                      <Button asChild className="rounded-full text-xs font-bold h-9 bg-accent hover:bg-accent/90">
                        <Link href="/">Back to Home</Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Navigation Controls */}
              {step !== 'success' && (
                <div className="flex justify-between items-center pt-4 border-t border-border/60 mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 h-9 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold transition-all focus:outline-none"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-1.5 h-9 px-6 rounded-full bg-accent hover:bg-accent/90 text-white text-xs font-bold transition-all focus:outline-none disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Schedule Advisory Session'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </form>

          </div>
        </div>

      </section>
    </main>
  );
}
