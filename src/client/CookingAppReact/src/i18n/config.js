import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";

export const supportedLngs = {
  en: "English",
  bg: "Български",
};

i18n.use(initReactI18next).init({
  lng: "en",

  fallbackLng: "en",

  debug: false,

  interpolation: {
    escapeValue: false,
  },
  supportedLngs: Object.keys(supportedLngs),
  resources: {
    en: {
      translation: {
        chatwarn: "Meal Master may occasionally make mistakes.",
        lnt: "Language and theme",
      },
    },
    bg: {
      translation: {
        chatwarn: "Meal Master може да допуска грешки.",
        lnt: "Език и тема",
      },
    },
  },
});

export default i18n;
