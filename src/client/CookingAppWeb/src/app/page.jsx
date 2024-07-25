// app/page.jsx
import LandingPage from "@/components/LandingPage";
import NavBar from "@/components/navigation/NavBar";

export default function App() {
  return (
    <main className="flex items-center justify-center flex-col h-screen w-screen">
      <NavBar />
      <LandingPage />
    </main>
  );
}
