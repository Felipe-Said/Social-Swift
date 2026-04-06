import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  BarChart3,
  ArrowDownToLine,
  CreditCard,
  Percent,
  Building2,
  Heart,
  Search,
  MessageCircle,
  Users,
  UserPlus,
  User,
  ChevronDown,
  ChevronRight,
  Store,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SwiftCoinPrice } from "@/components/ui/swift-coin-price";
import { useAuth } from "@/stores/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainNavItems = [{ title: "Marketplace", url: "/app/marketplace", icon: Store }];

const businessNavItems = [
  { title: "Dashboard", url: "/app/dashboard", icon: BarChart3 },
  { title: "Saques", url: "/app/saques", icon: ArrowDownToLine },
  { title: "Vendas", url: "/app/vendas", icon: CreditCard },
  { title: "Taxas", url: "/app/taxas", icon: Percent },
  { title: "Projetos", url: "/app/projetos", icon: Building2 },
];

const socialNavItems = [
  { title: "Feed", url: "/app/social/feed", icon: Home },
  { title: "Meu perfil", url: "/app/social/perfil", icon: User },
  { title: "Snaps", url: "/app/social/snaps", icon: Heart },
  { title: "Buscar", url: "/app/social/buscar", icon: Search },
  { title: "Mensagens", url: "/app/social/chats", icon: MessageCircle },
  { title: "Amigos", url: "/app/social/amigos", icon: Users },
  { title: "Solicitacoes", url: "/app/social/solicitacoes", icon: UserPlus },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isSocialOpen, setIsSocialOpen] = useState(true);
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);
  const { user } = useAuth();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "flex min-h-full w-full flex-col gap-3 rounded-md border border-white/30 bg-[hsl(var(--sidebar-bg))] px-3 py-4 shadow-[var(--shadow-elevated)] lg:sticky lg:top-[calc(var(--page-padding)+0.75rem)] lg:min-h-[calc(100vh-5.75rem)] lg:px-3",
        className
      )}
    >
      <nav className="flex flex-1 flex-col gap-2">
        <NavLink
          to="/app/social/perfil"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 transition-all duration-200 hover:bg-[hsl(var(--accent))]",
              isActive && "bg-[hsl(var(--sidebar-active))]"
            )
          }
        >
          <Avatar className="h-9 w-9 rounded-full border border-white/30 bg-white p-1 shadow-[var(--button-shell)]">
            <AvatarImage src={user?.avatar} alt={user?.name} className="rounded-full object-cover" />
            <AvatarFallback>{user?.name?.charAt(0) || "F"}</AvatarFallback>
          </Avatar>
          <span className="text-[0.875rem] font-medium text-text">{user?.name || "Felipe Said"}</span>
        </NavLink>

        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[0.875rem] font-medium text-text transition-all duration-200 hover:bg-[hsl(var(--accent))]"
        >
          <span className="ds-icon-circle h-9 w-9 !bg-[image:var(--primary-gradient-strong)] !text-white">
            <Home className="h-4 w-4" />
          </span>
          <span className="flex-1">Social</span>
          {isSocialOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        <motion.div
          initial={false}
          animate={{ height: isSocialOpen ? "auto" : 0, opacity: isSocialOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="flex flex-col gap-1 pl-2">
            {socialNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.875rem] font-medium transition-all duration-200",
                    isActive
                      ? "bg-[hsl(var(--sidebar-active))] text-text"
                      : "text-text hover:bg-[hsl(var(--accent))]"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </motion.div>

        <button
          onClick={() => setIsBusinessOpen(!isBusinessOpen)}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[0.875rem] font-medium text-text transition-all duration-200 hover:bg-[hsl(var(--accent))]"
        >
          <span className="ds-icon-circle h-9 w-9 !bg-[image:var(--primary-gradient-strong)] !text-white">
            <Building2 className="h-4 w-4" />
          </span>
          <span className="flex-1">Meu Negocio</span>
          {isBusinessOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        <motion.div
          initial={false}
          animate={{ height: isBusinessOpen ? "auto" : 0, opacity: isBusinessOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="flex flex-col gap-1 pl-2">
            {businessNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.875rem] font-medium transition-all duration-200",
                    isActive
                      ? "bg-[hsl(var(--sidebar-active))] text-text"
                      : "text-text hover:bg-[hsl(var(--accent))]"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.875rem] font-medium transition-all duration-200",
                  isActive
                    ? "bg-[hsl(var(--sidebar-active))] text-text"
                    : "text-text hover:bg-[hsl(var(--accent))]"
                )
              }
            >
              <span className="ds-icon-circle h-9 w-9 !bg-[image:var(--primary-gradient-strong)] !text-white">
                <item.icon className="h-4 w-4" />
              </span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="rounded-md bg-[hsl(var(--accent))] p-2">
        <SwiftCoinPrice className="hidden lg:block" />
      </div>
    </motion.aside>
  );
}
