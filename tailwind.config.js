/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
          50: '#e0f2fe',
          100: '#bae6fd',
          200: '#7dd3fc',
          300: '#38bdf8',
          400: '#0ea5e9',
          500: '#0284c7',
          600: '#0369a1',
        }
      },
      backgroundSize: {
        '200%': '200% 200%',
        '300%': '300% 300%',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        blob: {
          '0%':   { transform: 'translate(0px,   0px) scale(1)' },
          '33%':  { transform: 'translate(30px, -20px) scale(1.1)' },
          '66%':  { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px,   0px) scale(1)' },
        },
        hue: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

    },
    animation: {
      'gradient-x': 'gradient-x 12s ease infinite',
      'gradient-y': 'gradient-y 16s ease infinite',
      blob: 'blob 14s ease-in-out infinite',
      hue: 'hue 10s linear infinite',
      shine: 'shine 2.2s linear infinite',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
