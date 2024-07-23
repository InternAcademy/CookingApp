import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
const Logout = () => {
    return (
      <View>
        <Text>Logging out</Text>
      </View>
    );
  };

export default Logout;