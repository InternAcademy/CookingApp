import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translatedTexts, setTranslatedTexts] = useState({});

  const translateText = async text => {
    const apiKey = "AIzaSyB3Ho3fTJCD-sFGL_-VZbghaxmTMDcI1Ro";
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    try {
      const response = await axios.post(url, {
        q: text,
        target: targetLanguage
      });
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  const translateStaticTexts = async (texts, language) => {
    const apiKey = "AIzaSyB3Ho3fTJCD-sFGL_-VZbghaxmTMDcI1Ro";
    const translations = {};

    for (const text of texts) {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      try {
        const response = await axios.post(url, {
          q: text,
          target: language === "Spanish" ? "es" : "en"
        });
        translations[text] = response.data.data.translations[0].translatedText;
      } catch (error) {
        console.error(error);
      }
    }

    setTranslatedTexts(translations);
  };

  const saveLanguagePreference = async language => {
    try {
      await AsyncStorage.setItem("preferredLanguage", language);
      setTargetLanguage(language);
    } catch (error) {
      console.error("Failed to save the language preference", error);
    }
  };

  const loadLanguagePreference = async () => {
    try {
      const language = await AsyncStorage.getItem("preferredLanguage");
      if (language) {
        setTargetLanguage(language);
      }
    } catch (error) {
      console.error("Failed to load the language preference", error);
    }
  };

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  return <TranslationContext.Provider value={{ translateText, translatedText, targetLanguage, setTargetLanguage, translateStaticTexts, translatedTexts }}>{children}</TranslationContext.Provider>;
};
