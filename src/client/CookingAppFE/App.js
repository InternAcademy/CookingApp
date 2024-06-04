import React from "react";
import { View, ScrollView } from "react-native";
import Navigation from "./components/Navigation";
import Contacts from "./components/Contacts";
import tw from "twrnc";

export default function App() {
  return (
    <View style={tw`flex-1`}>
      <Navigation />
      <ScrollView>
        <Contacts />
      </ScrollView>
    </View>
  );
}
