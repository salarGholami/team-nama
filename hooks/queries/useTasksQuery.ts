import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/task.service";

export function useTasksQuery() {
  return useQuery({ queryKey: ["tasks"], queryFn: () => getTasks() });
}
