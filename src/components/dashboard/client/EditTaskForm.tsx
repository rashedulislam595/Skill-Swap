"use client";

import React, { useState } from "react";
import { Info, Bold, Italic, List, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { updateTask } from "@/lib/action/task";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { type Task } from "@/lib/api/task";

export default function EditTaskForm({ task }: { task: Task }) {
  const router = useRouter();

  // Format initial deadline to YYYY-MM-DD for the HTML date input
  const initialDeadline = task.deadline
    ? new Date(task.deadline).toISOString().split("T")[0]
    : "";

  const [formData, setFormData] = useState({
    title: task.title || "",
    category: task.category || "",
    deadline: initialDeadline,
    budget: task.budget || "",
    description: task.description || "",
    status: task.status || "open",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateTask(task._id, formData);
      if (result?.success || result?.result?.matchedCount > 0) {
        toast.success("Task updated successfully!", {
          position: "top-center",
        });
        router.push("/dashboard/client/my-tasks");
        router.refresh();
      } else {
        toast.error("Failed to update task.", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to update task.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit Task</h1>
        <p className="text-gray-600 dark:text-gray-400">Update your project requirements and details.</p>
      </div>

      <div className="bg-white dark:bg-[#121212] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-none border border-gray-100 dark:border-zinc-800 p-6 sm:p-8">
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-[15px] font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Design a high-converting landing page for SaaS"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-[15px] font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select category</option>
                  <option value="design">Design & Creative</option>
                  <option value="development">Web Development</option>
                  <option value="writing">Writing & Translation</option>
                  <option value="marketing">Digital Marketing</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Deadline Date */}
            <div>
              <label htmlFor="deadline" className="block text-[15px] font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deadline Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all "
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-[15px] font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget (USD)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">$</span>
                </div>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-[15px] font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="open">Open</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Task Description */}
          <div>
            <label htmlFor="description" className="block text-[15px] font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Description
            </label>
            <div className="border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              {/* Toolbar mockup */}
              <div className="bg-gray-100/70 dark:bg-zinc-800/70 border-b border-gray-200 dark:border-zinc-700 px-3 py-2 flex items-center gap-1">
                <button type="button" className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-zinc-700 rounded transition-colors">
                  <Bold className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-zinc-700 rounded transition-colors">
                  <Italic className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-zinc-700 rounded transition-colors">
                  <List className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-zinc-700 rounded transition-colors">
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-zinc-700 rounded transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the scope of work, deliverables, and specific requirements..."
                rows={6}
                className="w-full px-4 py-3 bg-gray-50/30 dark:bg-zinc-800/30 text-gray-900 dark:text-white resize-y outline-none"
                required
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 text-gray-700 dark:text-gray-300 rounded-lg">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-gray-500 dark:text-gray-400" />
            <p className="text-[14px] leading-relaxed">
              Updates will take effect immediately. Freelancers will see the updated information when browsing your task or viewing their active proposals.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard/client/my-tasks")}
              className="w-full sm:w-auto px-6 py-2.5 font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-2.5 font-medium text-white bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-sm shadow-md shadow-blue-500/10 transition-colors duration-200 rounded-lg hover:bg-linear-to-r hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-500 dark:hover:to-blue-500 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
