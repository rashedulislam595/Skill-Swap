import { serverFetch, authFetch } from "../core/server";
import { getAuthToken } from "../core/session";

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

// ─── Public (no auth) ─────────────────────────────────────────────────────────

/** Used on the public Browse Tasks page */
export const getAllTasks = async (): Promise<Task[]> => {
  return serverFetch<Task[]>(`/api/tasks`);
};

/** Used on the public task detail / edit page */
export const getTaskById = async (id: string): Promise<Task | null> => {
  return serverFetch<Task | null>(`/api/tasks/${id}`);
};

// ─── Protected (requires session token) ──────────────────────────────────────

/** Used on the client's My Tasks page — filters by clientId, needs auth */
export const getTaskByClientId = async (id: string): Promise<Task[]> => {
  const token = await getAuthToken();
  return authFetch<Task[]>(`/api/tasks?clientId=${id}`, { token });
};