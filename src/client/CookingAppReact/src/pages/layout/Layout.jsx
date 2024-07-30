import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

export default function Layout() {
  return (
    <main className="h-full overflow-y-hidden">
      <Navbar />
      <Outlet />
    </main>
  );
}
