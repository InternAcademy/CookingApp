/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#EAB308", //the customOrange that was used in: native landing page

        //dark and light theme
        customGray: "#202020", // dark theme background
        customWhite: "#FFFFFF", // light theme background
        customGray400: "#A3A3A3", // text-gray-400 - dark theme text
        customGray600: "#525252", // text-gray-600 - light theme text
        customLightGray: "#E5E7EB", // customLightGray - light theme input/textarea background

        //basic colors
        basicBlack: "#000000", // text and icons - Basic black
        basicWhite: "#FFFFFF", // light theme background & Basic white
      },
    },
    screens: {
      phone: "393px",
      tablet: "768px",
      web: "1280px",
      smallPhone: "320px",
    },
  },
};
