'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { insertLead } from '@/lib/supabase/db';
import { Layers, ArrowRight, ArrowLeft, CheckCircle, ShieldAlert, AlertTriangle, FileText, Send } from 'lucide-react';
import Link from 'next/link';

interface AssessmentData {
  erpSystem: string;
  volume: string;
  country: 'ae' | 'om' | 'both';
  dataFormat: string;
  hasItTeam: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
}

export default function ErpReadinessPage() {
  const [step, setStep] = useState<number>(0); // 0: Intro, 1: System, 2: Volume/Country, 3: Tech/Format, 4: Contact, 5: Results
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AssessmentData>({
    erpSystem: '',
    volume: '',
    country: 'ae',
    dataFormat: '',
    hasItTeam: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
  });

  const [scoreCard, setScoreCard] = useState<{
    score: number;
    status: 'Ready' | 'Caution' | 'Action Required';
    description: string;
    tips: string[];
  } | null>(null);

  const erpOptions = [
    { value: 'sap_s4', label: 'SAP S/4HANA', desc: 'Modern SAP cloud/on-premise ERP' },
    { value: 'sap_ecc', label: 'SAP ECC 6.0', desc: 'Legacy SAP ERP system' },
    { value: 'netsuite', label: 'Oracle NetSuite', desc: 'Cloud-native SaaS ERP' },
    { value: 'dynamics', label: 'Microsoft Dynamics 365', desc: 'D365 Business Central / F&O' },
    { value: 'oracle_fusion', label: 'Oracle Fusion / ERP Cloud', desc: 'Oracle enterprise cloud platform' },
    { value: 'custom_local', label: 'Custom / Local ERP', desc: 'In-house built or region-specific system' },
  ];

  const volumeOptions = [
    { value: 'low', label: 'Less than 1,000', desc: 'Low monthly invoice volume' },
    { value: 'medium', label: '1,000 - 10,000', desc: 'Mid-sized invoice volume' },
    { value: 'high', label: '10,000 - 50,000', desc: 'High enterprise invoice volume' },
    { value: 'enterprise', label: 'More than 50,000', desc: 'Massive automated billing volume' },
  ];

  const formatOptions = [
    { value: 'json_xml', label: 'Structured (JSON / XML)', desc: 'Easier to map to PEPPOL UBL' },
    { value: 'csv_excel', label: 'Tabular (CSV / Excel)', desc: 'Requires schema extraction middleware' },
    { value: 'idoc', label: 'SAP IDoc / DB Direct', desc: 'Enterprise data extraction layers' },
    { value: 'unstructured', label: 'Unstructured (PDF / Text)', desc: 'High complexity. Needs parser engines.' },
  ];

  const handleSelect = (field: keyof AssessmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Basic validation
    if (step === 1 && !formData.erpSystem) {
      toast.warning('Please select your ERP system.');
      return;
    }
    if (step === 2 && !formData.volume) {
      toast.warning('Please select your monthly invoice volume.');
      return;
    }
    if (step === 3 && (!formData.dataFormat || !formData.hasItTeam)) {
      toast.warning('Please answer all technical questions.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const calculateReadiness = (data: AssessmentData) => {
    let score = 100;
    const tips: string[] = [];

    // System adjustments
    if (data.erpSystem === 'sap_ecc') {
      score -= 20;
      tips.push('SAP ECC requires dedicated middleware (like SAP Document Compliance or a custom API AP connector) to generate UBL XML without massive database upgrades.');
    } else if (data.erpSystem === 'custom_local') {
      score -= 25;
      tips.push('In-house custom ERPs will need specialized mapping tables or database extraction scripts to construct the PEPPOL SBDH headers.');
    } else {
      tips.push('Your modern cloud ERP platform supports standard API connections, facilitating easier integration with a certified PEPPOL Access Point (AP).');
    }

    // Volume adjustments
    if (data.volume === 'high' || data.volume === 'enterprise') {
      score -= 15;
      tips.push('Enterprise transaction volumes mandate a fully automated, real-time AS4 transmission model with robust asynchronous retry queuing.');
    } else {
      tips.push('Lower monthly volumes permit lightweight integration setups, or even automated batch-uploads via secure SFTP.');
    }

    // Data format adjustments
    if (data.dataFormat === 'unstructured') {
      score -= 30;
      tips.push('Parsing unstructured PDF/Text files introduces data extraction errors. Plan to output structured JSON or XML from your invoice creation flow.');
    } else if (data.dataFormat === 'csv_excel') {
      score -= 10;
      tips.push('CSV outputs are easily parseable but require validation filters to prevent schema rejection by the FTA validation engine.');
    }

    // IT team
    if (data.hasItTeam === 'no') {
      score -= 15;
      tips.push('Consider collaborating with a certified system integration partner to develop and deploy AS4 connectors and security certificates.');
    }

    // Final clean score
    score = Math.max(10, Math.min(100, score));
    let status: 'Ready' | 'Caution' | 'Action Required' = 'Ready';
    let description = '';

    if (score >= 80) {
      status = 'Ready';
      description = 'Your architecture has a strong foundation. Minor schema mapping and Access Point routing integration are required.';
    } else if (score >= 50) {
      status = 'Caution';
      description = 'Some technical gaps identified. You will need localized middleware to convert data and ensure compliance rules are met.';
    } else {
      status = 'Action Required';
      description = 'Significant changes required. Your system needs complete data restructuring, automated validations, and integration support.';
    }

    return { score, status, description, tips };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      toast.warning('Please complete the contact form.');
      return;
    }

    setLoading(true);
    const results = calculateReadiness(formData);

    try {
      const response = await insertLead({
        type: 'erp_readiness',
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: `ERP: ${formData.erpSystem}, Volume: ${formData.volume}, Format: ${formData.dataFormat}, IT Team: ${formData.hasItTeam}`,
        metadata: {
          erp_system: formData.erpSystem,
          invoice_volume: formData.volume,
          country: formData.country,
          data_format: formData.dataFormat,
          has_it_team: formData.hasItTeam,
          calculated_score: results.score,
          calculated_status: results.status,
        }
      });

      if (response.success) {
        setScoreCard(results);
        setStep(5);
        toast.success('Assessment complete! Your custom readiness report has been generated.');
      } else {
        toast.error('Failed to submit assessment.');
      }
    } catch (err) {
      toast.error('Submission error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 pb-24">
      {/* Header Banner */}
      <section className="relative py-20 overflow-hidden border-b border-border bg-muted/5">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Interactive Tools</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">ERP Readiness Assessment</h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Evaluate your enterprise resource planning system against UAE FTA and Oman OTA PEPPOL e-invoicing standards.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-12">
        <div className="bg-muted/10 border border-border/80 rounded-3xl p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* STEP 0: Introduction */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 flex-1 flex flex-col justify-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Layers className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold">Measure Your Compliance Readiness</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Compliance is more than generating a PDF. The upcoming mandates in the UAE (PINT AE) and Oman (PINT OM) require generating highly specific XML structures, validating them against hundreds of business rules in real-time, and routing them via certified secure AS4 access points.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This 3-minute technical audit evaluates your database formats, volumes, and ERP vendor structures to provide a prioritized implementation checklist.
                </p>
                <div className="pt-4">
                  <Button onClick={() => setStep(1)} className="rounded-full px-6 h-11 text-sm">
                    Start Assessment <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 1: ERP Vendor */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>STEP 1 OF 4</span>
                  <span>ERP CORE SYSTEM</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">What is your primary ERP core system?</h3>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {erpOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect('erpSystem', opt.value)}
                      className={`p-5 rounded-2xl border text-left transition-all hover:bg-muted/20 ${formData.erpSystem === opt.value ? 'bg-primary/10 border-primary' : 'bg-background border-border/50'}`}
                    >
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-8 border-t border-border/50 mt-8">
                  <Button variant="ghost" onClick={() => setStep(0)} className="text-sm">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button onClick={nextStep} className="rounded-full px-6 text-sm">
                    Next <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Volume & Country */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>STEP 2 OF 4</span>
                  <span>OPERATIONS & VOLUMES</span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">What is your average monthly invoice volume?</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {volumeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect('volume', opt.value)}
                        className={`p-4 rounded-xl border text-left transition-all text-xs hover:bg-muted/15 ${formData.volume === opt.value ? 'bg-primary/10 border-primary' : 'bg-background border-border/50'}`}
                      >
                        <p className="font-semibold">{opt.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-xl font-bold">Which tax jurisdiction mandates apply to your operations?</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {(['ae', 'om', 'both'] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setFormData(prev => ({ ...prev, country: c }))}
                        className={`p-4 rounded-xl border text-center transition-all text-xs hover:bg-muted/15 ${formData.country === c ? 'bg-primary/10 border-primary font-bold' : 'bg-background border-border/50'}`}
                      >
                        {c === 'ae' && 'UAE (PINT AE)'}
                        {c === 'om' && 'Oman (PINT OM)'}
                        {c === 'both' && 'Both Countries'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-border/50 mt-8">
                  <Button variant="ghost" onClick={prevStep} className="text-sm">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button onClick={nextStep} className="rounded-full px-6 text-sm">
                    Next <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Formats & Technical */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>STEP 3 OF 4</span>
                  <span>TECHNICAL INFRASTRUCTURE</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">What formatting layout does your ERP natively output for invoicing?</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {formatOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect('dataFormat', opt.value)}
                        className={`p-4 rounded-xl border text-left transition-all text-xs hover:bg-muted/15 ${formData.dataFormat === opt.value ? 'bg-primary/10 border-primary' : 'bg-background border-border/50'}`}
                      >
                        <p className="font-semibold">{opt.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="text-sm font-semibold">Do you have an in-house software team available for API / EDI development?</h3>
                  <div className="flex gap-4">
                    {['yes', 'no'].map((ans) => (
                      <button
                        key={ans}
                        onClick={() => handleSelect('hasItTeam', ans)}
                        className={`flex-1 p-3 rounded-lg border text-center text-xs transition-all uppercase hover:bg-muted/20 ${formData.hasItTeam === ans ? 'bg-primary/10 border-primary font-bold' : 'bg-background border-border/50'}`}
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-border/50 mt-8">
                  <Button variant="ghost" onClick={prevStep} className="text-sm">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button onClick={nextStep} className="rounded-full px-6 text-sm">
                    Next <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Contact Info */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>STEP 4 OF 4</span>
                  <span>GET YOUR REPORT</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Where should we send your report?</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Enter your company email below. Your scoring dashboard and technical gap analysis will be processed and rendered instantly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
                      <input
                        required
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleSelect('firstName', e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
                      <input
                        required
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleSelect('lastName', e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
                      <input
                        required
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleSelect('company', e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Mobile Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleSelect('phone', e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Corporate Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleSelect('email', e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-8 border-t border-border/50 mt-8">
                    <Button type="button" variant="ghost" onClick={prevStep} className="text-sm">
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button type="submit" disabled={loading} className="rounded-full px-6 text-sm">
                      {loading ? 'Processing...' : 'Submit & View Report'} <Send className="ml-2 w-3.5 h-3.5" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 5: Results Display */}
            {step === 5 && scoreCard && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                  {scoreCard.status === 'Ready' && <CheckCircle className="w-8 h-8 text-green-500" />}
                  {scoreCard.status === 'Caution' && <AlertTriangle className="w-8 h-8 text-amber-500" />}
                  {scoreCard.status === 'Action Required' && <ShieldAlert className="w-8 h-8 text-red-500" />}
                  <div>
                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Calculated Score</span>
                    <h3 className="text-lg font-bold">Maturity Status: {scoreCard.status}</h3>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center flex-shrink-0 bg-background shadow-inner">
                    <span className="text-3xl font-black">{scoreCard.score}%</span>
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="font-bold text-sm">Integration Roadmap Score</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{scoreCard.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Critical Technical Steps</h4>
                  <ul className="space-y-3">
                    {scoreCard.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/40 text-xs text-muted-foreground leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-border/50">
                  <Button asChild className="w-full sm:flex-1 rounded-full text-xs h-10">
                    <Link href="/contact">Request Integration Advisory</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full sm:flex-1 rounded-full text-xs h-10 border-border/50 hover:bg-muted/50">
                    <Link href="/documentation">Browse XML Schemas</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
