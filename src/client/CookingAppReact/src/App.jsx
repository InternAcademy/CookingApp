import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignOutButton from "../src/components/auth/SignOutButton";
import ChatLayout from "./pages/layout/ChatLayout";
import EmptyChat from "./pages/chat/EmptyChat";
import Chat from "./pages/chat/Chat";
import Layout from "./pages/layout/Layout";
import Recipe from "./pages/recipe/Recipe";
import Admin from "./pages/admin/Admin";
import Subscribtion from "./pages/subscribtion/Subscribtion";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ChatLayout />,
        children: [
          { path: "/", element: <EmptyChat /> },
          { path: "c/:chatId", element: <Chat /> },
        ],
      },
      { path: "recipe/:recipeId", element: <Recipe /> },
      { path: "admin/dashboard", element: <Admin /> },
      { path: "subscribtion", element: <Subscribtion /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
