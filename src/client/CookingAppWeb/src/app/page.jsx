// import StoreProvider from "./StoreProvider";
// import Home from "./components/Home";
// import NavBar from "./components/NavBar";

// export default function App() {
//   return (
//     <StoreProvider>
//       <main className="flex items-center justify-center flex-col h-screen w-screen">
//         <NavBar />
//         <Home />
//       </main>
//     </StoreProvider>
//   );
// }

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
const client = new QueryClient();
export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <main className="flex items-center justify-center flex-col h-screen w-screen">
          <NavBar />
          <Home />
        </main>
      </QueryClientProvider>
    </Provider>
  );
}
