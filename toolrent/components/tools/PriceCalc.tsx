import { formatPrice, pluralUK } from "@/lib/format";
import { calcPrice } from "@/lib/pricing";
import { Tool } from "@/types";
import { Calendar } from "lucide-react";

interface PriceCalcProps {
  tool: Tool;
  days: number;
  datesLabel: string;
  className?: string;
}

export default function PriceCalc({
  tool,
  days,
  datesLabel,
  className = "",
}: PriceCalcProps) {
  const price = calcPrice(tool.dailyRate, tool.marketValue, days);
  const daysWord = pluralUK(days, ["доба", "доби", "діб"]);

  return (
    <div
      className={`glass flex flex-col gap-2.5 rounded-3xl bg-white/55 px-5 py-4.5 ${className}`}
    >
      {" "}
      <span className="font-medium text-ink"> {tool.name}</span>
      <span className="flex items-center gap-1.5 text-sm text-ink/60">
        {" "}
        <Calendar size={14} />
        {datesLabel} {days} {daysWord}
      </span>
      <hr className="border-ink/10" />
      <Row
        label={`Оренда ${days} × ${formatPrice(tool.dailyRate)}`}
        value={formatPrice(price.rent)}
      />
      {price.discountPercent > 0 && (
        <Row
          label={`Знижка від ${days >= 7 ? 7 : 3} діб −${price.discountPercent}%`}
          value={`−${formatPrice(price.discount)}`}
          valueClass="text-[#1F9D6B]"
        />
      )}
      <Row label="Застава 30%" value={formatPrice(price.deposit)} />
      <div className="flex items-center justify-between pt-1">
        <span className="font-medium text-ink">Разом за оренду</span>
        <span className="text-xl font-semibold text-ink">
          {formatPrice(price.total)}
        </span>
      </div>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
  valueClass?: string;
}

function Row({ label, value, valueClass = "text-ink" }: RowProps) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-ink/60">{label}</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}
