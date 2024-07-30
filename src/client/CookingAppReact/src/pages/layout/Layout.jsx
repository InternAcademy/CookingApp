import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
export default function Layout() {
  return (
    <main className="flex w-full overflow-hidden ">
      <Sidebar />
      <Outlet />
    </main>
  );
}
