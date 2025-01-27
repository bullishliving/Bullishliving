import type { Config } from "tailwindcss";


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#CD9900'
        },
        secondary: {
          500: '#141414'
        },
        tertiary: {
          700: '#4B525A'
        },
        danger: {
          500: '#B41B0D'
        }
      },
      fontFamily: {
        obitron: ['var(--font-orbitron)'],
        montserrat: ['var(--font-montserrat)']
      },
      boxShadow: {
        'search-panel': '0px 4px 24px 0px #0000001F'
      }
    },
  },
  plugins: [],
} satisfies Config;
