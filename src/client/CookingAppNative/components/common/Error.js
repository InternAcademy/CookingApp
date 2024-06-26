import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Error = ({ err }) => {
  return (
    <View style={tw`p-4 bg-red-100 rounded`}>
      <Text style={tw`text-red-600 font-bold`}>An error occurred - "{err.message}". Refresh the page and try again later.</Text>
    </View>
  );
};

export default Error;
