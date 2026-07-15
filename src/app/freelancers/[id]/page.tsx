import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, MapPin, Mail, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getFreelancers } from "@/lib/api/freelancer";

export default async function FreelancerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const freelancers = await getFreelancers();
  const freelancer = freelancers.find(f => f._id === id);

  if (!freelancer) {
    notFound();
  }

  const initial = freelancer.name ? freelancer.name[0].toUpperCase() : "?";
  const gradient = "from-blue-500 to-indigo-600";
  const rating = freelancer.rating ?? 4.5;
  const jobsCompleted = freelancer.jobsCompleted ?? 0;
  const hourlyRate = freelancer.hourlyRate ?? 50;
  
  const rawSkills: any = freelancer.skills;
  const skills: string[] = Array.isArray(rawSkills) && rawSkills.length > 0
    ? rawSkills
    : typeof rawSkills === 'string' && rawSkills.trim().length > 0
      ? rawSkills.split(',').map((s: string) => s.trim())
      : ["Communication", "Problem Solving", "Adaptability"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          href="/browse-freelancers" 
          className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Freelancers
        </Link>

        {/* Profile Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          {/* Header/Cover */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 sm:-mt-20 mb-6">
              {/* Avatar */}
              {freelancer.image ? (
                <Image
                  src={freelancer.image}
                  alt={freelancer.name}
                  width={160}
                  height={160}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-md bg-white dark:bg-zinc-900"
                />
              ) : (
                <div className={`w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-5xl font-bold shadow-md border-4 border-white dark:border-zinc-900`}>
                  {initial}
                </div>
              )}

              {/* Basic Info */}
              <div className="flex-1 pb-2">
                <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
                  {freelancer.name}
                </h1>
                <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                  {freelancer.title || freelancer.role || "Freelance Professional"}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-zinc-900 dark:text-zinc-100 font-bold">{rating}</span>
                    <span>({jobsCompleted} jobs)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Remote
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col w-full sm:w-auto gap-3 pb-2">
                <div className="text-left sm:text-right mb-2">
                  <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-1">
                    Hourly Rate
                  </p>
                  <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 leading-none">
                    ${hourlyRate}
                    <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">/hr</span>
                  </p>
                </div>
                <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                  Hire Freelancer
                </button>
                <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 px-6 py-3 text-sm font-semibold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                  Send Message
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <section>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">About</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                    {freelancer.bio || "This freelancer hasn't added a bio yet."}
                  </p>
                </section>

                {/* Skills */}
                <section>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Skills & Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/80 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/30 p-6 border border-zinc-100 dark:border-zinc-800">
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-4">Contact Info</h3>
                  <div className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-zinc-400" />
                      {freelancer.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
