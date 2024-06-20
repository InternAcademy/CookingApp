import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const Contacts = () => {
  return (
    <View style={tw`flex-1 p-5 pt-20 bg-amber-100`}>
      <Text style={tw`text-lg text-gray-800 mb-2`}>Subject</Text>
      <TextInput style={tw`h-12 border border-amber-200 rounded-full mb-5 px-3 bg-amber-300`} placeholder="What would you like to talk about?" />
      <Text style={tw`text-lg text-gray-800 mb-2`}>Message</Text>
      <TextInput style={tw`h-64 border border-amber-200 rounded-lg px-3 pt-2 mb-5 bg-amber-300`} placeholder="Enter your message here..." multiline textAlignVertical="top" />
      <TouchableOpacity style={tw`h-12 bg-orange-400 justify-center items-center rounded-full`}>
        <Text style={tw`text-lg text-gray-800`}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;
