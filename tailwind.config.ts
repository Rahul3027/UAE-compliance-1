import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-color)',
        panel: 'var(--panel-color)',
        panelLight: 'var(--panel-light)',
        panelLighter: 'var(--panel-lighter)',
        accent: '#dcb24c', // Luxury UAE gold
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        borderLight: 'var(--border-light)',
        codeBg: 'var(--code-bg)',
        codeHeaderBg: 'var(--code-header-bg)',
        codeText: 'var(--code-text)'
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
} satisfies Config;
