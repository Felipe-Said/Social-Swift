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
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  
  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn("glass-strong border-r border-border/50 w-64 min-h-screen p-4 space-y-6 fixed top-0 left-0 z-10", className)}
    >
      {/* Main Navigation */}
      <nav className="space-y-2">
        <div className="px-3 py-2">
          <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider">
            Principal
          </h3>
        </div>
        
        {/* Social submenu trigger */}
        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-brand text-sm font-medium transition-all duration-200",
            "hover:bg-brand/10 hover:text-brand text-text"
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
          <div className="ml-4 space-y-1 border-l border-border/30 pl-3">
            {socialNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-brand text-sm font-medium transition-all duration-200",
                    "hover:bg-brand/10 hover:text-brand",
                    isActive 
                      ? "bg-brand/20 text-brand shadow-sm" 
                      : "text-text hover:text-brand"
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
            "w-full flex items-center gap-3 px-3 py-2 rounded-brand text-sm font-medium transition-all duration-200",
            "hover:bg-brand/10 hover:text-brand text-text"
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
          <div className="ml-4 space-y-1 border-l border-border/30 pl-3">
            {businessNavItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-brand text-sm font-medium transition-all duration-200",
                    "hover:bg-brand/10 hover:text-brand",
                    isActive 
                      ? "bg-brand/20 text-brand shadow-sm" 
                      : "text-text hover:text-brand"
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
                "flex items-center gap-3 px-3 py-2 rounded-brand text-sm font-medium transition-all duration-200",
                "hover:bg-brand/10 hover:text-brand",
                isActive 
                  ? "bg-brand/20 text-brand shadow-sm" 
                  : "text-text hover:text-brand"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Swift Coin Price */}
      <SwiftCoinPrice />
    </motion.aside>
  );
}