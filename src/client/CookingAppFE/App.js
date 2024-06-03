import React from "react";
import { View, ScrollView } from "react-native";
import Navigation from "./components/Navigation";
import Previous from "./components/Previous";
import tw from "twrnc";

export default function App() {
  return (
    <View style={tw`flex-1`}>
      <Navigation />
      <ScrollView>
        <Previous />
      </ScrollView>
    </View>
  );
}
