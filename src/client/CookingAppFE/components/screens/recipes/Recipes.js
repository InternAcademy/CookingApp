import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../../../http/recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Error from "../../common/Error";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
const Recipes = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const navigation = useNavigation();
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

  useEffect(() => {
    console.log(data);
  }, [data]);
  function handleSelection(id) {
    console.log("hellop");
    navigation.navigate("RecipesDetails", { id });
  }
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
        data.map((recipe) => (
          <TouchableOpacity onPress={() => handleSelection(recipe.id)}>
            <View
              key={recipe.id}
              style={tw`bg-white w-9/11 m-4 rounded-lg shadow-md overflow-hidden ${isDarkTheme ? "bg-[#303030]" : "bg-white"}`}
              on
            >
              <Image
                source={{ uri: recipe.imageUrl }}
                style={tw`w-full h-40`}
              />
              <View style={tw`p-4 flex flex-col`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text
                    style={tw`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
                  >
                    {recipe.title}
                  </Text>
                  <TouchableOpacity>
                    <FontAwesome name={"heart"} size={24} color={"red"} />
                  </TouchableOpacity>
                </View>
                <Text
                  style={tw`text-md font-normal ${isDarkTheme ? "text-white" : "text-black"}`}
                >
                  Duration: {recipe.duration}
                </Text>
                <Text
                  style={tw`text-md font-normal ${isDarkTheme ? "text-white" : "text-black"}`}
                >
                  Number of portions: {recipe.numberOfPortions}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default Recipes;
