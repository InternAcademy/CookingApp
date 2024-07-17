import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archive } from "../../../http/recipe";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { Ionicons, Entypo } from "@expo/vector-icons";

export default function Recipe({ recipe, refetch }) {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: archive,
    onSuccess: () => {
      queryClient.invalidateQueries(["getRecipes"]);
      queryClient.invalidateQueries(["getRecipeById", recipe.id]);
      refetch();
      setLoading(false);
    },
    onError: error => {
      console.error(error);
      setLoading(false);
    }
  });

  function handleSelection() {
    navigation.navigate("RecipesDetails", { id: recipe.id });
  }

  async function archiveThisRecipe() {
    console.log(recipe);
    const token = await AsyncStorage.getItem("token");
    setLoading(true);

    mutate({ token, recipeId: recipe.id });
  }

  return (
    <TouchableOpacity onPress={handleSelection}>
      <View style={tw`bg-white w-80 m-4 rounded-lg shadow-md overflow-hidden ${isDarkTheme ? "bg-[#303030]" : "bg-white"}`}>
        <Image source={{ uri: recipe.imageUrl }} style={tw`w-full h-40  `} />
        <View style={tw`pt-4 flex flex-col`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-xl px-2 font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.title}</Text>
            
          </View>
          <View style={tw`flex-row px-4 py-2 justify-between items-center`}>
            <View style={tw`flex-row justify-start items-center`}>
              <Ionicons name={"time-sharp"} size={20} color={isDarkTheme ? "white" : "black"} />
              <Text style={tw`text-[16px] font-semibold ml-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.duration}</Text>
            </View>
            <View style={tw`flex-row justify-start items-center`}>
              <Entypo name="bowl" size={20} color={isDarkTheme ? "white" : "black"} />
              <Text style={tw`text-[16px] font-semibold ml-1 pt-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.numberOfPortions}</Text>
            </View>
            {loading ? <ActivityIndicator size="small" color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} /> : <TouchableOpacity onPress={archiveThisRecipe}>{recipe.isArchived ? <Ionicons name={"archive"} size={24} color={isDarkTheme ? "white" : "black"} /> : <Ionicons name={"archive-outline"} size={24} color={isDarkTheme ? "white" : "black"} />}</TouchableOpacity>}
          </View>
         
        </View>
      </View>
    </TouchableOpacity>
  );
}
