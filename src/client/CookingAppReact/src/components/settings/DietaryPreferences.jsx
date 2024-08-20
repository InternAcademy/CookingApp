import { useState } from "react";
import { IoClose } from "react-icons/io5";
export default function DietaryPreferences({
  possibleAllergens,
  error,
  foodError,
  allergens,
  removeAllergen,
  alergenInput,
  setAlergenInput,
  handleRemoveFoodPreference,
  handleAddAlergenPressEnter,
  handleAddAlergen,
  foodPreferences,
  foodPreferenceInput,
  setFoodPreferenceInput,
  handleAddDislikeFoodsPressEnter,
  handleAddFoodPreference,
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 pb-6 m-1 bg-secondary rounded-xl border shadow-sm py-4 px-4">
        <h2 className="text-lg font-semibold mb-4 primaryText">Allergens</h2>
        {allergens.length > 0 ? (
          <div className="flex flex-wrap mb-4">
            {allergens.map((alergen, index) => (
              <button
                key={index}
                onClick={() => removeAllergen(index)}
                className="border flex items-center rounded-full px-3 py-1 mx-1 mb-2 border-gray-300 bg-secondary primaryText shadow-md hover:border-gray-400 hover:bg-base hover:shadow-lg"
              >
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
          className="border rounded-lg px-4 py-2 mb-2 w-full border-gray-300 bg-secondary primaryText"
          placeholder="Add your allergens"
        />
        <datalist id="allergens">
          {possibleAllergens.map((alergen, index) => (
            <option key={index} value={alergen} />
          ))}
        </datalist>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          onClick={handleAddAlergen}
          className="w-full flex items-center justify-center mt-4 transition duration-300 ease-in-out"
        >
          <div className="secondary font-semibold border rounded-full py-2 px-5">
            <p className="text-primaryText text-center text-base font-medium">
              Add Allergen
            </p>
          </div>
        </button>
      </div>
      <div className="md:w-1/2 pb-6 bg-secondary border shadow-sm m-1 rounded-xl py-4 px-4">
        <h2 className="text-lg font-semibold mb-4 primaryText">
          Disliked Foods
        </h2>
        {foodPreferences.length > 0 ? (
          <div className="flex flex-wrap mb-4">
            {foodPreferences.map((preference, index) => (
              <button
                key={index}
                onClick={() => handleRemoveFoodPreference(index)}
                className="border flex items-center rounded-full px-3 py-1 mx-1 mb-2 border-gray-300 bg-secondary primaryText shadow-md hover:border-gray-400 hover:bg-base hover:shadow-lg"
              >
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
          className="border rounded-lg px-4 py-2 mb-2 w-full border-gray-300 bg-secondary primaryText"
          placeholder="Add your disliked foods"
        />
        {foodError && (
          <p className="text-red-500 mb-2 text-center">{foodError}</p>
        )}
        <button
          onClick={handleAddFoodPreference}
          className="w-full flex items-center justify-center mt-4 transition duration-300 ease-in-out"
        >
          <div className="secondary font-semibold border rounded-full py-2 px-5">
            <p className="text-primaryText text-center text-base font-medium">
              Add Food
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
