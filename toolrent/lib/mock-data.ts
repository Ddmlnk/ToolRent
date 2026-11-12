import type { Category, Tool } from "@/types";

export const categories: Category[] = [
  {
    id: "c1",
    slug: "garden",
    name: "Садова техніка",
    toolsCount: 48,
    icon: "sprout",
  },
  {
    id: "c2",
    slug: "power",
    name: "Електроінструмент",
    toolsCount: 64,
    icon: "drill",
  },
  {
    id: "c3",
    slug: "construction",
    name: "Будівельне обладнання",
    toolsCount: 27,
    icon: "construction",
  },
  {
    id: "c4",
    slug: "hand",
    name: "Ручний інструмент",
    toolsCount: 35,
    icon: "hammer",
  },
  {
    id: "c5",
    slug: "painting",
    name: "Фарбування",
    toolsCount: 12,
    icon: "paint-roller",
  },
];

export const tools: Tool[] = [
  {
    id: "t1",
    name: "Перфоратор Bosch GBH 2-26",
    brand: "Bosch",
    categoryId: "c2",
    dailyRate: 350,
    marketValue: 4200,
    rating: 4.9,
    reviewsCount: 32,
    available: true,
    icon: "drill",
    color: "orange",
  },
  {
    id: "t2",
    name: "Газонокосарка Makita PLM4628",
    brand: "Makita",
    categoryId: "c1",
    dailyRate: 420,
    marketValue: 9800,
    rating: 4.8,
    reviewsCount: 21,
    available: true,
    icon: "leaf",
    color: "green",
  },
  {
    id: "t3",
    name: "Бетонозмішувач Limex 165",
    brand: "Limex",
    categoryId: "c3",
    dailyRate: 600,
    marketValue: 12500,
    rating: 4.7,
    reviewsCount: 14,
    available: false,
    icon: "construction",
    color: "amber",
  },
  {
    id: "t4",
    name: "Бензопила Stihl MS 180",
    brand: "Stihl",
    categoryId: "c1",
    dailyRate: 480,
    marketValue: 8900,
    rating: 4.9,
    reviewsCount: 40,
    available: true,
    icon: "axe",
    color: "teal",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
