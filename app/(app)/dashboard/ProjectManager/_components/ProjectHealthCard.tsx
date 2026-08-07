"use client";

import { MoreHorizontal, MoreVertical } from "lucide-react";
import { useMemo } from "react";

interface Project {
  id: number;
  status: string;
  progress: number;
}

export function ProjectHealthCard({ projects }: { projects: Project[] }) {
  const { healthy, atRisk, delayed, healthyPercent } = useMemo(() => {
    if (projects.length === 0) {
      return { healthy: 0, atRisk: 0, delayed: 0, healthyPercent: 0 };
    }

    const healthyCount = projects.filter(
      (p) => p.status === "in-progress" && p.progress >= 60,
    ).length;
    const atRiskCount = projects.filter(
      (p) => p.status === "in-progress" && p.progress >= 30 && p.progress < 60,
    ).length;
    const delayedCount = projects.filter(
      (p) => p.status === "on-hold" || p.progress < 30,
    ).length;

    const total = healthyCount + atRiskCount + delayedCount || 1;
    const percent = Math.round((healthyCount / total) * 100);

    return {
      healthy: healthyCount,
      atRisk: atRiskCount,
      delayed: delayedCount,
      healthyPercent: percent,
    };
  }, [projects]);

  const circumference = 2 * Math.PI * 48;

  return (
    <div className="h-full rounded-2xl bg-primary-700/30 border  shadow-xl hover:shadow-emerald-500/10 border-primary-600/30 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">سلامت پروژه‌ها</h3>
      </div>

      <div className="relative flex-1 flex items-center justify-center min-h-[160px]">
        <svg viewBox="0 0 120 120" className="w-36 h-36 -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="#1E293B"
            strokeWidth="14"
          />
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="#22C55E"
            strokeWidth="14"
            strokeDasharray={`${(healthyPercent / 100) * circumference} ${circumference}`}
            strokeLinecap="round"
          />
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="14"
            strokeDasharray={`${(atRisk / (healthy + atRisk + delayed || 1)) * circumference} ${circumference}`}
            strokeDashoffset={`${-((healthyPercent / 100) * circumference)}`}
            strokeLinecap="round"
          />
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="#EF4444"
            strokeWidth="14"
            strokeDasharray={`${(delayed / (healthy + atRisk + delayed || 1)) * circumference} ${circumference}`}
            strokeDashoffset={`${-((healthyPercent / 100 + atRisk / (healthy + atRisk + delayed || 1)) * circumference)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{healthyPercent}%</span>
          <span className="text-xs text-primary-400">سالم</span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span>سالم</span>
          </div>
          <span className="text-primary-400">{healthy} پروژه</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span>در خطر</span>
          </div>
          <span className="text-primary-400">{atRisk} پروژه</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span>تاخیر خورده</span>
          </div>
          <span className="text-primary-400">{delayed} پروژه</span>
        </div>
      </div>
    </div>
  );
}
