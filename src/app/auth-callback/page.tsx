import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  // Redirect based on user role
  if (user.role === "admin") {
    redirect("/dashboard/admin");
  }
  if (user.role === "freelancer") {
    redirect("/dashboard/freelancer");
  }

  // Clients or other roles land on the home page
  redirect("/");
}
