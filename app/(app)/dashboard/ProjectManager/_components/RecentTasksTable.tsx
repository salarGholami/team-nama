"use client";

import Avatar from "@/components/ui/avatar/Avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import Link from "next/link";

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  projectTitle: string;
  assigneeName: string;
  progress: number;
}

interface Member {
  userId: number;
  name: string;
  roleId: string;
  avatar: string;
  tasksAssigned: number;
  completionRate: number;
  onlineStatus: boolean;
}

const statusMap: Record<string, { label: string; className: string }> = {
  "in-progress": { label: "در حال انجام", className: "text-blue-400" },
  pending: { label: "در انتظار", className: "text-primary-400" },
  completed: { label: "تکمیل شده", className: "text-emerald-400" },
};

const priorityMap: Record<string, { label: string; className: string }> = {
  critical: { label: "بحرانی", className: "text-red-400" },
  high: { label: "بالا", className: "text-orange-400" },
  medium: { label: "متوسط", className: "text-amber-400" },
  low: { label: "پایین", className: "text-primary-400" },
};

export function RecentTasksTable({
  tasks,
  members,
}: {
  tasks: Task[];
  members: Member[];
}) {
  return (
    <div className="h-full rounded-2xl bg-primary-700/30 border border-primary-600/30 shadow-xl hover:shadow-emerald-500/10 p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-sm">وظایف تیم (اخیر)</h3>
        <Link href="#" className="text-primary-500 hover:text-primary-300">
          <MoreVertical className="h-5 w-5" />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-sm text-primary-500 py-12">
          تسکی یافت نشد
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-primary-500 border-b border-primary-300/30">
                <th className="pb-3 text-right font-medium">وظیفه</th>
                <th className="pb-3 text-right font-medium">پروژه</th>
                <th className="pb-3 text-right font-medium">مسئول</th>
                <th className="pb-3 text-right font-medium">اولویت</th>
                <th className="pb-3 text-right font-medium">وضعیت</th>
                <th className="pb-3 text-right font-medium">پیشرفت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-300/10">
              {tasks.slice(0, 5).map((task) => {
                const status = statusMap[task.status] || statusMap.pending;
                const priority =
                  priorityMap[task.priority] || priorityMap.medium;
                const progress = Math.min(100, Math.max(0, task.progress ?? 0));

                const member = members.find(
                  (m) => m.name === task.assigneeName,
                );

                return (
                  <tr key={task.id} className="hover:bg-primary-700/30">
                    <td className="py-3 text-right">
                      <p className="font-medium text-sm max-w-[160px] truncate">
                        {task.title}
                      </p>
                    </td>
                    <td className="py-3 text-right text-primary-400 text-xs">
                      {task.projectTitle}
                    </td>

                    {/* ستون مسئول + آواتار */}
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        {member && (
                          <Avatar
                            src={member.avatar}
                            alt={member.name}
                            size="md"
                          />
                        )}
                        <span className="text-xs">{task.assigneeName}</span>
                      </div>
                    </td>

                    <td
                      className={`py-3 text-right text-xs font-medium ${priority.className}`}
                    >
                      {priority.label}
                    </td>
                    <td
                      className={`py-3 text-right text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="text-xs font-medium tabular-nums w-8 text-left leading-none">
                          {progress}%
                        </span>
                        <div className="w-14 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Link
        href="/dashboard/ProjectManager/TeamProgress"
        className="mt-4 w-full flex justify-center items-center text-xs text-emerald-400 hover:text-emerald-500"
      >
        مشاهده همه وظایف
      </Link>
    </div>
  );
}
