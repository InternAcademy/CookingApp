import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { archive } from "../../../http/recipe";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
export default function Recipe({ recipe, refetch }) {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { mutate } = useMutation({
    mutationFn: archive,
    onSuccess: () => {
      refetch();

      setLoading(false);
    },
    onError: (error) => {
      dispatch(uiActions.setResponseError(error.message));
    },
  });
  function handleSelection() {
    navigation.navigate("RecipesDetails", { id: recipe.id });
  }
  async function archiveThisRecipe() {
    console.log();
    const token = await AsyncStorage.getItem("token");
    setLoading(true);

    mutate({ token, recipeId: recipe.id });
  }
  return (
    <TouchableOpacity onPress={handleSelection}>
      <View
        key={recipe.id}
        style={tw`bg-white w-80 m-4 rounded-lg shadow-md overflow-hidden ${isDarkTheme ? "bg-[#303030]" : "bg-white"}`}
        on
      >
        <Image source={{ uri: recipe.imageUrl }} style={tw`w-full h-40`} />
        <View style={tw`p-4 flex flex-col`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              {recipe.title}
            </Text>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={isDarkTheme ? "white" : "black"}
                style={tw`mr-2`}
              />
            ) : (
              <TouchableOpacity onPress={archiveThisRecipe}>
                {recipe.isArchived ? (
                  <Ionicons name="heart" size={24} color={"red"} />
                ) : (
                  <Ionicons
                    name="heart-outline"
                    size={24}
                    color={isDarkTheme ? "white" : "black"}
                  />
                )}
              </TouchableOpacity>
            )}
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
  );
}
