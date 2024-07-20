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
    <div className={`h-screen flex items-start justify-center ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <div className="p-8 rounded-lg shadow-lg bg-gray-800">
        <h1 className={`text-center ${isDarkTheme ? "text-white" : "text-black"} text-2xl mb-6`}>Language And Theme</h1>
        <div className="space-y-4">
          <button onClick={handleLanguageChange} className={`w-full py-3 rounded-full ${isDarkTheme ? "bg-[#202020] border-customGray400 text-white" : "bg-white border-customGray600 text-black"} border`}>
            {`Language: ${selectedLanguage}`}
          </button>

          <button onClick={handleThemeChange} className={`w-full py-3 rounded-full ${isDarkTheme ? "bg-[#202020] border-customGray400 text-white" : "bg-white border-customGray600 text-black"} border`}>
            {`Theme: ${isDarkTheme ? "Dark" : "Light"}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTheme;
