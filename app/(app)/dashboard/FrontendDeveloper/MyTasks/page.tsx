"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import db from "@/data/db.json";
import { Button } from "@/components/ui/button";

import TaskHeader from "./_components/TaskHeader";
import StatsRow from "./_components/StatsRow";
import TaskToolbar from "./_components/TaskToolbar";
import TaskGrid from "./_components/TaskGrid";
import CreateTaskModal from "./_components/CreateTaskModal";
import EditTaskModal from "./_components/EditTaskModal";


type TaskStatus = "pending" | "in-progress" | "completed";
type TaskPriority = "urgent" | "high" | "medium" | "low";

export type Task = {
  id: number;
  title: string;
  project: { id: number; title: string };
  assignee: { id: number; name: string; avatar: string };
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  code?: string;
  type?: string;
};

export default function MyTasksPage() {
  const router = useRouter();

  // شناسه کاربر فعلی (فرانت‌اند دولوپر)
  const currentUserId = 3; // Ali

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TaskStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | TaskPriority>(
    "all",
  );
  const [sort, setSort] = useState<
    "newest" | "oldest" | "deadline-asc" | "deadline-desc"
  >("newest");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // تبدیل داده‌های خام به Task
  const mapRawToTask = (t: any): Task => {
    const project = db.projects.find((p) => p.id === t.projectId);
    const user = db.users.find((u) => u.id === t.assignedTo);

    return {
      id: t.id,
      title: t.title,
      project: {
        id: t.projectId || 6,
        title: project?.title || "Internal Dashboard",
      },
      assignee: {
        id: t.assignedTo || currentUserId,
        name: user?.name || "Ali",
        avatar: user?.avatar || "/images/avatar/empolyes/salar.png",
      },
      status: (t.status || "pending") as TaskStatus,
      priority: (t.priority || "medium") as TaskPriority,
      dueDate: t.dueDate || "1405/04/10",
      code:
        t.status === "completed"
          ? "انجام شده"
          : t.status === "in-progress"
            ? "در حال انجام"
            : "در انتظار",
      type: t.type || "Dashboard Implementation",
    };
  };

  // فقط تسک‌های متعلق به فرانت‌اند دولوپر
  useEffect(() => {
    const myTasks = db.tasks
      .filter((t: any) => t.assignedTo === currentUserId)
      .map(mapRawToTask);

    setTasks(myTasks);
  }, []);

  // فیلتر و سورت
  useEffect(() => {
    let result = [...tasks];

    if (search.trim()) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((task) => task.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    if (sort === "oldest") {
      result.reverse();
    } else if (sort === "deadline-asc") {
      result.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    } else if (sort === "deadline-desc") {
      result.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
    }

    setFilteredTasks(result);
  }, [search, statusFilter, priorityFilter, sort, tasks]);

  // آمار زنده
  const stats = useMemo(() => {
    return {
      tasksInProgress: tasks.filter((t) => t.status === "in-progress").length,
      completedTasks: tasks.filter((t) => t.status === "completed").length,
      components: db.frontendDashboard?.stats?.components || 28,
      designFiles: db.frontendDashboard?.stats?.designFiles || 37,
    };
  }, [tasks]);

  const delayedTasks = useMemo(() => {
    return 3;
  }, [tasks]);

  // ========== CRUD ==========

  const handleCreate = (newTask: Omit<Task, "id">) => {
    const id = Date.now();
    const task: Task = { ...newTask, id };

    setTasks((prev) => [task, ...prev]);
    setIsCreateOpen(false);


  };

  const handleUpdate = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTask(null);

  };

  const handleDelete = (id: number) => {
    if (!confirm("آیا از حذف این وظیفه مطمئن هستید؟")) return;

    setTasks((prev) => prev.filter((t) => t.id !== id));

  };

  const handleStatusChange = (id: number, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: newStatus,
              code:
                newStatus === "completed"
                  ? "انجام شده"
                  : newStatus === "in-progress"
                    ? "در حال انجام"
                    : "در انتظار",
            }
          : t,
      ),
    );
  };

  return (
    <main className="flex flex-col gap-6 px-4 pb-10">
      <div className="flex items-center justify-between">
        <TaskHeader />
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="rounded-xl gradient-bg-glasses gap-2"
        >
          <Plus className="size-5" />
          ایجاد وظیفه جدید
        </Button>
      </div>

      <TaskToolbar
        search={search}
        setSearch={setSearch}
        status={statusFilter}
        setStatus={setStatusFilter}
        priority={priorityFilter}
        setPriority={setPriorityFilter}
        sort={sort}
        setSort={setSort}
        onFilter={() => {}}
      />

      <StatsRow
        stats={stats}
        totalTasks={tasks.length}
        delayedTasks={delayedTasks}
      />

      <TaskGrid
        tasks={filteredTasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {/* Create Modal */}
      <CreateTaskModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
        currentUserId={currentUserId}
      />

      {/* Edit Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          open={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdate}
        />
      )}
    </main>
  );
}
