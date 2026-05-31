import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Terms of Service | Compliance Intelligence',
  description: 'Terms of Service for the Compliance Intelligence Platform',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <Button asChild variant="ghost" className="-ml-4 mb-4">
          <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Home</Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground">Last Updated: October 2024</p>
        
        <div className="prose prose-invert prose-zinc max-w-none space-y-6">
          <p>
            These Terms of Service ("Terms") govern your use of the Compliance Intelligence Platform operated by Compliance Intelligence Inc.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Educational & Simulation Use Only</h2>
          <p>
            The Compliance Intelligence Platform is designed for educational purposes and architectural simulation. The generated XML payloads and validation results provided by the Sandbox Testing Center do not constitute formal legal or tax advice. You are responsible for ensuring that your production ERP integrations are certified by the UAE Federal Tax Authority (FTA) or the Oman Tax Authority (OTA).
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
          <p>
            The service and its original content (excluding user-provided data), features, and functionality are and will remain the exclusive property of Compliance Intelligence Inc and its licensors.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall Compliance Intelligence Inc, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </div>
      </div>
    </div>
  );
}
