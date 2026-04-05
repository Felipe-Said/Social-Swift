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
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SwiftCoinPrice } from "@/components/ui/swift-coin-price";

const mainNavItems = [{ title: "Marketplace", url: "/app/marketplace", icon: Search }];

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

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "glass-strong flex min-h-[calc(100vh-2rem)] w-full flex-col gap-6 rounded-none border-x-0 border-y-0 px-3 py-4 shadow-none lg:rounded-2xl lg:border lg:border-[hsl(var(--stroke-soft))] lg:bg-[hsl(var(--surface-solid))] lg:shadow-[var(--shadow)]",
        className
      )}
    >
      <div className="hidden items-center gap-3 px-3 pt-1 lg:flex">
        <div className="gradient-brand flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
          S
        </div>
        <div>
          <p className="text-xl font-bold text-brand">social swift</p>
          <p className="text-xs text-text-dim">Inicio rapido</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-4">
        <div className="px-3 pt-1">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-dim">Principal</h3>
        </div>

        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold text-text transition-colors hover:bg-[hsl(var(--accent))]"
        >
          <Home className="h-5 w-5" />
          <span className="flex-1">Social</span>
          {isSocialOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        <motion.div
          initial={false}
          animate={{ height: isSocialOpen ? "auto" : 0, opacity: isSocialOpen ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="overflow-hidden"
        >
          <div className="ml-3 flex flex-col gap-1 pl-2">
            {socialNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                    isActive ? "bg-[hsl(var(--accent))] text-text" : "text-text hover:bg-[hsl(var(--accent))]"
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
          <Building2 className="h-5 w-5" />
          <span className="flex-1">Meu Negocio</span>
          {isBusinessOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        <motion.div
          initial={false}
          animate={{ height: isBusinessOpen ? "auto" : 0, opacity: isBusinessOpen ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="overflow-hidden"
        >
          <div className="ml-3 flex flex-col gap-1 pl-2">
            {businessNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                    isActive ? "bg-[hsl(var(--accent))] text-text" : "text-text hover:bg-[hsl(var(--accent))]"
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
                  isActive ? "bg-[hsl(var(--accent))] text-text" : "text-text hover:bg-[hsl(var(--accent))]"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <SwiftCoinPrice className="hidden lg:block" />
    </motion.aside>
  );
}
