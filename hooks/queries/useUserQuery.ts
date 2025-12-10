// hooks/queries/useUserQuery.ts
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  return useQuery({ queryKey: ["user"], queryFn: () => ({}) });
}
