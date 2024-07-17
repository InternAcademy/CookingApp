import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [translatedTexts, setTranslatedTexts] = useState({});
  const [translationCache, setTranslationCache] = useState({});

  const getLanguageCode = useCallback(language => {
    const languageCodes = {
      English: "en",
      Spanish: "es",
      French: "fr",
      Russian: "ru",
      "Chinese (Simplified)": "zh-CN",
      Portuguese: "pt",
      Japanese: "ja",
      German: "de",
      Italian: "it",
      Arabic: "ar",
      Hindi: "hi"
    };
    return languageCodes[language] || "en";
  }, []);

  const translateText = useCallback(
    async (text, language) => {
      const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
      const url = `https://translation.googleapis.com/language/translate/v2`;
      const cacheKey = `${text}_${language}`;

      if (translationCache[cacheKey]) {
        return translationCache[cacheKey];
      }

      try {
        const response = await axios.post(url, null, {
          params: {
            q: text,
            target: getLanguageCode(language),
            key: apiKey
          }
        });
        const translatedText = response.data.data.translations[0].translatedText;
        setTranslationCache(prev => ({ ...prev, [cacheKey]: translatedText }));
        return translatedText;
      } catch (error) {
        console.error("Translation Error:", error.response ? error.response.data : error.message);
        return text;
      }
    },
    [getLanguageCode, translationCache]
  );

  const translateStaticTexts = useCallback(
    async (texts, language) => {
      const translations = {};
      const untranslatedTexts = texts.filter(text => !translationCache[`${text}_${language}`]);

      if (untranslatedTexts.length > 0) {
        const translationPromises = untranslatedTexts.map(text => translateText(text, language));
        const translatedResults = await Promise.all(translationPromises);

        untranslatedTexts.forEach((text, index) => {
          translations[text] = translatedResults[index];
        });
      }

      texts.forEach(text => {
        if (translationCache[`${text}_${language}`]) {
          translations[text] = translationCache[`${text}_${language}`];
        }
      });

      setTranslatedTexts(prev => ({ ...prev, ...translations }));
    },
    [translateText, translationCache]
  );

  const saveLanguagePreference = useCallback(async language => {
    try {
      await AsyncStorage.setItem("preferredLanguage", language);
      setTargetLanguage(language);
    } catch (error) {
      console.error("Failed to save the language preference", error);
    }
  }, []);

  const loadLanguagePreference = useCallback(async () => {
    try {
      const language = await AsyncStorage.getItem("preferredLanguage");
      if (language) {
        setTargetLanguage(language);
      }
    } catch (error) {
      console.error("Failed to load the language preference", error);
    }
  }, []);

  useEffect(() => {
    loadLanguagePreference();
  }, [loadLanguagePreference]);

  return (
    <TranslationContext.Provider
      value={{
        translateText,
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
