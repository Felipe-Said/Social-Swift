import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Search, Wallet, User } from "lucide-react";
import { SwiftButton } from "@/components/ui/swift-button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const tabItems = [
  { title: "Home", url: "/app/social/feed", icon: Home },
  { title: "Buscar", url: "/app/social/buscar", icon: Search },
  { title: "Swift", url: "#", icon: null, isSwift: true },
  { title: "Carteira", url: "/app/carteira", icon: Wallet },
  { title: "Perfil", url: "/app/social/perfil", icon: User },
];

export function BottomTab() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
    >
      <div className="glass-strong rounded-[30px] px-4 py-2.5">
        <div className="flex items-center justify-around">
          {tabItems.map((item) => {
            if (item.isSwift) {
              return (
                <div key="swift" className="relative -top-4">
                  <SwiftButton size="sm" />
                </div>
              );
            }

            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex min-w-[56px] flex-col items-center gap-1 rounded-[18px] px-3 py-2 transition-all duration-200",
                    isActive
                      ? "bg-[hsl(var(--surface-solid)/0.58)] text-brand shadow-[inset_0_1px_0_hsl(var(--hairline))]"
                      : "text-text-dim hover:bg-[hsl(var(--surface-solid)/0.4)] hover:text-text"
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
