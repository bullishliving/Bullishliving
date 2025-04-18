import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '516px',
      },
      colors: {
        primary: {
          500: '#CD9900',
          600: '#A47A00',
        },
        secondary: {
          300: '#1B1E21',
          400: '#212121',
          500: '#141414',
        },
        grey: {
          100: '#FAFAFA',
          200: '#DEDFE0',
          300: '#E1E1E1',
          400: '#E3E3E3',
          500: '#606060',
          600: '#717171',
          700: '#4B525A',
          800: '#8C9196',
          900: '#4F4F4F'
        },
        tertiary: {
          700: '#4B525A',
        },
        danger: {
          400: '#E93423',
          500: '#B41B0D',
        },
        orange: {
          50: '#FFEDD9',
          400: '#FF6B00',
          500: '#FB4D04',
          600: '#fb4e04d5',
        },
        warning: {
          50: '#FFFAEB',
          500: '#B54708'
        },
        success: {
          50: '#ECFDF3',
          500: '#027A48'
        },
        blue: {
          50: '#F0F9FF',
          500: '#2A19E7'
        }
      },
      fontFamily: {
        obitron: ['var(--font-orbitron)'],
        montserrat: ['var(--font-montserrat)'],
      },
      boxShadow: {
        'search-panel': '0px 4px 24px 0px #0000001F',
        'select-options': '0px 4px 24px 0px #0000001F',
        'dropdown-options': '0px 4px 20px 10px #0D0B0E0D',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'grey-gradient': 'linear-gradient(253.85deg, #FFFFFF -51.43%, rgba(186, 184, 184, 0) 165.09%)'
      }
    },
  },
  plugins: [typography],
} satisfies Config;
