import "tailwindcss/tailwind.css";
import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUtensils, FaCreditCard, FaCog } from "react-icons/fa";
import SignOutButton from "../auth/SignOutButton";

const UserMenu = ({ isOpen, toggleDropDown }) => {
    const navigate = useNavigate();

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                toggleDropDown();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleDropDown]);

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            onClick={event => event.stopPropagation()}
            className={`absolute right-6 top-10 w-64 bg-white 
            border border-gray-300 rounded-md shadow-lg z-20
             transition-transform duration-300 ease-in-out 
             ${isOpen ? 'transform scale-100' : 'transform scale-95 pointer-events-none'}`}
        >
            <div className="flex flex-col p-4">
                <div className="flex flex-col items-start w-full space-y-2">
                    <div
                        className={`flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 rounded-md`}
                        onClick={() => { navigate("/recipes"); toggleDropDown(); }}
                        title="Recipes"
                    >
                        <FaUtensils
                            className="w-6 h-6 mr-4
                            sm:w-4
                            md:w-4
                            lg:w-6
                            xl:w-6"
                        />
                        <span className="
                            sm:text-base
                            md:text-base
                            lg:text-lg
                            xl:text-lg">Recipes</span>
                    </div>
                    <div
                        className={`flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 rounded-md`}
                        onClick={() => { navigate("/subscription"); toggleDropDown(); }}
                        title="Subscription"
                    >
                        <FaCreditCard
                            className="w-6 h-6 mr-4
                            sm:w-4
                            md:w-4
                            ls:w-6
                            xl:w-6"
                        />
                        <span className="
                            sm:text-base
                            md:text-base
                            ls:text-lg
                            xl:text-lg">Subscription</span>
                    </div>
                    <div
                        className={`flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 rounded-md`}
                        onClick={() => { navigate("/settings"); toggleDropDown(); }}
                        title="Settings"
                    >
                        <FaCog
                            className="w-6 h-6 mr-4
                            sm:w-4
                            md:w-4
                            lg:w-6
                            xl:w-6"
                        />
                        <span className="
                            sm:text-base
                            md:text-base
                            lg:text-lg
                            xl:text-lg">Settings</span>
                    </div>
                </div>
                <hr className={`w-full mt-2 mb-2`} />
                <div className={`p-2 hover:bg-gray-100 rounded-md`}>
                    <SignOutButton />
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
