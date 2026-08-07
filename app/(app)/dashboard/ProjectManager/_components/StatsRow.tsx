"use client";

import {
  CalendarClock,
  Users,
  ListTodo,
  FolderKanban,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Stats {
  overdueTasks: number;
  teamMembers: number;
  tasksInProgress: number;
  activeProjects: number;
}

interface Activity {
  periods: {
    currentWeek: { day: string; value: number }[];
    lastWeek: { day: string; value: number }[];
  };
}

export function StatsRow({
  stats,
  activity,
}: {
  stats: Stats;
  activity: Activity;
}) {
  const currentSum = activity.periods.currentWeek.reduce(
    (s, d) => s + d.value,
    0,
  );
  const lastSum = activity.periods.lastWeek.reduce((s, d) => s + d.value, 0);
  const activityDiff = currentSum - lastSum;

  const cards = [
    {
      title: "Deadline این هفته",
      value: stats.overdueTasks,
      icon: CalendarClock,
      iconBg: "bg-red-500/15 text-red-400",
      badge:
        stats.overdueTasks > 0
          ? { text: "تاخیر دارد", color: "text-red-400" }
          : null,
      trend: null,
    },
    {
      title: "اعضای فعال",
      value: stats.teamMembers,
      icon: Users,
      iconBg: "bg-violet-500/15 text-violet-400",
      badge: null,
      trend: {
        value:
          activityDiff >= 0
            ? `+${Math.abs(activityDiff)}`
            : `-${Math.abs(activityDiff)}`,
        up: activityDiff >= 0,
      },
    },
    {
      title: "وظایف در حال انجام",
      value: stats.tasksInProgress,
      icon: ListTodo,
      iconBg: "bg-emerald-500/15 text-emerald-400",
      badge: null,
      trend: {
        value:
          activityDiff >= 0 ? `+${Math.min(3, Math.abs(activityDiff))}` : "0",
        up: true,
      },
    },
    {
      title: "پروژه‌های فعال",
      value: stats.activeProjects,
      icon: FolderKanban,
      iconBg: "bg-blue-500/15 text-blue-400",
      badge: null,
      trend: { value: "+1", up: true },
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-primary-700/30 border border-primary-600/30  shadow-xl hover:shadow-emerald-500/10 p-4 flex items-start justify-between"
        >
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">{card.title}</p>
            <p className="text-2xl font-bold tracking-tight">{card.value}</p>
            {card.badge && (
              <p
                className={`text-xs mt-1.5 flex items-center gap-1 justify-end ${card.badge.color}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {card.badge.text}
              </p>
            )}
            {card.trend && (
              <p
                className={`text-xs mt-1.5 flex items-center gap-1 justify-end ${
                  card.trend.up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {card.trend.up ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {card.trend.value} نسبت به هفته قبل
              </p>
            )}
          </div>
          <div className={`rounded-xl p-2.5 ${card.iconBg}`}>
            <card.icon className="h-5 w-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
