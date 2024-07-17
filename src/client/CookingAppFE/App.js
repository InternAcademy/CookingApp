import "react-native-gesture-handler";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainStack from "./components/navigation/MainStack";
import { TranslationProvider } from "./context/TranslationContext";
import { NavigationContainer } from "@react-navigation/native";

const client = new QueryClient();
export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <TranslationProvider>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </TranslationProvider>
      </QueryClientProvider>
    </Provider>
  );
}
