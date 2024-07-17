import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [translatedTexts, setTranslatedTexts] = useState({});

  const getLanguageCode = language => {
    switch (language) {
      case "English":
        return "en";
      case "Spanish":
        return "es";
      case "French":
        return "fr";
      case "Russian":
        return "ru";
      case "Chinese (Simplified)":
        return "zh-CN";
      case "Portuguese":
        return "pt";
      case "Japanese":
        return "ja";
      case "German":
        return "de";
      case "Italian":
        return "it";
      case "Arabic":
        return "ar";
      case "Hindi":
        return "hi";
      default:
        return "en";
    }
  };

  const translateText = async (text, language) => {
    const apiKey = "AIzaSyB3Ho3fTJCD-sFGL_-VZbghaxmTMDcI1Ro"; // Replace with your actual API key
    const url = `https://translation.googleapis.com/language/translate/v2`;

    try {
      const response = await axios.post(url, null, {
        params: {
          q: text,
          target: getLanguageCode(language),
          key: apiKey
        }
      });
      console.log("API Response:", response.data); // Log the response for debugging
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation Error:", error.response ? error.response.data : error.message);
      return text; // Return original text if translation fails
    }
  };

  const translateStaticTexts = async (texts, language) => {
    const translations = {};

    for (const text of texts) {
      translations[text] = await translateText(text, language);
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

  return (
    <TranslationContext.Provider
      value={{
        translateText,
        translatedText,
        targetLanguage,
        setTargetLanguage,
        translateStaticTexts,
        translatedTexts,
        saveLanguagePreference
      }}>
      {children}
    </TranslationContext.Provider>
  );
};
