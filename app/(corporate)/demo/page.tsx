'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { insertLead } from '@/lib/supabase/db';
import { Calendar, Monitor, Users, Shield, CheckCircle } from 'lucide-react';

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const phone = formData.get('phone') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const erp = formData.get('erp') as string;
    const message = formData.get('message') as string;

    try {
      const res = await insertLead({
        type: 'demo',
        first_name: firstName,
        last_name: lastName,
        email: email,
        company: company,
        phone: phone,
        message: `Job Title: ${jobTitle}, ERP: ${erp}, Notes: ${message}`,
        metadata: {
          job_title: jobTitle,
          erp_system: erp,
        }
      });

      if (res.success) {
        setSubmitted(true);
        toast.success('Demo request submitted! We will email you scheduling details shortly.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (err) {
      toast.error('Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="flex-1 pb-24 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-muted/10 border border-border text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">Request Received!</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thank you for requesting a demo. Our enterprise integration engineers will reach out to schedule a custom walkthrough of the AS4 routing sandbox and validation APIs.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 pb-24">
      {/* Header */}
      <section className="relative py-20 overflow-hidden border-b border-border bg-muted/5">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Advisory & Demos</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Request an Enterprise Demo</h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Schedule a personalized walkthrough of our validation engines, Schematron simulators, and ERP connector templates.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pt-16 grid md:grid-cols-2 gap-12">
        {/* Info Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What to expect:</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our specialists will walk you through custom integration patterns for SAP, Oracle, NetSuite, and local ERP architectures, demonstrating how to achieve compliance without disrupting existing billing workflows.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Sandbox Walkthrough</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Learn how to generate and validate UBL XML structures dynamically.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Technical SLA Support</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Explore deployment models, security protocols (AS4/TLS), and service levels.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Compliance Assurances</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Deep dive into Schematron business rules (PINT AE/OM) and clearance logic.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div>
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-muted/10 border border-border space-y-5">
            <h3 className="font-bold text-lg mb-2">Request Form</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
                <input required type="text" name="firstName" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
                <input required type="text" name="lastName" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
                <input required type="text" name="company" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <input required type="tel" name="phone" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Job Title</label>
                <input required type="text" name="jobTitle" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">ERP Environment</label>
                <select name="erp" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 h-[34px]">
                  <option value="sap">SAP S/4HANA / ECC</option>
                  <option value="netsuite">Oracle NetSuite</option>
                  <option value="dynamics">Microsoft Dynamics</option>
                  <option value="oracle">Oracle Fusion</option>
                  <option value="custom">Custom / In-House</option>
                  <option value="other">Other ERP</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Work Email</label>
              <input required type="email" name="email" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Requirements Details</label>
              <textarea rows={3} name="message" placeholder="Volume of invoices, timelines, specific system integrations..." className="w-full bg-background border border-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"></textarea>
            </div>

            <Button type="submit" disabled={loading} className="w-full rounded-full text-xs h-10 mt-2">
              {loading ? 'Submitting...' : 'Request Demo Booking'}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
