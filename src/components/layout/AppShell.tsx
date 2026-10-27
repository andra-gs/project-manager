import { Outlet } from "react-router";
import { useSidebarCollapsed } from "../../hooks/useSidebarCollapsed";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

// The frame around every screen: sidebar on the left, top bar and page content on the right.
export function AppShell() {
  const { collapsed, setCollapsed } = useSidebarCollapsed();

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto px-9 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
