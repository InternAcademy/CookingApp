// components/Navigation.js

import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

const Navigation = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navbar}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => console.log("Back pressed")}>
            <Image source={require("../assets/back.jpg")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Favourites pressed")}>
            <Image
              source={require("../assets/favorite.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("User pressed")}>
            <Image source={require("../assets/user.png")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Settings pressed")}>
            <Image
              source={require("../assets/settings.webp")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

export default Navigation;
