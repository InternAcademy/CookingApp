import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import Sidebar from "./Sidebar";
import { ChatBubbleBottomCenterTextIcon, Bars3BottomLeftIcon } from "react-native-heroicons/solid";
import HeaderButton from "../bot/HeaderButton";


const NavBar = () => {
  const navigation = useNavigation();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const startNewChat = () => {
    dispatch(userActions.clearChat());
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={tw`absolute top-0 left-0 right-0 z-1 w-full ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
      <View style={tw`flex-row justify-between items-center h-15 w-full px-4 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={() => setOpen(true)} style={tw`mx-2`}>
            <Bars3BottomLeftIcon size={24} color={isDarkTheme ? "white" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={startNewChat} style={tw`mx-0 mt-1`}>
            <ChatBubbleBottomCenterTextIcon size={24} color={isDarkTheme ? "white" : "black"} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-1 flex-row justify-center items-center`}>
          <HeaderButton />
        </View>
        <View style={tw`flex-row items-center mr-4`}>
          <TouchableOpacity onPress={() => navigation.navigate("Recipes")} style={tw`mx-2`}>
            <Ionicons name="restaurant" size={24} color={isDarkTheme ? "white" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("UserMenu")} style={tw`mx-2`}>
            <Ionicons name="person" size={24} color={isDarkTheme ? "white" : "black"} />
          </TouchableOpacity>
        </View>
      </View>
      <Sidebar open={open} setOpen={setOpen} />
    </SafeAreaView>
  );
};

export default NavBar;
