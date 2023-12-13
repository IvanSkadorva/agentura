/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['.src/App.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cygre: ['Cygre-Regular'],
        kino: ['Kino-Regular'],
      },
    },
  },
  plugins: [],
};
