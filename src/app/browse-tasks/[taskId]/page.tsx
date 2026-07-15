import { getTaskById } from "@/lib/api/task";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Bookmark, Share2, Star, ShieldCheck, ChevronRight } from "lucide-react";
import TaskProposalForm from "@/components/browse-tasks/TaskProposalForm";

// Helper for relative time (e.g., "Posted 2 hours ago")
function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `Posted ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Posted ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `Posted ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
}

// Helper for deadline string
function formatDeadlineDays(deadlineStr: string) {
  const diff = new Date(deadlineStr).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "Expired";
  return `${days} Days`;
}

// Map categories to nice labels
const categoryLabels: Record<string, string> = {
  development: "Development & IT",
  design: "Design & Creative",
  writing: "Writing & Translation",
  marketing: "Digital Marketing",
};

export default async function TaskDetailsPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  const task = await getTaskById(taskId);

  if (!task) {
    notFound();
  }

  const budgetFormatted = Number(task.budget).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  
  const timeAgo = formatTimeAgo(task.createdAt);
  const deadlineDays = formatDeadlineDays(task.deadline);
  const categoryLabel = categoryLabels[task.category.toLowerCase()] || task.category;
  
  const clientName = task.clientName || `Client #${task.clientId.substring(0, 6)}`;
  const clientInitial = clientName[0].toUpperCase();

  // Mock skills based on category since it's not in DB
  const mockSkills = task.category.toLowerCase() === "development" 
    ? ["React.js", "TypeScript", "Node.js", "Tailwind CSS"]
    : ["Communication", "Project Management", "Attention to Detail"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
          <Link href="/browse-tasks" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Tasks</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="capitalize">{categoryLabel}</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-zinc-900 dark:text-zinc-200 truncate max-w-[200px] sm:max-w-md">
            {task.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Task Column */}
          <div className="flex-1 w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
            
            {/* Category Tag */}
            <div className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-5">
              {categoryLabel}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-5">
              {task.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {timeAgo}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  Remote
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Budget</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{budgetFormatted}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Deadline</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{deadlineDays}</p>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Experience Level</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">Expert</p>
              </div>
            </div>

            {/* Description */}
            <div className="py-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Task Description</h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300">
                <p className="whitespace-pre-line leading-relaxed">
                  {task.description}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="pt-2">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {mockSkills.map(skill => (
                  <span key={skill} className="inline-flex items-center rounded-lg bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Client & Proposal Form */}
          <div className="w-full lg:w-[380px] flex flex-col gap-6 shrink-0">
            
            {/* About the Client */}
            <div className="bg-[#f8fafc] dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6">
              <h3 className="text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-5">
                About The Client
              </h3>
              
              <div className="flex items-center gap-4 mb-5">
                {task.clientImage ? (
                  <Image 
                    src={task.clientImage}
                    alt={clientName}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                    {clientInitial}
                  </div>
                )}
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">{clientName}</h4>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Verified Talent Recruiter</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-zinc-900 dark:text-white">4.9</span>
                  <span className="text-zinc-500 dark:text-zinc-400">(48 reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Payment Method Verified</span>
                </div>
              </div>

              <div className="text-sm italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                "{clientName} is a pleasure to work with. Clear requirements and timely feedback." 
                <span className="block mt-1 text-xs not-italic text-zinc-400 dark:text-zinc-500">— Previous Freelancer</span>
              </div>
            </div>

            {/* Submit Proposal Form */}
            <TaskProposalForm taskId={task._id} />

          </div>
        </div>
      </div>
    </div>
  );
}
