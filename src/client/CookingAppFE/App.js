import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Favourite from './components/Favourite';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import UserMenu from './components/UserMenu';
import About from './components/About';
import Contact from './components/Contacts';
import Previous from './components/Previous';
import ArchivedRecipes from './components/ArchivedRecipes';
import ProfileSettings from './components/ProfileSettings';
import RecentRecipes from './components/RecentRecipes';
import Subscription from './components/Subscription';
import AlergensAndFoodPreferences from './components/AlergensAndFoodPreferences';
import LanguageAndTheme from './components/LanguageAndTheme';
import RulesAndPolicies from './components/RulesAndPolicies';
import { NavigationProvider, useNavigationContext } from './components/NavigationContext';
import { ChatProvider } from './components/ChatContext'; // Импортиране на ChatProvider
import { View } from 'react-native';
import tw from 'twrnc';

const Stack = createStackNavigator();

const MainStack = () => {
  const { setCurrentRoute } = useNavigationContext();

  return (
    <Stack.Navigator initialRouteName="LandingPage">
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
    <NavigationProvider>
      <ChatProvider>
        <AppInner />
      </ChatProvider>
    </NavigationProvider>
  );
}

const AppInner = () => {
  const { currentRoute } = useNavigationContext();

  return (
    <NavigationContainer>
      <View style={tw`flex-1 flex-row`}>
        {currentRoute !== 'LandingPage' && <Sidebar />}
        <View style={tw`flex-1`}>
          {currentRoute !== 'LandingPage' && <Navigation />}
          <MainStack />
        </View>
      </View>
    </NavigationContainer>
  );
};
