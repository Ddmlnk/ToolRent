// 1 відгук, 2 відгуки, 5 відгуків, 11 відгуків, 21 відгук

export function pluralUK(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString("uk-UA")} ₴`;
}

// "2026-11-12" → Date о 00:00 за місцевим часом
export function parseInputDate(value: string): Date {
  return new Date(`${value}T00:00`);
}

// Date → "12 листопада"
export function formatDayMonth(date: Date): string {
  return date.toLocaleDateString("uk-UA", { day: "numeric", month: "long" });
}
