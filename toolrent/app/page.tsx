import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Popular from "@/components/home/Popular";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-300 flex-col gap-10 pt-10 md:gap-18 md:pt-16">
      <Hero />
      <Categories />
      <Popular />
      <HowItWorks />
    </main>
  );
}
