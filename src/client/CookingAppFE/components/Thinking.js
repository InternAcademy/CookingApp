import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons'; // Библиотека за икони

const Thinking = () => {
  return (
    <View style={tw`p-4`}>
      <View style={tw`flex flex-row`}>
        <View style={tw`flex items-center justify-center h-8 w-8 bg-slate-200 mx-2 rounded-full`}>
          <MaterialIcons name="computer" size={24} style={tw`text-black`} />
        </View>
        <View style={tw`flex-1 text-left`}>
          <Text style={tw`text-sm font-thin italic text-slate-600 dark:text-slate-300`}>
            <Text style={tw`animate-pulse text-xl dark:text-white text-black`}>thinking...</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Thinking;
