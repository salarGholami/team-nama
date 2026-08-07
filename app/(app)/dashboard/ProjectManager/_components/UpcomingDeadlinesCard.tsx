"use client";

import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  AlertTriangle,
  Calendar,
  MoreVertical,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

interface Deadline {
  projectId: number;
  title: string;
  daysLeft: number;
  status: string;
}

interface Risk {
  projectId: number;
  title: string;
  status: string;
}

export function UpcomingDeadlinesCard({
  deadlines,
  risks,
}: {
  deadlines: Deadline[];
  risks: Risk[];
}) {
  const items = deadlines.slice(0, 3).map((d) => {
    const risk = risks.find(
      (r) => r.projectId === d.projectId && r.status === "open",
    );
    return { ...d, hasRisk: !!risk, riskTitle: risk?.title };
  });

  return (
    <div className="h-full rounded-2xl bg-primary-700/30 border border-primary-600/30 shadow-xl hover:shadow-emerald-500/10 p-4">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-sm">کارهای پیش رو (Deadline)</h3>
        <Link
          href="ProjectManager/Tasks"
          className="text-primary-500 hover:text-primary-300"
        >
          <MoreVertical className="h-5 w-5" />
        </Link>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center text-sm text-primary-500 py-8 hover:bg-primary-700/50">
            ددلاینی یافت نشد
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.projectId}
              className="flex items-center gap-3 rounded-xl shadow-lg border-primary-600/10 border transition-all p-3"
            >
              <div
                className={`shrink-0 rounded-lg p-2 ${
                  item.daysLeft <= 5
                    ? "bg-red-500/15 text-red-400"
                    : item.daysLeft <= 10
                      ? "bg-amber-500/15 text-amber-400"
                      : "bg-blue-500/15 text-blue-400"
                }`}
              >
                {item.hasRisk ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <Calendar className="h-4 w-4" />
                )}
              </div>
              <div className="min-w-0 flex-1 text-right">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-[11px] text-slate-500 truncate">
                  {item.riskTitle || "بدون ریسک خاص"}
                </p>
              </div>
              <div className="shrink-0 text-left">
                <p
                  className={`text-sm font-semibold ${
                    item.daysLeft <= 5
                      ? "text-red-400"
                      : item.daysLeft <= 10
                        ? "text-amber-400"
                        : "text-blue-400"
                  }`}
                >
                  {item.daysLeft} روز
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        href="/dashboard/ProjectManager/Tasks"
        className="mt-4 w-full flex justify-center items-center text-xs text-emerald-400 hover:text-emerald-500"
      >
        مشاهده همه
      </Link>
    </div>
  );
}
