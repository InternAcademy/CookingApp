import React from "react";
import Navigation from "./components/Navigation";
import About from "./components/About";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      <About />
    </View>
  );
}
