import { serverFetch } from "../core/server";

export interface Task {
  _id: string;
  title: string;
  category: string;
  deadline: string;
  budget: string;
  description: string;
  clientId: string;
  clientName?: string;
  clientImage?: string;
  status: string;
  createdAt: string;
}

export const getTaskByClientId = async (id: string): Promise<Task[]> => {
  return serverFetch<Task[]>(`/api/tasks?clientId=${id}`);
};

export const getAllTasks = async (): Promise<Task[]> => {
  return serverFetch<Task[]>(`/api/tasks`);
}

export const getTaskById = async (id: string): Promise<Task | null> => {
  return serverFetch<Task | null>(`/api/tasks/${id}`);
}