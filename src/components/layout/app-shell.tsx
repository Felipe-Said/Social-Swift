import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";
import { BottomTab } from "./bottom-tab";
import { SwiftButton } from "@/components/ui/swift-button";
import { useAuth } from "@/stores/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function AppShell() {
  const { isAuthenticated } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="relative min-h-screen bg-bg flex flex-col overflow-hidden lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="relative z-10 hidden lg:block w-[330px] shrink-0 p-4 pr-2">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-[308px] border-none bg-transparent p-0 shadow-none">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-1 flex-col px-0 pb-24 lg:px-0 lg:pb-0 lg:pr-4 lg:pt-0">
        {/* Topbar */}
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 pt-0 lg:pt-4">
          <Outlet />
        </main>


        {/* Mobile Bottom Tab */}
        <BottomTab />
      </div>

      {/* Mobile spacing for bottom tab */}
      <div className="h-24 lg:hidden" />
    </div>
  );
}
