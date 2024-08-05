import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaLeaf, FaArchive, FaLanguage, FaFileAlt, FaInfoCircle, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Settings = () => {
    const dispatch = useDispatch();
    const photoUri = useSelector(state => state.ui.photoUri);
    const [selectedMenu, setSelectedMenu] = useState('food-preferences');
    const [ContentComponent, setContentComponent] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const loadContent = async () => {
            const components = {
                'food-preferences': () => import('./foodPreferences/FoodPreferences'),
                // 'archived-recipes': () => import('@/app/archived-recipes/page'),
                // 'language-theme': () => import('@/app/language-theme/page'),
                // 'rules-policies': () => import('@/app/rules-policies/page'),
                // 'about': () => import('@/app/about/page'),
                'contacts': () => import('./contacts/Contacts')
            };

            if (components[selectedMenu]) {
                const { default: Component } = await components[selectedMenu]();
                setContentComponent(() => Component);
            }
        }
        loadContent();
    }, [selectedMenu]);

    const menuItems = [
        { id: "food-preferences", icon: FaLeaf, label: "Food Preferences" },
        { id: "archived-recipes", icon: FaArchive, label: "Archived Recipes" },
        { id: "language-theme", icon: FaLanguage, label: "Language & Theme" },
        { id: "rules-policies", icon: FaFileAlt, label: "Rules And Policies" },
        { id: "about", icon: FaInfoCircle, label: "About" },
        { id: "contacts", icon: FaEnvelope, label: "Contacts" }
    ];

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

    return (
        <div className="h-screen w-full border-gray-300 flex flex-col md:flex-row px-10 overflow-hidden">
            <div className="md:hidden flex justify-between items-center pt-2">
                <p className="font-bold flex" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Settings 
                    <IoIosArrowDropdownCircle className="w-5 h-5 mt-1 cursor-pointer"/>                    
                </p>
            </div>
            <div className={`flex-col md:flex ${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex-col p-4 md:w-1/4 overflow-y-auto`}>
                <div className="flex w-full mb-8 relative">
                    {photoUri ? (
                        <img
                            src={photoUri}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover cursor-pointer"
                            onClick={() => document.getElementById("fileInput").click()}
                        />
                    ) : (
                        <FaUserCircle
                            className="cursor-pointer
                            w-16 h-16
                            md:w-20 md:h-20
                            lg:w-24 lg:h-24"
                            onClick={() => document.getElementById("fileInput").click()}
                        />
                    )}
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="flex gap-2 flex-col items-start w-full space-y-2">
                    {menuItems.map(item => (
                        <div
                            key={item.id}
                            className={`flex items-center w-full cursor-pointer p-2 rounded ${selectedMenu === item.id ? 'bg-gray-200' : ''}`}
                            onClick={() => { setSelectedMenu(item.id); setIsMobileMenuOpen(false); }}
                            title={item.label}
                        >
                            <item.icon className="mr-4
                            w-6 h-6
                            sm:w-6 sm:h-6
                            md:w-6 md:h-6
                            lg:w-6 lg:h-6" />
                            <span className="
                            sm:text-sm
                            md:text-base
                            lg:text-lg
                            xl:text-lg
                            ">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 p-4 overflow-auto
            sm:w-full">
                {ContentComponent && <ContentComponent />}
            </div>
        </div>
    );
};

export default Settings;