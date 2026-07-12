import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <main className="flex-1 flex flex-col justify-center">
        <Hero />
      </main>
    </div>
  );
}
