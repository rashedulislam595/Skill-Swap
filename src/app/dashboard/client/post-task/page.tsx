import PostTaskForm from "@/components/dashboard/client/PostTaskForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post a New Task | Properly.by",
  description: "Post a new task to find the perfect professional for the job.",
};

import { getUserSession } from "@/lib/core/session";

export default async function PostTaskPage() {
  const user = await getUserSession();
  return <PostTaskForm clientId={user?.id} />;
}