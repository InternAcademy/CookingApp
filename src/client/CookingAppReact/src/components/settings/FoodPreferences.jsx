import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function FoodPreferences({
  selectedPreference,
  setSelectedPreference,
}) {
  const language = useSelector((state) => state.ui.lang);
  const { i18n, t } = useTranslation();
  return (
    <>
      <h1 className="font-semibold text-lg mb-4 mt-4">{t("FoodPreferences")}</h1>
      <div className="md:w-1/2 pr-2 bg-secondary">
        <select
          onChange={(e) => setSelectedPreference(e.target.value)}
          className="border border-primaryBorder rounded-lg px-4 py-3 m-1 w-full text-sm shadow-sm bg-secondary"
        >
          <option disabled selected>
            {`Current: ${selectedPreference ? selectedPreference : ""}`}
          </option>
          <option value="none">{t("None")}</option>
          <option value="vegetarian">{t("Vegetarian")}</option>
          <option value="vegan">{t("Vegan")}</option>
        </select>
      </div>
    </>
  );
}
