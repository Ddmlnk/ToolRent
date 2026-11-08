import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-10 pt-10 md:gap-18 md:pt-16">
      <Hero />
      <HowItWorks />
    </main>
  );
}
