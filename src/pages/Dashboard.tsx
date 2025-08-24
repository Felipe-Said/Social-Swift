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

// Mock data for demonstration
const metrics = [
  {
    title: "Total Revenue",
    value: "R$ 23,340",
    change: "+12.5%",
    trend: "up",
    subtitle: "From last month"
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+2.1%", 
    trend: "up",
    subtitle: "From last week"
  },
  {
    title: "Orders",
    value: "1,234",
    change: "-0.5%",
    trend: "down", 
    subtitle: "From yesterday"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    subtitle: "From last month"
  }
];

const recentTransactions = [
  { id: 1, type: "Sale", amount: "R$ 850", status: "completed", time: "2h ago" },
  { id: 2, type: "Withdrawal", amount: "R$ 1,200", status: "pending", time: "4h ago" },
  { id: 3, type: "Sale", amount: "R$ 450", status: "completed", time: "6h ago" },
  { id: 4, type: "Fee", amount: "R$ 25", status: "completed", time: "8h ago" },
  { id: 5, type: "Sale", amount: "R$ 680", status: "completed", time: "12h ago" }
];

const topProducts = [
  { name: "Product A", sales: 152, revenue: "R$ 4,820", trend: "up" },
  { name: "Product B", sales: 98, revenue: "R$ 3,240", trend: "down" },
  { name: "Product C", sales: 86, revenue: "R$ 2,950", trend: "up" },
  { name: "Product D", sales: 74, revenue: "R$ 2,180", trend: "up" }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text">Dashboard</h1>
            <p className="text-text/60 mt-1">Monitor your business performance and metrics</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" />
            Generate Report
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
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-text">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted/20">
                <div className="text-center text-text/60">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chart visualization would go here</p>
                  <p className="text-sm mt-1">Integration with chart library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-text">Goals Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text/60">Monthly Target</span>
                  <span className="text-sm font-medium text-text">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text/60">Customer Satisfaction</span>
                  <span className="text-sm font-medium text-text">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text/60">Sales Conversion</span>
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
              <CardTitle className="text-text">Recent Transactions</CardTitle>
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
                        {transaction.status}
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
              <CardTitle className="text-text">Top Selling Products</CardTitle>
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
                        <p className="text-xs text-text/60">{product.sales} sales</p>
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