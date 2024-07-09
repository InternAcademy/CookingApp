// Nav.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../bot/Home";
import Subscription from "../screens/settings/Subscription";
import LandingPage from "../screens/LandingPage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ["http://192.168.39.5:8081"],
  config: {
    screens: {
      logIn: "landing",
      main: {
        screens: {
          index: "home",
          subs: "subs"
        }
      }
    }
  }
};

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "white",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "rgb(37,37,38)"
      },
      labelStyle: {
        fontSize: 20,
        margin: 0,
        padding: 0
      }
    }}
    initialRouteName="index"
    screenOptions={{ headerShown: false }}>
    <Tab.Screen name="index" component={Home} />
    <Tab.Screen name="subs" component={Subscription} />
  </Tab.Navigator>
);

const Nav = () => (
  <NavigationContainer linking={linking}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={TabNavigator} />
      <Stack.Screen name="logIn" component={LandingPage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Nav;
