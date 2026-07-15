'use server'

import { serverMutation } from "../core/server";

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
  return serverMutation<InsertTaskResponse>("/api/tasks", newTask);
};