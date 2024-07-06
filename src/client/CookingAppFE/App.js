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
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./redux/store";
import Nav from "./components/navigation/Nav";
const client = new QueryClient();
export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MainStack />
      </QueryClientProvider>
    </Provider>
  );
}
