import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Add a crop
  const crop = await prisma.crop.create({
    data: {
      name: "Rice",
      type: "Cereal",
      plantingDate: new Date(),
      expectedHarvest: new Date(new Date().setMonth(new Date().getMonth() + 4)),
      farmerId: 1,
    },
  });

  // Add soil data
  const soil = await prisma.soil.create({
    data: {
      type: "Loamy",
      ph: 6.5,
      moisture: 55,
      location: "Kerala",
    },
  });

  // Add an expense
  const expense = await prisma.expense.create({
    data: {
      farmerId: 1,
      category: "Seeds",
      amount: 120,
      date: new Date(),
    },
  });

  console.log("✅ Seed data inserted:", { crop, soil, expense });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
