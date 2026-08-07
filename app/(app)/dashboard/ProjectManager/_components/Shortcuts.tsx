"use client";

import { FolderPlus, CheckSquare, BarChart3, UserPlus } from "lucide-react";
import Link from "next/link";

const shortcuts = [
  {
    title: "پروژه جدید",
    icon: FolderPlus,
    href: "/dashboard/ProjectManager/Projects",
    color: "bg-blue-500/15 text-blue-400 hover:bg-blue-500/25",
  },
  {
    title: "ایجاد وظیفه",
    icon: CheckSquare,
    href: "/dashboard/ProjectManager/Tasks",
    color: "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25",
  },
  {
    title: "گزارش‌گیری",
    icon: BarChart3,
    href: "/dashboard/ProjectManager/TeamProgress",
    color: "bg-violet-500/15 text-violet-400 hover:bg-violet-500/25",
  },
  {
    title: "دعوت از عضو",
    icon: UserPlus,
    href: "/dashboard/ProjectManager/TeamProgress",
    color: "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25",
  },
];

export function Shortcuts() {
  return (
    <div className="h-full rounded-2xl bg-primary-700/30 border border-primary-600/30  shadow-xl hover:shadow-emerald-500/10 p-5">
      <h3 className="font-semibold text-sm text-right mb-5">میانبرها</h3>
      <div className="grid grid-cols-2 gap-3">
        {shortcuts.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition ${item.color}`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium text-center">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
