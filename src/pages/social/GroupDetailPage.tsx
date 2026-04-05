import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Globe2,
  Images,
  Lock,
  MessageSquare,
  Plus,
  Settings2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { featuredGroups } from "./groups-data";

const posts = [
  {
    author: "Felipe Said",
    handle: "@felipesaid_",
    time: "ha 12 min",
    text: "Bem-vindos ao grupo. Este espaco vai centralizar anuncios, networking e novidades da comunidade.",
  },
  {
    author: "Said LAB",
    handle: "@saidlabglobal",
    time: "ha 1 h",
    text: "Abrimos o calendario da semana com encontros, atualizacoes do marketplace e novas oportunidades de parceria.",
  },
];

const sideLinks = ["Sobre", "Destaques", "Midia", "Membros", "Eventos"];

export default function GroupDetailPage() {
  const { groupId } = useParams();
  const group = featuredGroups.find((item) => item.id === groupId) ?? featuredGroups[0];

  return (
    <div className="min-h-screen bg-bg px-3 py-4 md:px-6">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4">
        <GlassCard className="overflow-hidden p-0">
          <div className="h-48 w-full sm:h-60 lg:h-72">
            <img src={group.cover} alt={group.name} className="h-full w-full object-cover" />
          </div>

          <div className="px-4 pb-5 pt-4 md:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex min-w-0 gap-4">
                <Avatar className="-mt-14 h-24 w-24 shrink-0 rounded-2xl border-4 border-[#111111] sm:-mt-16 sm:h-28 sm:w-28">
                  <AvatarImage src={group.avatar} alt={group.name} />
                  <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 self-end">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-text-dim">
                    <span className="rounded-full bg-[#181818] px-2.5 py-1">{group.category}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#181818] px-2.5 py-1">
                      {group.privacy === "Privado" ? <Lock className="h-3 w-3" /> : <Globe2 className="h-3 w-3" />}
                      {group.privacy}
                    </span>
                  </div>
                  <h1 className="truncate text-3xl font-bold text-text">{group.name}</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-text-dim">{group.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-dim">
                    <span className="inline-flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {group.members}
                    </span>
                    <span>Atividade diaria</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Button variant="outline" asChild>
                  <Link to="/app/social/grupos">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Link>
                </Button>
                <Button className="bg-[hsl(var(--brand))] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Participar
                </Button>
                <Button variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificacoes
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-[#181818]">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
          <div className="space-y-4">
            <GlassCard className="p-4">
              <h2 className="text-lg font-semibold text-text">Navegacao</h2>
              <div className="mt-4 space-y-2">
                {sideLinks.map((item, index) => (
                  <button
                    key={item}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                      index === 0 ? "bg-[#181818] text-white" : "text-text-dim hover:bg-[#181818] hover:text-text"
                    }`}
                  >
                    {item}
                    <span className="text-xs">{index === 0 ? "Atual" : ""}</span>
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <h2 className="text-lg font-semibold text-text">Informacoes</h2>
              <div className="mt-4 space-y-3 text-sm text-text-dim">
                <p>Grupo focado em trocas entre membros, projetos, convites e comunicados oficiais.</p>
                <p>Publicacoes moderadas pela equipe da comunidade.</p>
                <p>Regras visiveis para todos os participantes.</p>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-4">
            <GlassCard className="p-4 md:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-text">Escreva algo no grupo</h2>
                  <p className="text-sm text-text-dim">Compartilhe atualizacoes, links ou avisos com os membros.</p>
                </div>
                <Button className="bg-[hsl(var(--brand))] text-white">Criar publicacao</Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-[hsl(var(--stroke-soft))] pt-4">
                <Button variant="outline" size="sm">
                  <Images className="mr-2 h-4 w-4" />
                  Foto
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Pergunta
                </Button>
              </div>
            </GlassCard>

            {posts.map((post) => (
              <GlassCard key={`${post.author}-${post.time}`} className="p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={group.avatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-text">{post.author}</h3>
                      <span className="text-xs text-text-dim">{post.handle}</span>
                      <span className="text-xs text-text-dim">• {post.time}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text">{post.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Curtir
                      </Button>
                      <Button variant="outline" size="sm">
                        Comentar
                      </Button>
                      <Button variant="outline" size="sm">
                        Compartilhar
                      </Button>
                    </div>
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
