"use client";

import { MoreHorizontal } from "lucide-react";

interface Activity {
  periods: {
    currentWeek: { day: string; value: number }[];
    lastWeek: { day: string; value: number }[];
  };
}

interface Project {
  id: number;
  title: string;
  progress: number;
  status: string;
}

export function ProgressChart({
  activity,
  projects,
}: {
  activity: Activity;
  projects: Project[];
}) {
  const weeks = activity.periods.currentWeek.map((d) => d.day);
  const values = activity.periods.currentWeek.map((d) => d.value);
  const maxVal = Math.max(...values, 1);

  // سه پروژه اول برای legend
  const topProjects = projects
    .filter((p) => p.status === "in-progress")
    .slice(0, 3);
  const colors = ["#3B82F6", "#8B5CF6", "#22C55E"];

  return (
    <div className="h-full rounded-2xl bg-primary-700/30 border border-primary-600/30  shadow-xl hover:shadow-emerald-500/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <button className="text-primary-500 hover:text-primary-300">
          <MoreHorizontal className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-4 text-xs flex-wrap">
          {topProjects.map((p, i) => (
            <div key={p.id} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: colors[i] }}
              />
              <span className="text-primary-400">{p.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-48 mt-2">
        <svg
          viewBox="0 0 400 160"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              y1={160 - ratio * 160}
              x2="400"
              y2={160 - ratio * 160}
              stroke="#1E293B"
              strokeWidth="1"
            />
          ))}

          {/* خط فعالیت هفته جاری */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
            points={values
              .map((v, i) => {
                const x = (i / (values.length - 1 || 1)) * 400;
                const y = 160 - (v / maxVal) * 140;
                return `${x},${y}`;
              })
              .join(" ")}
          />
        </svg>
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-primary-500 px-1">
        {weeks.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
    </div>
  );
}
