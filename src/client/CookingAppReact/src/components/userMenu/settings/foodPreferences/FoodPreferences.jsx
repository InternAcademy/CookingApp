// components/FoodPreferences.jsx
"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const FoodPreferences = () => {
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
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert("Success! Your food preferences have been saved successfully!");
        } catch (error) {
            alert("Error! There was an error saving your preferences. Please try again.");
        }
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
        <div
            className={`min-h-screen w-1/2 mx-auto p-4
                        sm:w-full
                        md:w-full
                        lg:w-2/3
                        xl:w-2/3`
            }>
            <div className="flex flex-col items-center">
                <h1 className={`text-xl font-semibold mb-4`}>Food Preferences</h1>

                <div
                    className={`w-full mb-6 pb-6  rounded-xl py-4 px-4 
                                sm:py-5 sm:px-5 sm:text-sm
                                md:py-6 md:px-6 md:text-sm
                                lg:py-7 lg:px-7 lg:text-base
                                xl:py-8 xl:px-8 xl:text-base`}>
                    <h2 className={`text-lg font-semibold mb-4`}>Allergens</h2>
                    {alergens.length > 0 ? (
                        <div className="flex flex-wrap mb-4">
                            {alergens.map((alergen, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRemoveAlergen(index)}
                                    className={`border flex items-center rounded-full px-3 py-1 mx-1 mb-2 
                                                md:px-3 md:py-1.5 md:text-sm 
                                                lg:px-4 lg:py-2 lg:text-base 
                                                xl:px-3 xl:py-1 xl:text-base`}>
                                    {alergen}
                                    <IoClose className="ml-2" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className={`text-center mb-4`}>No Allergens added</p>
                    )}
                    <input
                        list="allergens"
                        value={alergenInput}
                        onChange={e => setAlergenInput(e.target.value)}
                        onKeyDown={handleAddAlergenPressEnter}
                        className={`border rounded-lg px-4 py-2 mb-2 w-full 
                                    md:px-4 md:py-2 md:text-sm 
                                    lg:px-4 lg:py-2 lg:text-base 
                                    xl:text-base`}
                        placeholder="Add your allergens" />
                    <datalist id="allergens">
                        {possibleAllergens.map((alergen, index) => (
                            <option key={index} value={alergen} />
                        ))}
                    </datalist>
                    {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
                    <button onClick={handleAddAlergen} className="w-full flex items-center justify-center mt-4 transition duration-300 ease-in-out">
                        <div
                            className={`w-84 px-14 py-3 bg-customOrange rounded-full flex items-center justify-center border text-sm 
                                        md:px-14 md:py-3 md:text-sm 
                                        lg:px-16 lg:py-3.5 lg:text-base 
                                        xl:px-18 xl:py-4 xl:px-18 xl:text-base`}>
                            <p className="text-black text-center text-base font-medium">Add Allergen</p>
                        </div>
                    </button>
                </div>

                <hr className="w-full border-orange-200 mt-4 mb-8" />

                <div className={`w-full mb-6 pb-6 rounded-xl py-4 px-4
                                sm:py-5 sm:px-5 
                                md:py-6 md:px-6 md:text-sm
                                lg:py-7 lg:px-7 lg:text-base
                                xl:py-8 xl:px-8 xl:text-base`}>
                    <h2 className={`text-lg font-semibold mb-4`}>Disliked Foods</h2>
                    {foodPreferences.length > 0 ? (
                        <div className="flex flex-wrap mb-4">
                            {foodPreferences.map((preference, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRemoveFoodPreference(index)}
                                    className={`border flex items-center rounded-full px-3 py-1 mx-1 mb-2 
                                                md:px-3 md:py-1.5 md:text-sm 
                                                lg:px-4 lg:py-2 lg:text-base
                                                xl:px-3 xl:py-1 xl:text-base`}>
                                    {preference}
                                    <IoClose className="ml-2" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className={`text-center mb-4`}>There are no disliked foods added</p>
                    )}
                    <input
                        type="text"
                        value={foodPreferenceInput}
                        onChange={e => setFoodPreferenceInput(e.target.value)}
                        onKeyDown={handleAddDislikeFoodsPressEnter}
                        className={`border rounded-lg px-4 py-2 mb-2 w-full 
                                    md:px-4 md:py-2 md:text-sm 
                                    lg:px-4 lg:py-2 lg:text-base  
                                    xl:text-base`}
                        placeholder="Add your disliked foods" />
                    {foodError && <p className="text-red-500 mb-2 text-center">{foodError}</p>}
                    <button
                        onClick={handleAddFoodPreference}
                        className="w-full flex items-center justify-center mt-2 transition duration-300 ease-in-out">
                        <div
                            className={`w-84 px-16 py-3 my-3 bg-customOrange rounded-full flex items-center justify-center border
                                        md:px-18 md:py-3 md:text-sm 
                                        lg:px-20 lg:py-3.5 lg:text-base 
                                        xl:px-20 xl:py-4 xl:text-base`}>
                            <p className="text-black text-center text-base font-medium">Add Food</p>
                        </div>
                    </button>
                    <div className="mt-4">
                        <select
                            value={selectedPreference}
                            onChange={e => setSelectedPreference(e.target.value)}
                            className={`border rounded-lg px-4 py-2 w-full text-sm 
                                        sm:px-4 sm:py-2.5 
                                        md:px-4 md:py-2.5 md:text-sm 
                                        lg:px-5 lg:py-3 lg:text-base 
                                        xl:px-6 xl:py-3.5 xl:text-base`}>
                            <option value="none">None</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                        </select>
                    </div>
                </div>

                <button onClick={handleSavePreferences} className="w-full flex items-center justify-center mt-4 mb-8 transition duration-300 ease-in-out">
                    <div className={`w-84 px-16 py-3 bg-green-500 rounded-full flex items-center justify-center border 
                                    md:px-18 md:py-3 md:text-sm 
                                    lg:px-20 lg:py-3.5 lg:text-base 
                                    xl:px-18 xl:py-4 xl:px-20 xl:text-base`}>
                        <p className="text-center text-base font-medium text-slate-50">Save Food</p>
                    </div>
                </button>

            </div >
        </div >
    );
};

export default FoodPreferences;
