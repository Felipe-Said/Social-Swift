import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Search, Bell, User } from "lucide-react";
import { SwiftButton } from "@/components/ui/swift-button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const tabItems = [
  { title: "Home", url: "/app/social/feed", icon: Home },
  { title: "Buscar", url: "/app/social/buscar", icon: Search },
  { title: "Swift", url: "#", icon: null, isSwift: true },
  { title: "Notificações", url: "/app/social/notificacoes", icon: Bell, hasNotifications: true },
  { title: "Perfil", url: "/app/social/perfil/1", icon: User },
];

export function BottomTab() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
    >
      <div className="glass-strong border-t border-border/50 px-4 py-2">
        <div className="flex items-center justify-around">
          {tabItems.map((item) => {
            if (item.isSwift) {
              return (
                <div key="swift" className="relative -top-3">
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
                    "flex flex-col items-center gap-1 px-3 py-2 min-w-[44px] transition-all duration-200",
                    isActive ? "text-brand" : "text-text-dim hover:text-text"
                  )
                }
              >
                <div className="relative">
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.hasNotifications && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-status-like text-white text-xs flex items-center justify-center p-0">
                      3
                    </Badge>
                  )}
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