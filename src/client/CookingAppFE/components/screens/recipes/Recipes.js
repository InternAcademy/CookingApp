import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../../../http/recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { MaterialIcons } from "@expo/vector-icons";
import Recipe from "./SavedRecipie";
const Recipes = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  const [input, setInput] = useState("");
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getRecipes"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userRecipes = await getRecipes({
        token: token,
        userId: decodedToken.sub,
      });
      return userRecipes;
    },
  });
  return (
    <ScrollView
      style={tw`flex flex-col ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
      contentContainerStyle={tw`items-center`}
    >
      <View style={tw`flex-row justify-between items-center px-4 py-2`}>
        <TextInput
          style={tw`flex-1 border ${isDarkTheme ? "border-gray-700 text-white" : "border-gray-300 text-black"} p-2 rounded-md`}
          placeholder="Search for recipes"
          placeholderTextColor={isDarkTheme ? "gray" : "darkgray"}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity style={tw`ml-2`} onPress={refetch}>
          <MaterialIcons
            name="search"
            size={24}
            color={isDarkTheme ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      {data &&
        data.map((recipe) => <Recipe recipe={recipe} refetch={refetch} />)}
    </ScrollView>
  );
};

export default Recipes;
