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
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SwiftCoinPrice } from "@/components/ui/swift-coin-price";

const mainNavItems = [
  { title: "Marketplace", url: "/app/marketplace", icon: Search },
];

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
  { title: "Solicitações", url: "/app/social/solicitacoes", icon: UserPlus },
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
      className={cn("glass-strong flex min-h-full w-full flex-col gap-6 rounded-[34px] px-4 py-5 text-text", className)}
    >
      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col gap-3">
        <div className="px-3 py-1">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-dim">
            Principal
          </h3>
        </div>
        
        {/* Social submenu trigger */}
        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          className={cn(
            "flex w-full items-center gap-3 rounded-[22px] px-3 py-3 text-[15px] font-semibold tracking-[-0.02em] transition-all duration-200",
            "bg-[hsl(var(--surface-solid)/0.34)] text-text hover:bg-[hsl(var(--surface-solid)/0.56)] hover:text-text"
          )}
        >
          <Home className="h-4 w-4" />
          <span className="flex-1 text-left">Social</span>
          {isSocialOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* Social submenu items */}
        <motion.div
          initial={false}
          animate={{
            height: isSocialOpen ? "auto" : 0,
            opacity: isSocialOpen ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="ml-3 flex flex-col gap-1.5 border-l border-[hsl(var(--stroke-soft))] pl-3">
            {socialNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-[20px] px-3 py-3 text-[15px] font-semibold tracking-[-0.02em] transition-all duration-200",
                    "hover:bg-[hsl(var(--surface-solid)/0.48)] hover:text-text",
                    isActive 
                      ? "gradient-brand text-white shadow-[0_16px_34px_hsl(var(--brand)/0.3)]" 
                      : "text-text"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </motion.div>

        {/* Business submenu trigger */}
        <button
          onClick={() => setIsBusinessOpen(!isBusinessOpen)}
          className={cn(
            "flex w-full items-center gap-3 rounded-[22px] px-3 py-3 text-[15px] font-semibold tracking-[-0.02em] transition-all duration-200",
            "bg-[hsl(var(--surface-solid)/0.34)] text-text hover:bg-[hsl(var(--surface-solid)/0.56)] hover:text-text"
          )}
        >
          <Building2 className="h-4 w-4" />
          <span className="flex-1 text-left">Meu Negócio</span>
          {isBusinessOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* Business submenu items */}
        <motion.div
          initial={false}
          animate={{
            height: isBusinessOpen ? "auto" : 0,
            opacity: isBusinessOpen ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="ml-3 flex flex-col gap-1.5 border-l border-[hsl(var(--stroke-soft))] pl-3">
            {businessNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-[20px] px-3 py-3 text-[15px] font-semibold tracking-[-0.02em] transition-all duration-200",
                    "hover:bg-[hsl(var(--surface-solid)/0.48)] hover:text-text",
                    isActive 
                      ? "gradient-brand text-white shadow-[0_16px_34px_hsl(var(--brand)/0.3)]" 
                      : "text-text"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </motion.div>

        {/* Regular main nav items */}
        {mainNavItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-[22px] px-3 py-3 text-[15px] font-semibold tracking-[-0.02em] transition-all duration-200",
                "hover:bg-[hsl(var(--surface-solid)/0.48)] hover:text-text",
                isActive 
                  ? "gradient-brand text-white shadow-[0_16px_34px_hsl(var(--brand)/0.3)]" 
                  : "text-text"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Swift Coin Price */}
      <SwiftCoinPrice className="mt-auto" />
    </motion.aside>
  );
}
