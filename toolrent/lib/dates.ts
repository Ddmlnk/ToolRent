const TIME_ZONE = "Europe/Kyiv";

// Сьогоднішня дата в Києві у форматі "2026-11-13"
export function todayIso(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: TIME_ZONE });
}

// "2026-11-12" → Date о 00:00 UTC — саме так дату зберігає @db.Date
export function isoToDbDate(iso: string): Date {
  return new Date(iso);
}
