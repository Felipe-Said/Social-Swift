import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Dados de demonstração
const metrics = [
  {
    title: "Pedidos Gerados",
    value: "1.574",
    change: "+12,5%",
    trend: "up",
    subtitle: "Em relação ao mês passado"
  },
  {
    title: "Pedidos Pagos",
    value: "1.234",
    change: "+2,1%", 
    trend: "up",
    subtitle: "Em relação à semana passada"
  },
  {
    title: "Pedidos",
    value: "1.234",
    change: "-0,5%",
    trend: "down", 
    subtitle: "Em relação a ontem"
  },
  {
    title: "Taxa de Conversão",
    value: "3,2%",
    change: "+0,8%",
    trend: "up",
    subtitle: "Em relação ao mês passado"
  }
];

// Dados do gráfico de pedidos
const ordersChartData = [
  { month: "Jan", gerados: 186, pagos: 145 },
  { month: "Fev", gerados: 305, pagos: 289 },
  { month: "Mar", gerados: 237, pagos: 200 },
  { month: "Abr", gerados: 273, pagos: 234 },
  { month: "Mai", gerados: 209, pagos: 178 },
  { month: "Jun", gerados: 214, pagos: 189 },
];

const chartConfig = {
  gerados: {
    label: "Pedidos Gerados",
    color: "hsl(var(--primary))",
  },
  pagos: {
    label: "Pedidos Pagos", 
    color: "hsl(var(--primary-glow))",
  },
};

const recentTransactions = [
  { id: 1, type: "Venda", amount: "R$ 850", status: "completed", time: "2h atrás" },
  { id: 2, type: "Saque", amount: "R$ 1.200", status: "pending", time: "4h atrás" },
  { id: 3, type: "Venda", amount: "R$ 450", status: "completed", time: "6h atrás" },
  { id: 4, type: "Taxa", amount: "R$ 25", status: "completed", time: "8h atrás" },
  { id: 5, type: "Venda", amount: "R$ 680", status: "completed", time: "12h atrás" }
];

const topProducts = [
  { name: "Produto A", sales: 152, revenue: "R$ 4.820", trend: "up" },
  { name: "Produto B", sales: 98, revenue: "R$ 3.240", trend: "down" },
  { name: "Produto C", sales: 86, revenue: "R$ 2.950", trend: "up" },
  { name: "Produto D", sales: 74, revenue: "R$ 2.180", trend: "up" }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text">Dashboard</h1>
            <p className="text-text/60 mt-1">Monitore o desempenho e métricas do seu negócio</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" />
            Gerar Relatório
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-text/60">
                  {metric.title}
                </CardTitle>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-text" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-text" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-text">{metric.value}</div>
                <div className="flex items-center space-x-2 text-xs text-text/60">
                  <span className={`flex items-center gap-1 ${
                    metric.trend === "up" ? "text-text" : "text-text/40"
                  }`}>
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {metric.change}
                  </span>
                  <span>{metric.subtitle}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-text">Visão Geral da Receita</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ordersChartData}>
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      className="text-text/60"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      className="text-text/60"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="gerados" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                      className="opacity-80 hover:opacity-100"
                    />
                    <Bar 
                      dataKey="pagos" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                      className="opacity-60 hover:opacity-80"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Progress Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-text">Progresso das Metas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text/60">Meta Mensal</span>
                  <span className="text-sm font-medium text-text">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text/60">Satisfação do Cliente</span>
                  <span className="text-sm font-medium text-text">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text/60">Conversão de Vendas</span>
                  <span className="text-sm font-medium text-text">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-text">Transações Recentes</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.status === "completed" ? "bg-text" : "bg-text/40"
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-text">{transaction.type}</p>
                        <p className="text-xs text-text/60">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-text">{transaction.amount}</p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status === "completed" ? "concluído" : "pendente"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-text">Produtos Mais Vendidos</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-muted/40 flex items-center justify-center">
                        <span className="text-xs font-medium text-text">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{product.name}</p>
                        <p className="text-xs text-text/60">{product.sales} vendas</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-2">
                      <span className="text-sm font-medium text-text">{product.revenue}</span>
                      {product.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-text" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-text/40" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}