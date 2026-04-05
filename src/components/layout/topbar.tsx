import { useState } from "react";
import { Search, Bell, HelpCircle, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SwiftButton } from "@/components/ui/swift-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-strong sticky top-0 z-50 flex h-16 items-center justify-between rounded-[30px] px-4 lg:px-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="gradient-brand flex h-10 w-10 items-center justify-center rounded-[16px] shadow-[0_16px_32px_hsl(var(--brand)/0.28)]">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <div className="hidden sm:block">
            <p className="ios-caption uppercase tracking-[0.18em]">Apple Style UI</p>
            <p className="ios-title text-lg font-semibold text-text">Social Swift</p>
          </div>
        </div>
      </div>

      <div className="mx-4 hidden max-w-md flex-1 md:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim" />
          <Input
            placeholder="Buscar usuarios, posts e produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SwiftButton size="sm" className="hidden sm:flex" />
        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-status-like p-0 text-[10px] text-white">
            3
          </Badge>
        </Button>

        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <HelpCircle className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9 ring-1 ring-[hsl(var(--stroke-soft))]">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-strong w-56 border-[hsl(var(--stroke-soft))]" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
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
            <DropdownMenuItem onClick={signOut} className="text-status-like">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
