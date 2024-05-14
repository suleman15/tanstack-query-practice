import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "./api";
import { Task } from "@/types/task";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Task) => createTask(data),
    onMutate: function () {
      console.log("Mutation function runs");
    },
    onError: function () {
      console.log("There is an error while creating task");
    },
    onSuccess: function () {
      console.log("Successfully created task");
    },
    onSettled: function (_, error) {
      console.log("settled fn runs");

      if (error) {
        console.log(error);
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Task) => updateTask(data),
    onSettled: function (_, error, variables) {
      if (error) {
        console.log(error);
      } else {
        // queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({
          queryKey: ["tasks", { id: variables.id }],
        });
      }
    },
  });
}
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSettled: function (_, error) {
      if (error) {
        console.log(error);
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        // queryClient.invalidateQueries({
        //   queryKey: ["tasks", { id: variables.id }],
        // });
      }
    },
  });
}
