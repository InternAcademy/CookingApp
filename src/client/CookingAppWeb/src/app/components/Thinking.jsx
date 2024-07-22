import React from "react";
import { useSelector } from "react-redux";
import { FaSpinner, FaLaptop } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const Thinking = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <div className={`p-4 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} shadow-lg rounded-lg m-4`}>
      <div className="flex flex-row items-center">
        <FaSpinner className="animate-spin mr-2" size={24} color="#4f46e5" />
        <FaLaptop size={24} className={`${isDarkTheme ? "text-white" : "text-indigo-600"}`} />
        <span className={`ml-2 text-sm font-semibold italic ${isDarkTheme ? "text-white" : "text-indigo-600"}`}>thinking...</span>
      </div>
    </div>
  );
};

export default Thinking;
