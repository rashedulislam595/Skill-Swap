import { serverFetch } from "../core/server";

// ─── Interfaces ──────────────────────────────────────────────────────────────

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

// ─── Fetch Functions ──────────────────────────────────────────────────────────

export const getAdminStats = async (): Promise<AdminStats> => {
  return serverFetch<AdminStats>(`/api/admin/stats`);
};

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  return serverFetch<AdminUser[]>(`/api/admin/users`);
};

export const getAdminTasks = async (): Promise<AdminTask[]> => {
  return serverFetch<AdminTask[]>(`/api/admin/tasks`);
};

export const getAdminTransactions = async (): Promise<AdminTransaction[]> => {
  return serverFetch<AdminTransaction[]>(`/api/admin/transactions`);
};
