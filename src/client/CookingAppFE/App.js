import React from "react";
import Navigation from "./components/Navigation";
import Contacts from "./components/Contacts";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      <Contacts />
    </View>
  );
}
