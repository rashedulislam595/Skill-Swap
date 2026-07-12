"use client";

import { FilePlus2, UserCheck2, Banknote } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1. Post a Task",
      description: "Describe your needs, set a budget, and specify your deadline. It takes under 2 minutes.",
      icon: FilePlus2,
    },
    {
      number: "2. Hire Talent",
      description: "Receive bids from vetted freelancers. Review their portfolios and ratings to choose the best fit.",
      icon: UserCheck2,
    },
    {
      number: "3. Secure Payment",
      description: "Payment is held in escrow and only released to the freelancer once you approve the completed work.",
      icon: Banknote,
    },
  ];

  return (
    <section className="bg-white dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            How SkillSwap Works
          </h2>
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Horizontal connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-[16.6%] right-[16.6%] h-[2px] bg-zinc-100 dark:bg-zinc-800/80 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-center text-center group">
                  {/* Icon Box */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 text-white shadow-lg shadow-blue-500/25 dark:shadow-indigo-500/10 group-hover:scale-105 transition-all duration-300">
                    <Icon className="h-9 w-9" />
                  </div>

                  {/* Step Title */}
                  <h3 className="mt-6 text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {step.number}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs sm:max-w-sm leading-relaxed px-4">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
