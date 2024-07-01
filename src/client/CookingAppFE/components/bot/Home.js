import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Thinking from "../bot/Thinking";
import { useChat } from "../../context/ChatContext";
import { useTheme } from "../../context/ThemeContext";
import { uiActions } from "../../redux/uiSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ChatInput from "./ChatInput";
const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkTheme } = useTheme();
  const isThinking = useSelector((state) => state.ui.isThinking);
  const chat = useSelector((state) => state.user.selectedChat);
  useEffect(() => {
    console.log(isThinking);
  }, [isThinking]);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("LandingPage");
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (route.params?.selectedChat) {
      setSelectedChat(route.params.selectedChat);
    }
  }, [route.params]);

  const renderPost = () => {
    if (chat) {
      // const messages = [
      //   ...chat.content.requests.map((req) => ({
      //     ...req,
      //     role: "user",
      //     content: req.message,
      //   })),
      //   ...selectedChat.responses.map((res) => ({
      //     ...res,
      //     role: "bot",
      //     content: res.message,
      //   })),
      // ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      return (
        <SafeAreaView
          style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
        >
          <ScrollView contentContainerStyle={tw`p-6 mt-10`}>
            <View style={tw`mb-4 flex-row items-center`}>
              <Image
                source={require("../../assets/Main/icon2.png")}
                style={tw`w-8 h-8 rounded-full mr-2 mb-7`}
              />
              <View>
                <Text
                  style={tw`text-base font-semibold mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                >
                  {chat.title}
                </Text>
                <Text
                  style={tw`text-base mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                >
                  {/* Additional details if needed */}
                </Text>
              </View>
            </View>

            {chat.content.map((msg, index) => (
              <View key={index} style={tw`mb-4 flex-row items-center wrap`}>
                <Image
                  source={
                    msg.role === "user"
                      ? require("../../assets/NavigationBar/user.png")
                      : require("../../assets/Main/icon2.png")
                  }
                  style={tw`w-8 h-8 rounded-full mr-2 mb-7`}
                />
                <View>
                  <Text
                    style={tw`text-base font-semibold mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                  >
                    {msg.role === "user" ? "You" : "MealMasterBot"}:
                  </Text>
                  <Text
                    style={tw`text-base w-screen mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                  >
                    {msg.content}
                  </Text>
                </View>
              </View>
            ))}
            {isThinking && <Thinking />}
          </ScrollView>
        </SafeAreaView>
      );
    }

    return (
      <>
        {isThinking ? (
          <Thinking />
        ) : (
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
        )}
      </>
    );
  };

  return (
    <SafeAreaView
      style={tw`flex pt-22 w-full h-full ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
    >
      <FlatList
        data={[{ key: "1" }]}
        renderItem={renderPost}
        keyExtractor={(item) => item.key}
        contentContainerStyle={tw`flex-grow`}
      />
      <View
        style={tw`flex w-full flex-row justify-center   mb-5 ${isDarkTheme ? "border-gray-700 bg-[#202020]" : "border-gray-300 bg-white"}`}
      >
        <ChatInput />
      </View>
    </SafeAreaView>
  );
};

export default Home;
//flex w-full h-full  justify-center items-center pr-15
