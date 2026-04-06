import { useState } from "react";
import { Search, Bell, MessageCircle, User, Menu, Home, PlaySquare, Store, Users } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/stores/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navItems = [
    { to: "/app/social/feed", icon: Home, label: "Feed" },
    { to: "/app/social/snaps", icon: PlaySquare, label: "Snaps" },
    { to: "/app/marketplace", icon: Store, label: "Marketplace" },
    { to: "/app/social/amigos", icon: Users, label: "Amigos" },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-transparent px-3 py-2 lg:px-6"
    >
      <div className="ds-surface flex h-[var(--page-padding)] items-center justify-between gap-4 px-3 lg:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/app/social/feed" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--primary-gradient-strong)] text-lg font-medium text-white">
              f
            </div>
          </Link>

          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar no Social Swift"
              className="h-9 w-[260px] rounded-full border-white/30 bg-[hsl(var(--accent))] pl-11 text-[0.875rem]"
            />
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center px-6 lg:flex">
          <div className="flex items-center gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "group flex min-w-[92px] flex-col items-center justify-center rounded-[0.875rem] px-5 py-2 transition-all duration-200",
                    isActive
                      ? "bg-white text-black shadow-[var(--button-shell)]"
                      : "text-[hsl(var(--text-dim))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--text))]",
                  ].join(" ")
                }
              >
                <item.icon className="h-5 w-5 stroke-[2.2]" />
                <span className="mt-1 text-[11px] font-medium tracking-[0.01em]">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button asChild variant="ghost" size="icon" className="hidden rounded-full bg-[hsl(var(--accent))] lg:flex">
            <Link to="/app/social/grupos">
              <Users className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden rounded-full bg-[hsl(var(--accent))] lg:flex">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden rounded-full bg-[hsl(var(--accent))] lg:flex">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                <Avatar className="h-9 w-9 rounded-full border border-white/30 bg-white p-1 shadow-[var(--button-shell)]">
                  <AvatarImage src={user?.avatar} alt={user?.name} className="rounded-full object-cover" />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="ds-dropdown w-56 border border-white/30 bg-[hsl(var(--surface))]">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-text-dim">@{user?.username}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/app/social/perfil">Meu Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/app/carteira">Carteira</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Configuracoes</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
