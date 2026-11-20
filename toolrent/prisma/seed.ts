import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  // Чистимо в зворотному порядку зв'язків
  await prisma.booking.deleteMany();
  await prisma.toolUnit.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.category.deleteMany();

  const [garden, power, construction] = await Promise.all([
    prisma.category.create({
      data: { slug: "garden", name: "Садова техніка", icon: "sprout" },
    }),
    prisma.category.create({
      data: { slug: "power", name: "Електроінструмент", icon: "drill" },
    }),
    prisma.category.create({
      data: {
        slug: "construction",
        name: "Будівельне обладнання",
        icon: "construction",
      },
    }),
  ]);
  await prisma.category.createMany({
    data: [
      { slug: "hand", name: "Ручний інструмент", icon: "hammer" },
      { slug: "painting", name: "Фарбування", icon: "paint-roller" },
    ],
  });

  const tools = [
    {
      name: "Перфоратор Bosch GBH 2-26",
      brand: "Bosch",
      categoryId: power.id,
      dailyRate: 350,
      marketValue: 4200,
      rating: 4.9,
      reviewsCount: 32,
      icon: "drill",
      color: "orange",
      units: 3,
    },
    {
      name: "Газонокосарка Makita PLM4628",
      brand: "Makita",
      categoryId: garden.id,
      dailyRate: 420,
      marketValue: 9800,
      rating: 4.8,
      reviewsCount: 21,
      icon: "leaf",
      color: "green",
      units: 2,
    },
    {
      name: "Бетонозмішувач Limex 165",
      brand: "Limex",
      categoryId: construction.id,
      dailyRate: 600,
      marketValue: 12500,
      rating: 4.7,
      reviewsCount: 14,
      icon: "construction",
      color: "amber",
      units: 1,
    },
    {
      name: "Бензопила Stihl MS 180",
      brand: "Stihl",
      categoryId: garden.id,
      dailyRate: 480,
      marketValue: 8900,
      rating: 4.9,
      reviewsCount: 40,
      icon: "axe",
      color: "teal",
      units: 2,
    },
  ] as const;

  for (const [i, { units, ...tool }] of tools.entries()) {
    await prisma.tool.create({
      data: {
        ...tool,
        units: {
          create: Array.from({ length: units }, (_, n) => ({
            inventoryNumber: `TR-${i + 1}-${n + 1}`,
          })),
        },
      },
    });
  }

  console.log("Seed готовий");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
