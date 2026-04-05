import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpRight,
  BadgeDollarSign,
  CalendarRange,
  ChevronRight,
  Download,
  LayoutGrid,
  MoreHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const summaryCards = [
  {
    title: "Receita total",
    value: "R$ 184.250",
    delta: "+12.4%",
    helper: "Comparado ao ultimo mes",
    icon: BadgeDollarSign,
  },
  {
    title: "Novos clientes",
    value: "1.248",
    delta: "+8.1%",
    helper: "Crescimento semanal",
    icon: Users,
  },
  {
    title: "Pedidos ativos",
    value: "326",
    delta: "-2.3%",
    helper: "Desde ontem",
    icon: LayoutGrid,
  },
  {
    title: "Conversao",
    value: "8.42%",
    delta: "+1.7%",
    helper: "Ultimos 30 dias",
    icon: Sparkles,
  },
];

const audienceCards = [
  { label: "Visitantes", value: "24.8k", percent: 84 },
  { label: "Leads", value: "6.3k", percent: 61 },
  { label: "Compradores", value: "1.9k", percent: 47 },
];

const conversionBars = [
  { month: "Jan", value: 82 },
  { month: "Fev", value: 87 },
  { month: "Mar", value: 73 },
  { month: "Abr", value: 91 },
  { month: "Mai", value: 84 },
];

const performanceData = [
  { metric: "Engagement", value: 82 },
  { metric: "Conversao", value: 74 },
  { metric: "Satisfacao", value: 88 },
  { metric: "Conteudo", value: 79 },
  { metric: "Performance", value: 67 },
];

const activityList = [
  {
    title: "Campanha Social Swift Pro",
    subtitle: "Atualizada ha 12 min",
    value: "R$ 18.420",
    trend: "up",
  },
  {
    title: "Checkout do Marketplace",
    subtitle: "Melhoria no funil de compra",
    value: "R$ 9.310",
    trend: "up",
  },
  {
    title: "Projeto Said LAB Store",
    subtitle: "Oscilacao de conversao hoje",
    value: "R$ 4.180",
    trend: "down",
  },
];

const tasks = [
  { title: "Atualizar criativos da campanha", progress: 74 },
  { title: "Revisar fluxo de saque", progress: 58 },
  { title: "Finalizar integracao de analytics", progress: 91 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f0f10] px-3 py-4 md:px-6 lg:px-0 lg:py-6">
      <div className="mx-auto w-full max-w-[1320px] space-y-4">
        <section className="rounded-[28px] border border-white/5 bg-[linear-gradient(135deg,rgba(31,41,55,0.92)_0%,rgba(17,24,39,0.98)_60%,rgba(9,9,11,1)_100%)] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)] md:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-[720px]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                <CalendarRange className="h-3.5 w-3.5" />
                Visao executiva do negocio
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 max-w-[640px] text-sm leading-6 text-white/60 md:text-base">
                Monitore receita, conversao, performance e atividade operacional do seu negocio em uma unica visao.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button className="rounded-full bg-white text-black hover:bg-white/90">
                Abrir relatorio
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((item) => {
              const Icon = item.icon;
              const isNegative = item.delta.startsWith("-");

              return (
                <Card key={item.title} className="rounded-[24px] border-white/5 bg-white/[0.04] text-white shadow-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardDescription className="text-sm text-white/55">{item.title}</CardDescription>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8">
                        <Icon className="h-5 w-5 text-white/80" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-[1.85rem] font-semibold tracking-tight text-white">{item.value}</div>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${
                          isNegative ? "bg-orange-500/15 text-orange-300" : "bg-emerald-500/15 text-emerald-300"
                        }`}
                      >
                        {isNegative ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                        {item.delta}
                      </span>
                      <span className="text-white/45">{item.helper}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
          <Card className="rounded-[28px] border-white/5 bg-[#151617] text-white shadow-none">
            <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
              <div>
                <CardTitle className="text-lg text-white">Funil de conversao</CardTitle>
                <CardDescription className="mt-1 text-white/50">
                  Meta mensal comparada ao desempenho recente
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 text-white hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[24px] border border-white/5 bg-black/20 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/50">Meta atingida</p>
                      <p className="mt-1 text-3xl font-semibold text-white">88.0%</p>
                    </div>
                    <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/65">Best month: Abr</div>
                  </div>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={conversionBars} margin={{ top: 10, right: 0, left: -16, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} />
                        <Bar dataKey="value" radius={[18, 18, 18, 18]} barSize={30}>
                          {conversionBars.map((entry) => (
                            <Cell
                              key={entry.month}
                              fill={entry.month === "Abr" ? "rgba(255,255,255,0.95)" : "rgba(180,192,205,0.72)"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-white/[0.03] p-3 text-center">
                      <div className="text-base font-semibold text-white">88.0%</div>
                      <div className="text-xs text-white/45">Avg Completion</div>
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] p-3 text-center">
                      <div className="text-base font-semibold text-white">4/5</div>
                      <div className="text-xs text-white/45">Above Target</div>
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] p-3 text-center">
                      <div className="text-base font-semibold text-white">Abr</div>
                      <div className="text-xs text-white/45">Best Month</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),#101112] p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">Performance Analytics</h3>
                    <p className="mt-1 text-sm text-white/50">Visao combinada de indicadores chave</p>
                  </div>
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={performanceData} outerRadius="72%">
                        <PolarGrid stroke="rgba(255,255,255,0.08)" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }} />
                        <Radar
                          dataKey="value"
                          stroke="rgba(255,255,255,0.88)"
                          fill="rgba(255,255,255,0.24)"
                          strokeWidth={2.5}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-sm leading-6 text-white/55">
                    Tip: melhore a performance otimizando conteudo, velocidade de checkout e experiencia de navegacao.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="rounded-[28px] border-white/5 bg-[#151617] text-white shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white">Audience Overview</CardTitle>
                <CardDescription className="text-white/50">Acompanhe os principais pontos do funil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {audienceCards.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/55">{item.label}</span>
                      <span className="font-medium text-white">{item.value}</span>
                    </div>
                    <Progress value={item.percent} className="h-2.5 bg-white/10 [&>div]:bg-white" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-white/5 bg-[#151617] text-white shadow-none">
              <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
                <div>
                  <CardTitle className="text-lg text-white">Atividade recente</CardTitle>
                  <CardDescription className="text-white/50">Fluxos e projetos em destaque</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/5 text-white hover:bg-white/10">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {activityList.map((item) => (
                  <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-white/45">{item.subtitle}</p>
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{item.value}</span>
                      {item.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-300" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-orange-300" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[28px] border-white/5 bg-[#151617] text-white shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Roadmap operacional</CardTitle>
              <CardDescription className="text-white/50">Itens acompanhados pela equipe de negocio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map((task) => (
                <div key={task.title} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{task.title}</span>
                    <span className="text-sm text-white/55">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2.5 bg-white/10 [&>div]:bg-white" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-white/5 bg-[#151617] text-white shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Resumo rapido</CardTitle>
              <CardDescription className="text-white/50">Leitura objetiva do momento atual</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-sm text-white/50">Ticket medio</p>
                <p className="mt-2 text-2xl font-semibold text-white">R$ 147</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-sm text-white/50">Retencao</p>
                <p className="mt-2 text-2xl font-semibold text-white">73%</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-sm text-white/50">ROI campanhas</p>
                <p className="mt-2 text-2xl font-semibold text-white">4.8x</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-sm text-white/50">NPS interno</p>
                <p className="mt-2 text-2xl font-semibold text-white">64</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
