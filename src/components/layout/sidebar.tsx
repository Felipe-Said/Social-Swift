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
  UserPlus
} from "lucide-react";
import { motion } from "framer-motion";

const mainNavItems = [
  { title: "Social", url: "/app/social", icon: Home },
  { title: "Dashboard", url: "/app/dashboard", icon: BarChart3 },
  { title: "Saques", url: "/app/saques", icon: ArrowDownToLine },
  { title: "Vendas", url: "/app/vendas", icon: CreditCard },
  { title: "Taxas", url: "/app/taxas", icon: Percent },
  { title: "Meu Negócio", url: "/app/meu-negocio", icon: Building2 },
];

const socialNavItems = [
  { title: "Feed", url: "/app/social/feed", icon: Home },
  { title: "Stories", url: "/app/social/stories", icon: Heart },
  { title: "Buscar", url: "/app/social/buscar", icon: Search },
  { title: "Mensagens", url: "/app/social/chats", icon: MessageCircle },
  { title: "Amigos", url: "/app/social/amigos", icon: Users },
  { title: "Solicitações", url: "/app/social/solicitacoes", icon: UserPlus },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn("glass-strong border-r border-border/50 w-64 min-h-screen p-4 space-y-6", className)}
    >
      {/* Main Navigation */}
      <nav className="space-y-2">
        <div className="px-3 py-2">
          <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider">
            Principal
          </h3>
        </div>
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

      {/* Social Navigation */}
      <nav className="space-y-2">
        <div className="px-3 py-2">
          <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider">
            Social
          </h3>
        </div>
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
      </nav>

      {/* Quick Stats */}
      <div className="glass p-4 space-y-3">
        <h4 className="text-sm font-semibold text-text">Swift Coin</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-dim">Saldo</span>
            <span className="font-semibold text-brand">15.420,50 SC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-dim">≈ USD</span>
            <span className="text-text">$8.950,25</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}