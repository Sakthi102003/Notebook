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
        'stealth': ['"Space Grotesk"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'sans': ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        stealth: {
          900: '#0A0A0B',
          800: '#0F0F11',
          700: '#161618',
          600: '#1C1C1E',
          500: '#2A2A2E',
        },
        electric: {
          blue: 'rgb(var(--accent-color) / <alpha-value>)',
          glow: 'rgba(var(--accent-color), 0.4)',
        },
        crimson: {
          DEFAULT: '#FF003C',
          glow: 'rgba(255, 0, 60, 0.4)',
        },
      },
      backgroundImage: {
        'paper-texture': "none",
        'ruled-lines': "none",
        'cyber-grid': "radial-gradient(circle, var(--tw-gradient-from) 1px, transparent 1px)",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'module-init': 'moduleInit 1s ease-out',
        'highlight': 'highlight 0.3s ease-in-out',
        'ink-flow': 'inkFlow 2s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'scanline': 'scanline 6s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
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
        moduleInit: {
          '0%': { transform: 'perspective(1000px) rotateY(-20deg)', opacity: '0' },
          '50%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '0.7' },
          '100%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '1' },
        },
        highlight: {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(0, 242, 255, 0.2)' },
          '100%': { backgroundColor: 'transparent' },
        },
        inkFlow: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        }
      },
      boxShadow: {
        'module': '0 0 20px rgba(0, 242, 255, 0.15)',
        'node': '0 0 15px rgba(0, 242, 255, 0.1)',
        'polaroid': '0 0 25px rgba(0, 242, 255, 0.1)',
        'cyber': '0 0 10px var(--color-primary), inset 0 0 5px var(--color-primary)',
      }
    },
  },
  plugins: [],
}
