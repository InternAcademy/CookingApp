// app/page.jsx
import Home from "@/components/bot/Home";
import NavBar from "@/components/navigation/NavBar";

export default function App() {
  return (
    <main className="flex items-center justify-center flex-col h-screen w-screen">
      <NavBar />
      <Home />
    </main>
  );
}
