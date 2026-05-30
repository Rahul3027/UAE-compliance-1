import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        panel: '#1c1c1e',
        panelLight: '#2c2c2e',
        panelLighter: '#3a3a3c',
        accent: '#dcb24c', // Luxury UAE gold
        textPrimary: '#f5f5f7',
        textSecondary: '#86868b',
        borderLight: 'rgba(255, 255, 255, 0.08)'
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
