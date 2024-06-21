import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationContext } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import LandingPage from '../../components/screens/LandingPage';
import Home from '../../components/bot/Home';
import Favourite from '../../components/screens/recipes/Favourite';
import UserMenu from '../../components/screens/UserMenu';
import About from '../../components/screens/settings/About';
import Contact from '../../components/screens/settings/Contacts';
import Previous from '../../components/screens/recipes/Previous';
import ArchivedRecipes from '../../components/screens/recipes/ArchivedRecipes';
import ProfileSettings from '../../components/screens/settings/ProfileSettings';
import RecentRecipes from '../../components/screens/recipes/RecentRecipes';
import Subscription from '../../components/screens/settings/Subscription';
import AlergensAndFoodPreferences from '../../components/screens/settings/AlergensAndFoodPreferences';
import LanguageAndTheme from '../../components/screens/settings/LanguageAndTheme';
import RulesAndPolicies from '../../components/screens/settings/RulesAndPolicies';

const Stack = createStackNavigator();

const MainStack = () => {
  const { currentRoute, setCurrentRoute } = useNavigationContext();
  const { isDarkTheme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={currentRoute}
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? '#202020' : 'white'
        },
        headerTintColor: isDarkTheme ? 'white' : 'black'
      }}>
      {[
        { name: 'LandingPage', component: LandingPage },
        { name: 'Home', component: Home },
        { name: 'Favourite', component: Favourite },
        { name: 'UserMenu', component: UserMenu },
        { name: 'About', component: About },
        { name: 'Contact', component: Contact },
        { name: 'Previous', component: Previous },
        { name: 'ArchivedRecipes', component: ArchivedRecipes },
        { name: 'ProfileSettings', component: ProfileSettings },
        { name: 'RecentRecipes', component: RecentRecipes },
        { name: 'Subscription', component: Subscription },
        { name: 'AlergensAndFoodPreferences', component: AlergensAndFoodPreferences },
        { name: 'LanguageAndTheme', component: LanguageAndTheme },
        { name: 'RulesAndPolicies', component: RulesAndPolicies }
      ].map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{ headerShown: false }}
          listeners={({ navigation }) => ({
            focus: () => setCurrentRoute(route.name),
            state: e => {
              const routeName = e.data.state.routes[e.data.state.index].name;
              setCurrentRoute(routeName);
            }
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MainStack;
