import type { Config } from 'tailwindcss';

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
  			xs: '516px'
  		},
  		colors: {
  			primary: {
  				'500': '#CD9900',
  				'600': '#A47A00'
  			},
  			secondary: {
					400: '#212121',
  				500: '#141414'
  			},
  			grey: {
  				'300': '#E1E1E1',
  				'500': '#606060',
  				'600': '#717171',
  				'700': '#4B525A',
					
  			},
  			tertiary: {
  				'700': '#4B525A'
  			},
  			danger: {
  				'500': '#B41B0D'
  			}
  		},
  		fontFamily: {
  			obitron: [
  				'var(--font-orbitron)'
  			],
  			montserrat: [
  				'var(--font-montserrat)'
  			]
  		},
  		boxShadow: {
  			'search-panel': '0px 4px 24px 0px #0000001F'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
