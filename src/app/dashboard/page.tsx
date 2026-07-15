import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";

/**
 * Dashboard root — redirects each role to their own dashboard home.
 * /dashboard → /dashboard/admin   (admin)
 * /dashboard → /dashboard/client  (client)
 * /dashboard → /dashboard/freelancer (freelancer)
 */
export default async function DashboardRootPage() {
  const user = await getUserSession();

  if (!user) redirect("/login");

  const role = (user.role || "client").toLowerCase();

  if (role === "admin") redirect("/dashboard/admin");
  if (role === "freelancer" || role === "writer") redirect("/dashboard/freelancer");

  // Default → client
  redirect("/dashboard/client");
}
