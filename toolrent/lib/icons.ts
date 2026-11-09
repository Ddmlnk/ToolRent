import {
  Sprout,
  Drill,
  Construction,
  Hammer,
  PaintRoller,
  Leaf,
  Axe,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

export const icons: Record<IconName, LucideIcon> = {
  sprout: Sprout,
  drill: Drill,
  construction: Construction,
  hammer: Hammer,
  "paint-roller": PaintRoller,
  leaf: Leaf,
  axe: Axe,
};
