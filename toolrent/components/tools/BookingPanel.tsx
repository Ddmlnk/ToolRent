"use client";

import { useActionState, useState } from "react";
import { CircleCheck } from "lucide-react";
import PriceCalc from "./PriceCalc";
import { createBooking } from "@/lib/actions/booking";
import { daysBetween } from "@/lib/pricing";
import { parseInputDate, formatDayMonth, formatPrice } from "@/lib/format";
import type { BookingFormState, Tool } from "@/types";

interface BookingPanelProps {
  tool: Tool;
}

const initialState: BookingFormState = { status: "idle" };

const inputClass =
  "w-full rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-ink outline-none focus:border-brand";

export default function BookingPanel({ tool }: BookingPanelProps) {
  const [state, formAction, isPending] = useActionState(
    createBooking,
    initialState,
  );
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const days =
    from && to ? daysBetween(parseInputDate(from), parseInputDate(to)) : 0;
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  if (state.status === "success") {
    return (
      <div className="glass flex flex-col items-center gap-3 rounded-[28px] p-8 text-center">
        <CircleCheck size={48} className="text-[#1F9D6B]" />
        <p className="text-xl font-semibold text-ink">Бронювання створено</p>
        <p className="text-ink/60">
          До сплати {formatPrice(state.total)}, застава{" "}
          {formatPrice(state.deposit)}.
        </p>
        <p className="text-xs text-ink/40">
          № {state.bookingId.slice(-8).toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="glass flex flex-col gap-4 rounded-[28px] p-5"
    >
      <input type="hidden" name="toolId" value={tool.id} />

      {!tool.available && (
        <p className="rounded-2xl bg-amber-100/70 px-4 py-3 text-sm text-ink">
          Сьогодні всі одиниці зайняті, але можна забронювати на інші дати.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Початок" error={errors.dateFrom}>
          <input
            type="date"
            name="dateFrom"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Повернення" error={errors.dateTo}>
          <input
            type="date"
            name="dateTo"
            value={to}
            min={from || undefined}
            onChange={(e) => setTo(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {days >= 1 ? (
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

      <Field label="Ім'я" error={errors.customerName}>
        <input
          name="customerName"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Телефон" error={errors.customerPhone}>
        <input
          type="tel"
          name="customerPhone"
          autoComplete="tel"
          placeholder="+380 67 123 45 67"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </Field>

      {state.status === "error" && (
        <p className="text-sm font-medium text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand py-3.5 font-medium text-white shadow-[0_8px_20px_rgb(255_107_26/0.35)] transition hover:brightness-105 disabled:opacity-60"
      >
        {isPending ? "Бронюємо…" : "Забронювати"}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/60">
      {label}
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
