// components/FoodPreferences.jsx
"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

const FoodPreferences = () => {
  const { theme } = useTheme();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const possibleAllergens = ["Peanuts", "Soy", "Egg", "Milk", "Fish", "Wheat", "Shellfish", "Tree nuts", "Sesame", "Mustard", "Celery", "Molluscs", "Sulphites", "Nuts", "Ketchup", "Onion", "Garlic"];
  const [alergens, setAlergens] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [alergenInput, setAlergenInput] = useState("");
  const [foodPreferenceInput, setFoodPreferenceInput] = useState("");
  const [error, setError] = useState("");
  const [foodError, setFoodError] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("none");

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

  const handleSavePreferences = async () => {
    const preferences = { alergens, foodPreferences, selectedPreference };
    console.log("Saving preferences:", preferences);

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulating a successful save
      alert("Success! Your food preferences have been saved successfully!");
    } catch (error) {
      alert("Error! There was an error saving your preferences. Please try again.");
    }
  };

  return (
    <div className={`${isDarkTheme ? "bg-gray-900" : "bg-white"} min-h-screen p-6`}>
      <div className="flex flex-col items-center">
        <h1 className={`text-lg font-semibold mb-4 ${isDarkTheme ? "text-white" : "text-black"}`}>Food Preferences</h1>

        <div className={`w-full mb-6 pb-6 ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"} rounded-xl py-4 px-4`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkTheme ? "text-white" : "text-black"}`}>Allergens</h2>
          {alergens.length > 0 ? (
            <div className="flex flex-wrap mb-4">
              {alergens.map((alergen, index) => (
                <button key={index} onClick={() => handleRemoveAlergen(index)} className={`border rounded-full px-3 py-1 mx-1 mb-2 ${isDarkTheme ? "border-amber-200 text-white" : "border-gray-300 bg-white shadow-md text-black"}`}>
                  {alergen}
                </button>
              ))}
            </div>
          ) : (
            <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-500"} text-center mb-4`}>No Allergens added</p>
          )}
          <input list="allergens" value={alergenInput} onChange={e => setAlergenInput(e.target.value)} className={`border rounded-lg px-4 py-2 mb-2 w-full ${isDarkTheme ? "border-gray-600 bg-gray-900 text-white" : "border-gray-300 bg-white text-black"}`} placeholder="Add your allergens" />
          <datalist id="allergens">
            {possibleAllergens.map((alergen, index) => (
              <option key={index} value={alergen} />
            ))}
          </datalist>
          {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
          <button onClick={handleAddAlergen} className="w-full flex items-center justify-center">
            <div className={`w-84 py-3 bg-customOrange rounded-full flex items-center justify-center border ${isDarkTheme ? "border-gray-600" : "border-gray-300"}`}>
              <p className="text-black text-center text-base font-medium">Add Allergen</p>
            </div>
          </button>
        </div>

        <div className={`w-full mb-6 pb-6 ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"} rounded-xl py-4 px-4`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkTheme ? "text-white" : "text-black"}`}>Disliked Foods</h2>
          {foodPreferences.length > 0 ? (
            <div className="flex flex-wrap mb-4">
              {foodPreferences.map((preference, index) => (
                <button key={index} onClick={() => handleRemoveFoodPreference(index)} className={`border rounded-full px-3 py-1 mx-1 mb-2 ${isDarkTheme ? "border-gray-600 text-white" : "border-gray-300 bg-white shadow-md text-black"}`}>
                  {preference}
                </button>
              ))}
            </div>
          ) : (
            <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-500"} text-center mb-4`}>There are no disliked foods added</p>
          )}
          <input type="text" value={foodPreferenceInput} onChange={e => setFoodPreferenceInput(e.target.value)} className={`border rounded-lg px-4 py-2 mb-2 w-full ${isDarkTheme ? "border-gray-600 bg-gray-900 text-white" : "border-gray-300 bg-white text-black"}`} placeholder="Add your disliked foods" />
          {foodError && <p className="text-red-500 mb-2 text-center">{foodError}</p>}
          <button onClick={handleAddFoodPreference} className="w-full flex items-center justify-center">
            <div className={`w-84 py-3 bg-customOrange rounded-full flex items-center justify-center border ${isDarkTheme ? "border-gray-600" : "border-gray-300"}`}>
              <p className="text-black text-center text-base font-medium">Add Food</p>
            </div>
          </button>
          <div className="mt-4">
            <select value={selectedPreference} onChange={e => setSelectedPreference(e.target.value)} className={`border rounded-lg px-4 py-2 w-full ${isDarkTheme ? "border-gray-600 bg-gray-900 text-white" : "border-gray-300 bg-white text-black"}`}>
              <option value="none">None</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
        </div>

        <button onClick={handleSavePreferences} className="w-full flex items-center justify-center mt-4 mb-8">
          <div className={`w-84 py-3 bg-green-500 rounded-full flex items-center justify-center border ${isDarkTheme ? "border-gray-600" : "border-gray-300"}`}>
            <p className="text-black text-center text-base font-medium">Save Food</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FoodPreferences;
