"use client";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
const LanguageAndTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkTheme(storedTheme === "dark");
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = !isDarkTheme ? "dark" : "light";
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLanguageChange = () => {
    const newLanguage = selectedLanguage === "English" ? "Spanish" : "English";
    setSelectedLanguage(newLanguage);
    window.alert(`Language Changed: Selected language: ${newLanguage}`);
  };

  return (
    <div className={`flex flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} p-6`}>
      <h1 className={`${isDarkTheme ? "text-white" : "text-black"} text-2xl mb-6`}>Language And Theme</h1>
      <div className="mb-6">
        <div className="mb-4">
          <button onClick={handleLanguageChange} className={`border rounded-full p-4 ${isDarkTheme ? "bg-[#303030] border-gray-300" : "bg-white border-gray-600"}`}>
            <span className={`${isDarkTheme ? "text-white" : "text-black"} text-base`}>{`Language: ${selectedLanguage}`}</span>
          </button>
        </div>

        <div className="mb-4">
          <button onClick={handleThemeChange} className={`border rounded-full p-4 ${isDarkTheme ? "bg-[#303030] border-gray-300" : "bg-white border-gray-600"}`}>
            <span className={`${isDarkTheme ? "text-white" : "text-black"} text-base`}>{`Theme: ${isDarkTheme ? "Dark" : "Light"}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTheme;
