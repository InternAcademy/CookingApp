// components/Thinking.jsx
import React from "react";
import logo from "/public/icon2.png";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import '../../assets/css/animations.css';

const Thinking = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  return (
    <div className="w-4/5">
      <div className="flex  justify-start items-start gap-2">
        <img
          src={logo}
          alt=""
          width={35}
          className="bg-gray-200 rounded-2xl p-1"
        />
        <span
          className={`text-sm font-semibold italic ${
            isDarkTheme ? "text-white" : "text-black"
          }`}
        >
          <span className="dot-1">•</span>
          <span className="dot-2">•</span>
          <span className="dot-3">•</span>
        </span>
      </div>
    </div>
  );
};

export default Thinking;