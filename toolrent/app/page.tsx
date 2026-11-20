import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Popular from "@/components/home/Popular";
import { getCategories, getTools } from "@/lib/data";

export default async function Home() {
  const [tools, categories] = await Promise.all([getTools(), getCategories()]);

  return (
    <main className="mx-auto flex max-w-300 flex-col gap-10 pt-10 md:gap-18 md:pt-16">
      <Hero />
      <Categories categories={categories} />
      <Popular tools={tools.slice(0, 4)} categories={categories} />
      <HowItWorks />
    </main>
  );
}
