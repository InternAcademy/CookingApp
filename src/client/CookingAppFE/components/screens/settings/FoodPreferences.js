import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import Autocomplete from "react-native-autocomplete-input";

const FoodPreferences = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const possibleAllergens = ["Peanuts", "Soy", "Egg", "Milk", "Fish", "Wheat", "Shellfish", "Tree nuts", "Sesame", "Mustard", "Celery", "Molluscs", "Sulphites", "Nuts", "Ketchup", "Onion", "Garlic"];
  const [alergens, setAlergens] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [alergenInput, setAlergenInput] = useState("");
  const [foodPreferenceInput, setFoodPreferenceInput] = useState("");
  const [error, setError] = useState("");
  const [foodError, setFoodError] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("none");
  const [filteredAllergens, setFilteredAllergens] = useState([]);

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
        setFilteredAllergens([]); // Изчистване на предложенията
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

  const handleAlergenInputChange = text => {
    setAlergenInput(text);
    if (text) {
      const filtered = possibleAllergens.filter(item => item.toLowerCase().startsWith(text.toLowerCase()));
      setFilteredAllergens(filtered);
    } else {
      setFilteredAllergens([]);
    }
  };

  const handleSuggestionClick = item => {
    setAlergenInput(item);
    setFilteredAllergens([]); // Изчистване на предложенията
  };

  return (
    <FlatList
      data={[{ key: "header" }, { key: "allergens" }, { key: "divider" }, { key: "foodPreferences" }]}
      renderItem={({ item }) => {
        switch (item.key) {
          case "header":
            return (
              <View style={tw`flex-1 items-center p-6`}>
                <Text style={tw`text-lg font-semibold mb-4 text-center ${isDarkTheme ? "text-white" : "text-black"}`}>Food Preferences</Text>
              </View>
            );
          case "allergens":
            return (
              <View style={tw`w-full mb-6 pb-6 ${isDarkTheme ? "bg-[#2a2a2a]" : "bg-zinc-200/50"} rounded-xl py-4 px-4`}>
                <Text style={tw`text-lg font-semibold mb-4 text-center ${isDarkTheme ? "text-white" : "text-black"}`}>Allergens</Text>
                {alergens.length > 0 ? (
                  <View style={tw`flex flex-row flex-wrap mb-4`}>
                    {alergens.map((alergen, index) => (
                      <TouchableOpacity key={index} onPress={() => handleRemoveAlergen(index)}>
                        <Text style={tw`border rounded-full px-3 py-1 mx-1 mb-2 ${isDarkTheme ? "border-amber-200 text-white" : "border-gray-300 bg-white shadow-md text-black"}`}>{alergen}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <Text style={tw`text-gray-500 text-center mb-4`}>No Allergens added</Text>
                )}
                <Autocomplete
                  data={filteredAllergens}
                  defaultValue={alergenInput}
                  onChangeText={handleAlergenInputChange}
                  flatListProps={{
                    keyExtractor: (_, idx) => idx.toString(),
                    renderItem: ({ item }) => (
                      <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
                        <Text style={tw`text-black p-2`}>{item}</Text>
                      </TouchableOpacity>
                    )
                  }}
                  inputContainerStyle={tw`border ${isDarkTheme ? "border-gray-600 bg-gray-200 text-black" : "border-gray-300 bg-white text-black"} rounded-lg px-4 py-2 mb-2`}
                  listContainerStyle={tw`border ${isDarkTheme ? "border-gray-600 bg-gray-200" : "border-gray-300 bg-white"} rounded-lg`}
                />
                {error && <Text style={tw`text-red-500 mb-2 text-center`}>{error}</Text>}
                <TouchableOpacity style={tw`w-full flex items-center justify-center`} onPress={handleAddAlergen}>
                  <View style={tw`w-[200px] py-2 bg-yellow-400 rounded-full flex items-center justify-center`}>
                    <Text style={tw`${isDarkTheme ? "text-black" : "text-black"} text-center text-base font-medium`}>Add Allergen</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          case "divider":
            return <View style={tw`w-full border-b-2 ${isDarkTheme ? "border-amber-200/40" : "border-amber-200/40"} mb-6 items-center justify-center`} />;
          case "foodPreferences":
            return (
              <View style={tw`w-full mb-6 pb-6 ${isDarkTheme ? "bg-[#2a2a2a]" : "bg-zinc-200/50"} rounded-xl py-4 px-4`}>
                <Text style={tw`text-lg font-semibold mb-4 text-center ${isDarkTheme ? "text-white" : "text-black"}`}>Disliked Foods</Text>
                {foodPreferences.length > 0 ? (
                  <View style={tw`flex flex-row flex-wrap mb-4`}>
                    {foodPreferences.map((preference, index) => (
                      <TouchableOpacity key={index} onPress={() => handleRemoveFoodPreference(index)}>
                        <Text style={tw`border rounded-full px-3 py-1 mx-1 mb-2 ${isDarkTheme ? "border-gray-600 text-white" : "border-gray-300 bg-white shadow-md text-black"}`}>{preference}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <Text style={tw`text-gray-500 text-center mb-4`}>There are no disliked foods added</Text>
                )}
                <Picker selectedValue={selectedPreference} onValueChange={(itemValue, itemIndex) => setSelectedPreference(itemValue)} style={tw`border ${isDarkTheme ? "border-gray-600 bg-gray-200 text-black" : "border-gray-300 bg-white text-black"} rounded-lg mb-4`}>
                  <Picker.Item label="None" value="none" />
                  <Picker.Item label="Vegetarian" value="vegetarian" />
                  <Picker.Item label="Vegan" value="vegan" />
                </Picker>
                <TextInput style={tw`border ${isDarkTheme ? "border-gray-600 bg-gray-200 text-black" : "border-gray-300 bg-white text-black"} rounded-lg px-4 py-2 mb-2`} placeholder="Add your disliked foods" placeholderTextColor={isDarkTheme ? "gray" : "black"} value={foodPreferenceInput} onChangeText={setFoodPreferenceInput} />
                {foodError && <Text style={tw`text-red-500 mb-2 text-center`}>{foodError}</Text>}
                <TouchableOpacity style={tw`w-full flex items-center justify-center`} onPress={handleAddFoodPreference}>
                  <View style={tw`w-[200px] py-2 bg-yellow-400 rounded-full flex items-center justify-center`}>
                    <Text style={tw`${isDarkTheme ? "text-black" : "text-black"} text-center text-base font-medium`}>Save Food</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          default:
            return null;
        }
      }}
      keyExtractor={item => item.key}
    />
  );
};

export default FoodPreferences;
