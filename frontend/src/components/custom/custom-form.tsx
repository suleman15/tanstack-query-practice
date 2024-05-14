import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateTask } from "@/services/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/schema";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

export function CustomForm() {
  const form = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const createTaskMutate = useCreateTask();

  const createTask = async (data: z.infer<typeof TaskSchema>) => {
    if (data) {
      createTaskMutate.mutate(data);
      form.reset();
    }
  };

  return (
    <div className=" mx-auto relative mb-10">
      <h1 className="text-3xl font-bold mb-5  text-center">Add Task</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createTask)} className="space-y-4">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={createTaskMutate.isPending}
            type="submit"
            aria-label="submit-button"
            className="mt-5 w-full capitalize"
            size={"lg"}
          >
            {createTaskMutate.isPending ? "creating" : "create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
