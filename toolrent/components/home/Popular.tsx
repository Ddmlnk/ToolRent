"use client";

import { tools } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ToolCard from "../tools/ToolCard";

interface Filter {
  label: string;
  categoryId: string | null; // null = усі
}

const filters: Filter[] = [
  { label: "Усі", categoryId: null },
  { label: "Садові", categoryId: "c1" },
  { label: "Електро", categoryId: "c2" },
  { label: "Будівельні", categoryId: "c3" },
];

export default function Popular() {
  const [active, setActive] = useState<string | null>(null);
  const visibleTools = active
    ? tools.filter((tool) => tool.categoryId === active)
    : tools;
  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-ink md:text-3xl">
          Популярне <span className="hidden md:inline">цього тижня</span>
        </h2>
        <Link
          href={"/catalog"}
          className="flex items-center gap-1 text-sm font-medium text-brand"
        >
          Каталог <ChevronRight size={16} />
        </Link>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((filter) => {
          const isActive = active === filter.categoryId;
          return (
            <button
              key={filter.label}
              onClick={() => setActive(filter.categoryId)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive ? "bg-ink text-white" : "glass text-ink"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      {visibleTools.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {visibleTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="text-ink/60">У цій категорії поки немає інструментів.</p>
      )}
    </section>
  );
}
