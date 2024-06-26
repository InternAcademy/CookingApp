/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      xs: { max: '375px' }, // for extra small devices
      phoneSmall: '375px', // mobile devices (iPhone 8)
      phoneLarge: '414px', // mobile devices (iPhone 11)
      phoneXL: '390px', // mobile devices (iPhone 12 Pro)
      phoneTall: '360px', // mobile devices (Pixel 4a)

      tabletStandard: '768px', // tablets (iPad)
      tabletLarge: '1024px', // tablets (iPad Pro)
      tabletMedium: '601px', // tablets

      desktopSmall: '1024px', // small desktops
      desktopMedium: '1280px', // medium desktops
      desktopLarge: '1366px', // large desktops
      desktopXL: '1920px' // very large desktops
    }
  },
  variants: {},
  plugins: []
};
