export interface PriceBreakdown {
  days: number;
  rent: number; // тариф × діб, без знижки
  discountPercent: number;
  discount: number; // скільки знижка в гривнях
  total: number; // до сплати за оренду
  deposit: number; // застава
}

const DEPOSIT_RATE = 0.3;

export function getDiscountPercent(days: number): number {
  if (days >= 7) return 10;
  if (days >= 3) return 5;
  return 0;
}

export function calcPrice(
  dailyRate: number,
  marketValue: number,
  days: number,
): PriceBreakdown {
  if (days < 1) throw new Error("Оренда — мінімум 1 доба");

  const rent = dailyRate * days;
  const discountPercent = getDiscountPercent(days);
  const total = Math.round(rent * (1 - discountPercent / 100));

  return {
    days,
    rent,
    discountPercent,
    discount: rent - total,
    total,
    deposit: Math.round(marketValue * DEPOSIT_RATE),
  };
}

// Кількість діб між датами (12.11 → 15.11 = 3 доби)
export function daysBetween(from: Date, to: Date): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}
