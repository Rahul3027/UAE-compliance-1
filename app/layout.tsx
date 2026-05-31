import '@/styles/globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { GlobalSearchModal } from '@/components/ui/global-search-modal';
import { PreferencesModal } from '@/components/ui/preferences-modal';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'UAE & Oman E-Invoicing Intelligence Platform',
  description: 'SaaS Compliance Intelligence Platform for UAE & Oman E-Invoicing (PEPPOL PINT)',
};

const STORAGE_KEY = 'uae-compliance-preferences';

const scriptContent = `
  (function() {
    try {
      var prefs = JSON.parse(localStorage.getItem('${STORAGE_KEY}') || '{}');
      var theme = prefs.theme || 'system';
      var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', dark);
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-density', prefs.density || 'comfortable');
      document.documentElement.setAttribute('data-motion', prefs.motion || 'default');
      document.documentElement.setAttribute('data-font-size', prefs.fontSize || 'md');
    } catch (e) {}
  })()
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <GlobalSearchModal />
          <PreferencesModal />
          <Toaster richColors position="top-right" theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}

