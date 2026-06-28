import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E31828',
          50: '#FEE5E5',
          100: '#FDCCCB',
          200: '#FB9998',
          300: '#F96665',
          400: '#F73332',
          500: '#E31828',
          600: '#B81420',
          700: '#8D0F18',
          800: '#620A10',
          900: '#370608',
        },
        background: '#0A0A0A',
        foreground: '#FFFFFF',
        gold: '#C9A961',
        card: '#1a1a1a',
        'card-hover': '#252525',
      },
      backgroundColor: {
        dark: '#0A0A0A',
      },
      fontFamily: {
        sans: ['Heebo', 'system-ui', 'sans-serif'],
        hebrew: ['Heebo', 'sans-serif'],
      },
      direction: ['rtl', 'ltr'],
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
} satisfies Config
