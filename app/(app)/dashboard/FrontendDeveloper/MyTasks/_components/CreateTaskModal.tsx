// app/(app)/dashboard/FrontendDeveloper/MyTasks/_components/CreateTaskModal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/Select";
import type { Task } from "../page";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  currentUserId: number;
};

export default function CreateTaskModal({
  open,
  onClose,
  onSubmit,
  currentUserId,
}: Props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Dashboard Implementation");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<Task["status"]>("pending");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      type,
      priority,
      dueDate: dueDate || "1405/04/20",
      status,
      project: { id: 6, title: "Internal Dashboard" },
      assignee: {
        id: currentUserId,
        name: "Ali",
        avatar: "/images/avatar/empolyes/salar.png",
      },
      code:
        status === "completed"
          ? "انجام شده"
          : status === "in-progress"
            ? "در حال انجام"
            : "در انتظار",
    });

    // ریست فرم
    setTitle("");
    setType("Dashboard Implementation");
    setPriority("medium");
    setDueDate("");
    setStatus("pending");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-primary-800 border border-primary-600/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">ایجاد وظیفه جدید</h2>
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
              placeholder="مثلاً: پیاده‌سازی کامپوننت Modal"
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
              label="وضعیت اولیه"
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
              ایجاد وظیفه
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
