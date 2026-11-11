import {
  buildCatalogHref,
  CatalogParams,
  filterTools,
  SortKey,
} from "@/lib/catalog";
import { categories, tools } from "@/lib/mock-data";
import SearchBar from "../tools/SearchBar";
import Link from "next/link";
import { pluralUK } from "@/lib/format";
import ToolCard from "../tools/ToolCard";

interface CatalogResultsProps {
  searchParams: Promise<CatalogParams>;
}

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Популярні" },
  { key: "price-asc", label: "Дешевші" },
  { key: "price-desc", label: "Дорожчі" },
];

export default async function CatalogResults({
  searchParams,
}: CatalogResultsProps) {
  const { q, category, sort = "popular" } = await searchParams;
  const list = filterTools(tools, categories, {
    q,
    categorySlug: category,
    sort,
  });

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
      active ? "bg-ink text-white" : "glass text-ink"
    }`;

  return (
    <>
      <SearchBar defaultValue={q} category={category} />

      {/* Категорії */}
      <div className="flex gap-2 overflow-x-auto">
        <Link href={buildCatalogHref({ q, sort })} className={chip(!category)}>
          Усі
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={buildCatalogHref({ q, category: c.slug, sort })}
            className={chip(category === c.slug)}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Кількість + сортування */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-ink/60">
          Знайдено {list.length}{" "}
          {pluralUK(list.length, ["інструмент", "інструменти", "інструментів"])}
        </span>
        <div className="flex gap-1">
          {sortOptions.map((option) => (
            <Link
              key={option.key}
              href={buildCatalogHref({ q, category, sort: option.key })}
              className={`rounded-full px-3 py-1.5 text-sm ${
                sort === option.key
                  ? "bg-white/70 font-medium text-ink"
                  : "text-ink/60"
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Результати */}
      {list.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {list.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="glass flex flex-col items-center gap-3 rounded-[28px] p-10 text-center">
          <p className="text-lg font-medium text-ink">Нічого не знайдено</p>
          <p className="text-ink/60">Спробуй інший запит або категорію.</p>
          <Link href="/catalog" className="font-medium text-brand">
            Скинути фільтри
          </Link>
        </div>
      )}
    </>
  );
}
