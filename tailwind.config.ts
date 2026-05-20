import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Color tokens come from styles/tokens.css as CSS variables so
      // they remain editable in one place (Paul-friendly maintenance).
      colors: {
        bg: 'var(--color-bg)',
        'bg-elevated': 'var(--color-bg-elevated)',
        fg: 'var(--color-fg)',
        'fg-muted': 'var(--color-fg-muted)',
        accent: 'var(--color-accent)',
        line: 'var(--color-line)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial scale — generous for documentary craft.
        // Hero display uses arbitrary vw values in JSX.
        'caption': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.12em' }],
        'small': ['0.8125rem', { lineHeight: '1.5' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'lead': ['1.25rem', { lineHeight: '1.55' }],
        'display-sm': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.75rem, 7vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(3.5rem, 10vw, 7rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(4rem, 14vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
      },
      letterSpacing: {
        'caption': '0.12em',
      },
      transitionTimingFunction: {
        // Editorial easing — slower acceleration, gentle settle.
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'door': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
