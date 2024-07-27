import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultShouldDehydrateMutation,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getRecipes } from "../../../http/recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Line } from "react-native-svg";
import Recipe from "./Recipe";
import * as Animatable from "react-native-animatable";
import { uiActions } from "../../../redux/uiSlice";
import useFirstPageRecipes from "../../../hooks/useFirstPageRecipes";
import { userActions } from "../../../redux/userSlice";

const Recipes = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const filteredRecipes = useSelector((state) => state.ui.filteredRecipes);

  const [input, setInput] = useState("");
  const { getFirstPageRecipes } = useFirstPageRecipes();
  const dispatch = useDispatch();
  const { mutate: loadMoreRecipes, isPending: gettingMovies } = useMutation({
    mutationFn: getRecipes,
    onMutate: () => {},
    onSuccess: (data) => {
      dispatch(uiActions.loadMore(data));
    },
  });

  useEffect(() => {
    async function getData() {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      getFirstPageRecipes({ token: token, userId: decodedToken.sub, page: 1 });
    }
    getData();
  }, []);

  const clearSearch = () => {
    setInput("");
  };
  const CustomCloseIcon = ({ color }) => (
    <Svg height="14" width="14" viewBox="0 0 14 14">
      <Line
        x1="1"
        y1="1"
        x2="13"
        y2="13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="1"
        y1="13"
        x2="13"
        y2="1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
  async function loadMore() {
    const token = await AsyncStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    loadMoreRecipes({
      token: token,
      userId: decodedToken.sub,
      page: filteredRecipes.page + 1,
    });
  }

  return (
    <ScrollView
      style={tw`flex flex-col ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
      contentContainerStyle={tw`items-center`}
    >
      <View style={tw`flex-row justify-between items-center px-4 py-2 w-86 `}>
        {/* <View
          style={tw`flex-row items-center flex-1 border ${isDarkTheme ? "border-gray-700" : "border-gray-300"} rounded-md`}
        >
          <TouchableOpacity style={tw`ml-2`}>
            <MaterialIcons
              name="search"
              size={24}
              color={isDarkTheme ? "white" : "black"}
            />
          </TouchableOpacity>
          <TextInput
            style={tw`flex-1 p-2 ${isDarkTheme ? "text-white" : "text-black"}`}
            placeholder="Search for recipes"
            placeholderTextColor={isDarkTheme ? "gray" : "darkgray"}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          {input !== "" && (
            <TouchableOpacity onPress={clearSearch} style={tw`pr-3 pl-2`}>
              <CustomCloseIcon color={isDarkTheme ? "white" : "black"} />
            </TouchableOpacity>
          )}
        </View> */}
      </View>
      {filteredRecipes.recipes &&
        filteredRecipes.recipes.map((recipe, index) => (
          <Animatable.View
            key={recipe.id}
            animation="fadeInLeft"
            duration={700}
            delay={index * 400} // добавям закънснение на вскеи един елемент
            useNativeDriver
          >
            <Recipe recipe={recipe} />
          </Animatable.View>
        ))}
      {filteredRecipes.page !== filteredRecipes.totalPages && (
        <TouchableOpacity onPress={loadMore} style={tw`pr-3 pl-2`}>
          <Text>Load more...</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Recipes;
