// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store/index.js";
import "./index.css";
import MyMsalProvider from "./msal/MyMsalProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyMsalProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MyMsalProvider>
  </React.StrictMode>
);
