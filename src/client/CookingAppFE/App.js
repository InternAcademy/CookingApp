import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import tw from 'twrnc';
import Home from './components/bot/Home';
import LandingPage from './components/screens/LandingPage';
import Favourite from './components/screens/recipes/Favourite';
import Navigation from './components/navigation/Navigation';
import Sidebar from './components/navigation/Sidebar';
import UserMenu from './components/screens/UserMenu';
import About from './components/screens/settings/About';
import Contact from './components/screens/settings/Contacts';
import Previous from './components/screens/recipes/Previous';
import ArchivedRecipes from './components/screens/recipes/ArchivedRecipes';
import ProfileSettings from './components/screens/settings/ProfileSettings';
import RecentRecipes from './components/screens/recipes/RecentRecipes';
import Subscription from './components/screens/settings/Subscription';
import AlergensAndFoodPreferences from './components/screens/settings/AlergensAndFoodPreferences';
import LanguageAndTheme from './components/screens/settings/LanguageAndTheme';
import RulesAndPolicies from './components/screens/settings/RulesAndPolicies';
import { NavigationProvider, useNavigationContext } from './context/NavigationContext';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Stack = createStackNavigator();

const MainStack = () => {
  const { setCurrentRoute } = useNavigationContext();
  const { isDarkTheme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="LandingPage"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? 'black' : 'white'
        },
        headerTintColor: isDarkTheme ? 'white' : 'black'
      }}>
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('LandingPage'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('Home'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="Favourite"
        component={Favourite}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('Favourite'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="UserMenu"
        component={UserMenu}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('UserMenu'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('About'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('Contact'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="Previous"
        component={Previous}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('Previous'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="ArchivedRecipes"
        component={ArchivedRecipes}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('ArchivedRecipes'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('ProfileSettings'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="RecentRecipes"
        component={RecentRecipes}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('RecentRecipes'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('Subscription'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="AlergensAndFoodPreferences"
        component={AlergensAndFoodPreferences}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('AlergensAndFoodPreferences'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="LanguageAndTheme"
        component={LanguageAndTheme}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('LanguageAndTheme'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
      <Stack.Screen
        name="RulesAndPolicies"
        component={RulesAndPolicies}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          focus: () => setCurrentRoute('RulesAndPolicies'),
          state: e => {
            const route = e.data.state.routes[e.data.state.index].name;
            setCurrentRoute(route);
          }
        })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <ChatProvider>
          <AppInner />
        </ChatProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}

const AppInner = () => {
  const { currentRoute } = useNavigationContext();
  const { isDarkTheme } = useTheme();

  return (
    <NavigationContainer>
      <View style={tw`flex-1 flex-row ${isDarkTheme ? 'bg-black' : 'bg-white'}`}>
        {currentRoute !== 'LandingPage' && <Sidebar />}
        <View style={tw`flex-1`}>
          {currentRoute !== 'LandingPage' && <Navigation />}
          <MainStack />
        </View>
      </View>
    </NavigationContainer>
  );
};
