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
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "../../http/user";
import NavBar from "../navigation/NavBar";
import ChatError from "./ChatError";
import ChatInput from "./ChatInput";
import Thinking from "../bot/Thinking";
import { uiActions } from "../../redux/uiSlice";
import useSaveRecipe from "../../hooks/useSaveRecipe";
import { userActions } from "../../redux/userSlice";
const Home = () => {
  const navigation = useNavigation();
  const { save, isPending } = useSaveRecipe();

  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const lang = useSelector((state) => state.ui.lang);

  const isThinking = useSelector((state) => state.ui.isThinking);
  const responseError = useSelector((state) => state.ui.responseError);
  const chat = useSelector((state) => state.user.selectedChat);
  const userRole = useSelector((state) => state.user.role);
  const isInitial = useSelector((state) => state.ui.isInitial);
  const profileImage = useSelector((state) => state.ui.photoUri);

  const dispatch = useDispatch();

  useEffect(() => {
    async function check() {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("LandingPage");
      }
      if (isInitial) {
        const response = await checkUserStatus({ token });
        if (response.status !== 401) {
          const body = await response.json();
          dispatch(
            uiActions.setTheme(
              body.data.interfacePreference.theme === "Light" ? false : true
            )
          );
          dispatch(
            uiActions.setLanguage(body.data.interfacePreference.language)
          );
          dispatch(userActions.setRole(body.data.role));
          dispatch(
            userActions.setDietaryPreferences({
              allergies: body.data.allergies,
              avoidedFoods: body.data.avoidedFoods,
              dietaryPreference: body.data.dietaryPreference,
            })
          );
          dispatch(uiActions.setIsInitial(false));
        } else if (response.status === 401) {
          navigation.navigate("LandingPage");
        }
      }
    }
    check();
  }, [isInitial]);

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
                style={tw`mb-2 flex-row justify-start wrap pt-1`}
              >
                {msg.role === "user" ? (
                  profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={tw`w-8 h-8 rounded-full mr-2 mb-7`}
                    />
                  ) : (
                    <Ionicons
                      name="person-circle"
                      size={32}
                      color={isDarkTheme ? "white" : "black"}
                      style={tw`mr-2 mb-7 items-start -mt-1`}
                    />
                  )
                ) : (
                  <Image
                    source={require("../../assets/Main/icon2.png")}
                    style={tw`w-8 h-8 rounded-full mr-2 mb-7 items-start -mt-1`}
                  />
                )}
                <View>
                  <Text
                    style={tw`text-base font-semibold mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                  >
                    {msg.role === "user" ? "You" : "MealMasterBot"}:
                  </Text>
                  {msg.role === "user" && msg.type === "Text" && (
                    <Text
                      style={tw`text-base mr-4 w-full mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                    >
                      {msg.content}
                    </Text>
                  )}

                  {msg.role === "user" && msg.type === "Image" && (
                    <Image
                      source={{ uri: msg.content }}
                      style={tw`w-32 h-32 rounded-md mr-2 mb-7`}
                    />
                  )}
                  {msg.role === "bot" && msg.type === "Recipe" && (
                    <>
                      <Text
                        style={tw`max-w-full mr-12 text-base mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                      >
                        {msg.content}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleRecipeSave(msg.content)}
                        style={tw`mx-2 self-end`}
                      >
                        {!isPending && (
                          <Ionicons
                            name="restaurant"
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
                      style={tw`max-w-full mr-12 text-base mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
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
        <ChatInput isPending={isPending} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
