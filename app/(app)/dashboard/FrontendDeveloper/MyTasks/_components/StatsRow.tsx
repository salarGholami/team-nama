"use client";

import { useMemo } from "react";

type StatsRowProps = {
  stats: {
    tasksInProgress: number;
    components: number;
    designFiles: number;
    completedTasks: number;
  };
  totalTasks: number;
  delayedTasks?: number;
};

export default function StatsRow({
  stats,
  totalTasks,
  delayedTasks = 7,
}: StatsRowProps) {
  const projectProgress = useMemo(() => {
    if (totalTasks <= 0) return 0;

    const progress = Math.round((stats.completedTasks / totalTasks) * 100);

    return Math.min(100, Math.max(0, progress));
  }, [stats.completedTasks, totalTasks]);

  const statCards = [
    {
      title: "کل وظایف",
      value: totalTasks,
      color: "purple" as const,
    },
    {
      title: "پیشرفت پروژه",
      value: `${projectProgress}%`,
      color: "blue" as const,
    },
    {
      title: "در حال انجام",
      value: stats.tasksInProgress,
      color: "orange" as const,
    },
    {
      title: "انجام شده",
      value: stats.completedTasks,
      color: "green" as const,
    },
    {
      title: "تاخیر دار",
      value: delayedTasks,
      color: "red" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {statCards.map((stat) => (
        <div
          key={stat.title}
          className="border-primary-600/30 bg-primary-700/30 rounded-3xl border p-5 shadow-xl hover:shadow-emerald-500/10 transition-all"
        >
          <div>
            <p className="text-muted-foreground text-sm">{stat.title}</p>

            <h3 className="mt-3 mb-1 text-4xl font-bold">{stat.value}</h3>
          </div>

          <div className="mt-8 flex h-10 items-end">
            <div
              className={`h-8 w-full rounded-2xl bg-gradient-to-r
                ${
                  stat.color === "purple"
                    ? "from-purple-500/30 to-purple-600/10"
                    : ""
                }
                ${
                  stat.color === "blue" ? "from-blue-500/30 to-blue-600/10" : ""
                }
                ${
                  stat.color === "orange"
                    ? "from-orange-500/30 to-orange-600/10"
                    : ""
                }
                ${
                  stat.color === "green"
                    ? "from-emerald-500/30 to-emerald-600/10"
                    : ""
                }
                ${stat.color === "red" ? "from-red-500/30 to-red-600/10" : ""}
              `}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
