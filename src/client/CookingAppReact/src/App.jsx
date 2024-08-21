import "./index.css";
import "./i18n/config.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignOutButton from "../src/components/auth/SignOutButton";
import ChatLayout from "./pages/layout/ChatLayout";
import EmptyChat from "./pages/chat/EmptyChat";
import Chat from "./pages/chat/Chat";
import Layout from "./pages/layout/Layout";
import Recipe from "./pages/recipe/Recipe";
import Admin from "./pages/admin/Admin";
import Subscribtion from "./pages/subscribtion/Subscription";
import Success from "./pages/subscribtion/Succes";
import Settings from "./pages/settings/Settings";
import SubscriptionDetails from "./pages/subscribtion/SubscriptionDetails";
import Rules from "./pages/rules/Rules";
import NotFound from "./pages/error/NotFound";
import AuthorizeRoute from "./pages/authorize/AuthorizeRoute";
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
      { path: "r/:recipeId", element: <Recipe /> },
      {
        path: "admin/dashboard",
        element: (
          <AuthorizeRoute
            succesPage={<Admin />}
            requiredRole={"Admin"}
            unAuthorizedPath={"/"}
          />
        ),
      },
      {
        path: "subscription",
        element: (
          <AuthorizeRoute
            succesPage={<Subscribtion />}
            requiredRole={"Free"}
            unAuthorizedPath={"/"}
          />
        ),
      },
      {
        path: "subscription/manage",
        element: (
          <AuthorizeRoute
            succesPage={<SubscriptionDetails />}
            requiredRole={"Premium"}
            unAuthorizedPath={"/"}
          />
        ),
      },
      { path: "success", element: <Success /> },
      { path: "settings", element: <Settings /> },
      { path: "/rules-and-policies", element: <Rules /> },
    ],
    errorElement: <NotFound />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
