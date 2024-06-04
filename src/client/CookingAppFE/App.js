import React from "react";
import { View, ScrollView } from "react-native";
import tw from "twrnc";

import Navigation from "./components/Navigation";
import Favourite from "./components/Favourite";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Previous from "./components/Previous";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <View style={tw`flex-1`}>
      <Navigation />
      <ScrollView>
        {/* <About /> */}
        {/* <Favourite /> */}
        {/* <Contacts /> */}
        {/* <Home /> */}
        <LandingPage />
        {/* <Previous /> */}
      </ScrollView>
    </View>
  );
}
