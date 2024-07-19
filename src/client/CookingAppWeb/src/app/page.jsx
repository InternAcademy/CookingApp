// import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import UserMenu from "../../pages/user-menu";

export default function App() {
  return (
    <main className="flex items-center justify-center flex-col h-screen w-screen">
      <NavBar />
      <UserMenu />
    </main>
  );
}
