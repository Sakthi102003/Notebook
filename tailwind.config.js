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
        'notebook': ['Kalam', 'cursive'],
        'handwriting': ['Shadows Into Light', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        paper: {
          50: '#fefefe',
          100: '#fdfdf9',
          200: '#f9f9f4',
          300: '#f5f5f0',
          400: '#f1f1ec',
          500: '#ededeb',
          600: '#e9e9e7',
          700: '#e5e5e3',
          800: '#e1e1df',
          900: '#ddddd8',
        },
        ink: {
          light: '#1e293b',
          dark: '#f8fafc',
        },
        highlight: {
          blue: '#3b82f6',
          yellow: '#fbbf24',
          cyan: '#06b6d4',
        },
        notebook: {
          blue: '#dbeafe',
          yellow: '#fef3c7',
          red: '#fecaca',
          green: '#dcfce7',
          purple: '#e9d5ff',
        }
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'ruled-lines': "repeating-linear-gradient(transparent, transparent 24px, #e5e7eb 24px, #e5e7eb 25px)",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'notebook-open': 'notebookOpen 1s ease-out',
        'highlight': 'highlight 0.3s ease-in-out',
        'ink-flow': 'inkFlow 2s ease-in-out infinite',
      },
      keyframes: {
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
        'notebook': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'sticky-note': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'polaroid': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
