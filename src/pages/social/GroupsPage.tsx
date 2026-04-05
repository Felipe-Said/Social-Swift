import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Plus,
  Search,
  ArrowRight,
  Lock,
  Globe2,
  Compass,
  UserPlus,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { featuredGroups } from "./groups-data";

const menuItems = [
  { label: "Seu feed", icon: Users, active: true },
  { label: "Descobrir", icon: Compass },
  { label: "Seus grupos", icon: UserPlus },
  { label: "Criar novo grupo", icon: Plus },
];

export default function GroupsPage() {
  const [groupCode, setGroupCode] = useState("");

  return (
    <div className="min-h-screen bg-bg px-3 py-4 md:px-6">
      <div className="mx-auto grid w-full max-w-[1240px] gap-4 2xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="w-full shrink-0 2xl:sticky 2xl:top-24 2xl:self-start">
          <GlassCard className="overflow-hidden p-0">
            <div className="border-b border-[hsl(var(--stroke-soft))] px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-dim">Social</p>
                  <h1 className="text-[2rem] font-bold leading-none text-text">Grupos</h1>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full bg-[hsl(var(--accent))]">
                  <Settings2 className="h-5 w-5" />
                </Button>
              </div>
              <Button className="w-full bg-[hsl(var(--brand))] text-white">
                <Plus className="mr-2 h-4 w-4" />
                Criar novo grupo
              </Button>
            </div>

            <div className="space-y-1 px-3 py-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    item.active ? "bg-[#181818] text-white" : "text-text hover:bg-[#181818]"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-brand">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[15px] font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </aside>

        <div className="min-w-0 flex-1 space-y-4">
          <GlassCard className="p-5">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">
              <div className="min-w-0">
                <h2 className="max-w-[560px] text-2xl font-bold leading-tight text-text sm:text-[2rem]">
                  Descubra e participe de grupos
                </h2>
                <p className="mt-1 text-sm text-text-dim">
                  Crie sua comunidade ou entre em um grupo existente com codigo, link ou nome.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row xl:justify-end">
                <Input
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                  placeholder="Codigo ou nome do grupo"
                  className="w-full sm:flex-1 xl:max-w-[360px]"
                />
                <Button variant="outline" className="sm:min-w-[132px]">
                  <Search className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-2">
            {featuredGroups.map((group) => (
              <GlassCard key={group.name} className="overflow-hidden p-0">
                <div className="h-36 w-full">
                  <img src={group.cover} alt={group.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-start gap-3">
                    <Avatar className="h-14 w-14 border border-[hsl(var(--stroke-soft))]">
                      <AvatarImage src={group.avatar} alt={group.name} />
                      <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-text">{group.name}</h3>
                      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#181818] px-2.5 py-1 text-xs text-white">
                        {group.privacy === "Privado" ? <Lock className="h-3 w-3" /> : <Globe2 className="h-3 w-3" />}
                        {group.privacy}
                      </div>
                    </div>
                  </div>

                  <p className="mb-3 line-clamp-3 text-sm leading-6 text-text-dim">{group.description}</p>
                  <p className="mb-4 text-sm text-text-dim">{group.members}</p>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[hsl(var(--brand))] text-white">Entrar</Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to={`/app/social/grupos/${group.id}`}>
                        Ver grupo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
