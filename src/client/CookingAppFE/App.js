// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import tw from "twrnc";
import Navigation from "./components/navigation/Navigation";
import MainStack from "./components/navigation/MainStack";
import {
  NavigationProvider,
  useNavigationContext,
} from "./context/NavigationContext";
import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
const client = new QueryClient();
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationProvider>
          <ChatProvider>
            <QueryClientProvider client={client}>
              <AppInner />
            </QueryClientProvider>
          </ChatProvider>
        </NavigationProvider>
      </ThemeProvider>
    </Provider>
  );
}

const AppInner = () => {
  const { currentRoute, isLoading } = useNavigationContext();
  const { isDarkTheme } = useTheme();

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator
          size="large"
          color={isDarkTheme ? "#ffffff" : "#000000"}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <View
        style={tw`flex-1 flex-row ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
      >
        <View style={tw`flex-1`}>
          {currentRoute !== "LandingPage" && <Navigation />}
          <MainStack />
        </View>
      </View>
    </NavigationContainer>
  );
};
