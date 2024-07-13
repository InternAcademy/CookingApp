import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LandingPage from "../../components/screens/LandingPage";
import Home from "../../components/bot/Home";
import Favourite from "../../components/screens/recipes/Favourite";
import UserMenu from "../../components/screens/UserMenu";
import About from "../../components/screens/settings/About";
import Contact from "../../components/screens/settings/Contacts";
import Previous from "../../components/screens/recipes/Previous";
import ArchivedRecipes from "../../components/screens/recipes/ArchivedRecipes";
import ProfileSettings from "../../components/screens/settings/ProfileSettings";
import RecentRecipes from "../../components/screens/recipes/RecentRecipes";
import Subscription from "../../components/screens/settings/Subscription";
import AlergensAndFoodPreferences from "../../components/screens/settings/AlergensAndFoodPreferences";
import LanguageAndTheme from "../../components/screens/settings/LanguageAndTheme";
import RulesAndPolicies from "../../components/screens/settings/RulesAndPolicies";
import CameraScreen from "../../components/bot/CameraScreen";
import ImageScreen from "../../components/bot/ImageScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const linking = {
  config: {
    screens: {
      LandingPage: "landing",
      Home: "home",
      Favourite: "favourite",
      UserMenu: "user-menu",
      About: "about",
      Contact: "contact",
      Previous: "previous",
      ArchivedRecipes: "archived-recipes",
      ProfileSettings: "profile-settings",
      RecentRecipes: "recent-recipes",
      Subscription: "subscription",
      AlergensAndFoodPreferences: "alergens-and-food-preferences",
      LanguageAndTheme: "language-and-theme",
      RulesAndPolicies: "rules-and-policies",
      CameraScreen: "camera-screen",
      ImageScreen: "image-screen",
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
          name="Favourite"
          component={Favourite}
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
          name="Previous"
          component={Previous}
          options={{ ...screenStyle }}
        />
        <Stack.Screen
          name="ArchivedRecipes"
          component={ArchivedRecipes}
          options={{
            headerTitle: "Archived Recipes",
            ...screenStyle,
          }}
        />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          options={{ headerTitle: "Profile Settings", ...screenStyle }}
        />
        <Stack.Screen
          name="RecentRecipes"
          component={RecentRecipes}
          options={{ headerTitle: "Recent Recipes", ...screenStyle }}
        />
        <Stack.Screen
          name="AlergensAndFoodPreferences"
          component={AlergensAndFoodPreferences}
          options={{
            headerTitle: "Alergens And Food Preferences",
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
