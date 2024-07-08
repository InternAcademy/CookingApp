import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useSelector } from 'react-redux';

const AlergensAndFoodPreferences = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const possibleAllergens = [
    'Peanuts',
    'Soy',
    'Egg',
    'Milk',
    'Fish',
    'Wheat',
    'Shellfish',
    'Tree nuts',
    'Sesame',
    'Mustard',
    'Celery',
    'Molluscs',
    'Sulphites',
    'Nuts',
    'Ketchup',
    'Onion',
    'Garlic',    
  ];
  const [alergens, setAlergens] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [alergenInput, setAlergenInput] = useState('');
  const [foodPreferenceInput, setFoodPreferenceInput] = useState('');
  const [error, setError] = useState('');
  const [foodError, setFoodError] = useState('');

  const handleAddAlergen = () => {
    const normalizedInput = alergenInput.trim().toLowerCase();
    const normalizedAllergens = possibleAllergens.map(alergen => alergen.toLowerCase());

    if (alergenInput.trim() !== '') {
      if (!normalizedAllergens.includes(normalizedInput)) {
        setError('Allergen not found.');
      } else if (alergens.length >= 12) {
        setError('You can add a maximum of 12 allergens.');
      } else if (alergens.map(alergen => alergen.toLowerCase()).includes(normalizedInput)) {
        setError('Allergen already added.');
      } else {
        setAlergens((prevAlergens) => [...prevAlergens, alergenInput.trim()]);
        setAlergenInput('');
        setError('');
      }
    }
  };

  const handleAddFoodPreference = () => {
    if (foodPreferenceInput.trim() !== '') {
      if (foodPreferences.includes(foodPreferenceInput.trim())) {
        setFoodError('Food preference already added.');
      } else {
        setFoodPreferences((prevFoodPreferences) => [
          ...prevFoodPreferences,
          foodPreferenceInput.trim(),
        ]);
        setFoodPreferenceInput('');
        setFoodError('');
      }
    }
  };

  const handleRemoveAlergen = (indexToRemove) => {
    setAlergens((prevAlergens) =>
      prevAlergens.filter((_, index) => index !== indexToRemove)
    );
    setError('');
  };

  const handleRemoveFoodPreference = (indexToRemove) => {
    setFoodPreferences((prevFoodPreferences) =>
      prevFoodPreferences.filter((_, index) => index !== indexToRemove)
    );
    setFoodError('');
  };

  return (
    <ScrollView style={tw`flex-1 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text
          style={tw`text-2xl text-right font-bold mb-12 text-center ${
            isDarkTheme ? 'text-white' : 'text-black'
          }`}
        >
          User Food Preferences
        </Text>

        {/* Alergens Section */}
        <View style={tw`w-full mb-6 pb-6 ${isDarkTheme ? 'bg-[#2a2a2a]' : 'bg-zinc-200/50'} rounded-xl py-4`}>
          <Text
            style={tw`text-lg font-semibold mb-2 text-center ${
              isDarkTheme ? 'text-white' : 'text-black'
            }`}
          >
            Allergens
          </Text>
          {alergens.length > 0 ? (
            <>
              <View style={tw`flex flex-row flex-wrap px-1 mb-1`}>
                {alergens.map((alergen, index) => (
                  <TouchableOpacity key={index} onPress={() => handleRemoveAlergen(index)}>
                    <Text
                      style={tw`border rounded-full px-3 py-1 mx-1 mb-2  ${
                        isDarkTheme ? 'border-amber-200   text-white  shadow-white' : 'border-gray-300 bg-white shadow-md text-black '
                      }`}
                    >
                      {alergen}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <Text style={tw`text-gray-500 text-center mb-4`}>No Allergens added</Text>
          )}
          <TextInput
            style={tw`border mx-4 ${
              isDarkTheme ? 'border-gray-600 bg-gray-200 text-black' : 'border-gray-300 bg-white text-black'
            } rounded-lg px-4 py-2 mb-2`}
            placeholder="Add your allergens"
            placeholderTextColor={isDarkTheme ? 'gray' : 'black'}
            value={alergenInput}
            onChangeText={setAlergenInput}
          />
          {error && <Text style={tw`text-red-500 mb-2 text-center`}>{error}</Text>}
          <TouchableOpacity style={tw`w-full flex items-center justify-center`} onPress={handleAddAlergen}>
            <View style={tw`w-[200px] py-2 mt-2 bg-amber-200 rounded-full flex items-center justify-center`}>
              <Text style={tw`${isDarkTheme ? 'text-black' : 'text-black'} text-center text-base font-medium`}>
                Add Allergen
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full border-b-2 ${isDarkTheme ? 'border-amber-200/40' : 'border-amber-200/40'} mb-6 items-center justify-center`}></View>

        {/* Food Preferences Section */}
        <View style={tw`w-full mb-6 pb-6 ${isDarkTheme ? 'bg-[#2a2a2a]' : 'bg-zinc-200/50'} rounded-xl py-4`}>
          <Text
            style={tw`text-lg font-semibold mb-2 text-center ${
              isDarkTheme ? 'text-white' : 'text-black'
            }`}
          >
            Food Preferences
          </Text>
          {foodPreferences.length > 0 ? (
            <>
              <View style={tw`flex flex-row flex-wrap px-1 mb-1`}>
                {foodPreferences.map((preference, index) => (
                  <TouchableOpacity key={index} onPress={() => handleRemoveFoodPreference(index)}>
                    <Text
                      style={tw`border rounded-full px-3 py-1 mx-1 mb-2 ${
                        isDarkTheme ? 'border-gray-600 text-white' : 'border-gray-300 bg-white shadow-md text-black'
                      }`}
                    >
                      {preference}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <Text style={tw`text-gray-500 text-center mb-4`}>There are no food preferences added</Text>
          )}
          <TextInput
            style={tw`mx-4 border ${
              isDarkTheme ? 'border-gray-600 bg-gray-200 text-black' : 'border-gray-300 bg-white text-black'
            } rounded-lg px-4 py-2 mb-2`}
            placeholder="Add your food preferences"
            placeholderTextColor={isDarkTheme ? 'gray' : 'black'}
            value={foodPreferenceInput}
            onChangeText={setFoodPreferenceInput}
          />
          {foodError && <Text style={tw`text-red-500 mb-2`}>{foodError}</Text>}
          <TouchableOpacity style={tw`w-full flex items-center justify-center`} onPress={handleAddFoodPreference}>
            <View style={tw`w-[200px] py-2 mt-2 bg-amber-200 rounded-full flex items-center justify-center`}>
              <Text style={tw`${isDarkTheme ? 'text-black' : 'text-black'} text-center text-base font-medium`}>
                Save Preferences
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AlergensAndFoodPreferences;
