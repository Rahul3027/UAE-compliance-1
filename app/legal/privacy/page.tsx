import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Privacy Policy | Compliance Intelligence',
  description: 'Privacy Policy for the Compliance Intelligence Platform',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <Button asChild variant="ghost" className="-ml-4 mb-4">
          <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Home</Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">Last Updated: October 2024</p>
        
        <div className="prose prose-invert prose-zinc max-w-none space-y-6">
          <p>
            At Compliance Intelligence, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our SaaS platform.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal data such as your name, email address, and company details when you register for an account. We also collect usage data to improve our educational modules and sandbox environments.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Sandbox Data Processing</h2>
          <p>
            The XML generation in our Sandbox Testing Center processes data locally or Ephemerally. We do not permanently store sensitive transaction data (such as TRNs, VATINs, or invoice amounts) submitted through the sandbox simulator unless explicitly saved to your user profile.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact our Data Protection Officer at privacy@compliance-intelligence.com.
          </p>
        </div>
      </div>
    </div>
  );
}
