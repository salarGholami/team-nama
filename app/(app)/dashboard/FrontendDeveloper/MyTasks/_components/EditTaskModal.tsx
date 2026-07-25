// app/(app)/dashboard/FrontendDeveloper/MyTasks/_components/EditTaskModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/Select";
import type { Task } from "../page";

type Props = {
  open: boolean;
  task: Task;
  onClose: () => void;
  onSubmit: (task: Task) => void;
};

export default function EditTaskModal({
  open,
  task,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(task.title);
  const [type, setType] = useState(task.type || "Dashboard Implementation");
  const [priority, setPriority] = useState<Task["priority"]>(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState<Task["status"]>(task.status);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setType(task.type || "Dashboard Implementation");
      setPriority(task.priority);
      setDueDate(task.dueDate);
      setStatus(task.status);
    }
  }, [task]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      ...task,
      title,
      type,
      priority,
      dueDate,
      status,
      code:
        status === "completed"
          ? "انجام شده"
          : status === "in-progress"
            ? "در حال انجام"
            : "در انتظار",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-primary-800 border border-primary-600/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">ویرایش وظیفه</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-primary-700 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* عنوان */}
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              عنوان وظیفه
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان وظیفه"
              required
            />
          </div>

          {/* نوع */}
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              نوع وظیفه
            </label>
            <Input
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Dashboard Implementation"
            />
          </div>

          {/* اولویت و وضعیت */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="اولویت"
              value={priority}
              options={[
                { label: "فوری", value: "urgent" },
                { label: "زیاد", value: "high" },
                { label: "متوسط", value: "medium" },
                { label: "کم", value: "low" },
              ]}
              onChange={(v) => setPriority(v as Task["priority"])}
            />

            <Select
              label="وضعیت"
              value={status}
              options={[
                { label: "در انتظار", value: "pending" },
                { label: "در حال انجام", value: "in-progress" },
                { label: "انجام شده", value: "completed" },
              ]}
              onChange={(v) => setStatus(v as Task["status"])}
            />
          </div>

          {/* ددلاین */}
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              ددلاین (مثال: ۱۴۰۵/۰۴/۲۰)
            </label>
            <Input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="1405/04/20"
            />
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl gradient-bg-glasses"
            >
              ذخیره تغییرات
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
