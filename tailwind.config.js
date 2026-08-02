/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F172A',
          dark: '#020617',
          light: '#1E293B',
          muted: '#334155',
        },
        teal: {
          DEFAULT: '#0D9488',
          dark: '#0f766e',
          light: '#14b8a6',
          50: '#f0fdfa',
          100: '#ccfbf1',
        },
        cyan: {
          DEFAULT: '#0EA5E9',
          dark: '#0284c7',
          light: '#38bdf8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          border: '#E2E8F0',
        },
        body: '#334155',
        subtle: '#64748B',
      },
      fontFamily: {
        sans: ['Readex Pro', 'Tajawal', 'sans-serif'],
        heading: ['Readex Pro', 'Tajawal', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',  // 12px
        '2xl': '1rem',   // 16px
        '3xl': '1.5rem', // 24px
      },
      boxShadow: {
        subtle: '0 4px 20px rgba(0, 0, 0, 0.03)',
        card: '0 4px 20px rgba(15, 23, 42, 0.04)',
        hover: '0 12px 30px rgba(15, 23, 42, 0.08)',
        nav: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
