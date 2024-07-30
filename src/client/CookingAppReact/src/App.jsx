import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/layout/Layout";
import UnauthorizedMessage from "./components/auth/UnauthorizedMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Chat /> }],
  },
]);

function App() {
  return (
    <>
      <h1 className="text-customOrange">Cooking App Web</h1>
      <p>
        Your ip from the .env file: {import.meta.env.VITE_PUBLIC_PERSONAL_IP}
      </p>
    </>
  );
}

export default App;
