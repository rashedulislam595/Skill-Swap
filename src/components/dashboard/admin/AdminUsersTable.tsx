"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Shield, ShieldOff, ShieldCheck, Search, ChevronDown, Users } from "lucide-react";
import { blockUser, unblockUser } from "@/lib/action/admin";
import { type AdminUser } from "@/lib/api/admin";

const ROLE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  admin: {
    label: "Admin",
    color: "text-purple-700 dark:text-purple-300",
    bg: "bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40",
  },
  client: {
    label: "Client",
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40",
  },
  freelancer: {
    label: "Freelancer",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40",
  },
};

function getRoleConfig(role: string) {
  return (
    ROLE_CONFIG[role?.toLowerCase()] ?? {
      label: role || "User",
      color: "text-zinc-600 dark:text-zinc-400",
      bg: "bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40",
    }
  );
}

function avatarGradient(id: string) {
  const g = [
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
  ];
  const idx = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % g.length;
  return g[idx];
}

interface RowProps {
  user: AdminUser;
}

function UserRow({ user }: RowProps) {
  const [isPending, startTransition] = useTransition();
  const [blocked, setBlocked] = useState(user.isBlocked);
  const roleConf = getRoleConfig(user.role);
  const gradient = avatarGradient(user._id);
  const initial = user.name ? user.name[0].toUpperCase() : "?";

  const handleToggle = () => {
    startTransition(async () => {
      if (blocked) {
        await unblockUser(user._id);
        setBlocked(false);
      } else {
        await blockUser(user._id);
        setBlocked(true);
      }
    });
  };

  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors duration-150">
      {/* Avatar + Name */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
            />
          ) : (
            <div
              className={`h-9 w-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}
            >
              {initial}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
              {user.name}
            </p>
            {user.createdAt && (
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                Joined {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3.5">
        <span className="text-sm text-zinc-600 dark:text-zinc-300 truncate">{user.email}</span>
      </td>

      {/* Role */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${roleConf.bg} ${roleConf.color}`}
        >
          {roleConf.label}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        {blocked ? (
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 inline-block" />
            Blocked
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Active
          </span>
        )}
      </td>

      {/* Action */}
      <td className="px-4 py-3.5 text-right">
        <button
          onClick={handleToggle}
          disabled={isPending || user.role === "admin"}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
            ${blocked
              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/40"
              : "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800/40"
            }`}
        >
          {isPending ? (
            <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : blocked ? (
            <ShieldCheck className="h-3 w-3" />
          ) : (
            <ShieldOff className="h-3 w-3" />
          )}
          {isPending ? "Saving..." : blocked ? "Unblock" : "Block"}
        </button>
      </td>
    </tr>
  );
}

// ─── Main Table ───────────────────────────────────────────────────────────────

export default function AdminUsersTable({ users }: { users: AdminUser[] }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role?.toLowerCase() === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-9 pr-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
          />
        </div>

        {/* Role filter */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="appearance-none rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-4 pr-9 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
            <option value="admin">Admin</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Showing <span className="font-semibold text-zinc-600 dark:text-zinc-300">{filtered.length}</span> of {users.length} users
      </p>

      {/* Table */}
      <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/30">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3 w-3" />
                    User
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-700/50 text-zinc-400 dark:text-zinc-500 mb-4 shadow-xs">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                        No Users Found
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        We couldn&apos;t find any users matching your current search or role filters. Try adjusting your inputs.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((user) => <UserRow key={user._id} user={user} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
