import { User, Mail, Briefcase, MapPin, Camera, Save } from "lucide-react";

export default function ProfileSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1000] mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1527] dark:text-white tracking-tight">
            Profile Settings
          </h1>
          <p className="text-[#64748B] dark:text-zinc-400 text-sm mt-1">
            Update your personal details and professional portfolio
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-zinc-100 dark:bg-zinc-800 border-4 border-white dark:border-zinc-950 shadow-md flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-bold text-zinc-400 dark:text-zinc-500">A</span>
                {/* Overlay for hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Alex Freelancer</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Senior UI/UX Designer</p>
            
            <div className="w-full mt-6 space-y-3 text-sm text-left">
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>alex.design@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-4 h-4 text-zinc-400" />
                <span>Remote (Global)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              General Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex"
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Freelancer"
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Professional Title</label>
                <input 
                  type="text" 
                  defaultValue="Senior UI/UX Designer"
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Bio</label>
                <textarea 
                  rows={4}
                  defaultValue="I specialize in creating beautiful, intuitive interfaces for SaaS products and mobile applications. With over 5 years of experience, I bring a user-centered approach to every project."
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-zinc-900 dark:text-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              Professional Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Hourly Rate ($)</label>
                <input 
                  type="number" 
                  defaultValue={55}
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Availability</label>
                <select className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-zinc-900 dark:text-white appearance-none">
                  <option value="full_time">More than 30 hrs/week</option>
                  <option value="part_time">Less than 30 hrs/week</option>
                  <option value="as_needed">As needed - open to offers</option>
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Skills (Comma separated)</label>
                <input 
                  type="text" 
                  defaultValue="UI Design, UX Research, Figma, Prototyping, Wireframing"
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-zinc-900 dark:text-white"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
