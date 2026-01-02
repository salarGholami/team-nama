"use client";
import { useTasksQuery } from "@/hooks/queries/useTasksQuery";

export default function RecentActivity() {
  const { data: tasks = [], isLoading } = useTasksQuery();

  if (isLoading) return <div>در حال بارگذاری فعالیت‌ها...</div>;

  const recent = [...tasks].slice(-5).reverse();

  return (
    <div className="recent-activity">
      <h3>فعالیت‌های اخیر</h3>
      <ul>
        {recent.map((t: any) => (
          <li key={t.id}>{`${t.title} — ${t.status}`}</li>
        ))}
      </ul>
    </div>
  );
}
