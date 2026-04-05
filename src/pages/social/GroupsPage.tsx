import { useState } from "react";
import { Users, Plus, Search, ArrowRight, Lock, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";

const featuredGroups = [
  {
    name: "Said LAB Global",
    description: "Networking, atualizacoes internas e oportunidades do ecossistema.",
    privacy: "Privado",
    members: "128 membros",
  },
  {
    name: "Swift Marketplace Brasil",
    description: "Comunidade para vendedores, parceiros e novos projetos comerciais.",
    privacy: "Publico",
    members: "342 membros",
  },
];

export default function GroupsPage() {
  const [groupCode, setGroupCode] = useState("");

  return (
    <div className="min-h-screen bg-bg px-3 py-4 md:px-6">
      <div className="mx-auto flex max-w-[980px] flex-col gap-4">
        <GlassCard strong className="overflow-hidden">
          <div className="flex flex-col gap-8 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-xs font-semibold text-text-dim">
                  <Users className="h-3.5 w-3.5" />
                  <span>Grupos</span>
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-text md:text-[2.25rem]">Crie ou entre em um grupo</h1>
                  <p className="text-base leading-7 text-text-dim md:text-lg">
                    Use os grupos para reunir membros, organizar conversas privadas e centralizar comunicados da sua comunidade.
                  </p>
                </div>
              </div>

              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--accent))] text-brand">
                <Users className="h-8 w-8" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <GlassCard className="p-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent))] text-brand">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-text">Criar um grupo</h2>
                      <p className="text-sm text-text-dim">Monte sua comunidade com nome, descricao e privacidade.</p>
                    </div>
                  </div>
                  <Button className="w-full bg-[hsl(var(--brand))] text-white">
                    Criar grupo agora
                  </Button>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent))] text-brand">
                      <Search className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-text">Entrar em um grupo</h2>
                      <p className="text-sm text-text-dim">Cole o codigo, link ou nome do grupo para participar.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      value={groupCode}
                      onChange={(e) => setGroupCode(e.target.value)}
                      placeholder="Codigo ou nome do grupo"
                      className="flex-1"
                    />
                    <Button variant="outline" className="sm:min-w-[144px]">
                      Entrar
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-text">Grupos em destaque</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {featuredGroups.map((group) => (
                  <div key={group.name} className="rounded-xl bg-[hsl(var(--accent))] p-4 text-sm text-text-dim">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-base font-semibold text-text">{group.name}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#181818] px-2.5 py-1 text-xs text-white">
                        {group.privacy === "Privado" ? <Lock className="h-3 w-3" /> : <Globe2 className="h-3 w-3" />}
                        {group.privacy}
                      </span>
                    </div>
                    <p className="mb-3 leading-6">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <span>{group.members}</span>
                      <Button variant="ghost" size="sm" className="px-2 text-brand">
                        Ver grupo
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
