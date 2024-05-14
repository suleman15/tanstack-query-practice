import { useTasks, useTasksId } from "@/services/queries";
import { CustomForm } from "./custom-form";
import { Button } from "../ui/button";
import { useDeleteTask, useUpdateTask } from "@/services/mutations";
import { Task } from "@/types/task";
import { Trash2, CheckCheck, Check } from "lucide-react";

export const Tasks = () => {
  const taskIds = useTasksId();
  const AllTasks = useTasks(taskIds.data);
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  if (taskIds.isPending) {
    return <div>Loading...</div>;
  }
  if (taskIds.isError) {
    return <div>There is an error</div>;
  }

  const updateTodo = async (data: Task | undefined) => {
    if (data) {
      updateTaskMutation.mutate({ ...data, checked: true });
    }
  };
  const deleteTask = async (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  return (
    <main>
      <CustomForm />
      <main className="flex flex-col place-items-center gap-10 ">
        {AllTasks.map(({ data, isPending }) => {
          return (
            <div
              key={data?.id}
              className="p-3 relative w-full rounded-lg  border-primary border-2 hover:shadow-2xl  text-primary "
            >
              {isPending ? (
                <div>Loading...</div>
              ) : (
                <div className=" overflow-hidden flex flex-col gap-3">
                  <div className="  justify-end w-full mx-auto gap-4 flex ">
                    <Button
                      size={"icon"}
                      onClick={() => updateTodo(data)}
                      disabled={data?.checked}
                    >
                      {data?.checked ? (
                        <CheckCheck size={18} />
                      ) : (
                        <Check size={18} />
                      )}
                    </Button>
                    {data?.id && (
                      <Button
                        size={"icon"}
                        variant={"destructive"}
                        onClick={() => deleteTask(data?.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    )}
                  </div>
                  <div className="text-3xl font-bold leading-4">
                    {data?.title}
                  </div>
                  <div> {data?.description}</div>
                </div>
              )}
            </div>
          );
        })}
      </main>
    </main>
  );
};
