import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../../hooks/useAuth";

const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
const instance = process.env.EXPO_PUBLIC_INSTANCE;
const scopes = process.env.EXPO_PUBLIC_SCOPES.split(" ");

import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { uiActions } from "../../../redux/uiSlice"; // Заменете с реалния път до uiSlice
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserMenu = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const auth = useAuth(clientId, instance, scopes);

  const profileImage = useSelector((state) => state.ui.photoUri);

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("LandingPage");
      }
    }
    checkToken();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(uiActions.setPhotoUri(result.assets[0].uri));
    } else {
      Alert.alert("Error", "Image selection was cancelled");
    }
  };

  return (
    <View style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} p-4`}>
      <View style={tw`flex-row justify-center items-center mb-4`}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={tw`w-32 h-32 rounded-full`}
            />
          ) : (
            <Ionicons
              name="person-circle"
              size={50}
              color={isDarkTheme ? "white" : "black"}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Close menu")}>
          <Text
            style={tw`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
          ></Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={tw`flex-row items-center mb-4`}
        onPress={() => navigation.navigate("Recipes")}
      >
        <Ionicons
          name="restaurant"
          size={24}
          color={isDarkTheme ? "white" : "black"}
          style={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Recipes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center mb-4`}
        onPress={() => navigation.navigate("Subscription")}
      >
        <Ionicons
          name="card"
          size={24}
          color={isDarkTheme ? "white" : "black"}
          style={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Subscription
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center mb-4`}
        onPress={() => navigation.navigate("FoodPreferences")}
      >
        <Ionicons
          name="nutrition"
          size={24}
          color={isDarkTheme ? "white" : "black"}
          style={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Food Preferences
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center mb-4`}
        onPress={() => navigation.navigate("ArchivedRecipes")}
      >
        <Ionicons
          name="archive"
          size={24}
          color={isDarkTheme ? "white" : "black"}
          style={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Archived Recipes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center mb-4`}
        onPress={() => navigation.navigate("LanguageAndTheme")}
      >
        <Ionicons
          name="language"
          size={24}
          color={isDarkTheme ? "white" : "black"}
          style={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Language & Theme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center mb-4`}
        onPress={() => navigation.navigate("RulesAndPolicies")}
      >
        <Ionicons
          name="document-text"
          size={24}
          color={isDarkTheme ? "white" : "black"}
          style={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Rules And Policies
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center mb-4`}
        onPress={() => navigation.navigate("About")}
      >
        <Ionicons
          name="information-circle"
          size={24}
          color={isDarkTheme ? "white" : "black"}
          style={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          About
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center mb-4`}
        onPress={() => navigation.navigate("Contact")}
      >
        <Ionicons
          name="mail"
          size={24}
          color={isDarkTheme ? "white" : "black"}
          style={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Contacts
        </Text>
      </TouchableOpacity>

      <View style={tw`mx-12 mt-auto items-center py-2`}>
        <TouchableOpacity
          onPress={() => auth.logout()}
          style={tw`flex-row justify-center items-center`}
        >
          <Text
            style={tw`text-lg font-bold ${isDarkTheme ? "text-gray-100/30" : "text-black/30"}`}
          >
            Sign Out
          </Text>
          <Ionicons
            name="log-out"
            size={24}
            color={isDarkTheme ? "white" : "black"}
            style={tw`ml-2 opacity-30`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserMenu;
