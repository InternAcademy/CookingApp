import { useState } from "react";

export default function FoodPreferences({
  selectedPreference,
  setSelectedPreference,
}) {
  return (
    <>
      <h1 className="font-semibold text-lg mb-4 mt-4">Food Preferences</h1>
      <div className="md:w-1/2 pr-2 bg-secondary">
        <select
          onChange={(e) => setSelectedPreference(e.target.value)}
          className="border rounded-lg px-4 py-3 m-1 w-full text-sm shadow-sm bg-secondary"
        >
          <option disabled selected>
            {`Current: ${selectedPreference ? selectedPreference : ""}`}
          </option>
          <option value="none">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>
    </>
  );
}
