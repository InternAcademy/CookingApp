import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFoodPreferences from "../../../hooks/useFoodPreferences";
import { jwtDecode } from "jwt-decode";
import { checkUserStatus } from "../../../http/user";
import { userActions } from "../../../redux/userSlice";
import * as Animatable from "react-native-animatable";

// Replace with your API calls
const api = {
  addAllergen: async (token, allergen) => {
    // Implement API call to add allergen
  },
  removeAllergen: async (token, allergen) => {
    // Implement API call to remove allergen
  },
  addAvoidedFood: async (token, avoidedFood) => {
    // Implement API call to add avoided food
  },
  removeAvoidedFood: async (token, avoidedFood) => {
    // Implement API call to remove avoided food
  },
  savePreferences: async (token, userId, preferences) => {
    // Implement API call to save preferences
  },
};

const FoodPreferences = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const dispatch = useDispatch();
  const dietaryPreferences = useSelector((state) => state.user.dietaryPreferences);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const response = await checkUserStatus({ token });
      if (response.status !== 401) {
        const body = await response.json();
        dispatch(
          userActions.setDietaryPreferences({
            allergies: body.data.allergies,
            avoidedFoods: body.data.avoidedFoods,
            dietaryPreference: body.data.dietaryPreference,
          })
        );
      }
    };
    checkToken();
  }, [dispatch]);

  const possibleAllergens = [
    "Peanuts", "Soy", "Egg", "Milk", "Fish", "Wheat", "Shellfish", "Tree nuts", "Sesame", "Mustard", "Celery", "Molluscs", "Sulphites", "Nuts", "Ketchup", "Onion", "Garlic",
  ];

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Gluten-Free", "Paleo", "Ketogenic", "No diet"
  ];

  const [dietType, setDietType] = useState([]);
  const [alergens, setAlergens] = useState([]);
  const [avoidedFoods, setAvoidedFoods] = useState([]);
  const [alergenInput, setAlergenInput] = useState("");
  const [avoidedFoodInput, setAvoidedFoodInput] = useState("");
  const [allergenError, setAllergenError] = useState("");
  const [avoidedFoodError, setAvoidedFoodError] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [filteredAllergens, setFilteredAllergens] = useState([]);
  const { save, isSaving } = useFoodPreferences();

  useEffect(() => {
    setAlergens(dietaryPreferences.allergies);
    setAvoidedFoods(dietaryPreferences.avoidedFoods);
    setSelectedPreferences(dietaryPreferences.dietaryPreference || []);
  }, [dietaryPreferences]);

  useEffect(() => {
    if (alergenInput.trim() === "") {
      setFilteredAllergens([]);
    } else {
      const normalizedAlergens = alergens.map((alergen) => alergen.toLowerCase());
      const filtered = possibleAllergens.filter((alergen) =>
        alergen.toLowerCase().includes(alergenInput.trim().toLowerCase()) &&
        !normalizedAlergens.includes(alergen.toLowerCase())
      );
      setFilteredAllergens(filtered);
    }
  }, [alergenInput, alergens]);

  const handleAddAlergen = async (allergen) => {
    const normalizedInput = allergen.trim().toLowerCase();
    const normalizedAllergens = possibleAllergens.map((alergen) => alergen.toLowerCase());

    if (allergen.trim() !== "") {
      if (!normalizedAllergens.includes(normalizedInput)) {
        setAllergenError("Allergen not found.");
      } else if (alergens.length >= 12) {
        setAllergenError("You can add a maximum of 12 allergens.");
      } else if (alergens.map((alergen) => alergen.toLowerCase()).includes(normalizedInput)) {
        setAllergenError("Allergen already added.");
      } else {
        const token = await AsyncStorage.getItem("token");
        await api.addAllergen(token, allergen.trim());
        setAlergens((prevAlergens) => [...prevAlergens, allergen.trim()]);
        setAlergenInput("");
        setFilteredAllergens((prev) => prev.filter((item) => item.toLowerCase() !== normalizedInput));
        setAllergenError("");
      }
    }
  };

  const handleRemoveAlergen = async (indexToRemove) => {
    const allergen = alergens[indexToRemove];
    const token = await AsyncStorage.getItem("token");
    await api.removeAllergen(token, allergen);
    setAlergens((prevAlergens) => prevAlergens.filter((_, index) => index !== indexToRemove));
    setAllergenError("");
  };

  const handleAddAvoidedFood = async () => {
    if (avoidedFoodInput.trim() !== "") {
      if (avoidedFoods.length >= 3) {
        setAvoidedFoodError("You can add a maximum of 3 avoided foods.");
      } else if (avoidedFoods.includes(avoidedFoodInput.trim())) {
        setAvoidedFoodError("Avoided food already added.");
      } else {
        const token = await AsyncStorage.getItem("token");
        await api.addAvoidedFood(token, avoidedFoodInput.trim());
        setAvoidedFoods((prevFoods) => [...prevFoods, avoidedFoodInput.trim()]);
        setAvoidedFoodInput("");
        setAvoidedFoodError("");
      }
    }
  };

  const handleRemoveAvoidedFood = async (indexToRemove) => {
    const avoidedFood = avoidedFoods[indexToRemove];
    const token = await AsyncStorage.getItem("token");
    await api.removeAvoidedFood(token, avoidedFood);
    setAvoidedFoods((prevFoods) => prevFoods.filter((_, index) => index !== indexToRemove));
    setAvoidedFoodError("");
  };

  const handleSavePreferences = async () => {
    const preferences = { alergens, avoidedFoods, dietaryPreference: selectedPreferences };
    const token = await AsyncStorage.getItem("token");
    const decode = jwtDecode(token);
    await api.savePreferences(token, decode.sub, preferences);
    save(preferences);
  };

  useEffect(() => {
    if (isSaving) {
      Alert.alert(
        "Success",
        "Your food preferences have been saved successfully!",
        [{ text: "OK" }]
      );
    }
  }, [isSaving]);

  return (
    <View style={tw`flex-1 mx-8`}>
      {/* Header */}
      <View style={tw`flex items-center my-4`}>
        <Text style={tw`text-xl font-medium ${isDarkTheme ? "text-gray-200" : "text-gray-700"} `}>Personal preferences</Text>
      </View>
      
      {/* Allergens */}
      <View style={tw`flex justify-center bg-gray-300 rounded-xl py-2 px-2`}>
        <Text style={tw`text-xl font-medium pb-2 text-center ${isDarkTheme ? "text-black" : "text-gray-800"} shadow-amber-200 z-10`}>Allergens</Text>
        {alergens.length === 0 ? (
          <Text style={tw`text-sm font-medium text-gray-400 pb-4 text-center`}>
            No Allergens added
          </Text>
        ) : (
          <View style={tw`flex-row flex-wrap `}>
            {alergens.map((item, index) => (
              <Animatable.View
                animation="bounceIn"
                duration={500}
                key={index}
                style={tw`m-1`}
              >
                <TouchableOpacity
                  style={tw`px-4 py-1 bg-amber-400 rounded-full`}
                  onPress={() => handleRemoveAlergen(index)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
        )}
        <TextInput
          style={tw`border text-black bg-white/80 px-4 py-2 rounded-full mt-4 mb-2 w-10/12 self-center`}
          placeholder="Enter allergen"
          value={alergenInput}
          onChangeText={setAlergenInput}
        />
        {allergenError ? <Animatable.Text animation="bounceIn" duration={500} style={tw`text-red-500 mb-1 text-center`}>{allergenError}</Animatable.Text> : null}
        {filteredAllergens.length > 0 && (
          <View style={tw`flex-row flex-wrap w-11/12 self-start`}>
            {filteredAllergens.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAddAlergen(item)}
                style={tw`py-1 px-2 bg-white/70 rounded-xl mb-2 m-1`}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={() => handleAddAlergen(alergenInput)}
          style={tw`bg-gray-400 p-2 rounded-lg mt-2 w-1/2 self-center mb-2`}
        >
          <Text style={tw`text-white text-center font-medium`}>Add Allergen</Text>
        </TouchableOpacity>
      </View>
      
      {/* Separator */}
      <View style={tw`my-4 border-1 border-b ${isDarkTheme ? "border-amber-400/70" : "border-amber-400/70"} `}></View>
      
      {/* Avoided Foods */}
      <View style={tw`flex justify-center bg-gray-300 rounded-xl py-2 px-2`}>
        <Text style={tw`text-xl font-medium pb-2 text-center ${isDarkTheme ? "text-black" : "text-gray-800"} shadow-amber-200 z-10`}>Avoided Foods</Text>
        {avoidedFoods.length === 0 ? (
          <Text style={tw`text-sm font-medium text-gray-400 pb-4 text-center`}>
            No Avoided Foods added
          </Text>
        ) : (
          <View style={tw`flex-row flex-wrap`}>
            {avoidedFoods.map((item, index) => (
              <Animatable.View
                animation="bounceIn"
                duration={500}
                key={index}
                style={tw`m-1`}
              >
                <TouchableOpacity
                  style={tw`px-4 py-1 bg-amber-400 rounded-full`}
                  onPress={() => handleRemoveAvoidedFood(index)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
        )}
        <TextInput
          style={tw`border text-black bg-white/80 px-4 py-2 rounded-full mt-4 mb-2 w-10/12 self-center`}
          placeholder="Enter avoided food"
          value={avoidedFoodInput}
          onChangeText={setAvoidedFoodInput}
        />
        {avoidedFoodError ? <Animatable.Text animation="bounceIn" duration={500} style={tw`text-red-500 mb-1 text-center`}>{avoidedFoodError}</Animatable.Text> : null}
        <TouchableOpacity
          onPress={() => handleAddAvoidedFood()}
          style={tw`bg-gray-400 p-2 rounded-lg mt-2 w-1/2 self-center mb-2`}
        >
          <Text style={tw`text-white text-center font-medium`}>Add Avoided Food</Text>
        </TouchableOpacity>
      </View>
      
      {/* Separator */}
      <View style={tw`my-4 border-1 border-b ${isDarkTheme ? "border-amber-400/70" : "border-amber-400/70"} `}></View>

      {/* Dietary Type */}
      <View style={tw`flex w-full justify-center bg-gray-300 rounded-xl py-2 px-2`}>
        <Text style={tw`text-xl font-medium text-center ${isDarkTheme ? "text-black" : "text-gray-800"} z-10`}>
          Dietary Type
        </Text>
        <Text style={tw`text-sm font-medium text-gray-400 text-center`}>
          {selectedPreferences.length === 0 ? "No Diet Selected" : ""}
        </Text>
        <View style={tw`flex-row flex-wrap w-full`}>
          {dietaryOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setDietType(prevDietType =>
                  prevDietType.includes(option)
                    ? prevDietType.filter(item => item !== option)
                    : [...prevDietType, option]
                );
              }}
              style={tw`py-2 px-4 rounded-full m-1 ${dietType.includes(option) ? 'bg-amber-200' : 'bg-zinc-100'}`}
            >
              <Text style={tw`${dietType.includes(option) ? 'text-gray-800' : 'text-gray-500'}`}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => handleSavePreferences()}
          style={tw`bg-gray-400 p-2 rounded-lg mt-4 w-1/2 self-center mb-2`}
        >
          <Text style={tw`text-white text-center font-medium`}>Save Diet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodPreferences;
