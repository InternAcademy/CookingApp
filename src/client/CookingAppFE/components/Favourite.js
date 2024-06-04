import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";

const Favourite = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={tw`flex-1 bg-white p-6`}>
      <View style={tw`flex-row items-center mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/back.png")} style={tw`w-7 h-7`} />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row items-center mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="heart" size={30} color="#F09A35" />
        </TouchableOpacity>
        <Text style={tw`text-lg text-[#F09A35] pl-2`}>Favorites Recipes</Text>
      </View>
      <Text style={tw`text-lg text-black mb-2`}>Lava Cake</Text>
    </ScrollView>
  );
};

export default Favourite;
