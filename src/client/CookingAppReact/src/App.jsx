import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignOutButton from "../src/components/auth/SignOutButton";
import Chat from "./pages/chat/Chat";
import Layout from "./pages/layout/Layout";
import Recipe from "./pages/recipe/Recipe";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Chat /> },
      {path: "/recipe/:recipeId", element: <Recipe/>}
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
