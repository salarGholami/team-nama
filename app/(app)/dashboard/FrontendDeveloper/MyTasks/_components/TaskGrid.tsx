// _components/TaskGrid.tsx
import TaskCard from "./TaskCard";
import type { Task } from "../page";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task["status"]) => void;
};

export default function TaskGrid({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        هیچ وظیفه‌ای پیدا نشد
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onStatusChange={(status) => onStatusChange(task.id, status)}
        />
      ))}
    </div>
  );
}
