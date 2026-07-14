import { serverFetch } from "../core/server";

export interface Task {
  _id: string;
  title: string;
  category: string;
  deadline: string;
  budget: string;
  description: string;
  clientId: string;
  status: string;
  createdAt: string;
}

export const getTaskByClientId = async (id: string): Promise<Task[]> => {
  return serverFetch<Task[]>(`/api/tasks?clientId=${id}`);
};