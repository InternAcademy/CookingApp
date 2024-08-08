import { UserIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Settings() {
    const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
    const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);

    const possibleAllergens = [
        "Peanuts", "Soy", "Egg", "Milk", "Fish", "Wheat", "Shellfish", "Tree nuts",
        "Sesame", "Mustard", "Celery", "Molluscs", "Sulphites", "Nuts", "Ketchup", "Onion", "Garlic"
    ];
    const [alergens, setAlergens] = useState([]);
    const [foodPreferences, setFoodPreferences] = useState([]);
    const [alergenInput, setAlergenInput] = useState("");
    const [foodPreferenceInput, setFoodPreferenceInput] = useState("");
    const [selectedPreference, setSelectedPreference] = useState("none");
    const [error, setError] = useState("");
    const [foodError, setFoodError] = useState("");

    const handleAddAlergen = () => {
        const normalizedInput = alergenInput.trim().toLowerCase();
        const normalizedAllergens = possibleAllergens.map(alergen => alergen.toLowerCase());

        if (alergenInput.trim() !== "") {
        if (!normalizedAllergens.includes(normalizedInput)) {
            setError("Allergen not found.");
        } else if (alergens.length >= 12) {
            setError("You can add a maximum of 12 allergens.");
        } else if (alergens.map(alergen => alergen.toLowerCase()).includes(normalizedInput)) {
            setError("Allergen already added.");
        } else {
            setAlergens(prevAlergens => [...prevAlergens, alergenInput.trim()]);
            setAlergenInput("");
            setError("");
        }
        }
    };

    const handleAddFoodPreference = () => {
        if (foodPreferenceInput.trim() !== "") {
        if (foodPreferences.includes(foodPreferenceInput.trim())) {
            setFoodError("Food preference already added.");
        } else {
            setFoodPreferences(prevFoodPreferences => [...prevFoodPreferences, foodPreferenceInput.trim()]);
            setFoodPreferenceInput("");
            setFoodError("");
        }
        }
    };

    const handleRemoveAlergen = indexToRemove => {
        setAlergens(prevAlergens => prevAlergens.filter((_, index) => index !== indexToRemove));
        setError("");
    };

    const handleRemoveFoodPreference = indexToRemove => {
        setFoodPreferences(prevFoodPreferences => prevFoodPreferences.filter((_, index) => index !== indexToRemove));
        setFoodError("");
    };

    const handleAddAlergenPressEnter = event => {
        if (event.key === "Enter") {
        event.preventDefault();
        handleAddAlergen();
        }
    };

    const handleAddDislikeFoodsPressEnter = event => {
        if (event.key === "Enter") {
        event.preventDefault();
        handleAddFoodPreference();
        }
    };

  return (
    <div className={`flex flex-col w-full py-10 overflow-y-auto
        ${isOpenRecipes && isOpenSideBar 
            ? "px-10" 
            : !isOpenRecipes && !isOpenSideBar 
                ? "px-5 sm:px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80" 
                : "px-5 sm:px-10 md:px-10 lg:px-20 xl:px-40 2xl:px-60"}`}>
        <h1 className="font-semibold text-lg mb-4">Profile</h1>
      <div className="flex flex-row justify-between rounded-2xl border py-5 px-5 items-center shadow-sm bg-gray-50">
        <div className="flex flex-row items-center">
          <UserIcon className="size-10 mr-1" />
          <div>
            <h1 className="font-semibold text-lg text-gray-800">David Petkov</h1>
            <h2 className="text-gray-500 font-semibold text-sm flex flex-row items-center text-center">
              Copy User Id <ClipboardDocumentIcon className="ml-1 size-5" />
            </h2>
          </div>
        </div>
        <div className="">
          <button className="bg-gray-200 font-semibold border rounded-full py-2 px-5">Upload</button>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <h1 className="font-semibold text-lg mb-4">Language and Theme</h1>
        <div className="flex flex-col md:flex-row">
          <select className="border rounded-lg px-4 py-3 m-1 md:w-1/2 text-sm shadow-sm">
            <option value="none">Select Language</option>
            <option value="english">English</option>
            <option value="german">German</option>
          </select>
          <select className="border rounded-lg m-1 px-4 py-3 md:w-1/2 text-sm shadow-sm">
            <option value="none">Select Theme</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <h1 className="font-semibold text-lg mb-4 mt-4">Food Preferences</h1>
        {/* Dietary Preference Section */}
        <div className="md:w-1/2 pr-2">
          <select
            value={selectedPreference}
            onChange={(e) => setSelectedPreference(e.target.value)}
            className="border rounded-lg px-4 py-3 m-1 w-full text-sm shadow-sm">
            <option value="none">Select Dietary Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-10 pb-6 m-1 bg-gray-50 rounded-xl border shadow-sm py-4 px-4">
            <h2 className="text-lg font-semibold mb-4 text-black">Allergens</h2>
            {alergens.length > 0 ? (
                <div className="flex flex-wrap mb-4">
                {alergens.map((alergen, index) => (
                    <button
                    key={index}
                    onClick={() => handleRemoveAlergen(index)}
                    className="border flex items-center rounded-full px-3 py-1 mx-1 mb-2 border-gray-300 bg-white text-black shadow-md hover:border-gray-400 hover:bg-gray-100 hover:shadow-lg">
                    {alergen}
                    <IoClose className="ml-2" />
                    </button>
                ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center mb-4">None added</p>
            )}
            <input
                list="allergens"
                value={alergenInput}
                onChange={(e) => setAlergenInput(e.target.value)}
                onKeyDown={handleAddAlergenPressEnter}
                className="border rounded-lg px-4 py-2 mb-2 w-full border-gray-300 bg-white text-black"
                placeholder="Add your allergens" />
            <datalist id="allergens">
                {possibleAllergens.map((alergen, index) => (
                <option key={index} value={alergen} />
                ))}
            </datalist>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button onClick={handleAddAlergen} className="w-full flex items-center justify-center mt-4 transition duration-300 ease-in-out">
                <div className="bg-gray-200 font-semibold border rounded-full py-2 px-5">
                    <p className="text-black text-center text-base font-medium">Add Allergen</p>
                </div>
            </button>
            </div>
            <div className="md:w-1/2 mb-10 pb-6 bg-gray-50 border shadow-sm m-1 rounded-xl py-4 px-4">
            <h2 className="text-lg font-semibold mb-4 text-black">Disliked Foods</h2>
            {foodPreferences.length > 0 ? (
                <div className="flex flex-wrap mb-4">
                {foodPreferences.map((preference, index) => (
                    <button
                    key={index}
                    onClick={() => handleRemoveFoodPreference(index)}
                    className="border flex items-center rounded-full px-3 py-1 mx-1 mb-2 border-gray-300 bg-white text-black shadow-md hover:border-gray-400 hover:bg-gray-100 hover:shadow-lg">
                    {preference}
                    <IoClose className="ml-2" />
                    </button>
                ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center mb-4">None added</p>
            )}
            <input
                type="text"
                value={foodPreferenceInput}
                onChange={(e) => setFoodPreferenceInput(e.target.value)}
                onKeyDown={handleAddDislikeFoodsPressEnter}
                className="border rounded-lg px-4 py-2 mb-2 w-full border-gray-300 bg-white text-black"
                placeholder="Add your disliked foods" />
            {foodError && <p className="text-red-500 mb-2 text-center">{foodError}</p>}
            <button onClick={handleAddFoodPreference} className="w-full flex items-center justify-center mt-4 transition duration-300 ease-in-out">
                <div className="bg-gray-200 font-semibold border rounded-full py-2 px-5">
                    <p className="text-black text-center text-base font-medium">Add Food</p>
                </div>
            </button>
            </div>
        </div>
        <div className="flex justify-center w-full">
            <button className="bg-orange-200 font-semibold border rounded-full py-2 px-5">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
