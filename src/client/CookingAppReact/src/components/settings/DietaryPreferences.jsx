import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredAllergens, setFilteredAllergens] = useState(possibleAllergens);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAlergenInput(value);
    setFilteredAllergens(
      possibleAllergens.filter((alergen) =>
        alergen.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDropdownItemClick = (alergen) => {
    setAlergenInput(alergen);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 pb-6 m-1 bg-secondary rounded-xl border border-primaryBorder shadow-sm py-4 px-4">
        <h2 className="text-lg font-semibold mb-4 primaryText">
          {t("Allergens")}
        </h2>
        {allergens.length > 0 ? (
          <div className="flex flex-wrap mb-4">
            {allergens.map((alergen, index) => (
              <button
                key={index}
                onClick={() => removeAllergen(index)}
                className="border flex items-center rounded-full px-3 py-1 mx-1 mb-2 border-primaryBorder bg-secondary primaryText hover:bg-base hover:shadow-sm"
              >
                {alergen}
                <IoClose className="ml-2" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mb-4">{t("NoAdded")}</p>
        )}

        <input
          type="text"
          value={alergenInput}
          onChange={handleInputChange}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onKeyDown={handleAddAlergenPressEnter}
          className="border rounded-lg px-4 py-2 mb-2 w-full border-primaryBorder bg-secondary primaryText"
          placeholder={t("AddAllergens")}
        />
        {isDropdownOpen && filteredAllergens.length > 0 && (
          <ul className="z-10 w-full mt-1 border border-primaryBorder bg-secondary rounded-lg shadow-lg h-36 overflow-y-auto">
            {filteredAllergens.map((alergen, index) => (
              <li
                key={index}
                onClick={() => handleDropdownItemClick(alergen)}
                className="px-4 py-2 cursor-pointer hover:bg-active"
              >
                {alergen}
              </li>
            ))}
          </ul>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          onClick={handleAddAlergen}
          className="w-full flex items-center justify-center mt-4 transition duration-300 ease-in-out"
        >
          <div className="secondary font-semibold border border-primaryBorder rounded-full py-2 px-5">
            <p className="text-primaryText text-center text-base font-medium">
              {t("AddAllergen")}
            </p>
          </div>
        </button>
      </div>
      <div className="md:w-1/2 pb-6 bg-secondary border border-primaryBorder shadow-sm m-1 rounded-xl py-4 px-4">
        <h2 className="text-lg font-semibold mb-4 primaryText">
          {t("DislikedFoods")}
        </h2>
        {foodPreferences.length > 0 ? (
          <div className="flex flex-wrap mb-4">
            {foodPreferences.map((preference, index) => (
              <button
                key={index}
                onClick={() => handleRemoveFoodPreference(index)}
                className="border flex items-center rounded-full px-3 py-1 mx-1 mb-2 border-primaryBorder bg-secondary primaryText hover:bg-base hover:shadow-sm"
              >
                {preference}
                <IoClose className="ml-2" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mb-4">{t("NoAdded")}</p>
        )}
        <input
          type="text"
          value={foodPreferenceInput}
          onChange={(e) => setFoodPreferenceInput(e.target.value)}
          onKeyDown={handleAddDislikeFoodsPressEnter}
          className="border rounded-lg px-4 py-2 mb-2 w-full border-primaryBorder bg-secondary primaryText"
          placeholder={t("AddDisliked")}
        />
        {foodError && (
          <p className="text-red-500 mb-2 text-center">{foodError}</p>
        )}
        <button
          onClick={handleAddFoodPreference}
          className="w-full flex items-center justify-center mt-4 transition duration-300 ease-in-out"
        >
          <div className="secondary font-semibold border border-primaryBorder rounded-full py-2 px-5">
            <p className="text-primaryText text-center text-base font-medium">
              {t("AddFood")}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
