import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { type Freelancer } from "@/lib/api/freelancer";

interface FreelancerCardProps {
  freelancer: Freelancer;
}

/** Generates initials avatar colour based on _id */
function avatarColor(id: string) {
  const colours = [
    "from-blue-500 to-indigo-600",
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
  ];
  if (!id) return colours[0];
  const idx =
    id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colours.length;
  return colours[idx];
}

export default function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const gradient = avatarColor(freelancer._id);
  const initial = freelancer.name ? freelancer.name[0].toUpperCase() : "?";
  
  // Fallbacks if API data is missing
  const rating = freelancer.rating ?? (Math.random() * (5 - 4) + 4).toFixed(1);
  const jobsCompleted = freelancer.jobsCompleted ?? Math.floor(Math.random() * 200 + 10);
  const hourlyRate = freelancer.hourlyRate ?? (Math.floor(Math.random() * 100) + 30);
  const title = freelancer.title || "Freelancer";
  const bio = freelancer.bio || "Available for new projects. I specialize in delivering high-quality results on time.";
  const rawSkills: any = freelancer.skills;
  const skills: string[] = Array.isArray(rawSkills) && rawSkills.length > 0
    ? rawSkills
    : typeof rawSkills === 'string' && rawSkills.trim().length > 0
      ? rawSkills.split(',').map((s: string) => s.trim())
      : ["Communication", "Problem Solving", "Adaptability"];

  return (
    <div className="group flex flex-col rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-zinc-700 transition-all duration-200 overflow-hidden">
      
      {/* Top Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header: Avatar, Info, Heart */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4">
            {freelancer.image ? (
              <Image
                src={freelancer.image}
                alt={freelancer.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover border border-zinc-100 dark:border-zinc-800"
              />
            ) : (
              <div
                className={`w-14 h-14 shrink-0 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold shadow-sm`}
              >
                {initial}
              </div>
            )}
            
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {freelancer.name}
              </h3>
              <div className="flex items-center text-xs font-medium text-zinc-600 dark:text-zinc-400 gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="text-zinc-900 dark:text-zinc-200 font-bold">{rating}</span>
                <span>({jobsCompleted} jobs)</span>
              </div>
            </div>
          </div>
          
          <button className="text-zinc-400 hover:text-red-500 transition-colors p-1" aria-label="Save freelancer">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        
        {/* Bio */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-5">
          {bio}
        </p>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {skills.slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
              +{skills.length - 4}
            </span>
          )}
        </div>
      </div>
      
      {/* Bottom Section: Hourly Rate & Button */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 p-5 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between mt-auto">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-0.5">
            Hourly Rate
          </p>
          <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400 leading-none">
            ${hourlyRate}/hr
          </p>
        </div>
        
        <Link
          href={`/freelancers/${freelancer._id}`}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all shadow-sm"
        >
          View Profile
        </Link>
      </div>
      
    </div>
  );
}
