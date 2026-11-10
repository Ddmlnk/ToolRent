import { formatPrice, pluralUK } from "@/lib/format";
import { icons } from "@/lib/icons";
import { Tool, ToolColor } from "@/types";
import { ArrowRight, Heart, Star } from "lucide-react";
import Link from "next/link";

const gradients: Record<ToolColor, string> = {
  orange: "from-orange-300 to-orange-600",
  green: "from-green-300 to-emerald-600",
  amber: "from-amber-200 to-orange-400",
  teal: "from-teal-300 to-cyan-700",
};

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = icons[tool.icon];
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="glass flex flex-col gap-3.5 rounded-[28px] p-2.5 pb-4 transition hover:-translate-y-1"
    >
      <div
        className={`relative flex h-[196px] items-center justify-center overflow-hidden rounded-[20px] bg-linear-to-br ${gradients[tool.color]}`}
      >
        {" "}
        <Icon size={84} strokeWidth={1.5} className="text-white" />
        {tool.available && (
          <span className="glass absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/60 px-2.5 py-1.5 text-xs font-medium text-ink">
            <span className="size-2 rounded-full bg-green" />
            Вільно сьогодні
          </span>
        )}
        <span className="glass absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/60">
          <Heart size={18} className="text-ink" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-2">
        <span className="text-xs font-medium uppercase text-ink/40">
          {tool.brand}
        </span>
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">
          {tool.name}
        </h3>
        <span className="flex items-center gap-1.5 text-sm text-ink/60">
          <Star size={16} className="fill-amber-400 text-amber-400" />
          {tool.rating} · {tool.reviewsCount}{" "}
          {pluralUK(tool.reviewsCount, ["відгук", "відгуки", "відгуків"])}
        </span>
        <div className="mt-auto flex items-center justify-between pt-1.5">
          <span className="flex items-baseline gap-1">
            <span className="text-xl font-semibold text-ink">
              {formatPrice(tool.dailyRate)}
            </span>
            <span className="text-sm text-ink/60">/ доба</span>
          </span>
          <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white">
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
