import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainStack from "./components/navigation/MainStack";
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
