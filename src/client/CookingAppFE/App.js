import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Favourite from './components/Favourite';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import UserMenu from './components/UserMenu';
import { NavigationProvider, useNavigationContext } from './components/NavigationContext';
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
        listeners={{
          focus: () => setCurrentRoute('LandingPage')
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setCurrentRoute('Home')
        }}
      />
      <Stack.Screen
        name="Favourite"
        component={Favourite}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setCurrentRoute('Favourite')
        }}
      />
      <Stack.Screen
        name="UserMenu"
        component={UserMenu}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setCurrentRoute('UserMenu')
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <AppInner />
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
