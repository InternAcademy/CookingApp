import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const navigation = useNavigation();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <View style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} p-4`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Ionicons name="person-circle" size={40} color={isDarkTheme ? "white" : "black"} />

        <TouchableOpacity onPress={() => console.log("Close menu")}>
          <Text style={tw`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}></Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("RecentRecipes")}>
        <Ionicons name="time" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("ProfileSettings")}>
        <Ionicons name="settings" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Profile Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("Subscription")}>
        <Ionicons name="card" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Subscription</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("AlergensAndFoodPreferences")}>
        <Ionicons name="nutrition" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Food Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("ArchivedRecipes")}>
        <Ionicons name="archive" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Archived Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("LanguageAndTheme")}>
        <Ionicons name="language" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Language & Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("RulesAndPolicies")}>
        <Ionicons name="document-text" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Rules And Policies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("About")}>
        <Ionicons name="information-circle" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate("Contact")}>
        <Ionicons name="mail" size={24} color={isDarkTheme ? "white" : "black"} style={tw`mr-2`} />
        <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Contacts</Text>
      </TouchableOpacity>

      <View style={tw`mx-12 mt-auto items-center py-2`}>
        <TouchableOpacity onPress={() => console.log("Sign Out")} style={tw`flex-row justify-center items-center`}>
          <Text style={tw`text-lg font-bold ${isDarkTheme ? "text-gray-100" : "text-black"}`}>Sign Out</Text>
          <Ionicons name="log-out" size={24} color={isDarkTheme ? "white" : "black"} style={tw`ml-2`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserMenu;
