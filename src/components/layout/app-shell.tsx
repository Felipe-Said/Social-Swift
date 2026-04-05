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
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-10rem] size-[28rem] rounded-full bg-[radial-gradient(circle,_hsl(var(--brand-glow)/0.18),_transparent_68%)] blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-8rem] size-[24rem] rounded-full bg-[radial-gradient(circle,_hsl(var(--brand)/0.16),_transparent_68%)] blur-3xl" />
      </div>

      {/* Desktop Sidebar */}
      <div className="relative z-10 hidden lg:block w-[308px] shrink-0 p-4">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-[308px] border-none bg-transparent p-4 shadow-none">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-1 flex-col px-3 pb-24 lg:px-0 lg:pb-0 lg:pr-4 lg:pt-4">
        {/* Topbar */}
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 pt-4 lg:pt-5">
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
