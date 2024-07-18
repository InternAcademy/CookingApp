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
        customWhite: "#FFFFFF", // light theme - Basic white
        customGray: "#202020", // dark theme - Dark gray background
        darkGray: "#303030", // Dark gray color for background and dividers in dark theme
        lightGray: "#F3F3F3", // Light gray color for background and dividers in light theme - Light gray

        customYellow: "#FFEB3B", // for highlights and buttons - Basic yellow
        customBlack: "#000000", // text and icons - Basic black
        customOrange: "#FFA500", // Basic orange color for highlights and warnings
        darkOrange: "#FF8C00", // Dark orange color for highlights and critical warnings
        darkYellow: "#FFD700", // Dark yellow color for accents and secondary buttons
      },
    },
    screens: {
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
