// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store/index.js";
import "./index.css";
import MyMsalProvider from "./msal/MyMsalProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GenerationProvider } from "./utils/generationProvider.jsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyMsalProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GenerationProvider>
            <App />
          </GenerationProvider>
        </QueryClientProvider>
      </Provider>
    </MyMsalProvider>
  </React.StrictMode>
);
