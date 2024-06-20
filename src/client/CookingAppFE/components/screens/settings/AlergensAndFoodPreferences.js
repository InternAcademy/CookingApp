import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

const AlergensAndFoodPreferences = () => {
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text style={tw`text-3xl font-bold mb-6 text-center`}>Alergens And Food Preferences</Text>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Alergens</Text>
          <TextInput style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-2`} placeholder="Add your alergens" />
          <TouchableOpacity style={tw`bg-blue-500 rounded-full py-2 mt-2`}>
            <Text style={tw`text-white text-center text-base font-medium`}>Save Alergens</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Food Preferences</Text>
          <TextInput style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-2`} placeholder="Add your food preferences" />
          <TouchableOpacity style={tw`bg-blue-500 rounded-full py-2 mt-2`}>
            <Text style={tw`text-white text-center text-base font-medium`}>Save Preferences</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AlergensAndFoodPreferences;
