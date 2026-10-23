import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

// The frame around every screen: sidebar on the left, top bar and page content on the right.
export function AppShell() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto px-9 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
