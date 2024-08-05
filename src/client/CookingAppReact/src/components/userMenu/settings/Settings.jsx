import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LanguageIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";

const Settings = () => {
  const dispatch = useDispatch();
  const photoUri = useSelector((state) => state.ui.photoUri);
  const [selectedMenu, setSelectedMenu] = useState("food-preferences");
  const [ContentComponent, setContentComponent] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      const components = {
        "food-preferences": () => import("./foodPreferences/FoodPreferences"),
        // 'language-theme': () => import('@/app/language-theme/page'),
        // 'rules-policies': () => import('@/app/rules-policies/page'),
        // 'about': () => import('@/app/about/page'),
        contacts: () => import("./contacts/Contacts"),
      };

      if (components[selectedMenu]) {
        const { default: Component } = await components[selectedMenu]();
        setContentComponent(() => Component);
      }
    };
    loadContent();
  }, [selectedMenu]);

  const menuItems = [
    {
      id: "food-preferences",
      icon: AdjustmentsVerticalIcon,
      label: "Food Preferences",
    },
    { id: "language-theme", icon: LanguageIcon, label: "Language & Theme" },
    { id: "rules-policies", icon: NewspaperIcon, label: "Rules And Policies" },
    { id: "about", icon: InformationCircleIcon, label: "About" },
    { id: "contacts", icon: EnvelopeIcon, label: "Contacts" },
  ];

  // const handleImageUpload = event => {
  //     const file = event.target.files[0];
  //     if (file) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //             const result = reader.result;
  //             dispatch(uiActions.setPhotoUri(result));
  //             if (typeof window !== "undefined") {
  //                 localStorage.setItem("photoUri", result);
  //             }
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };

  return (
    <div
      className={`h-auto w-full
            border-gray-300 flex px-20`}
    >
      <div className="flex flex-col p-4 w-1/4">
        <div className="flex w-full mb-8 relative">
          {photoUri ? (
            <img
              src={photoUri}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            />
          ) : (
            <UserCircleIcon
              className="w-24 h-24 cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            />
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            // onChange={handleImageUpload}
          />
        </div>
        <div className="flex gap-2 flex-col items-start w-full space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center w-full cursor-pointer p-2 rounded 
                                `}
              onClick={() => setSelectedMenu(item.id)}
              title={item.label}
            >
              <item.icon className="w-6 h-6 mr-4" />
              <span className={`text-lg `}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full p-4">
        {ContentComponent && <ContentComponent />}
      </div>
    </div>
  );
};

export default Settings;
