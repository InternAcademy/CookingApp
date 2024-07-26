import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRecipeById, deleteRecipe } from "../../../http/recipe";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import useFirstPageRecipes from "../../../hooks/useFirstPageRecipes";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const RecipesDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const [loading, setLoading] = useState(false);
  const { getFirstPageRecipes } = useFirstPageRecipes();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getRecipeById", id],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      const userRecipes = await getRecipeById({
        token: token,
        recipeId: id,
      });
      return userRecipes;
    },
  });

  const { mutate } = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      getFirstPageRecipes({ token: token, userId: decodedToken.sub, page: 1 });
      navigation.navigate("Recipes");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  async function deleteThisRecipe() {
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
            <Animatable.Image
              animation="slideInDown"
              duration={700}
              style={tw`w-full h-48 rounded-lg`}
              source={{ uri: data.imageUrl }}
            />
            <View
              style={tw`absolute top-2 right-2 p-2 bg-white rounded-full shadow`}
            >
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={isDarkTheme ? "white" : "black"}
                />
              ) : (
                <TouchableOpacity onPress={deleteThisRecipe}>
                  <View style={tw`bg-white p-1 rounded-full`}>
                    <Ionicons
                      name={data.isArchived ? "trash" : "trash-outline"}
                      size={24}
                      color={"black"}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Animatable.View animation="fadeInLeft" duration={1000} delay={200}>
            <Text
              style={tw`text-2xl font-bold mt-4 ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              {data.title}
            </Text>
          </Animatable.View>
          <Animatable.View animation="fadeInLeft" duration={1000} delay={400}>
            <Text
              style={tw`text-base mt-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
            >
              {data.description}
            </Text>
          </Animatable.View>
          <Animatable.View
            animation="fadeInLeft"
            duration={1000}
            delay={600}
            style={tw`mt-4`}
          >
            <Text
              style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              Preparation time
            </Text>
            <Animatable.Text
              animation="fadeIn"
              duration={1000}
              delay={800}
              style={tw`text-base ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
            >
              Approximately {data.duration} minutes
            </Animatable.Text>
          </Animatable.View>
          <Animatable.View
            animation="fadeInLeft"
            duration={1000}
            delay={1000}
            style={tw`mt-4`}
          >
            <Text
              style={tw`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              Ingredients
            </Text>
            {data.ingredients.map((ingredient, index) => (
              <Animatable.Text
                key={index}
                animation="fadeIn"
                duration={1000}
                delay={1200 + index * 200}
                style={tw`text-base ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                -{" "}
                {`${ingredient.quantity} ${ingredient.metric} ${ingredient.name}`}
              </Animatable.Text>
            ))}
          </Animatable.View>
          <Animatable.View
            animation="fadeInLeft"
            duration={1000}
            delay={1400}
            style={tw`mt-4`}
          >
            <Text
              style={tw`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              Instructions
            </Text>
            {data.preparationSteps.map((step, index) => (
              <Animatable.Text
                key={index}
                animation="fadeIn"
                duration={1000}
                delay={1600 + index * 200}
                style={tw`text-base mt-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                {index + 1}. {step}
              </Animatable.Text>
            ))}
          </Animatable.View>
        </View>
      )}
    </ScrollView>
  );
};

export default RecipesDetails;
