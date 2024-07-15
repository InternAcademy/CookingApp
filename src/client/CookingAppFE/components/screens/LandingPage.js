import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import * as WebBrowser from "expo-web-browser";
import tw from "twrnc";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
const instance = process.env.EXPO_PUBLIC_INSTANCE;
const scopes = process.env.EXPO_PUBLIC_SCOPES.split(" ");
WebBrowser.maybeCompleteAuthSession();

const LandingPage = ({ route }) => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const navigation = useNavigation();
  const { login, token, request } = useAuth(clientId, instance, scopes);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("LandingPage");
      } else {
        navigation.navigate("Home");
      }
    };
    checkToken();
  }, [token]);

  return (
    <View
      style={tw`flex-col justify-center items-center bg-white w-full h-full`}
    >
      <View style={tw`mb-20`}>
        <Image
             
             
             source={require("../../assets/Main/icon2.png")}
          // style={tw`w-30 h-30 rounded-full`}
        />
      </View>
      <Text
        style={tw`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-black"} mb-2`}
      >
        Let's Get Started
      </Text>
      <Text
        style={tw`text-lg px-4 ${isDarkTheme ? "text-gray-400" : "text-black"} text-center mb-8`}
      >
        Easy way to manage all your cooking tasks as easy as tapping your finger
      </Text>
      <TouchableOpacity
        title="Login"
        onPress={() => login()}
        style={tw`bg-[#FFBF5E] py-4 px-10 mt-40 -mb-46 rounded-full`}
      >
        <Text
          style={tw`text-lg font-bold text-black`}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingPage;
