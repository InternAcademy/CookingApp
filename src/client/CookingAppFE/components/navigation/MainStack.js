import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { StatusBar, View } from "react-native";
import tw from "twrnc";
import LandingPage from "../screens/main/LandingPage";
import Home from "../../components/bot/Home";
import UserMenu from "../screens/main/UserMenu";
import About from "../../components/screens/settings/About";
import Contact from "../../components/screens/settings/Contacts";
import Subscription from "../../components/screens/settings/Subscription";
import FoodPreferences from "../../components/screens/settings/FoodPreferences";
import LanguageAndTheme from "../../components/screens/settings/LanguageAndTheme";
import RulesAndPolicies from "../../components/screens/settings/RulesAndPolicies";
import Logout from "../../components/screens/Logout.js";
import CameraScreen from "../../components/bot/CameraScreen";
import ImageScreen from "../../components/bot/ImageScreen";
import Recipes from "../../components/screens/recipes/Recipes";
import RecipesDetails from "../screens/recipes/RecipesDetails";

const Stack = createStackNavigator();
const linking = {
  config: {
    screens: {
      LandingPage: "landing",
      Home: "home",
      UserMenu: "user-menu",
      About: "about",
      Contact: "contact",
      Recipes: "recipes",
      Subscription: "subscription",
      FoodPreferences: "food-preferences",
      LanguageAndTheme: "language-and-theme",
      RulesAndPolicies: "rules-and-policies",
      Logout: "logout",
      CameraScreen: "camera-screen",
      ImageScreen: "image-screen",
      RecipesDetails: "recipes-details",
    },
  },
};

const MainStack = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  const screenStyle = {
    headerStyle: {
      backgroundColor: isDarkTheme ? "rgb(32, 32, 32)" : "white",
    },
    headerTintColor: isDarkTheme ? "white" : "rgb(32, 32, 32)",
    cardStyle: {
      backgroundColor: isDarkTheme ? "rgb(32, 32, 32)" : "white",
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        detachInactiveScreens={true}
        initialRouteName={"landing"}
        screenOptions={{
          headerStyle: {},
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenu}
          options={{ headerTitle: "User Menu", ...screenStyle }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ ...screenStyle }}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{ ...screenStyle }}
        />
        <Stack.Screen
          name="Recipes"
          component={Recipes}
          options={{ headerTitle: "Recipes", ...screenStyle }}
        />
        <Stack.Screen
          name="FoodPreferences"
          component={FoodPreferences}
          options={{
            headerTitle: "Food Preferences",
            ...screenStyle,
          }}
        />
        <Stack.Screen
          name="LanguageAndTheme"
          component={LanguageAndTheme}
          options={{ headerTitle: "Language And Theme", ...screenStyle }}
        />
        <Stack.Screen
          name="RulesAndPolicies"
          component={RulesAndPolicies}
          options={{ headerTitle: "Rules And Policies", ...screenStyle }}
        />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{ headerTitle: "Subscriptios", ...screenStyle }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ ...screenStyle }}
        />
        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{ ...screenStyle }}
        />
        <Stack.Screen
          name="RecipesDetails"
          component={RecipesDetails}
          options={{ ...screenStyle }}
        />
        <Stack.Screen name="Logout" component={Logout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
