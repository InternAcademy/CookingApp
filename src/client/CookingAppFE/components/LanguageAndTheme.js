import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const LanguageAndTheme = () => {
  return (
    <View style={tw`flex-1 bg-white p-6`}>
      <Text style={tw`text-3xl font-bold mb-6 text-center`}>Language And Theme</Text>

      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Preferences</Text>
        <TextInput style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-2`} placeholder="Language" />
        <TextInput style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-2`} placeholder="Theme" />
        <TouchableOpacity style={tw`bg-blue-500 rounded-full py-2 mt-2`}>
          <Text style={tw`text-white text-center text-base font-medium`}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageAndTheme;
