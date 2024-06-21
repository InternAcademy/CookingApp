import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import tw from 'twrnc';
import Sidebar from './components/navigation/Sidebar';
import Navigation from './components/navigation/Navigation';
import MainStack from './components/navigation/MainStack';
import { NavigationProvider, useNavigationContext } from './context/NavigationContext';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

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
      <View style={tw`flex-1 flex-row ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
        {currentRoute !== 'LandingPage' && <Sidebar />}
        <View style={tw`flex-1`}>
          {currentRoute !== 'LandingPage' && <Navigation />}
          <MainStack />
        </View>
      </View>
    </NavigationContainer>
  );
};
