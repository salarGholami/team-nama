"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CircleCheckBig, Clock, Eye } from "lucide-react";

interface Task {
  id: number;
  title: string;
  status: string;
  dueDate?: string;
  priority?: string;
  projectId?: number;
  assignedTo?: number;
}

interface RecentTasksProps {
  tasks: Task[];
}

export default function RecentTasks({ tasks }: RecentTasksProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "تکمیل شده";
      case "in-progress":
        return "در حال انجام";
      default:
        return "بررسی";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400";

      case "in-progress":
        return "bg-amber-500/20 text-amber-400";

      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CircleCheckBig className="text-emerald-400" />;

      case "in-progress":
        return (
          <div className="w-6 h-6 rounded-full border-2 border-amber-400" />
        );

      default:
        return <Eye className="text-blue-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="lg:col-span-5 rounded-lg border border-primary-600/30 bg-primary-700/30 p-6 shadow-xl hover:shadow-emerald-500/10 mb-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">تسک‌های اخیر</h3>

        <Button className="flex items-center gap-1 text-sm text-primary-400 transition-colors hover:text-primary-100 border border-primary-700 hover:border-primary-500 rounded-lg">
          مشاهده همه
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center gap-4 rounded-2xl bg-primary-800/50 p-4 transition-all hover:bg-primary-700/60 shadow-2xl"
          >
            <div
              className={` rounded-xl px-3 py-1.5 text-center text-xs font-medium ${getStatusClass(
                task.status,
              )}`}
            >
              {getStatusLabel(task.status)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-medium">{task.title}</p>

              <p className="mt-1 flex items-center gap-1 text-xs text-primary-400">
                <Clock size={14} />
                {task.dueDate ? `تا ${task.dueDate}` : "۲ ساعت پیش"}
              </p>
            </div>

            <div className="text-2xl">{getStatusIcon(task.status)}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
