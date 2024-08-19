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
      className={`flex w-full first-line:overflow-hidden ${
        theme === "Light" ? "light" : theme === "Dark" && "dark"
      } bg-base`}
    >
      <Sidebar />
      <section className="flex w-screen flex-col overflow-hidden shrink rounded-none md:rounded-2xl bg-secondary border-none md:border m-0 md:m-1 h-screen md:h-[calc(100vh-1vh)]">
        <Navbar />
        <Outlet />
      </section>
      <Toaster position="top-center" reverseOrder={false} />
      <MyRecipes />
    </main>
  );
}
