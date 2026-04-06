import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Plus, Search, Wallet, User } from "lucide-react";
import { SwiftButton } from "@/components/ui/swift-button";
import { motion } from "framer-motion";

const tabItems = [
  { title: "Home", url: "/app/social/feed", icon: Home },
  { title: "Buscar", url: "/app/social/buscar", icon: Search },
  { title: "Swift", url: "#", icon: null, isSwift: true },
  { title: "Carteira", url: "/app/carteira", icon: Wallet },
  { title: "Perfil", url: "/app/social/perfil", icon: User },
];

export function BottomTab() {
  const location = useLocation();
  const isSnapsRoute = location.pathname === "/app/social/snaps";

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface-solid))] lg:hidden"
    >
      <div className="px-2 py-2">
        <div className="flex items-center justify-around">
          {tabItems.map((item) => {
            if (item.isSwift) {
              return (
                <div key="swift" className="relative">
                  <SwiftButton size="sm" />
                </div>
              );
            }

            if (isSnapsRoute && item.url === "/app/social/buscar") {
              return (
                <button
                  key="create-snap"
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-create-snap"))}
                  className="flex min-w-[110px] flex-col items-center gap-1 rounded-full bg-white px-4 py-2 text-black transition-all duration-200 hover:bg-white/90"
                >
                  <div className="relative">
                    <Plus className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">Criar snap</span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all duration-200",
                    isActive
                      ? "bg-[hsl(var(--sidebar-active))] text-text"
                      : "text-text-dim hover:text-text"
                  )
                }
              >
                <div className="relative">
                  {item.icon && <item.icon className="h-5 w-5" />}
                </div>
                <span className="text-xs font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
