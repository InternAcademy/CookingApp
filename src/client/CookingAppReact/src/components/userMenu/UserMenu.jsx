import "tailwindcss/tailwind.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import SignOutButton from "../auth/SignOutButton";

const UserMenu = ({ isOpen, toggleDropDown }) => {
    const navigate = useNavigate();
    const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

    if (!isOpen) return null;

    return (
        <div
            onClick={event => event.stopPropagation()}
            className={`absolute right-2 top-12 w-44 
            ${isDarkTheme ? "bg-[#2F2F2F]" : "bg-white"} 
            border border-gray-300 rounded-3xl shadow-sm z-20`}
        >
            <div className="flex flex-col p-4">
                <div className="flex flex-col items-start w-full space-y-2">
                    <div
                        className={`flex items-center w-full cursor-pointer p-2  
                        ${isDarkTheme ? 'hover:bg-[#424242]' : 'hover:bg-gray-100'} hover:rounded`}
                        onClick={() => { navigate("/subscription"); toggleDropDown(); }}
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
                        ${isDarkTheme ? 'hover:bg-[#424242]' : 'hover:bg-gray-100'} hover:rounded`}
                        onClick={() => { navigate("/settings"); toggleDropDown(); }}
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
                </div>
                <hr className={`w-full mt-2 mb-2 ${isDarkTheme ? 'border-[#3C3C3C]' : 'border-gray-200'}`} />
                <div className={`p-2 ${isDarkTheme ? 'hover:bg-[#424242]' : 'hover:bg-gray-100'} hover:rounded`}>
                    <SignOutButton/>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
