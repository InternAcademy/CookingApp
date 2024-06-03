import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import tw from "twrnc";

const Navigation = () => {
  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar barStyle="dark-content" />
      <View
        style={tw`flex-row justify-between items-center h-15 bg-gray-100 px-4 border-b border-gray-300`}
      >
        <Image
          source={require("../assets/icon.png")}
          style={tw`w-10 h-10 ml-2`}
        />
        <View style={tw`flex-row`}>
          <TouchableOpacity onPress={() => console.log("Back pressed")}>
            <Image
              source={require("../assets/back.jpg")}
              style={tw`w-8 h-8 mx-2`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Favourites pressed")}>
            <Image
              source={require("../assets/favorite.png")}
              style={tw`w-8 h-8 mx-2`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("User pressed")}>
            <Image
              source={require("../assets/user.png")}
              style={tw`w-8 h-8 mx-2`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Settings pressed")}>
            <Image
              source={require("../assets/settings.webp")}
              style={tw`w-8 h-8 mx-2`}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navigation;
