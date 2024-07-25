// components/ChatError.jsx
import React from "react";
import { FaLaptop } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChatError = ({ message }) => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <div className="p-4 bg-red-600 shadow-lg rounded-lg m-4">
      <div className="flex flex-row items-center">
        <FaLaptop size={24} className={isDarkTheme ? "text-white" : "text-black"} />
        <span className={`ml-2 text-sm font-semibold italic ${isDarkTheme ? "text-white" : "text-black"}`}>{message}</span>
      </div>
    </div>
  );
};

export default ChatError;
