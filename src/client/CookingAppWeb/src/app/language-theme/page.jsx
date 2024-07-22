// pages/language-theme/index.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "@/store/ui-slice";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";
const LanguageAndTheme = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dispatch = useDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }

    // Sync Redux state with next-themes
    dispatch(uiActions.setTheme(theme === "dark"));
  }, [dispatch, theme]);

  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    localStorage.setItem("language", language);
    console.log(`Language changed to: ${language}`);
  };

  return (
    <div className={`h-screen flex items-start justify-center ${isDarkTheme ? "bg-customGray" : "bg-customWhite"} ${isDarkTheme ? "text-white" : "text-black"}`}>
      <div className={`p-8 rounded-lg shadow-lg ${isDarkTheme ? "bg-customGray600" : "bg-white"}`}>
        <h1 className={`text-center text-2xl mb-6 ${isDarkTheme ? "text-white" : "text-black"}`}>Language And Theme</h1>
        <div className="space-y-4">
          <button onClick={() => handleLanguageChange(selectedLanguage === "English" ? "Spanish" : "English")} className={`w-full py-3 rounded-full ${isDarkTheme ? "bg-customGray400 text-white" : "bg-white text-black"} border ${isDarkTheme ? "border-customGray400" : "border-customGray600"} mb-4`}>
            {`Language: ${selectedLanguage}`}
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTheme;