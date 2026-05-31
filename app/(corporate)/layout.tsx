import { ReactNode } from 'react';
import { CorporateNav } from '@/components/layout/corporate-nav';
import { CorporateFooter } from '@/components/layout/corporate-footer';

export default function CorporateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <CorporateNav />
      <div className="flex-1">
        {children}
      </div>
      <CorporateFooter />
    </div>
  );
}
