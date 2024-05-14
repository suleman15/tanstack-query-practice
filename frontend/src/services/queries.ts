import { useQueries, useQuery } from "@tanstack/react-query";
import { getTasks, getTasksId } from "./api";

export const useTasksId = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksId,
  });
};

export function useTasks(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? [])?.map((id) => {
      return {
        queryKey: ["tasks", { id }],
        queryFn: () => getTasks(id!),
      };
    }),
  });
}
