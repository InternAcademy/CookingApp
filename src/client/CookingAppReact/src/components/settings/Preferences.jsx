import useFoodPreferences from "@/hooks/useFoodPreferences";
import DietaryPreferences from "./DietaryPreferences";
import FoodPreferences from "./FoodPreferences";
import UserInterface from "./UserInterface";
import { useEffect, useState } from "react";
import { getToken } from "@/msal/msal";
import { jwtDecode } from "jwt-decode";
import { useSelect } from "@material-tailwind/react";
import useFetchUserStatus from "../../hooks/useFetchUserStatus";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { checkUserStatus } from "@/http/user";
export default function Preferences() {
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
  const dietaryPreferences = useSelector(
    (state) => state.user.dietaryPreferences
  );
  const [foodPreferenceInput, setFoodPreferenceInput] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("none");

  const [allergens, setAlergens] = useState([]);
  const [alergenInput, setAlergenInput] = useState("");
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [foodError, setFoodError] = useState("");
  const [error, setError] = useState("");
  const { save, isSaving } = useFoodPreferences();
  useEffect(() => {
    console.log(dietaryPreferences.dietaryPreference);
    setAlergens(dietaryPreferences.allergies);
    setFoodPreferences(dietaryPreferences.avoidedFoods);
    setSelectedPreference(dietaryPreferences.dietaryPreference);
  }, [dietaryPreferences]);
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

  const handleAddAlergen = () => {
    const normalizedInput = alergenInput.trim().toLowerCase();
    const normalizedAllergens = possibleAllergens.map((alergen) =>
      alergen.toLowerCase()
    );

    if (alergenInput.trim() !== "") {
      if (!normalizedAllergens.includes(normalizedInput)) {
        setError("Allergen not found.");
      } else if (allergens.length >= 12) {
        setError("You can add a maximum of 12 allergens.");
      } else if (
        allergens
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
  async function savePreferences() {
    const token = await getToken();
    const decoded = jwtDecode(token);
    save({
      token: token,
      userId: decoded.sub,
      allergies: allergens,
      avoidedfoods: foodPreferences,
      dietaryPreference: selectedPreference,
    });
  }
  return (
    <div className="flex flex-col mt-4">
      <UserInterface />
      <FoodPreferences
        selectedPreference={selectedPreference}
        setSelectedPreference={setSelectedPreference}
      />
      <DietaryPreferences
        possibleAllergens={possibleAllergens}
        error={error}
        allergens={allergens}
        alergenInput={alergenInput}
        handleAddFoodPreference={handleAddFoodPreference}
        foodError={foodError}
        foodPreferenceInput={foodPreferenceInput}
        removeAllergen={handleRemoveAlergen}
        setAlergenInput={setAlergenInput}
        handleAddAlergenPressEnter={handleAddAlergenPressEnter}
        handleAddAlergen={handleAddAlergen}
        foodPreferences={foodPreferences}
        handleRemoveFoodPreference={handleRemoveFoodPreference}
        setFoodPreferenceInput={setFoodPreferenceInput}
        handleAddDislikeFoodsPressEnter={handleAddDislikeFoodsPressEnter}
      />
      <div className="flex justify-center w-full">
        <button
          className="bg-orange-200 font-semibold border rounded-full py-2 px-5"
          onClick={savePreferences}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
