import { Task } from "@/types/task";
import axios from "axios";
const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTasksId = async () => {
  return (await axiosInstance.get<Task[]>("tasks")).data
    .map((task) => task.id)
    .reverse();
};

export const getTasks = async (id: number) => {
  return (await axiosInstance.get<Task>(`tasks/${id}`)).data;
};

export const createTask = async (data: Task) => {
  return await axiosInstance.post<Task>(`tasks/`, data);
};

export const updateTask = async (data: Task) => {
  return axiosInstance.put(`tasks/${data.id}`, data);
};
export const deleteTask = async (id: number) => {
  return axiosInstance.delete(`tasks/${id}`);
};
