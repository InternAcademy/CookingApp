/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#EAB308", //the customOrange that was used in: native landing page
        customOrange2:"#C28E06",

        //dark and light theme
        customGray: "#202020", // dark theme background
        customWhite: "#FFFFFF", // light theme background
        customGray400: "#A3A3A3", // text-gray-400 - dark theme text
        customGray600: "#525252", // text-gray-600 - light theme text

        //basic colors
        basicBlack: "#000000", // text and icons - Basic black
        basicWhite: "#FFFFFF" // light theme background & Basic white
      }
    },
    screens: {
      phone: "393px",
      tablet: "768px",
      web: "1280px",
      smallPhone: "320px"
    }
  },
  plugins: []
};
