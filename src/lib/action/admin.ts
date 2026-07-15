"use server";

import { authMutation } from "../core/server";
import { getAuthToken } from "../core/session";
import { revalidatePath } from "next/cache";

// ─── Block / Unblock User (admin-only) ───────────────────────────────────────

export const blockUser = async (userId: string): Promise<void> => {
  const token = await getAuthToken();
  await authMutation(`/api/admin/users/block`, { userId }, "POST", { token });
  revalidatePath("/dashboard/admin/users");
};

export const unblockUser = async (userId: string): Promise<void> => {
  const token = await getAuthToken();
  await authMutation(`/api/admin/users/unblock`, { userId }, "POST", { token });
  revalidatePath("/dashboard/admin/users");
};

// ─── Delete Task (admin-only) ─────────────────────────────────────────────────

export const deleteAdminTask = async (taskId: string): Promise<void> => {
  const token = await getAuthToken();
  await authMutation(`/api/tasks/${taskId}`, {}, "DELETE", { token });
  revalidatePath("/dashboard/admin/tasks");
};
