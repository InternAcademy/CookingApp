import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRecipeById, archive } from "../../../http/recipe";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const RecipesDetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [loading, setLoading] = useState(false);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getRecipeById", id],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      const userRecipes = await getRecipeById({
        token: token,
        recipeId: id
      });
      return userRecipes;
    }
  });

  const { mutate } = useMutation({
    mutationFn: archive,
    onSuccess: () => {
      refetch();
      setLoading(false);
    },
    onError: error => {
      // тук можете да добавите обработка на грешки, ако е необходимо
      console.error(error);
      setLoading(false);
    }
  });

  async function archiveThisRecipe() {
    console.log(data);
    const token = await AsyncStorage.getItem("token");
    setLoading(true);

    mutate({ token, recipeId: id });
  }

  return (
    <ScrollView style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      {data && (
        <View style={tw`p-4`}>
          <View style={tw`relative`}>
            <Image style={tw`w-full h-48 rounded-lg`} source={{ uri: data.imageUrl }} />
            <View style={tw`absolute top-2 right-2 p-2 bg-white rounded-full shadow`}>
              {loading ? (
                <ActivityIndicator size="small" color={isDarkTheme ? "white" : "black"} />
              ) : (
                <TouchableOpacity onPress={archiveThisRecipe}>
                  <View style={tw`bg-white p-1 rounded-full`}>
                    <Ionicons name={data.isArchived ? "archive" : "archive-outline"} size={24} color={"black"} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={tw`text-2xl font-bold mt-4 ${isDarkTheme ? "text-white" : "text-black"}`}>{data.title}</Text>
          <Text style={tw`text-base mt-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{data.description}</Text>
          <View style={tw`mt-4`}>
            <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Preparation time</Text>
            <Text style={tw`text-base ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Approximately {data.duration} minutes</Text>
          </View>
          <View style={tw`mt-4`}>
            <Text style={tw`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Ingredients</Text>
            {data.ingredients.map((ingredient, index) => (
              <Text key={index} style={tw`text-base ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
                - {`${ingredient.quantity} ${ingredient.metric} ${ingredient.name}`}
              </Text>
            ))}
          </View>
          <View style={tw`mt-4`}>
            <Text style={tw`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Instructions</Text>
            {data.preparationSteps.map((step, index) => (
              <Text key={index} style={tw`text-base mt-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default RecipesDetails;
