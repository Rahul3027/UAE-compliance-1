'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { insertLead } from '@/lib/supabase/db';

export function CorporateFooter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await insertLead({
        type: 'newsletter',
        email: email,
      });

      if (res.success) {
        toast.success('Thank you for subscribing to our compliance newsletter!');
        setEmail('');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } catch (err) {
      toast.error('Error subscribing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-md pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-border/50">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="font-bold text-lg tracking-tight">
              Compliance<span className="text-primary">Intelligence</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The leading educational resource and infrastructure validator for navigating Federal Tax Authority (UAE) and Oman Tax Authority PEPPOL 5-Corner e-invoicing.
            </p>
            
            {/* Newsletter form */}
            <div className="space-y-2 pt-4">
              <h5 className="text-xs font-bold text-foreground">Subscribe to Regulatory Alerts</h5>
              <form onSubmit={handleSubscribe} className="flex max-w-sm items-center border border-border rounded-full p-1 bg-background">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email"
                  className="bg-transparent text-xs outline-none px-3 py-1 flex-1"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-medium rounded-full p-2"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Links Column 1: Learning */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Educational Guides</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/uae-overview" className="hover:text-primary transition-colors">UAE E-Invoicing (PINT AE)</Link></li>
              <li><Link href="/uae-overview?country=om" className="hover:text-primary transition-colors">Oman E-Invoicing (PINT OM)</Link></li>
              <li><Link href="/documentation" className="hover:text-primary transition-colors">PEPPOL Documentation</Link></li>
              <li><Link href="/knowledge-center" className="hover:text-primary transition-colors">Knowledge Center</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Compliance Blog</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Tools */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Interactive Tools</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/assessments/erp-readiness" className="hover:text-primary transition-colors font-semibold text-foreground/80">ERP Readiness Wizard</Link></li>
              <li><Link href="/assessments/compliance" className="hover:text-primary transition-colors font-semibold text-foreground/80">Compliance Checklist</Link></li>
              <li><Link href="/sandbox-testing-center" className="hover:text-primary transition-colors">UBL XML Sandbox</Link></li>
              <li><Link href="/validation-engine-simulator" className="hover:text-primary transition-colors">Validation Simulator</Link></li>
              <li><Link href="/peppol-5-corner" className="hover:text-primary transition-colors">5-Corner Live Flow</Link></li>
              <li><Link href="/business-rules-explorer" className="hover:text-primary transition-colors">Business Rules Explorer</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Company */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Enterprise</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/services" className="hover:text-primary transition-colors">Integration Services</Link></li>
              <li><Link href="/industries" className="hover:text-primary transition-colors">Industry Solutions</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/demo" className="hover:text-primary transition-colors font-semibold text-primary">Request Demo</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Sales</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors opacity-70">Admin CMS</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>© {new Date().getFullYear()} Compliance Intelligence Platform. Public Educational Resource.</span>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/legal/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
