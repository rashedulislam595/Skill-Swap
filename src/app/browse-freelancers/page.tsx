import { Suspense } from "react";
import type { Metadata } from "next";
import { getFreelancers } from "@/lib/api/freelancer";
import FreelancerCard from "@/components/browse-freelancers/FreelancerCard";
import BrowseFreelancersSearch from "@/components/browse-freelancers/BrowseFreelancersSearch";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Browse Freelancers | SkillSwap",
  description: "Find World-Class Talent across design, development, and marketing to bring your projects to life.",
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

function FreelancerGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col h-[320px] shadow-sm animate-pulse"
        >
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            <div className="flex-1 pt-1">
              <div className="h-5 w-32 rounded-md bg-zinc-100 dark:bg-zinc-800 mb-2" />
              <div className="h-3 w-24 rounded-md bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-3 w-full rounded-md bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-3 w-5/6 rounded-md bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-3 w-4/6 rounded-md bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="flex gap-2 mb-6 mt-auto">
            <div className="h-6 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-6 w-20 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="mt-auto pt-5 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <div className="h-6 w-16 rounded-md bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-9 w-24 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyFreelancers() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
      <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
        <Users className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No Freelancers Found</h3>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
        We couldn't find any freelancers matching your current filters. Try adjusting your search criteria.
      </p>
    </div>
  );
}

// ─── Grid (async data-fetching) ──────────────────────────────────────────────

async function FreelancerGrid({ skill, rate, rating }: { skill: string; rate: string; rating: string }) {
  let freelancers = await getFreelancers();

  // Simple client-style filtering done on server
  if (skill && skill !== "all") {
    const s = skill.toLowerCase();
    freelancers = freelancers.filter(f => {
      const rawSkills: any = f.skills;
      const skillsArr: string[] = Array.isArray(rawSkills) 
        ? rawSkills 
        : typeof rawSkills === 'string' ? rawSkills.split(',').map((str: string) => str.trim()) : [];
        
      return skillsArr.some(sk => sk.toLowerCase().includes(s)) ||
      f.title?.toLowerCase().includes(s) ||
      f.bio?.toLowerCase().includes(s)
    });
  }

  // Rate parsing
  if (rate && rate !== "any") {
    freelancers = freelancers.filter(f => {
      const hourly = Number(f.hourlyRate) || 0;
      if (rate === "0-50") return hourly > 0 && hourly <= 50;
      if (rate === "50-100") return hourly > 50 && hourly <= 100;
      if (rate === "100+") return hourly > 100;
      return true;
    });
  }

  // Rating parsing
  if (rating && rating !== "any") {
    freelancers = freelancers.filter(f => {
      const r = f.rating ?? 4.5;
      if (rating === "4.5+") return r >= 4.5;
      if (rating === "4.0+") return r >= 4.0;
      return true;
    });
  }

  if (freelancers.length === 0) {
    return <EmptyFreelancers />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {freelancers.map((freelancer) => (
        <FreelancerCard key={freelancer._id} freelancer={freelancer} />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface BrowseFreelancersPageProps {
  searchParams: Promise<{ skill?: string; rate?: string; rating?: string }>;
}

export default async function BrowseFreelancersPage({ searchParams }: BrowseFreelancersPageProps) {
  const { skill = "all", rate = "any", rating = "any" } = await searchParams;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Find World-Class Talent
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base">
            Connect with skilled freelancers across design, development, and marketing to bring your projects to life.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <BrowseFreelancersSearch initialSkill={skill} initialRate={rate} initialRating={rating} />
        </div>

        {/* Grid */}
        <Suspense fallback={<FreelancerGridSkeleton />}>
          <FreelancerGrid skill={skill} rate={rate} rating={rating} />
        </Suspense>

      </div>
    </div>
  );
}
