import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import Talent from "@/components/Talent";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <main className="flex-1 flex flex-col justify-center">
        <Hero />
        <Categories />
        <HowItWorks />
        <Talent />
        <CTA />
      </main>
    </div>
  );
}
