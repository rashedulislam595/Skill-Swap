import { ProfileStrength as Strength } from "@/lib/api/freelancerDashboard";

export default function ProfileStrength({ profileStrength }: { profileStrength: Strength }) {
  return (
    <div className="bg-[#2A2B5F] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <h2 className="text-sm font-bold text-indigo-100 mb-2">Profile Strength</h2>
        
        <div className="flex justify-between items-end mb-4">
          <div className="text-4xl font-extrabold">{profileStrength.percentage}%</div>
          <div className="px-2 py-1 rounded bg-indigo-500/30 border border-indigo-400/30 text-xs font-bold text-indigo-100 mb-1">
            {profileStrength.level}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-indigo-900/50 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-white rounded-full" 
            style={{ width: `${profileStrength.percentage}%` }}
          />
        </div>

        <p className="text-sm text-indigo-100/80 mb-6 leading-relaxed">
          {profileStrength.actionText}
        </p>
      </div>

      <button className="relative z-10 w-full py-3 bg-white text-[#2A2B5F] rounded-xl font-bold text-sm hover:bg-zinc-100 transition-colors shadow-sm">
        {profileStrength.actionButtonText}
      </button>

    </div>
  );
}
