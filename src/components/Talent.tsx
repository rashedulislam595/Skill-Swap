"use client";

import Link from "next/link";
import { Star, Check } from "lucide-react";
import { Card as HeroUICard, CardHeader, CardFooter, Button, Chip } from "@heroui/react";

// Map compound component structure requested by the user
const Card = HeroUICard as any;
Card.Header = CardHeader;
Card.Content = ({ children, className = "", ...props }: any) => (
  <div className={className} {...props}>
    {children}
  </div>
);
Card.Footer = CardFooter;
Card.Title = ({ children, className = "", ...props }: any) => (
  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-250 ${className}`} {...props}>
    {children}
  </h3>
);
Card.Description = ({ children, className = "", ...props }: any) => (
  <div className={`flex items-center gap-1 mt-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 justify-center ${className}`} {...props}>
    {children}
  </div>
);

export default function Talent() {
  const talents = [
    {
      name: "Elena Rodriguez",
      rating: "4.9",
      jobs: "124",
      skills: ["UI/UX", "Figma", "React"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "David Kim",
      rating: "5.0",
      jobs: "89",
      skills: ["Python", "AWS", "Node.js"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "Maya Patel",
      rating: "4.8",
      jobs: "210",
      skills: ["Content", "SEO", "Editing"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      name: "Jameson Lee",
      rating: "5.0",
      jobs: "56",
      skills: ["Swift", "Flutter", "Kotlin"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    },
  ];

  return (
    <section className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-10">
          {/* Title & Description - centered */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Top Talent This Week
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              The most reliable and highest-rated professionals in our network.
            </p>
          </div>
          {/* Explore All link - right aligned on its own row */}
          <div className="flex justify-end mt-4">
            <Link
              href="#"
              className="group inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
            >
              Explore All
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Talent Cards Grid using compound subcomponent anatomy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {talents.map((talent) => (
            <Card
              key={talent.name}
              className="flex flex-col rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-2 text-center transition-all duration-300 hover:shadow-lg dark:hover:border-zinc-700 hover:scale-[1.01]"
            >
              {/* Card Header matching requested structure */}
              <Card.Header className="flex flex-col items-center p-6 pb-2">
                {/* Profile Image with Verification Check */}
                <div className="relative w-20 h-20 mb-4">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="rounded-2xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800"
                  />
                  {/* Verification Badge */}
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-white dark:border-zinc-900 shadow-md">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                </div>

                <Card.Title>{talent.name}</Card.Title>

                <Card.Description>
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-zinc-950 dark:text-zinc-200">{talent.rating}</span>
                  <span>({talent.jobs} jobs)</span>
                </Card.Description>
              </Card.Header>

              {/* Card Content - Skills List */}
              <Card.Content className="py-4 px-6 flex flex-wrap items-center justify-center gap-2">
                {talent.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-zinc-50 dark:bg-zinc-800/40 px-3 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-500/20 dark:border-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white transition-all duration-150 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </Card.Content>

              {/* Card Footer - Action Button (Cyan-to-Blue matching the project style) */}
              <Card.Footer className="p-6 pt-2 w-full">
                <Link href={`/talent/${talent.name.toLowerCase().replace(" ", "-")}`}>
                  <Button
                      className="w-full h-10 border border-cyan-500 bg-transparent text-cyan-600 dark:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent shadow-sm hover:shadow-cyan-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold text-xs rounded-md"
                  >
                    View Profile
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
