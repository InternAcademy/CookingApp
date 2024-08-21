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
        LightTheme: "Light",
        DarkTheme: "Dark",
        SunnyTheme: "Sunny Light",
        CoolTheme: "Cool Light",
        WarmTheme: "Warm Dark",
        SaveChanges: "Save Changes",
        FoodPreferences: "Food Preferences",
        None: "None",
        Vegetarian: "Vegetarian",
        Vegan: "Vegan",
        Allergens: "Allergens",
        NoAdded: "None Added",
        AddAllergen: "Add Allergen",
        DislikedFoods: "Disliked Foods",
        AddFood: "Add Food",
        GeneratingMeal: "Generating Meal",
        GenerateMeal: "Generate Meal",
        GetPremium: "Get Premium",
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
