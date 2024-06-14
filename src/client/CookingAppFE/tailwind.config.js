/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      phone: '375px',
      tablet: '768px',
      web: '1280px'
    }
  },
  plugins: []
};
