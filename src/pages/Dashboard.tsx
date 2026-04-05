import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FolderKanban,
  MoreHorizontal,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const quickTasks = [
  { title: "Review metrics", done: true },
  { title: "Update roadmap", done: true },
  { title: "Schedule standup", done: false },
  { title: "Check payouts", done: false },
];

const projects = [
  { name: "Social Swift App", detail: "12 tasks pending", progress: 72 },
  { name: "Said LAB Store", detail: "8 tasks pending", progress: 58 },
  { name: "Marketplace Revamp", detail: "4 tasks pending", progress: 91 },
];

const analyticsBars = [
  { month: "Jan%", value: 84 },
  { month: "Feb%", value: 89 },
  { month: "Mar%", value: 78 },
  { month: "Apr%", value: 92 },
  { month: "May%", value: 85 },
];

const metricsRadar = [
  { metric: "Engagement", value: 84 },
  { metric: "Conversion Rate", value: 74 },
  { metric: "User Satisfaction", value: 88 },
  { metric: "Content Quality", value: 82 },
  { metric: "Performance", value: 69 },
];

const insights = [
  { label: "Total Revenue", value: "$128,420", helper: "+12.5% from last month" },
  { label: "Task Completion", value: "86%", helper: "14 tasks completed today" },
];

const activityMapDots = [
  { x: "18%", y: "30%", size: "h-2 w-2" },
  { x: "28%", y: "52%", size: "h-3 w-3" },
  { x: "46%", y: "36%", size: "h-2.5 w-2.5" },
  { x: "61%", y: "46%", size: "h-2 w-2" },
  { x: "74%", y: "29%", size: "h-3 w-3" },
  { x: "83%", y: "59%", size: "h-2.5 w-2.5" },
];

const calendarDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const calendarNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

function SurfaceCard({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`rounded-[24px] border-white/5 bg-[#161718] text-white shadow-none ${className}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <CardTitle className="text-base font-semibold text-white">{title}</CardTitle>
          {description ? <CardDescription className="mt-1 text-sm text-white/45">{description}</CardDescription> : null}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#101112] px-3 py-4 md:px-6 lg:px-0 lg:py-6">
      <div className="mx-auto w-full max-w-[1320px] space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-sm text-white/40">Overview</p>
            <h1 className="mt-1 text-[2rem] font-semibold tracking-tight text-white">Dashboard</h1>
          </div>
          <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">
            <Plus className="mr-2 h-4 w-4" />
            Add widget
          </Button>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.82fr]">
          <Card className="rounded-[28px] border-white/5 bg-[linear-gradient(135deg,#17191b_0%,#1f2937_55%,#111827_100%)] text-white shadow-none">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-[560px]">
                  <p className="text-sm text-white/45">Overview</p>
                  <h2 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Evening greetings, Demo
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Here is your business snapshot for today. Keep momentum with priorities, analytics and upcoming work.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {insights.map((item) => (
                    <div key={item.label} className="rounded-[22px] border border-white/8 bg-white/[0.05] p-4">
                      <p className="text-sm text-white/45">{item.label}</p>
                      <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-emerald-300">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {item.helper}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <SurfaceCard
            title="Quick Tasks"
            description="Focus items for the next hours"
            action={
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 text-white hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          >
            <div className="space-y-3">
              {quickTasks.map((task) => (
                <div key={task.title} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${task.done ? "bg-emerald-500/15 text-emerald-300" : "bg-white/6 text-white/60"}`}>
                      {task.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-medium text-white">{task.title}</span>
                  </div>
                  <span className="text-xs text-white/40">{task.done ? "Done" : "Pending"}</span>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr_0.95fr]">
          <SurfaceCard title="Calendar" description="This week schedule">
            <div className="rounded-[22px] border border-white/5 bg-white/[0.03] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-medium text-white">April 2026</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/5 text-white hover:bg-white/10">
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-3 grid grid-cols-7 gap-2 text-center text-xs text-white/40">
                {calendarDays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {calendarNumbers.map((day) => (
                  <div
                    key={day}
                    className={`flex h-9 items-center justify-center rounded-xl ${
                      day === 14 ? "bg-white text-black" : "bg-white/[0.03] text-white/75"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard
            title="Recent Projects"
            description="Overview of active development projects"
            action={
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 text-white hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          >
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.name} className="rounded-[22px] border border-white/5 bg-white/[0.03] p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/6 text-white/75">
                        <FolderKanban className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{project.name}</p>
                        <p className="text-xs text-white/45">{project.detail}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/30" />
                  </div>
                  <Progress value={project.progress} className="h-2 bg-white/10 [&>div]:bg-white" />
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard title="User Activity Map" description="Dashboard Analytics">
            <div className="relative h-[285px] overflow-hidden rounded-[22px] border border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_35%),#111213]">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.03)_100%)]" />
              {activityMapDots.map((dot, index) => (
                <span
                  key={index}
                  className={`absolute ${dot.size} rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.08)]`}
                  style={{ left: dot.x, top: dot.y }}
                />
              ))}
              <div className="absolute bottom-4 left-4 rounded-2xl border border-white/5 bg-black/25 px-4 py-3">
                <p className="text-xs text-white/45">Insights</p>
                <p className="mt-1 text-lg font-semibold text-white">+18.6%</p>
                <p className="text-xs text-white/45">Weekly active movement</p>
              </div>
            </div>
          </SurfaceCard>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
          <SurfaceCard
            title="Revenue Analytics"
            description="Total Revenue"
            action={
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 text-white hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          >
            <div className="rounded-[22px] border border-white/5 bg-white/[0.03] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/45">Task Completion</p>
                  <p className="mt-1 text-3xl font-semibold text-white">88.0%</p>
                </div>
                <div className="rounded-full bg-white/6 px-3 py-1 text-xs text-white/55">Target 85%</div>
              </div>

              <div className="h-[290px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsBars} margin={{ top: 4, right: 0, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical />
                    <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Bar dataKey="value" radius={[20, 20, 20, 20]} barSize={31}>
                      {analyticsBars.map((entry) => (
                        <Cell key={entry.month} fill="rgba(180,192,205,0.86)" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-white sm:text-base">88.0%</div>
                  <div className="text-xs text-white/45">Avg Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white sm:text-base">4/5</div>
                  <div className="text-xs text-white/45">Above Target</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white sm:text-base">Apr</div>
                  <div className="text-xs text-white/45">Best Month</div>
                </div>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard title="Performance Metrics" description="Performance Analytics">
            <div className="relative overflow-hidden rounded-[22px] border border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),#121314] p-4">
              <div className="pointer-events-none absolute -inset-40 rotate-12 opacity-20 [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="relative z-10">
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-white">Performance Analytics</h3>
                  <p className="text-sm text-white/45">Key performance indicators and metrics overview</p>
                </div>

                <div className="h-[330px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={metricsRadar} outerRadius="72%">
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} />
                      <Radar dataKey="value" stroke="rgba(255,255,255,0.92)" fill="rgba(255,255,255,0.24)" strokeWidth={2.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 rounded-md border border-white/8 p-3">
                  <p className="text-sm leading-relaxed text-white/50">
                    Tip: Improve performance by optimizing content delivery, enhancing user experience, and gathering regular feedback.
                  </p>
                </div>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
