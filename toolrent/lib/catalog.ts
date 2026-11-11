import { Category, Tool } from "@/types";

export type SortKey = "popular" | "price-asc" | "price-desc";

export interface CatalogFilters {
  q?: string;
  categorySlug?: string;
  sort?: SortKey;
}

export function filterTools(
  tools: Tool[],
  categories: Category[],
  { q, categorySlug, sort = "popular" }: CatalogFilters,
): Tool[] {
  const category = categories.find((c) => c.slug === categorySlug);
  const query = q?.trim().toLowerCase();
  const result = tools.filter((tool) => {
    const matchesCategory = !category || tool.categoryId === category.id;
    const matchesQuery =
      !query || `${tool.name} ${tool.brand}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return [...result].sort((a, b) => {
    if (sort === "price-asc") return a.dailyRate - b.dailyRate;
    if (sort === "price-desc") return b.dailyRate - a.dailyRate;
    return b.reviewsCount - a.reviewsCount; // popular
  });
}

export interface CatalogParams {
  q?: string;
  category?: string;
  sort?: SortKey;
}

export function buildCatalogHref(params: CatalogParams): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const query = search.toString();
  return query ? `/catalog?${query}` : "/catalog";
}
