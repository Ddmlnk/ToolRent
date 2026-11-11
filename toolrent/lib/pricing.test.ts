import { describe, it, expect } from "vitest";
import { calcPrice, daysBetween, getDiscountPercent } from "./pricing";

describe("getDiscountPercent", () => {
  it("немає знижки для 1–2 діб", () => {
    expect(getDiscountPercent(1)).toBe(0);
    expect(getDiscountPercent(2)).toBe(0);
  });

  it("5% від 3 до 6 діб", () => {
    expect(getDiscountPercent(3)).toBe(5);
    expect(getDiscountPercent(6)).toBe(5);
  });

  it("10% від 7 діб", () => {
    expect(getDiscountPercent(7)).toBe(10);
    expect(getDiscountPercent(30)).toBe(10);
  });
});

describe("calcPrice", () => {
  it("рахує оренду на 3 доби зі знижкою 5%", () => {
    const price = calcPrice(350, 4200, 3);
    expect(price.rent).toBe(1050);
    expect(price.discount).toBe(52);
    expect(price.total).toBe(998);
    expect(price.deposit).toBe(1260);
  });
  it("рахує оренду на 7 діб зі знижкою 10%", () => {
    const price = calcPrice(350, 4200, 7);
    expect(price.discountPercent).toBe(10);
    expect(price.total).toBe(2205);
  });
  it("без знижки на 1 добу", () => {
    const price = calcPrice(350, 4200, 1);
    expect(price.discount).toBe(0);
    expect(price.total).toBe(350);
  });
  it("сума знижки й підсумку дорівнює оренді", () => {
    const price = calcPrice(333, 1000, 5);
    expect(price.total + price.discount).toBe(price.rent);
  });
  it("кидає помилку для 0 діб", () => {
    expect(() => calcPrice(350, 4200, 0)).toThrow();
  });
});

describe("daysBetween", () => {
  it("12 → 15 листопада = 3 доби", () => {
    const from = new Date(2026, 10, 12);
    const to = new Date(2026, 10, 15);
    expect(daysBetween(from, to)).toBe(3);
  });
});
