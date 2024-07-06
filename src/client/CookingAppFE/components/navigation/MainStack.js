import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigationContext } from "../../context/NavigationContext";
import { useSelector } from "react-redux";
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
import { NavigationContainer } from "@react-navigation/native";
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
    },
  },
};

const MainStack = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        detachInactiveScreens={true}
        initialRouteName={"landing"}
        screenOptions={{
          headerStyle: {},
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Favourite" component={Favourite} />
        <Stack.Screen name="UserMenu" component={UserMenu} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Previous" component={Previous} />
        <Stack.Screen name="ArchivedRecipes" component={ArchivedRecipes} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
        <Stack.Screen name="RecentRecipes" component={RecentRecipes} />
        <Stack.Screen
          name="AlergensAndFoodPreferences"
          component={AlergensAndFoodPreferences}
        />
        <Stack.Screen name="LanguageAndTheme" component={LanguageAndTheme} />
        <Stack.Screen name="RulesAndPolicies" component={RulesAndPolicies} />
        <Stack.Screen name="Subscription" component={Subscription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
