// main.jsx
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";

export default function Main() {
  return (
    <main className="flex items-center justify-center flex-col h-screen w-screen">
      <NavBar />
      <LandingPage />
    </main>
  );
}
