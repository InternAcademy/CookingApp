import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MyRecipes from "../../components/recipes/MyRecipes"
export default function Layout() {
  return (
    <main className="flex w-full first-line:overflow-hidden">
      <Sidebar />
      <Outlet />
      <MyRecipes />
    </main>
  );
}
