export type IconName =
  | "sprout"
  | "drill"
  | "construction"
  | "hammer"
  | "paint-roller"
  | "leaf"
  | "axe";

export type ToolColor = "orange" | "green" | "amber" | "teal";

export interface Category {
  id: string;
  slug: string;
  name: string;
  toolsCount: number;
  icon: IconName;
}
export interface Tool {
  id: string;
  name: string;
  brand: string;
  categoryId: string;
  dailyRate: number;
  marketValue: number;
  rating: number;
  reviewsCount: number;
  available: boolean;
  icon: IconName;
  color: ToolColor;
}
