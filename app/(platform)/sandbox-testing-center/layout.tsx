import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Interactive Sandbox Builder | UAE & Oman E-Invoicing',
  description: 'Generate fully compliant UAE PINT AE and Oman PINT OM UBL XML files using our interactive sandbox simulator. Test against your ERP integrations.',
  openGraph: {
    title: 'Interactive Sandbox Builder | UAE & Oman E-Invoicing',
    description: 'Generate compliant UBL XML invoices dynamically.',
    type: 'website',
  }
};

export default function SandboxLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
