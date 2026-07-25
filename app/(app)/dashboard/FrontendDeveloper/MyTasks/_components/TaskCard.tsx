// _components/TaskCard.tsx
"use client";

import { Pencil, Trash2, CheckCircle2, Circle, Clock } from "lucide-react";
import type { Task } from "../page";

type Props = {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Task["status"]) => void;
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  const statusColor =
    task.status === "completed"
      ? "bg-emerald-500/10 text-emerald-500"
      : task.status === "in-progress"
        ? "bg-blue-500/10 text-blue-500"
        : "bg-amber-500/10 text-amber-500";

  return (
    <div className="border-primary-600/30 bg-primary-700/30 border shadow-xl hover:shadow-emerald-500/10 rounded-3xl p-5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      {/* Badge و تاریخ */}
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}
        >
          {task.code}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {task.dueDate}
        </span>
      </div>

      {/* عنوان */}
      <h3 className="font-semibold text-[17px] leading-tight mb-2 line-clamp-2">
        {task.title}
      </h3>

      {task.type && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
          {task.type}
        </p>
      )}

      {/* اولویت */}
      <div className="mb-4">
        <span className="text-xs px-2 py-1 rounded-lg bg-primary-600/40">
          اولویت:{" "}
          {task.priority === "urgent"
            ? "فوری"
            : task.priority === "high"
              ? "زیاد"
              : task.priority === "medium"
                ? "متوسط"
                : "کم"}
        </span>
      </div>

      {/* مسئول */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <img
          src={task.assignee.avatar}
          alt={task.assignee.name}
          className="w-9 h-9 rounded-full ring-2 ring-background object-cover"
        />
        <div>
          <div className="font-medium text-sm">{task.assignee.name}</div>
          <div className="text-xs text-muted-foreground">فرانت‌اند دولوپر</div>
        </div>
      </div>

      {/* اکشن‌ها (فقط روی hover) */}
      <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-2 mt-8 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 text-blue-400"
          title="ویرایش"
        >
          <Pencil className="size-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 mt-8 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400"
          title="حذف"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      {/* تغییر سریع وضعیت */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onStatusChange("pending")}
          className={`flex-1 py-1.5 rounded-xl text-xs flex items-center justify-center gap-1 ${
            task.status === "pending" ? "bg-amber-500/30" : "bg-primary-600/30"
          }`}
        >
          <Circle className="size-3.5" /> در انتظار
        </button>
        <button
          onClick={() => onStatusChange("in-progress")}
          className={`flex-1 py-1.5 rounded-xl text-xs flex items-center justify-center gap-1 ${
            task.status === "in-progress"
              ? "bg-blue-500/30"
              : "bg-primary-600/30"
          }`}
        >
          <Clock className="size-3.5" /> در حال انجام
        </button>
        <button
          onClick={() => onStatusChange("completed")}
          className={`flex-1 py-1.5 rounded-xl text-xs flex items-center justify-center gap-1 ${
            task.status === "completed"
              ? "bg-emerald-500/30"
              : "bg-primary-600/30"
          }`}
        >
          <CheckCircle2 className="size-3.5" /> انجام شده
        </button>
      </div>
    </div>
  );
}
