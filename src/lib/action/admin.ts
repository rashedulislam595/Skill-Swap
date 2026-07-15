"use server";

import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";

// ─── Block / Unblock User ────────────────────────────────────────────────────

export const blockUser = async (userId: string): Promise<void> => {
  await serverMutation(`/api/admin/users/block`, { userId });
  revalidatePath("/dashboard/admin/users");
};

export const unblockUser = async (userId: string): Promise<void> => {
  await serverMutation(`/api/admin/users/unblock`, { userId });
  revalidatePath("/dashboard/admin/users");
};

// ─── Delete Task ─────────────────────────────────────────────────────────────

export const deleteAdminTask = async (taskId: string): Promise<void> => {
  await serverMutation(`/api/tasks/${taskId}`, {}, "DELETE");
  revalidatePath("/dashboard/admin/tasks");
};
