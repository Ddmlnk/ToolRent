import { categories } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CategoryTile } from "./CategoryTile";

export default function Categories() {
  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-ink md:text-3xl">
          Категорії
        </h2>
        <Link
          href="/catalog"
          className="flex items-center gap-1 text-sm font-medium text-brand"
        >
          Усі <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 md:gap-4">
        {categories.map((category, i) => (
          <div key={category.id} className={i === 4 ? "hidden md:block" : ""}>
            <CategoryTile category={category} />
          </div>
        ))}
      </div>
    </section>
  );
}
