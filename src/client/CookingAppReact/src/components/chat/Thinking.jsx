// components/Thinking.jsx
import React from "react";
import logo from "/public/logo-master.png";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import "../../assets/css/animations.css";

const Thinking = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  return (
    <div className="w-4/5">
      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-row justify-center h-10 items-center text-center">
          <img
            src={logo}
            alt=""
            width={40}
            className="border border-primaryBorder shadow-sm rounded-full p-1 mr-5"
          />
          <span
            className={`text-sm font-semibold italic ${
              isDarkTheme ? "text-white" : "primaryText"
            }`}
          >
            <span className="dot-1">•</span>
            <span className="dot-2">•</span>
            <span className="dot-3">•</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Thinking;
