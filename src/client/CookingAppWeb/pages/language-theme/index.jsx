// pages/language-theme/index.jsx
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "@/store/ui-slice";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import "tailwindcss/tailwind.css";

const LanguageAndTheme = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [selectedLanguage, setSelectedLanguage] = React.useState("English");
  const [selectedTheme, setSelectedTheme] = React.useState(isDarkTheme ? "Dark" : "Light");
  const dispatch = useDispatch();

  const handleThemeChange = async theme => {
    dispatch(uiActions.toggleTheme());
    setSelectedTheme(theme);
    const storedTheme = await AsyncStorage.getItem("theme");
    await AsyncStorage.setItem("theme", storedTheme === "dark" ? "light" : "dark");
  };

  const handleLanguageChange = language => {
    setSelectedLanguage(language);

    Alert.alert("Language Changed", `Selected language: ${language}`);
  };

  return (
    <div className={`h-screen flex items-start justify-center ${isDarkTheme ? "bg-customGray" : "bg-customWhite"} ${isDarkTheme ? "text-white" : "text-black"}`}>
      <div className={`p-8 rounded-lg shadow-lg ${isDarkTheme ? "bg-customGray600" : "bg-white"}`}>
        <h1 className={`text-center text-2xl mb-6 ${isDarkTheme ? "text-white" : "text-black"}`}>Language And Theme</h1>
        <div className="space-y-4">
          <button onClick={handleLanguageChange} className={`w-full py-3 rounded-full ${isDarkTheme ? "bg-customGray400 text-white" : "bg-white text-black"} border ${isDarkTheme ? "border-customGray400" : "border-customGray600"} mb-4`}>
            {`Language: ${selectedLanguage}`}
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTheme;
