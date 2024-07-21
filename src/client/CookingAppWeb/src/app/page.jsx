// app/page.jsx
import { Providers } from "./providers";
import StoreProvider from "./StoreProvider";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <Providers>
      <StoreProvider>
        <main className="flex items-center justify-center flex-col h-screen w-screen">
          <NavBar />
          <Home />
        </main>
      </StoreProvider>
    </Providers>
  );
}
