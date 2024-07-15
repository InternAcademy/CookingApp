// Navigation.js
import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ChatBubbleBottomCenterTextIcon, Bars3BottomLeftIcon } from "react-native-heroicons/solid";
import Sidebar from "./Sidebar";

const Navigation = () => {
  const navigation = useNavigation();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const startNewChat = () => {
    dispatch(userActions.clearChat());
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={[styles.safeArea, tw`${isDarkTheme ? "bg-[#202020]" : "bg-white"}`]}>
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
      <View style={[styles.navBar, tw`${isDarkTheme ? "bg-[#202020]" : "bg-white"}`]}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => setOpen(true)} style={tw`mx-2`}>
            <Bars3BottomLeftIcon size={24} color={isDarkTheme ? "white" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={startNewChat} style={tw`mx-0 mt-1`}>
            <ChatBubbleBottomCenterTextIcon size={24} color={isDarkTheme ? "white" : "black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
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

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: "100%",
    paddingHorizontal: 16
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16
  }
});

export default Navigation;
