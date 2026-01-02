// components/dashboard/stats-card.tsx
"use client";
import { useTasksQuery } from "@/hooks/queries/useTasksQuery";

export default function StatsCard() {
  const { data: tasks = [], isLoading } = useTasksQuery();

  const total = tasks.length;
  const inProgress = tasks.filter(
    (t: any) => t.status === "in-progress"
  ).length;
  const pending = tasks.filter((t: any) => t.status === "pending").length;

  if (isLoading) return <div>در حال بارگذاری آمار...</div>;

  return (
    <div className="stats-card">
      <div>تعداد کل تسک‌ها: {total}</div>
      <div>در حال انجام: {inProgress}</div>
      <div>در صف: {pending}</div>
    </div>
  );
}
