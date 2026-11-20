import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "./prisma";
import type { Prisma } from "@/generated/prisma";
import type { Category, Tool, IconName } from "@/types";

// Статуси, за яких одиниця вважається зайнятою
const ACTIVE_STATUSES = ["PENDING", "CONFIRMED", "ISSUED"] as const;

function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

async function findTools(where: Prisma.ToolWhereInput = {}): Promise<Tool[]> {
  const today = startOfToday();

  const rows = await prisma.tool.findMany({
    where,
    orderBy: { reviewsCount: "desc" },
    include: {
      units: {
        select: {
          bookings: {
            where: {
              status: { in: [...ACTIVE_STATUSES] },
              dateFrom: { lte: today },
              dateTo: { gt: today },
            },
            select: { id: true },
          },
        },
      },
    },
  });

  return rows.map(({ units, ...tool }) => ({
    ...tool,
    icon: tool.icon as IconName,
    available: units.some((unit) => unit.bookings.length === 0),
  }));
}

export async function getTools(): Promise<Tool[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("tools");
  return findTools();
}

export async function getToolById(id: string): Promise<Tool | undefined> {
  "use cache";
  cacheLife("minutes");
  cacheTag("tools");
  const [tool] = await findTools({ id });
  return tool;
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  const rows = await prisma.category.findMany({
    orderBy: { tools: { _count: "desc" } },
    include: { _count: { select: { tools: true } } },
  });

  return rows.map(({ _count, ...category }) => ({
    ...category,
    icon: category.icon as IconName,
    toolsCount: _count.tools,
  }));
}
