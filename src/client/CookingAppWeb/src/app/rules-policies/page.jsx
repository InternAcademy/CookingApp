// pages/Rules-Policies.jsx
"use client";

import React from "react";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";

const RulesAndPolicies = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div className={`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} min-h-screen`}>
      <div className="p-6">
        <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkTheme ? "text-white" : "text-black"}`}>Rules And Policies</h1>

        <div className="mb-6">
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Usage Rules</h2>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>1. Use the app responsibly. Do not misuse the generated recipes.</p>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>2. Ensure you have the proper ingredients and tools before attempting any recipe.</p>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>3. Follow the instructions in the recipes carefully to achieve the best results.</p>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>4. Report any issues or bugs in the app to help us improve your experience.</p>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>5. Do not share sensitive or personal information with the chat bot. The chat bot is not designed to handle such information securely.</p>
        </div>

        <div className="mb-6">
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Privacy Policy</h2>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>We are committed to protecting your privacy. Please read our Privacy Policy to understand how we handle your personal information.</p>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>We do not share your personal information with third parties without your consent.</p>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Our app may collect data to improve your user experience, such as usage statistics and preferences.</p>
        </div>

        <div className="mb-6">
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Terms of Service</h2>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>By using our app, you agree to our Terms of Service. Please read these terms carefully before using the app.</p>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>We reserve the right to update these terms at any time. Continued use of the app constitutes acceptance of the new terms.</p>
          <p className={`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>If you have any questions about our terms or policies, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default RulesAndPolicies;
