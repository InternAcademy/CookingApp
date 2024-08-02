import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MyRecipes from "../../components/recipes/MyRecipes";
import Navbar from "../../components/navbar/Navbar";
import toast, { Toaster } from 'react-hot-toast';

export default function Layout() {
  return (
    <main className="flex w-full first-line:overflow-hidden bg-gray-100">
      <Sidebar />
        <section className="flex w-screen flex-col overflow-hidden shrink rounded-none md:rounded-2xl bg-white border-none md:border m-0 md:m-1 h-screen md:h-[calc(100vh-1vh)]">
            <Navbar />
            <Outlet />
        </section>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      <MyRecipes />
    </main>
  );
}
