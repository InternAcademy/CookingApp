/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: "#EAB308", //the customOrange that was used in: native landing page

        //dark and light theme
        customGray: "#202020", // dark theme background
        customWhite: "#FFFFFF", // light theme background & Basic white
        customGray400: "#A3A3A3", // text-gray-400 - dark theme
        customGray600: "#525252", // text-gray-600 - light theme

        //basic colors
        basicBlack: "#000000", // text and icons - Basic black
        basicWhite: "#FFFFFF", // light theme background & Basic white
      },
    },
    screens: {
      xs: "320px",
      sm: "429px",
      md: "769px",
      lg: "1280px",
      xl: "1440px",
      xxl: "1920px",
      custom: "1720px",
    },
  },
  plugins: [],
};
