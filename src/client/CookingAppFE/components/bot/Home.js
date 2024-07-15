import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../navigation/NavBar";
import ChatError from "./ChatError";
import ChatInput from "./ChatInput";
import Thinking from "../bot/Thinking";
import { uiActions } from "../../redux/uiSlice";
import useSaveRecipe from "../../hooks/useSaveRecipe";
const Home = () => {
  const navigation = useNavigation();
  const { save, isPending } = useSaveRecipe();
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const isThinking = useSelector((state) => state.ui.isThinking);
  const responseError = useSelector((state) => state.ui.responseError);
  const chat = useSelector((state) => state.user.selectedChat);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkTokeAndTheme = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      const theme = await AsyncStorage.getItem("theme");
      if (!token) {
        navigation.navigate("LandingPage");
      }
      if (theme) {
        console.log(theme);
        dispatch(uiActions.setTheme(theme === "dark" ? "dark" : null));
      }
    };
    checkTokeAndTheme();
  }, []);
  useEffect(() => {
    console.log(isDarkTheme);
  }, [isDarkTheme]);
  async function handleRecipeSave(request) {
    const token = await AsyncStorage.getItem("token");
    save({ token, request });
  }
  const renderPost = () => {
    if (chat) {
      {
        console.log(chat);
      }
      return (
        <SafeAreaView
          style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
        >
          <ScrollView contentContainerStyle={tw`p-6 mt-10`}>
            {chat.content.map((msg, index) => (
              <View
                key={index}
                style={tw`mb-2 flex-row justify-start   wrap  pt-1`}
              >
                <Image
                  source={
                    msg.role === "user"
                      ? require("../../assets/NavigationBar/user.png")
                      : require("../../assets/Main/icon2.png")
                  }
                  style={tw`w-8 h-8 rounded-full mr-2 mb-7 items-start -mt-1`}
                />
                <View>
                  <Text
                    style={tw`text-base font-semibold mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                  >
                    {msg.role === "user" ? "You" : "MealMasterBot"}:
                  </Text>
                  {msg.role === "user" && msg.type === "Text" && (
                    <Text
                      style={tw`text-base mr-4 w-screen mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                    >
                      {msg.content}
                    </Text>
                  )}

                  {msg.role === "user" && msg.type === "Image" && (
                    <Image
                      source={{ uri: msg.content }}
                      style={tw`w-32 h-32 rounded-full mr-2 mb-7`}
                    ></Image>
                  )}
                  {msg.role === "bot" && msg.type === "Recipe" && (
                    <>
                      <Text
                        style={tw`max-w-full mr-12   text-base  mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                      >
                        {msg.content}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleRecipeSave(msg.content)}
                        style={tw`mx-2 self-end`}
                      >
                        {!isPending && (
                          <Ionicons
                            name="heart"
                            size={24}
                            color={isDarkTheme ? "white" : "black"}
                          />
                        )}
                        {isPending && (
                          <ActivityIndicator
                            size="small"
                            color={isDarkTheme ? "white" : "black"}
                            style={tw`mr-2`}
                          />
                        )}
                      </TouchableOpacity>
                    </>
                  )}
                  {msg.role === "bot" && msg.type === "Text" && (
                    <Text
                      style={tw`max-w-full mr-12   text-base  mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                    >
                      {msg.content}
                    </Text>
                  )}
                </View>
              </View>
            ))}
            {isThinking && !responseError && <Thinking />}
            {responseError && <ChatError message={responseError} />}
          </ScrollView>
        </SafeAreaView>
      );
    }

    return (
      <View style={tw`flex w-full h-full justify-center items-center`}>
        <Image
          source={require("../../assets/Main/icon2.png")}
          style={tw`w-26 h-26 mb-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Let's figure out a recipe
        </Text>
        <Text
          style={tw`text-base ${isDarkTheme ? "text-gray-400" : "text-black"}`}
        >
          Begin by typing a message
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={tw`flex pt-22 w-full h-full ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
    >
      <NavBar />
      <FlatList
        data={[{ key: "1" }]}
        renderItem={renderPost}
        keyExtractor={(item) => item.key}
        contentContainerStyle={tw`flex-grow`}
      />
      <View
        style={tw`flex w-full flex-row justify-center mb-5 ${isDarkTheme ? "border-gray-700 bg-[#202020]" : "border-gray-300 bg-white"}`}
      >
        <ChatInput />
      </View>
    </SafeAreaView>
  );
};

export default Home;
