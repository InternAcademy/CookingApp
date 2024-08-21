import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MyRecipes from "../../components/recipes/MyRecipes";
import Navbar from "../../components/navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import useFetchUserStatus from "../../hooks/useFetchUserStatus";
import { useSelector } from "react-redux";

export default function Layout() {
  useFetchUserStatus();
  const theme = useSelector((state) => state.ui.theme);
  return (
    <main
      className={`flex w-full max-h-dvh first-line:overflow-hidden ${
        theme === "Light" ? "light" : theme === "Dark" && "dark"
      } bg-base overflow-x-hidden`}
    >
      <Sidebar />
      <section className="flex w-screen max-h-dvh flex-col overflow-hidden shrink rounded-none md:rounded-2xl bg-secondary border-none md:border m-0 md:m-1 md:h-[calc(100vh-1vh)]">
        <Navbar />
        <Outlet />
      </section>
      <Toaster position="top-center" reverseOrder={false} />
      <MyRecipes />
    </main>
  );
}
