import { authFetch } from "../core/server";
import { getAuthToken } from "../core/session";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface AdminStats {
  totalUsers: number;
  totalTasks: number;
  totalRevenue: number;
  activeTasks: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  createdAt?: string;
  image?: string;
}

export interface AdminTask {
  _id: string;
  title: string;
  category: string;
  status: string;
  budget: string;
  clientName?: string;
  clientEmail?: string;
  createdAt: string;
  deadline: string;
}

export interface AdminTransaction {
  _id: string;
  clientEmail: string;
  freelancerEmail: string;
  amount: number;
  date: string;
  status: string;
}

// ─── Authenticated Fetch Functions ───────────────────────────────────────────
// All admin routes require a valid session token.

export const getAdminStats = async (): Promise<AdminStats> => {
  const token = await getAuthToken();
  return authFetch<AdminStats>(`/api/admin/stats`, { token });
};

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const token = await getAuthToken();
  return authFetch<AdminUser[]>(`/api/admin/users`, { token });
};

export const getAdminTasks = async (): Promise<AdminTask[]> => {
  const token = await getAuthToken();
  return authFetch<AdminTask[]>(`/api/admin/tasks`, { token });
};

export const getAdminTransactions = async (): Promise<AdminTransaction[]> => {
  const token = await getAuthToken();
  return authFetch<AdminTransaction[]>(`/api/admin/transactions`, { token });
};
