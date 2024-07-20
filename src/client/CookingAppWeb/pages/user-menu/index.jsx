import React from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaUtensils, FaCreditCard, FaLeaf, FaArchive, FaLanguage, FaFileAlt, FaInfoCircle, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const UserMenu = () => {
  const router = useRouter();
  const isDarkTheme = false; // = useSelector(state => state.ui.isDarkTheme);

  const menuItems = [
    { icon: FaUtensils, label: "Recipes", route: "/recipes" },
    { icon: FaCreditCard, label: "Subscription", route: "/subscription" },
    { icon: FaLeaf, label: "Food Preferences", route: "/food-preferences" },
    { icon: FaArchive, label: "Archived Recipes", route: "/archived-recipes" },
    { icon: FaLanguage, label: "Language & Theme", route: "/language-theme" },
    { icon: FaFileAlt, label: "Rules And Policies", route: "/rules-policies" },
    { icon: FaInfoCircle, label: "About", route: "/about" },
    { icon: FaEnvelope, label: "Contacts", route: "/contact" }
  ];

  return (
    <div className={`flex flex-col items-center ${isDarkTheme ? "bg-[#202020]" : "bg-white"} min-h-screen w-64 p-4`}>
      <div className="flex justify-end w-full mb-8">
        <FaUserCircle className="w-8 h-8" color={isDarkTheme ? "white" : "black"} />
      </div>

      <div className="flex flex-col items-center w-full space-y-6">
        {menuItems.map((item, index) => (
          <button key={index} className="flex flex-col items-center w-full mb-2" onClick={() => router.push(item.route)} title={item.label}>
            <item.icon className="w-6 h-6 mb-1" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-sm ${isDarkTheme ? "text-white" : "text-black"}`}>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto mb-4">
        <button onClick={() => console.log("Sign Out")} className="flex items-center" title="Sign Out">
          <span className={`mr-2 text-sm ${isDarkTheme ? "text-gray-100" : "text-black"}`}>Sign Out</span>
          <FaSignOutAlt className="w-6 h-6" color={isDarkTheme ? "white" : "black"} />
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
