import { getCategoryById, getToolById } from "@/lib/mock-data";
import { icons } from "@/lib/icons";
import { notFound } from "next/navigation";
import { calcPrice } from "@/lib/pricing";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, Star } from "lucide-react";
import { toolGradients } from "@/lib/tool-colors";
import { formatPrice, pluralUK } from "@/lib/format";
import BookingPanel from "./BookingPanel";

interface ToolDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function ToolDetails(params: ToolDetailsProps) {
  const { id } = await params;
  const tool = getToolById(id);
  if (!tool) notFound();

  const category = getCategoryById(tool.categoryId);
  const Icon = icons[tool.icon];
  const { deposit } = calcPrice(tool.dailyRate, tool.marketValue, 1);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={"/catalog"}
        className="flex w-fit items-center gap-1 text-sm font-medium text-ink/60 hover:text-ink"
      >
        <ChevronLeft size={16} /> До каталогу
      </Link>
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:items-start">
        {/* Ліва колонка */}
        <div className="flex flex-col gap-6">
          <div
            className={`flex h-[280px] items-center justify-center rounded-[32px] bg-gradient-to-br md:h-[420px] ${toolGradients[tool.color]}`}
          >
            <Icon size={160} strokeWidth={1.2} className="text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium uppercase text-ink/40">
              {category?.name} {tool.brand}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {tool.name}
            </h1>
            <span className="flex items-center gap-1.5 text-ink/60">
              <Star size={18} className="fill-amber-400 text-amber-400" />
              {tool.rating} · {tool.reviewsCount}{" "}
              {pluralUK(tool.reviewsCount, ["відгук", "відгуки", "відгуків"])}
            </span>
          </div>
          <div className="glass grid grid-cols-2 gap-4 rounded-[28px] p-5">
            <div>
              <p className="text-sm text-ink/60">Тариф</p>
              <p className="text-xl font-semibold text-ink">
                {formatPrice(tool.dailyRate)}{" "}
                <span className="text-sm font-normal text-ink/60">/ доба</span>
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm text-ink/60">
                <ShieldCheck size={14} /> Застава
              </p>
              <p className="text-xl font-semibold text-ink">
                {formatPrice(deposit)}
              </p>
            </div>
          </div>
        </div>

        {/* Права колонка — липка на ПК */}
        <div className="lg:sticky lg:top-28">
          <BookingPanel tool={tool} />
        </div>
      </div>
    </div>
  );
}
