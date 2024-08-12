import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cog6ToothIcon, CreditCardIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import SignOutButton from "../auth/SignOutButton";

const UserMenu = ({ isOpen, toggleDropDown }) => {
  const navigate = useNavigate();
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const menuRef = useRef(null);

  useEffect(() => {
    console.log(isOpen)
    // Function to handle click outside the dropdown
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        console.log('kurac')
        toggleDropDown(); // Close the dropdown only when clicking outside
      }
    }

    // Attach the event listener to detect clicks outside
    if (isOpen) {
      // Attach the event listener after a slight delay to prevent immediate closing
        document.addEventListener("click", handleClickOutside);
    }
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleDropDown]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()} // Attach the ref to the dropdown container
      className={`absolute right-2 top-12 w-56 
      ${isDarkTheme ? "bg-[#2F2F2F]" : "bg-white"} 
      border border-gray-300 rounded-3xl shadow-sm z-20`}
    >
      <div className="flex flex-col p-4">
        <div className="flex flex-col items-start w-full space-y-2">
          <div
            className={`flex items-center w-full cursor-pointer p-2  
            ${isDarkTheme ? "hover:bg-[#424242]" : "hover:bg-gray-100"} hover:rounded`}
            onClick={() => {
              navigate("/subscription");
            }}
            title="Subscription"
          >
            <CreditCardIcon
              className="w-6 h-6 mr-4"
              color={isDarkTheme ? "white" : "black"}
            />
            <span className={`${isDarkTheme ? "text-white" : "text-black"}`}>
              Subscription
            </span>
          </div>
          <div
            className={`flex items-center w-full cursor-pointer p-2 
            ${isDarkTheme ? "hover:bg-[#424242]" : "hover:bg-gray-100"} hover:rounded`}
            onClick={() => {
              navigate("/settings");
            }}
            title="Settings"
          >
            <Cog6ToothIcon
              className="w-6 h-6 mr-4"
              color={isDarkTheme ? "white" : "black"}
            />
            <span className={`${isDarkTheme ? "text-white" : "text-black"}`}>
              Settings
            </span>
          </div>
          <div
            className={`flex items-center w-full cursor-pointer p-2 
            ${isDarkTheme ? "hover:bg-[#424242]" : "hover:bg-gray-100"} hover:rounded`}
            onClick={() => {
              navigate("/rules-and-policies");
            }}
            title="Rules & Policies"
          >
            <ExclamationTriangleIcon
              className="w-6 h-6 mr-4"
              color={isDarkTheme ? "white" : "black"}
            />
            <span className={`${isDarkTheme ? "text-white" : "text-black"}`}>
              Rules & Policies
            </span>
          </div>
        </div>
        <hr className={`w-full mt-2 mb-2 ${isDarkTheme ? "border-[#3C3C3C]" : "border-gray-200"}`} />
        <div className={`p-2 ${isDarkTheme ? "hover:bg-[#424242]" : "hover:bg-gray-100"} hover:rounded`}>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
