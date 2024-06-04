import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const Favourite = () => {
  return (
    <View style={tw`mx-4`}>
      <Text style={tw`text-lg font-bold mt-4 mb-2`}>Favorite Recipes</Text>
      <View style={tw`bg-gray-200 py-4 px-2 rounded-md`}>
        <Text style={tw`text-base font-medium`}>Lava Cake</Text>
      </View>
    </View>
  );
};

export default Favourite;
