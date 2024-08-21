const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      base: "var( --base)",
      secondary: "var(--secondary)",
      active: "var(--active)",
      primary: "var(--primary)",
      primaryText: "var(--primaryText)",
      primaryBorder: "var(--primaryBorder)",
      ...colors,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
      boxShadow: {
        "gray-inset": "inset -45px 0px 51px 0px rgba(243,244,246,1)",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        landingPage: "url('src/assets/landing/phone.jpg')",
      },
    },
    screens: {
      xxs: "328px",
      xs: "396px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
