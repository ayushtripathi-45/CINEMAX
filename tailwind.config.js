/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff1f0',
          100: '#ffe0de',
          200: '#ffc7c3',
          400: '#ff6b5b',
          500: '#e84040',
          600: '#c92020',
          700: '#a11818',
        },
        dark: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#232330',
          500: '#2e2e3d',
          400: '#3d3d52',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Bebas Neue"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 1.8s infinite linear',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-700px 0' }, '100%': { backgroundPosition: '700px 0' } },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
