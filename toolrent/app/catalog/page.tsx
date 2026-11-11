import CatalogResults from "@/components/catalog/CatalogResults";
import { SortKey } from "@/lib/catalog";
import { Suspense } from "react";

interface CatalogParams {
  q?: string;
  category?: string;
  sort?: SortKey;
}

interface CatalogPageProps {
  searchParams: Promise<CatalogParams>;
}

export default function CatalogPage({ searchParams }: CatalogPageProps) {
  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-6 pt-10 md:pt-14">
      <h1 className="text-3xl font-bold tracking-tight text-ink md:text-5xl">
        Каталог
      </h1>
      <Suspense fallback={<p>Завантаження…</p>}>
        <CatalogResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
