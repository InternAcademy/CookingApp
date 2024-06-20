import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons'; // Библиотека за икони

const Thinking = () => {
  return (
    <View style={tw`p-4 bg-white shadow-lg rounded-lg m-4`}>
      <View style={tw`flex flex-row items-center`}>
        <ActivityIndicator size="small" color="#4f46e5" style={tw`mr-2`} />
        <MaterialIcons name="computer" size={24} style={tw`text-indigo-600`} />
        <Text style={tw`ml-2 text-sm font-semibold italic text-indigo-600`}>thinking...</Text>
      </View>
    </View>
  );
};

export default Thinking;
