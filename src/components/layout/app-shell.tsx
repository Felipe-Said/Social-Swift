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
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 glass-strong border-border w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 bg-bg">
          <Outlet />
        </main>


        {/* Mobile Bottom Tab */}
        <BottomTab />
      </div>

      {/* Mobile spacing for bottom tab */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}