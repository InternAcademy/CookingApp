import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import { NavigationProvider, useNavigationContext } from './components/NavigationContext';

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
      {currentRoute !== 'LandingPage' && <Navigation />}
      <MainStack />
    </NavigationContainer>
  );
};
