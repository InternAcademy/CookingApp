import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";

const AlergensAndFoodPreferences = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const [alergens, setAlergens] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [alergenInput, setAlergenInput] = useState("");
  const [foodPreferenceInput, setFoodPreferenceInput] = useState("");
  const [error, setError] = useState("");
  const [foodError, setFoodError] = useState("");

  const handleAddAlergen = () => {
    if (alergenInput.trim() !== "") {
      if (alergens.length >= 12) {
        setError("You can add a maximum of 12 allergens.");
      } else if (alergens.includes(alergenInput.trim())) {
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
        setFoodPreferences((prevFoodPreferences) => [...prevFoodPreferences, foodPreferenceInput.trim()]);
        setFoodPreferenceInput("");
        setFoodError("");
      }
    }
  };

  const handleRemoveAlergen = (indexToRemove) => {
    setAlergens((prevAlergens) => prevAlergens.filter((_, index) => index !== indexToRemove));
    setError("");
  };

  const handleRemoveFoodPreference = (indexToRemove) => {
    setFoodPreferences((prevFoodPreferences) => prevFoodPreferences.filter((_, index) => index !== indexToRemove));
    setFoodError("");
  };

  return (
    <ScrollView style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text
          style={tw`text-3xl font-bold mb-6 text-center ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Allergens And Food Preferences
        </Text>
        
        {!alergens.length && (
          <Text style={tw`text-gray-500 mb-6`}>No allergens added</Text>
        )}
        
        {alergens.length > 0 && (
          <View style={tw`w-full mb-6`}>
            <Text
              style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              Current Allergens
            </Text>
            <View style={tw`flex flex-row flex-wrap`}>
              {alergens.map((alergen, index) => (
                <TouchableOpacity key={index} onPress={() => handleRemoveAlergen(index)}>
                  <Text
                    style={tw`border rounded-full px-3 py-1 mx-1 mb-2 ${isDarkTheme ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}
                  >
                    {alergen}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={tw`w-full mb-6`}>
          <Text
            style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}
          >
            Allergens
          </Text>
          <TextInput
            style={tw`border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-black"} rounded-lg px-4 py-2 mb-2`}
            placeholder="Add your allergens"
            placeholderTextColor={isDarkTheme ? "gray" : "black"}
            value={alergenInput}
            onChangeText={setAlergenInput}
          />
          {error && <Text style={tw`text-red-500 mb-2`}>{error}</Text>}
          <TouchableOpacity
            style={tw`bg-blue-500 rounded-full py-2 mt-2`}
            onPress={handleAddAlergen}
          >
            <Text style={tw`text-white text-center text-base font-medium`}>
              Save Allergens
            </Text>
          </TouchableOpacity>
        </View>

        {!foodPreferences.length && (
          <Text style={tw`text-gray-500 mb-6`}>No food preferences added</Text>
        )}

        {foodPreferences.length > 0 && (
          <View style={tw`w-full mb-6`}>
            <Text
              style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              Current Food Preferences
            </Text>
            <View style={tw`flex flex-row flex-wrap`}>
              {foodPreferences.map((preference, index) => (
                <TouchableOpacity key={index} onPress={() => handleRemoveFoodPreference(index)}>
                  <Text
                    style={tw`border rounded-full px-3 py-1 mx-1 mb-2 ${isDarkTheme ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}
                  >
                    {preference}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={tw`w-full mb-6`}>
          <Text
            style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}
          >
            Food Preferences
          </Text>
          <TextInput
            style={tw`border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-black"} rounded-lg px-4 py-2 mb-2`}
            placeholder="Add your food preferences"
            placeholderTextColor={isDarkTheme ? "gray" : "black"}
            value={foodPreferenceInput}
            onChangeText={setFoodPreferenceInput}
          />
          {foodError && <Text style={tw`text-red-500 mb-2`}>{foodError}</Text>}
          <TouchableOpacity
            style={tw`bg-blue-500 rounded-full py-2 mt-2`}
            onPress={handleAddFoodPreference}
          >
            <Text style={tw`text-white text-center text-base font-medium`}>
              Save Preferences
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AlergensAndFoodPreferences;
