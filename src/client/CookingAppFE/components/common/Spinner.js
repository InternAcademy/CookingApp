import React from "react";
import { View, ActivityIndicator } from "react-native";
import tw from "twrnc";

const Spinner = ({ size = "large", color = "#0000ff" }) => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Spinner;
