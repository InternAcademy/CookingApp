// components/FoodPreferences.jsx
"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";

import { useTheme } from "next-themes";
import { IoClose } from "react-icons/io5";

const FoodPreferences = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const possibleAllergens = [
    "Peanuts",
    "Soy",
    "Egg",
    "Milk",
    "Fish",
    "Wheat",
    "Shellfish",
    "Tree nuts",
    "Sesame",
    "Mustard",
    "Celery",
    "Molluscs",
    "Sulphites",
    "Nuts",
    "Ketchup",
    "Onion",
    "Garlic",
  ];
  const [alergens, setAlergens] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [alergenInput, setAlergenInput] = useState("");
  const [foodPreferenceInput, setFoodPreferenceInput] = useState("");
  const [error, setError] = useState("");
  const [foodError, setFoodError] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("none");

  const handleAddAlergen = () => {
    const normalizedInput = alergenInput.trim().toLowerCase();
    const normalizedAllergens = possibleAllergens.map((alergen) =>
      alergen.toLowerCase()
    );

    if (alergenInput.trim() !== "") {
      if (!normalizedAllergens.includes(normalizedInput)) {
        setError("Allergen not found.");
      } else if (alergens.length >= 12) {
        setError("You can add a maximum of 12 allergens.");
      } else if (
        alergens
          .map((alergen) => alergen.toLowerCase())
          .includes(normalizedInput)
      ) {
        setError("Allergen already added.");
      } else {
        setAlergens((prevAlergens) => [...prevAlergens, alergenInput.trim()]);
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
        setFoodPreferences((prevFoodPreferences) => [
          ...prevFoodPreferences,
          foodPreferenceInput.trim(),
        ]);
        setFoodPreferenceInput("");
        setFoodError("");
      }
    }
  };

  const handleRemoveAlergen = (indexToRemove) => {
    setAlergens((prevAlergens) =>
      prevAlergens.filter((_, index) => index !== indexToRemove)
    );
    setError("");
  };

  const handleRemoveFoodPreference = (indexToRemove) => {
    setFoodPreferences((prevFoodPreferences) =>
      prevFoodPreferences.filter((_, index) => index !== indexToRemove)
    );
    setFoodError("");
  };

  const handleSavePreferences = async () => {
    const preferences = { alergens, foodPreferences, selectedPreference };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Success! Your food preferences have been saved successfully!");
    } catch (error) {
      alert(
        "Error! There was an error saving your preferences. Please try again."
      );
    }
  };

  const handleAddAlergenPressEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddAlergen();
    }
  };

  const handleAddDislikeFoodsPressEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddFoodPreference();
    }
  };

  return (
    <div
      className={`${isDarkTheme ? "bg-rgba(18, 18, 18, 1)" : "bg-customWhite"} 
    min-h-screen w-1/2 mx-auto p-6
    smallPhone:w-full
    phone:w-full
    table:w-1/2
    web:w-1/2`}
    >
      <div className="flex flex-col items-center">
        <h1
          className={`text-xl font-semibold mb-4 ${
            isDarkTheme ? "text-white" : "primaryText"
          }`}
        >
          Food Preferences
        </h1>

        <div
          className={`w-full mb-6 pb-6 ${
            isDarkTheme ? "bg-gray-800" : "active"
          } rounded-xl py-4 px-4 
        smallPhone:py-5 smallPhone:px-5 smallPhone:text-sm
        phone:py-6 phone:px-6 phone:text-sm
        tablet:py-7 tablet:px-7 tablet:text-base
        web:py-8 web:px-8 web:text-base`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              isDarkTheme ? "text-white" : "primaryText"
            }`}
          >
            Allergens
          </h2>
          {alergens.length > 0 ? (
            <div className="flex flex-wrap mb-4">
              {alergens.map((alergen, index) => (
                <button
                  key={index}
                  onClick={() => handleRemoveAlergen(index)}
                  className={`border flex items-center rounded-full px-3 py-1 mx-1 mb-2 
                    phone:px-3 phone:py-1.5 phone:text-sm 
                    tablet:px-4 tablet:py-2 tablet:text-base 
                    web:px-3 web:py-1 web:text-base
                    ${
                      isDarkTheme
                        ? "border-blue-500 text-blue-300 bg-gray-800 hover:bg-gray-700 shadow-xl hover:shadow-2xl"
                        : "border-gray-300 bg-white primaryText shadow-md hover:border-gray-400 hover:bg-base hover:shadow-lg"
                    }`}
                >
                  {alergen}
                  <IoClose className="ml-2" />
                </button>
              ))}
            </div>
          ) : (
            <p
              className={`${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              } text-center mb-4`}
            >
              No Allergens added
            </p>
          )}
          <input
            list="allergens"
            value={alergenInput}
            onChange={(e) => setAlergenInput(e.target.value)}
            onKeyDown={handleAddAlergenPressEnter}
            className={`border rounded-lg px-4 py-2 mb-2 w-full 
          phone:px-4 phone:py-2 phone:text-sm 
          tablet:px-4 tablet:py-2 tablet:text-base 
          web:text-base
          ${
            isDarkTheme
              ? "border-gray-600 bg-gray-900 text-white"
              : "border-gray-300 bg-white primaryText"
          }`}
            placeholder="Add your allergens"
          />
          <datalist id="allergens">
            {possibleAllergens.map((alergen, index) => (
              <option key={index} value={alergen} />
            ))}
          </datalist>
          {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
          <button
            onClick={handleAddAlergen}
            className="w-full flex items-center justify-center mt-4 transition duration-300 ease-in-out"
          >
            <div
              className={`w-84 px-14 py-3 bg-customOrange rounded-full flex items-center justify-center border text-sm 
              phone:px-14 phone:py-3 phone:text-sm 
              tablet:px-16 tablet:py-3.5 tablet:text-base 
              web:px-18 web:py-4 web:px-18 web:text-base 
              ${
                isDarkTheme
                  ? "border-gray-600 text-white hover:border-gray-400 hover:text-gray-400 hover:shadow-lg"
                  : "border-gray-300 hover:border-gray-800 hover:text-gray-800 hover:shadow-lg"
              }`}
            >
              <p className="primaryText text-center text-base font-medium">
                Add Allergen
              </p>
            </div>
          </button>
        </div>

        <hr className="w-full border-orange-200 mt-4 mb-8" />

        <div
          className={`w-full mb-6 pb-6 
          ${isDarkTheme ? "bg-gray-800" : "active"} rounded-xl py-4 px-4
        smallPhone:py-5 smallPhone:px-5 
        phone:py-6 phone:px-6 phone:text-sm
        tablet:py-7 tablet:px-7 tablet:text-base
        web:py-8 web:px-8 web:text-base`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              isDarkTheme ? "text-white" : "primaryText"
            }`}
          >
            Disliked Foods
          </h2>
          {foodPreferences.length > 0 ? (
            <div className="flex flex-wrap mb-4">
              {foodPreferences.map((preference, index) => (
                <button
                  key={index}
                  onClick={() => handleRemoveFoodPreference(index)}
                  className={`border flex items-center rounded-full px-3 py-1 mx-1 mb-2 ${
                    isDarkTheme
                      ? "border-blue-500 text-blue-300 bg-gray-800 hover:bg-gray-700 shadow-xl hover:shadow-2xl"
                      : "border-gray-300 bg-white primaryText shadow-md hover:border-gray-400 hover:bg-base hover:shadow-lg"
                  }
                    phone:px-3 phone:py-1.5 phone:text-sm 
                    tablet:px-4 tablet:py-2 tablet:text-base
                    web:px-3 web:py-1 web:text-base
                    `}
                >
                  {preference}
                  <IoClose className="ml-2" />
                </button>
              ))}
            </div>
          ) : (
            <p
              className={`${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              } text-center mb-4`}
            >
              There are no disliked foods added
            </p>
          )}
          <input
            type="text"
            value={foodPreferenceInput}
            onChange={(e) => setFoodPreferenceInput(e.target.value)}
            onKeyDown={handleAddDislikeFoodsPressEnter}
            className={`border rounded-lg px-4 py-2 mb-2 w-full 
            phone:px-4 phone:py-2 phone:text-sm 
            tablet:px-4 tablet:py-2 tablet:text-base  
            web:text-base
          ${
            isDarkTheme
              ? "border-gray-600 bg-gray-900 text-white"
              : "border-gray-300 bg-white primaryText"
          }`}
            placeholder="Add your disliked foods"
          />
          {foodError && (
            <p className="text-red-500 mb-2 text-center">{foodError}</p>
          )}
          <button
            onClick={handleAddFoodPreference}
            className="w-full flex items-center justify-center mt-2 transition duration-300 ease-in-out"
          >
            <div
              className={`w-84 px-16 py-3 my-3 bg-customOrange rounded-full flex items-center justify-center border ${
                isDarkTheme
                  ? "border-gray-600 hover:border-gray-400 hover:text-gray-400"
                  : "border-gray-300 hover:border-gray-800 hover:text-gray-800 hover:shadow-lg"
              }
            phone:px-18 phone:py-3 phone:text-sm 
            tablet:px-20 tablet:py-3.5 tablet:text-base 
            web:px-20 web:py-4 web:text-base
            `}
            >
              <p className="primaryText text-center text-base font-medium">
                Add Food
              </p>
            </div>
          </button>
          <div className="mt-4">
            <select
              value={selectedPreference}
              onChange={(e) => setSelectedPreference(e.target.value)}
              className={`border rounded-lg px-4 py-2 w-full ${
                isDarkTheme
                  ? "border-gray-600 bg-gray-900 text-white"
                  : "border-gray-300 bg-white primaryText"
              }
            text-sm smallPhone:px-4 smallPhone:py-2.5 
            phone:px-4 phone:py-2.5 phone:text-sm 
            tablet:px-5 tablet:py-3 tablet:text-base 
            web:px-6 web:py-3.5 web:text-base
            `}
            >
              <option value="none">None</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSavePreferences}
          className="w-full flex items-center justify-center mt-4 mb-8 transition duration-300 ease-in-out"
        >
          <div
            className={`w-84 px-16 py-3 bg-green-500 rounded-full flex items-center justify-center border ${
              isDarkTheme
                ? "border-gray-600 hover:border-gray-400 hover:text-gray-400"
                : "border-gray-300 hover:border-gray-800 hover:text-gray-800 hover:shadow-lg"
            }
            phone:px-18 phone:py-3 phone:text-sm 
            tablet:px-20 tablet:py-3.5 tablet:text-base 
            web:px-18 web:py-4 web:px-20 web:text-base
            `}
          >
            <p className="text-center text-base font-medium text-slate-50">
              Save Food
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FoodPreferences;
