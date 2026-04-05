import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";
import { BottomTab } from "./bottom-tab";
import { useAuth } from "@/stores/auth";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { RightRail } from "./right-rail";

export function AppShell() {
  const { isAuthenticated } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const isGroupsRoute = location.pathname.startsWith("/app/social/grupos");
  const isBusinessDashboardRoute = location.pathname.startsWith("/app/dashboard");

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-bg">
      <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent
          side="left"
          className="w-[308px] border-none bg-[hsl(var(--sidebar-bg))] p-0 shadow-none"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="fb-shell mx-auto flex w-full max-w-[1920px] gap-0 px-0 lg:px-4">
        <div className="hidden bg-[hsl(var(--sidebar-bg))] lg:block lg:w-[360px] lg:shrink-0 lg:pr-4">
          <Sidebar />
        </div>

        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          <Outlet />
        </main>

        {!isGroupsRoute && !isBusinessDashboardRoute && <RightRail />}
        <BottomTab />
      </div>

      <div className="h-24 lg:hidden" />
    </div>
  );
}
