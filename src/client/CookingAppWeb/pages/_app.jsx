// pages/_app.jsx
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "@/store";
// import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}

export default MyApp;
