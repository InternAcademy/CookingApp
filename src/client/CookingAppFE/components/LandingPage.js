import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";

const LandingPage = () => {
  return (
    <View style={tw`flex-1 bg-yellow-500 items-center justify-center p-5`}>
      <View style={tw`mb-8`}>
        <Image
          source={require("../assets/icon.png")}
          style={tw`w-50 h-50 rounded-full`}
        />
      </View>
      <Text style={tw`text-2xl font-bold text-white mb-2`}>
        Let's Get Started
      </Text>
      <Text style={tw`text-lg text-white text-center mb-8`}>
        Easy way to manage all your cooking tasks as easy as tapping your finger
      </Text>
      <TouchableOpacity style={tw`bg-white py-4 px-10 rounded-full`}>
        <Text style={tw`text-lg font-bold text-yellow-500`}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingPage;
