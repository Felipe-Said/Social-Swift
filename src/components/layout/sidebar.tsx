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
        "flex min-h-full w-full flex-col gap-2 bg-[hsl(var(--sidebar-bg))] px-2 py-4 shadow-none lg:sticky lg:top-[72px] lg:min-h-[calc(100vh-88px)] lg:rounded-none lg:border-none lg:bg-[hsl(var(--sidebar-bg))]",
        className
      )}
    >
      <nav className="flex flex-1 flex-col gap-1">
        <NavLink
          to="/app/social/perfil"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[hsl(var(--accent))]",
              isActive && "bg-[hsl(var(--sidebar-active))]"
            )
          }
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "F"}</AvatarFallback>
          </Avatar>
          <span className="text-[15px] font-semibold text-text">{user?.name || "Felipe Said"}</span>
        </NavLink>

        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold text-text transition-colors hover:bg-[hsl(var(--accent))]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))]">
            <Home className="h-5 w-5 text-brand" />
          </div>
          <span className="flex-1">Social</span>
          {isSocialOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        <motion.div
          initial={false}
          animate={{ height: isSocialOpen ? "auto" : 0, opacity: isSocialOpen ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="overflow-hidden"
        >
          <div className="ml-2 flex flex-col gap-1 pl-2">
            {socialNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-[hsl(var(--sidebar-active))] text-text"
                      : "text-text hover:bg-[hsl(var(--accent))]"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </motion.div>

        <button
          onClick={() => setIsBusinessOpen(!isBusinessOpen)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold text-text transition-colors hover:bg-[hsl(var(--accent))]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))]">
            <Building2 className="h-5 w-5 text-brand" />
          </div>
          <span className="flex-1">Meu Negocio</span>
          {isBusinessOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        <motion.div
          initial={false}
          animate={{ height: isBusinessOpen ? "auto" : 0, opacity: isBusinessOpen ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="overflow-hidden"
        >
          <div className="ml-2 flex flex-col gap-1 pl-2">
            {businessNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-[hsl(var(--sidebar-active))] text-text"
                      : "text-text hover:bg-[hsl(var(--accent))]"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
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
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-[hsl(var(--sidebar-active))] text-text"
                    : "text-text hover:bg-[hsl(var(--accent))]"
                )
              }
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))]">
                <item.icon className="h-5 w-5 text-brand" />
              </div>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="px-2 pt-2">
        <SwiftCoinPrice className="hidden lg:block" />
      </div>
    </motion.aside>
  );
}
