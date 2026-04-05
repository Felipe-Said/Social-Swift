import { useState } from "react";
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

const menuItems = [
  { label: "Seu feed", icon: Users, active: true },
  { label: "Descobrir", icon: Compass },
  { label: "Seus grupos", icon: UserPlus },
  { label: "Criar novo grupo", icon: Plus },
];

const featuredGroups = [
  {
    name: "Said LAB Global",
    description: "Networking, comunicados internos e oportunidades do ecossistema.",
    privacy: "Privado",
    members: "128 membros",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=320&fit=crop",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140&h=140&fit=crop&crop=face",
  },
  {
    name: "Swift Marketplace Brasil",
    description: "Comunidade para vendedores, parceiros e novos projetos comerciais.",
    privacy: "Publico",
    members: "342 membros",
    cover:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900&h=320&fit=crop",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=140&h=140&fit=crop&crop=face",
  },
  {
    name: "Creators Social Swift",
    description: "Grupo para criadores, divulgacao de novidades e colaboracoes.",
    privacy: "Privado",
    members: "89 membros",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=320&fit=crop",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140&h=140&fit=crop&crop=face",
  },
];

export default function GroupsPage() {
  const [groupCode, setGroupCode] = useState("");

  return (
    <div className="min-h-screen bg-bg px-3 py-4 md:px-6">
      <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-4 xl:flex-row">
        <aside className="w-full shrink-0 xl:w-[360px]">
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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text">Descubra e participe de grupos</h2>
                <p className="mt-1 text-sm text-text-dim">
                  Crie sua comunidade ou entre em um grupo existente com codigo, link ou nome.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                  placeholder="Codigo ou nome do grupo"
                  className="min-w-[260px]"
                />
                <Button variant="outline" className="sm:min-w-[132px]">
                  <Search className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                    <Button variant="outline" className="flex-1">
                      Ver grupo
                      <ArrowRight className="ml-2 h-4 w-4" />
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
