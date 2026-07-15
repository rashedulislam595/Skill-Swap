import EditTaskForm from "@/components/dashboard/client/EditTaskForm";
import { getTaskById } from "@/lib/api/task";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Task | SkillSwap",
  description: "Edit your posted task details.",
};

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const user = await getUserSession();
  if (!user) redirect("/");

  const task = await getTaskById(taskId);
  if (!task) redirect("/dashboard/client/my-tasks");

  // Authorization check: only the client who posted the task (or admin) can edit
  if (task.clientId !== user.id && user.role !== "admin") {
    redirect("/dashboard/client/my-tasks");
  }

  return <EditTaskForm task={task} />;
}
