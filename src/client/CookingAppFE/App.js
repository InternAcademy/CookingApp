import React from "react";
import { View, ScrollView } from "react-native";
import Navigation from "./components/Navigation";
import Previous from "./components/Previous";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      <ScrollView>
        <Previous />
      </ScrollView>
    </View>
  );
}
