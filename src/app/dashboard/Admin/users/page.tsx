import { redirect } from "next/navigation";
import { requireRole } from "@/lib/core/session";
import { getAdminUsers, type AdminUser } from "@/lib/api/admin";
import AdminUsersTable from "@/components/dashboard/admin/AdminUsersTable";
import { Users, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "User Management — Admin | Skill Swap",
  description: "View, block, and unblock all platform user accounts.",
};

export default async function AdminUsersPage() {
  await requireRole("admin");

  let users: AdminUser[] = [];
  try {
    users = await getAdminUsers();
  } catch {
    // empty until backend is connected
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            User Management
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            All Platform Accounts
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Block suspicious accounts or reactivate previously blocked users.
          </p>
        </div>

        {/* Count pill */}
        <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 px-4 py-2.5 shadow-sm">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {users.length} Accounts
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-100 dark:border-zinc-800" />

      {/* Table */}
      <AdminUsersTable users={users} />
    </div>
  );
}
