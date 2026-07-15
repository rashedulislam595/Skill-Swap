'use server'

import { serverMutation } from "../core/server";
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

export const createTask = async (
  newTask: NewTask
): Promise<InsertTaskResponse> => {
  const result = await serverMutation<InsertTaskResponse>("/api/tasks", newTask);
  revalidatePath("/dashboard/client/my-tasks");
  return result;
};

export const updateTask = async (
  taskId: string,
  updatedTask: Partial<NewTask>
): Promise<any> => {
  const result = await serverMutation(`/api/tasks/${taskId}`, updatedTask, "PUT");
  revalidatePath("/dashboard/client/my-tasks");
  return result;
};

export const deleteTask = async (taskId: string): Promise<any> => {
  const result = await serverMutation(`/api/tasks/${taskId}`, {}, "DELETE");
  revalidatePath("/dashboard/client/my-tasks");
  return result;
};