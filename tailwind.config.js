/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'notebook': ['"Lexend Mega"', 'sans-serif'],
        'handwriting': ['"JetBrains Mono"', 'monospace'],
        'body': ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        paper: {
          50: 'rgba(255, 255, 255, 0.1)',
          100: 'rgba(255, 255, 255, 0.2)',
          200: 'rgba(255, 255, 255, 0.3)',
          300: 'rgba(255, 255, 255, 0.4)',
          400: 'rgba(255, 255, 255, 0.5)',
          500: 'rgba(255, 255, 255, 0.6)',
          600: 'rgba(255, 255, 255, 0.7)',
          700: 'rgba(255, 255, 255, 0.8)',
          800: 'rgba(255, 255, 255, 0.9)',
          900: '#ffffff',
        },
        ink: {
          light: '#1e293b',
          dark: '#f8fafc',
        },
        highlight: {
          blue: '#60a5fa',
          yellow: '#fcd34d',
          cyan: '#22d3ee',
        },
        notebook: {
          blue: 'rgba(59, 130, 246, 0.1)',
          yellow: 'rgba(251, 191, 36, 0.1)',
          red: 'rgba(248, 113, 113, 0.1)',
          green: 'rgba(52, 211, 153, 0.1)',
          purple: 'rgba(167, 139, 250, 0.1)',
        }
      },
      backgroundImage: {
        'paper-texture': "none",
        'ruled-lines': "none",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'notebook-open': 'notebookOpen 1s ease-out',
        'highlight': 'highlight 0.3s ease-in-out',
        'ink-flow': 'inkFlow 2s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        notebookOpen: {
          '0%': { transform: 'perspective(1000px) rotateY(-20deg)', opacity: '0' },
          '50%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '0.7' },
          '100%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '1' },
        },
        highlight: {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(59, 130, 246, 0.2)' },
          '100%': { backgroundColor: 'transparent' },
        },
        inkFlow: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        }
      },
      boxShadow: {
        'notebook': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'sticky-note': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'polaroid': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }
    },
  },
  plugins: [],
}
