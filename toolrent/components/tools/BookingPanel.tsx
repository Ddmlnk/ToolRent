"use client";

import { formatDayMonth, parseInputDate } from "@/lib/format";
import { daysBetween } from "@/lib/pricing";
import { Tool } from "@/types";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import PriceCalc from "./PriceCalc";

interface BookingPanelProps {
  tool: Tool;
}

export default function BookingPanel({ tool }: BookingPanelProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const days =
    from && to ? daysBetween(parseInputDate(from), parseInputDate(to)) : 0;
  const hasValidRange = days >= 1;

  function handleBook() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!hasValidRange) {
      setError("Дата повернення має бути пізніше за дату початку");
      return;
    }
    if (parseInputDate(from) < today) {
      setError("Не можна бронювати минулі дати");
      return;
    }
    setError(null);
    setBooked(true);
  }

  if (booked) {
    return (
      <div className="glass flex flex-col items-center gap-3 rounded-[28px] p-8 text-center">
        <CircleCheck size={48} className="text-[#1F9D6B]" />
        <p className="text-xl font-semibold text-ink">Бронювання створено</p>
        <p className="text-ink/60">
          Статус: очікує підтвердження менеджером. Заставу внесеш під час
          видачі.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-ink outline-none focus:border-brand";

  return (
    <div className="glass flex flex-col gap-4 rounded-[28px] p-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/60">
          Початок{" "}
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/60">
          Повернення{" "}
          <input
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => setTo(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>
      {hasValidRange ? (
        <PriceCalc
          tool={tool}
          days={days}
          datesLabel={`${formatDayMonth(parseInputDate(from))} – ${formatDayMonth(parseInputDate(to))}`}
          className="bg-white/40"
        />
      ) : (
        <p className="text-sm text-ink/60">
          Обери дати, щоб побачити вартість. Від 3 діб −5%, від 7 діб −10%.
        </p>
      )}
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      <button
        onClick={handleBook}
        disabled={!tool.available}
        className="rounded-full bg-brand py-3.5 font-medium text-white shadow-[0_8px_20px_rgb(255_107_26/0.35)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-ink/30 disabled:shadow-none"
      >
        {tool.available ? "Забронювати" : "Зараз зайнято"}
      </button>
    </div>
  );
}
