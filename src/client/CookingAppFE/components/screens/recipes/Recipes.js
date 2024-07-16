import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../../../http/recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Svg, { Line } from "react-native-svg";

const Recipes = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getRecipes"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userRecipes = await getRecipes({
        token: token,
        userId: decodedToken.sub
      });
      return userRecipes;
    }
  });

  useEffect(() => {
    if (data) {
      setFilteredRecipes(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(recipe => recipe.title.toLowerCase().includes(input.toLowerCase()));
      setFilteredRecipes(filtered);
    }
  }, [input, data]);

  function handleSelection(id) {
    navigation.navigate("RecipesDetails", { id });
  }

  const clearSearch = () => {
    setInput("");
  };

  const CustomCloseIcon = ({ color }) => (
    <Svg height="14" width="14" viewBox="0 0 14 14">
      <Line x1="1" y1="1" x2="13" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="1" y1="13" x2="13" y2="1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );

  return (
    <ScrollView style={tw`flex flex-col ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`} contentContainerStyle={tw`items-center`}>
      <View style={tw`flex-row justify-between items-center px-4 py-2 w-86 `}>
        <View style={tw`flex-row items-center flex-1 border ${isDarkTheme ? "border-gray-700" : "border-gray-300"} rounded-md`}>
          <TouchableOpacity style={tw`ml-2`} onPress={refetch}>
            <MaterialIcons name="search" size={24} color={isDarkTheme ? "white" : "black"} />
          </TouchableOpacity>
          <TextInput style={tw`flex-1 p-2 ${isDarkTheme ? "text-white" : "text-black"}`} placeholder="Search for recipes" placeholderTextColor={isDarkTheme ? "gray" : "darkgray"} value={input} onChangeText={text => setInput(text)} />
          {input !== "" && (
            <TouchableOpacity onPress={clearSearch} style={tw`pr-3 pl-2`}>
              <CustomCloseIcon color={isDarkTheme ? "white" : "black"} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {filteredRecipes.map(recipe => (
        <TouchableOpacity key={recipe.id} onPress={() => handleSelection(recipe.id)}>
          <View style={tw`bg-white w-80 m-4 rounded-lg shadow-md overflow-hidden ${isDarkTheme ? "bg-[#303030]" : "bg-white"}`}>
            <Image source={{ uri: recipe.imageUrl }} style={tw`w-full h-40`} />
            <View style={tw`p-4 flex flex-col`}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.title}</Text>
                <TouchableOpacity>
                  <FontAwesome name={"heart"} size={24} color={"red"} />
                </TouchableOpacity>
              </View>

              <View style={tw`flex-row justify-start items-center`}>
                <Ionicons name={"time-sharp"} size={20} color={isDarkTheme ? "white" : "black"} />
                <Text style={tw`text-[16px] font-semibold ml-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.duration}</Text>
              </View>
              <View style={tw`flex-row justify-start items-center`}>
                <Entypo name="bowl" size={20} color={isDarkTheme ? "white" : "black"} />
                <Text style={tw`text-[16px] font-semibold ml-1 pt-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.numberOfPortions}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Recipes;
