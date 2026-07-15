'use server'

import { authMutation } from "../core/server";
import { getAuthToken } from "../core/session";
import { revalidatePath } from "next/cache";

interface NewTask {
  title: string;
  category: string;
  deadline: string;
  budget: string;
  description: string;
  clientId?: string;
  clientName?: string;
  clientImage?: string;
}

interface InsertTaskResponse {
  acknowledged: boolean;
  insertedId: string;
}

export const createTask = async (newTask: NewTask): Promise<InsertTaskResponse> => {
  const token = await getAuthToken();
  const result = await authMutation<InsertTaskResponse>("/api/tasks", newTask, "POST", { token });
  revalidatePath("/dashboard/client/my-tasks");
  return result;
};

export const updateTask = async (taskId: string, updatedTask: Partial<NewTask>): Promise<any> => {
  const token = await getAuthToken();
  const result = await authMutation(`/api/tasks/${taskId}`, updatedTask, "PUT", { token });
  revalidatePath("/dashboard/client/my-tasks");
  return result;
};

export const deleteTask = async (taskId: string): Promise<any> => {
  const token = await getAuthToken();
  const result = await authMutation(`/api/tasks/${taskId}`, {}, "DELETE", { token });
  revalidatePath("/dashboard/client/my-tasks");
  return result;
};