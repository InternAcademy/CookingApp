import React from "react";
import Navigation from "./components/Navigation";
import { View } from "react-native";
import Home from "./components/Home";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      <Home />
    </View>
  );
}
