import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Globe2,
  LayoutGrid,
  Target,
  TrendingUp,
  Users2,
} from "lucide-react";

const performanceItems = [
  { label: "Conversao", value: 78, tone: "bg-emerald-500" },
  { label: "Retencao", value: 84, tone: "bg-sky-500" },
  { label: "Engajamento", value: 69, tone: "bg-violet-500" },
  { label: "Entrega", value: 91, tone: "bg-amber-500" },
];

const recentActivities = [
  { title: "Novo contrato aprovado", meta: "Marketplace Team", time: "ha 12 min" },
  { title: "Saldo processado com sucesso", meta: "Financeiro", time: "ha 34 min" },
  { title: "Campanha atualizada", meta: "TikTok Ads", time: "ha 1 h" },
  { title: "Projeto publicado", meta: "Said LAB Global", time: "ha 2 h" },
];

const quickTasks = [
  { title: "Revisar metricas de vendas", status: "Hoje" },
  { title: "Atualizar taxa do marketplace", status: "Pendente" },
  { title: "Validar novos saques", status: "3 itens" },
  { title: "Publicar relatorio semanal", status: "16:00" },
];

const revenueBars = [
  { label: "Seg", value: 42 },
  { label: "Ter", value: 58 },
  { label: "Qua", value: 49 },
  { label: "Qui", value: 73 },
  { label: "Sex", value: 81 },
  { label: "Sab", value: 64 },
  { label: "Dom", value: 55 },
];

function formatClock(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getLocationInfo() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const city = timezone?.split("/").pop()?.replace(/_/g, " ") || "Sao Paulo";

  return {
    city,
    timezone: timezone || "America/Sao_Paulo",
  };
}

function StatCard({
  icon: Icon,
  title,
  value,
  change,
}: {
  icon: typeof DollarSign;
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-3xl border border-white/5 bg-[#111111] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-[#3b82f6]">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {change}
        </div>
      </div>
      <div className="mt-6 space-y-1">
        <p className="text-sm text-white/55">{title}</p>
        <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const location = useMemo(() => getLocationInfo(), []);
  const currentHour = now.getHours();
  const greeting =
    currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  const totalRevenue = useMemo(
    () => revenueBars.reduce((sum, item) => sum + item.value, 0),
    []
  );

  return (
    <div className="min-h-screen bg-transparent px-3 py-3 sm:px-4 lg:px-0 lg:py-4">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-4">
        <section className="overflow-hidden rounded-[30px] border border-white/5 bg-[linear-gradient(135deg,#111111_0%,#151b25_45%,#1d2c43_100%)]">
          <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/45">
                  Meu negocio
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  {greeting}, Felipe
                </h1>
                <p className="max-w-2xl text-sm text-white/65 sm:text-base">
                  Acompanhe o desempenho do negocio em tempo real com uma visao clara de receita,
                  operacao e crescimento.
                </p>
              </div>

              <div className="flex flex-wrap items-end gap-3">
                <div className="text-5xl font-bold leading-none tracking-tight text-white sm:text-7xl">
                  {formatClock(now)}
                </div>
                <div className="pb-1 text-lg font-semibold uppercase text-white/55">hrs</div>
              </div>
            </div>

            <div className="grid gap-3 sm:min-w-[320px]">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/55">Localizacao atual</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                      {location.city}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sky-300">
                    <Globe2 className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-5 space-y-1">
                  <p className="text-sm font-medium text-white">{location.timezone}</p>
                  <p className="text-sm capitalize text-white/55">{formatDate(now)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={DollarSign} title="Receita total" value={`R$ ${totalRevenue} mil`} change="+12%" />
          <StatCard icon={CreditCard} title="Vendas da semana" value="1.284" change="+8%" />
          <StatCard icon={Users2} title="Clientes ativos" value="3.742" change="+15%" />
          <StatCard icon={Target} title="Meta do mes" value="87%" change="+6%" />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
          <div className="grid gap-4">
            <div className="rounded-[30px] border border-white/5 bg-[#111111] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm text-white/55">Resumo executivo</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                    Performance do negocio
                  </h2>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  Crescimento consistente
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl bg-[#181818] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/55">Receita diaria</p>
                    <BarChart3 className="h-4 w-4 text-white/40" />
                  </div>
                  <div className="mt-6 flex h-52 items-end gap-3">
                    {revenueBars.map((item) => (
                      <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
                        <div className="flex h-full w-full items-end">
                          <div
                            className="w-full rounded-t-2xl bg-gradient-to-t from-[#2563eb] via-[#3b82f6] to-[#93c5fd]"
                            style={{ height: `${item.value}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-white/50">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-[#181818] p-5">
                  <p className="text-sm text-white/55">Indicadores chave</p>
                  <div className="mt-5 space-y-5">
                    {performanceItems.map((item) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <span className="font-medium text-white">{item.label}</span>
                          <span className="text-white/60">{item.value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5">
                          <div
                            className={`h-2 rounded-full ${item.tone}`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[30px] border border-white/5 bg-[#111111] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/55">Atividades recentes</p>
                    <h3 className="mt-1 text-xl font-bold text-white">Fluxo operacional</h3>
                  </div>
                  <Activity className="h-5 w-5 text-white/40" />
                </div>
                <div className="mt-6 space-y-4">
                  {recentActivities.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl bg-[#181818] p-4"
                    >
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-white/50">{item.meta}</p>
                      </div>
                      <span className="whitespace-nowrap text-xs font-medium text-white/40">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/5 bg-[#111111] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/55">Tarefas rapidas</p>
                    <h3 className="mt-1 text-xl font-bold text-white">Prioridades do dia</h3>
                  </div>
                  <LayoutGrid className="h-5 w-5 text-white/40" />
                </div>
                <div className="mt-6 space-y-3">
                  {quickTasks.map((task) => (
                    <div
                      key={task.title}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-[#181818] px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{task.title}</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/55">
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[30px] border border-white/5 bg-[#111111] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/55">Saude operacional</p>
                  <h3 className="mt-1 text-xl font-bold text-white">Radar rapido</h3>
                </div>
                <Clock3 className="h-5 w-5 text-white/40" />
              </div>
              <div className="mt-6 flex items-center justify-center">
                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-[18px] border-white/5">
                  <div className="absolute h-52 w-52 rounded-full border-[18px] border-transparent border-t-[#3b82f6] border-r-[#3b82f6] rotate-45" />
                  <div className="absolute h-40 w-40 rounded-full border-[14px] border-transparent border-t-emerald-500 border-r-emerald-500 rotate-[22deg]" />
                  <div className="absolute h-28 w-28 rounded-full border-[10px] border-white/10" />
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">85%</p>
                    <p className="mt-1 text-sm text-white/50">Score geral</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { label: "Resposta media", value: "32 min" },
                  { label: "Aprovacoes", value: "94%" },
                  { label: "Falhas", value: "2.1%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-white/55">{item.label}</span>
                    <span className="font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/5 bg-[#111111] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/55">Visao comercial</p>
                  <h3 className="mt-1 text-xl font-bold text-white">Distribuicao de receita</h3>
                </div>
                <TrendingUp className="h-5 w-5 text-white/40" />
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { label: "Servicos", value: 46, color: "bg-[#3b82f6]" },
                  { label: "Marketplace", value: 31, color: "bg-emerald-500" },
                  { label: "Assinaturas", value: 15, color: "bg-violet-500" },
                  { label: "Outros", value: 8, color: "bg-amber-500" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-white">{item.label}</span>
                      <span className="text-white/55">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5">
                      <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
