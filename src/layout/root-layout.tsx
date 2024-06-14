import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export function RootLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="max-w-[400px] hidden md:block bg-gray-50 lg:max-w-[500px] h-screen">
        <Sidebar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
