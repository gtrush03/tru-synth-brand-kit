/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        satoshi: ['Satoshi', 'sans-serif'],
        'instrument-serif': ['Instrument Serif', 'Georgia', 'serif'],
      },
      colors: {
        'tru-black': '#050505',
        'tru-glass': 'rgba(255, 255, 255, 0.03)',
        'tru-border': 'rgba(255, 255, 255, 0.08)',
        'tru-glow': 'rgba(255, 255, 255, 0.15)',
        'synth-gold': '#928466',
        'synth-gold-light': '#E8E0CC',
        'synth-gold-dim': 'rgba(146, 132, 102, 0.4)',
        'synth-bg': '#050505',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
      },
      animation: {
        'shine': 'shine 8s ease-in-out infinite',
        'fade-slide-in-1': 'fadeSlideIn 0.6s ease-out 0.1s forwards',
        'fade-slide-in-2': 'fadeSlideIn 0.6s ease-out 0.2s forwards',
        'fade-slide-in-3': 'fadeSlideIn 0.6s ease-out 0.3s forwards',
        'fade-slide-in-4': 'fadeSlideIn 0.6s ease-out 0.4s forwards',
      },
      keyframes: {
        shine: {
          '0%, 100%': { backgroundPosition: '200% center' },
          '50%': { backgroundPosition: '0% center' },
        },
        fadeSlideIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}
