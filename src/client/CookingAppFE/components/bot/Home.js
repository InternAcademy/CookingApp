import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Modal,
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
  const isThinking = useSelector((state) => state.ui.isThinking);
  const responseError = useSelector((state) => state.ui.responseError);
  const chat = useSelector((state) => state.user.selectedChat);
  const isInitial = useSelector((state) => state.ui.isInitial);
  const profileImage = useSelector((state) => state.ui.photoUri);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10); //* 10 секунди
  const rotation = useRef(new Animated.Value(0)).current;
  const logoPosition = useRef(new Animated.Value(-100)).current;

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

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLoading(false); // Спрете анимацията след края на времето
            rotation.setValue(0); // Ресетиране на въртенето
            logoPosition.setValue(-100); // Ресетиране на позицията на логото
            return 10; // Възстановяване на началната стойност
          }
          return prev - 1;
        });
      }, 1000);

      // Започнете анимацията
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000, // Общо време за въртене
          useNativeDriver: true,
        })
      ).start();

      
      moveLogo();
    }
  }, [isLoading]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const moveLogo = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoPosition, {
          toValue: 300,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoPosition, {
          toValue: -100,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleRecipeSave = async (request) => {
    setIsLoading(true);

    const token = await AsyncStorage.getItem("token");
    save({ token, request });
  };

  const renderMessages = () => {
    if (chat) {
      return (
        <ScrollView contentContainerStyle={tw`p-6 `}>
          {chat.content.map((msg, index) => (
            <View key={index} style={tw`mb-2 flex-row justify-start pt-1`}>
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
                      style={tw`mx-2 items-center mr-12 mt-4 mb-2`}
                    >
                      {isLoading ? (
                        <View style={tw`w-2/3 bg-amber-100/40 rounded-full items-center justify-center flex flex-row`}>
                          <Animated.View
                            style={[
                              tw` `,
                              { transform: [{ rotate: rotate }] },
                            ]}
                          >
                            <Ionicons
                              name="restaurant"
                              size={24}
                              color={isDarkTheme ? "white" : "black"}
                            />
                          </Animated.View>
                          <Text style={tw`ml-2 font-medium py-3 ${isDarkTheme ? "text-white" : "text-black"}`}>
                            Generating recipe...
                          </Text>
                        </View>
                      ) : (
                      <View style={tw`w-2/3 bg-amber-100 rounded-full items-center justify-center flex flex-row`}>
                        <Ionicons
                          name="restaurant"
                          size={24}
                          color={isDarkTheme ? "white" : "black"}
                        />
                        <Text style={tw` font-medium py-3 ml-2 ${isDarkTheme ? "text-white" : "text-black"}`}> Generate Recipe</Text>
                        </View>
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
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        {renderMessages()}
      </ScrollView>
      <View
        style={tw`flex w-full flex-row justify-center mb-5 ${isDarkTheme ? "border-gray-700 bg-[#202020]" : "border-gray-300 bg-white"}`}
      >
        <ChatInput isPending={isPending} />
      </View>

      {/* Modal for loading animation */}
      <Modal
        transparent={true}
        visible={isLoading}
        animationType="none"
        onRequestClose={() => setIsLoading(false)}
      >
        <View style={tw`absolute inset-0 bg-[#00000099] justify-center items-center `}>
          <View style={tw`h-full w-full flex items-center justify-center bg-[#000000e0] p-8 rounded-lg items-center`}>
            <Animated.View
              style={[
                tw`w-16 h-16`,
                { transform: [{ translateX: logoPosition }] },
              ]}
            >
              {/* Optional logo or content here */}
            </Animated.View>
            <Animated.View
              style={[
                tw`w-16 h-16 justify-center items-center`,
                { transform: [{ rotate: rotate }] },
              ]}
            >
              <Ionicons name="restaurant" size={50} color="white" />
            </Animated.View>
            <Text style={tw`text-white mt-4 text-lg font-bold`}>
              Generating recipe...
            </Text>
            <Text style={tw`text-white mt-4 text-lg font-bold`}>
              {`Time Left: ${remainingTime}s`}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
