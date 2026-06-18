/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — vibrant purple (Zoobers theme)
        primary: {
          50: '#f2f0ff',
          100: '#e7e3ff',
          200: '#d1c9ff',
          300: '#b3a4ff',
          400: '#8f7bff',
          500: '#6d5dfc',
          600: '#5a45e8',
          700: '#4a37c2',
          800: '#3d2f9c',
          900: '#342a7d',
        },
        // Accent — warm orange (Zoobers theme)
        accent: {
          50: '#fff6ed',
          100: '#ffe9d3',
          200: '#ffcea5',
          300: '#ffac6d',
          400: '#ff8c42',
          500: '#fb7318',
          600: '#ec5a0e',
          700: '#c4430f',
        },
      },
    },
  },
  plugins: [],
};
