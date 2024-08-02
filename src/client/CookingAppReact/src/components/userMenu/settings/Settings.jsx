import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaLeaf, FaArchive, FaLanguage, FaFileAlt, FaInfoCircle, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

const Settings = () => {
    const dispatch = useDispatch();
    const photoUri = useSelector(state => state.ui.photoUri);
    const [selectedMenu, setSelectedMenu] = useState('food-preferences');
    const [ContentComponent, setContentComponent] = useState(null);

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
        <div className={`h-auto w-full 
            border-gray-300 flex px-10`}>
            {/* <div className="md:flex hidden flex-col p-4 w-1/4"> */}
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
                        <FaUserCircle
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
                    {menuItems.map(item => (
                        <div
                            key={item.id}
                            className={`flex items-center w-full cursor-pointer p-2 rounded 
                                `}
                            onClick={() => setSelectedMenu(item.id)}
                            title={item.label}
                        >
                            <item.icon
                                className="w-6 h-6 mr-4"
                                
                            />
                            <span
                                className={`text-lg `}>{item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="md:hidden flex flex-col w-full">
                <div className="flex justify-between p-4">
                    <div className="flex items-center">
                        {photoUri ? (
                            <img
                                src={photoUri}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                onClick={() => document.getElementById("fileInput").click()}
                            />
                        ) : (
                            <FaUserCircle
                                className="w-10 h-10 cursor-pointer"
                                color={isDarkTheme ? "white" : "black"}
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
                    <div className="flex items-center">
                        <button onClick={() => setHamMenuOpen(!hamMenuOpen)}>
                            {hamMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                {hamMenuOpen && (
                    <div className="flex flex-col p-4">
                        {menuItems.map(item => (
                            <div
                                key={item.id}
                                className={`flex items-center w-full cursor-pointer p-2 rounded ${selectedMenu === item.id ? isDarkTheme ? "bg-[#424242]" : " bg-[#b2b2b2]" : ""}`}
                                onClick={() => { setSelectedMenu(item.id); setHamMenuOpen(false); }}
                                title={item.label}
                            >
                                <item.icon className="w-6 h-6 mr-4" color={selectedMenu === item.id ? "white" : isDarkTheme ? "white" : "black"} />
                                <span className={`text-lg ${selectedMenu === item.id ? "text-white" : isDarkTheme ? "text-white" : "text-black"}`}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div> */}
            <div className="flex-1 p-4">
                {ContentComponent && <ContentComponent />}
            </div>
        </div>
    );
};

export default Settings;