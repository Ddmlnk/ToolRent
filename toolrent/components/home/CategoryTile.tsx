import { icons } from "@/lib/icons";
import { Category } from "@/types";
import Link from "next/link";

type CategoryTileProps = { category: Category };

export function CategoryTile({ category }: CategoryTileProps) {
  const Icon = icons[category.icon];
  return (
    <Link
      href={`/catalog?category=${category.slug}`}
      className="glass flex h-37.5 flex-col justify-between rounded-[28px] p-4 transition hover:bg-white/45 md:h-42 md:p-5"
    >
      <span className="flex size-13 items-center justify-center rounded-[20px] bg-white/60">
        <Icon size={26} className="text-ink" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-sm font-medium text-ink md:text-base">
          {category.name}
        </span>
        <span className="text-sm text-ink/60">
          {category.toolsCount} інструментів
        </span>
      </span>
    </Link>
  );
}
