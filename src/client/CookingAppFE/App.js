import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ScrollView } from "react-native";
import Favourite from "./components/Favourite";
import Navigation from "./components/Navigation";
import tw from "twrnc";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      <Stack.Navigator>
        <Stack.Screen name="Favourite" component={Favourite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
