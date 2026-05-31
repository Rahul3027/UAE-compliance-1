import '@/styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Compliance CMS Admin Portal',
  description: 'Enterprise Content Management System & Lead Panel',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col antialiased">
      {children}
    </div>
  );
}
