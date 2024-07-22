"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaUtensils, FaCreditCard, FaLeaf, FaArchive, FaLanguage, FaFileAlt, FaInfoCircle, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";
import { uiActions } from "@/store/ui-slice";

const UserMenu = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const dispatch = useDispatch();
  const photoUri = useSelector(state => state.ui.photoUri);

  useEffect(() => {
    const savedPhotoUri = localStorage.getItem("photoUri");
    if (savedPhotoUri) {
      dispatch(uiActions.setPhotoUri(savedPhotoUri));
    }
  }, [dispatch]);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        dispatch(uiActions.setPhotoUri(result));
        if (typeof window !== "undefined") {
          localStorage.setItem("photoUri", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    dispatch(uiActions.clearPhotoUri());
    if (typeof window !== "undefined") {
      localStorage.removeItem("photoUri");
    }
  };

  return (
    <div className={`flex flex-col ${isDarkTheme ? "bg-[#202020]" : "bg-white"} min-h-screen w-64 p-4`}>
      <div className="flex justify-start w-full mb-4">
        <h1 className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>User Menu</h1>
      </div>
      <div className="flex justify-center w-full mb-8 relative">
        {photoUri ? <img src={photoUri} alt="Profile" className="w-24 h-24 rounded-full object-cover cursor-pointer" onClick={() => document.getElementById("fileInput").click()} style={{ width: "6rem", height: "6rem" }} /> : <FaUserCircle className="w-24 h-24 cursor-pointer" color={isDarkTheme ? "white" : "black"} onClick={() => document.getElementById("fileInput").click()} style={{ width: "6rem", height: "6rem" }} />}
        <input type="file" id="fileInput" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
        {photoUri && (
          <button onClick={clearPhoto} className="absolute top-0 right-0 text-red-500">
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-col items-start w-full space-y-6">
        <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => router.push("/recipes")} title="Recipes">
          <FaUtensils className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Recipes</span>
        </div>
        <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => router.push("/subscription")} title="Subscription">
          <FaCreditCard className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Subscription</span>
        </div>
        <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => router.push("/food-preferences")} title="Food Preferences">
          <FaLeaf className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Food Preferences</span>
        </div>
        <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => router.push("/archived-recipes")} title="Archived Recipes">
          <FaArchive className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Archived Recipes</span>
        </div>
        <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => router.push("/language-theme")} title="Language & Theme">
          <FaLanguage className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Language & Theme</span>
        </div>
        <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => router.push("/rules-policies")} title="Rules And Policies">
          <FaFileAlt className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Rules And Policies</span>
        </div>
        <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => router.push("/about")} title="About">
          <FaInfoCircle className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>About</span>
        </div>
        <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => router.push("/contacts")} title="Contacts">
          <FaEnvelope className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Contacts</span>
        </div>
      </div>

      <div className="mt-auto mb-4">
        <button onClick={() => console.log("Sign Out")} className="flex items-center" title="Sign Out">
          <FaSignOutAlt className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
          <span className={`text-lg ${isDarkTheme ? "text-gray-100" : "text-black"}`}>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
