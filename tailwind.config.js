/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '.src/App.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'coral-red': 'rgb(253, 58, 58)',
      white: 'rgb(255, 255, 255)',
      black: 'rgb(0, 0, 0)',
    },
    extend: {
      fontFamily: {
        cygre: ['Cygre-Regular'],
        kino: ['Kino-Regular'],
      },
    },
  },
  plugins: [],
};
