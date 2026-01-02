"use client";
import { useTasksQuery } from "@/hooks/queries/useTasksQuery";

export default function TaskTable() {
  const { data: tasks = [], isLoading } = useTasksQuery();

  if (isLoading) return <div>در حال بارگذاری تسک‌ها...</div>;

  return (
    <div className="task-table">
      <table>
        <thead>
          <tr>
            <th>عنوان</th>
            <th>پروژه</th>
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t: any) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.projectId}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
