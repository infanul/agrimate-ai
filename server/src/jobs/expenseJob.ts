import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function logCropExpenses() {
  try {
    // Fetch all crops
    const crops = await prisma.crop.findMany();

    for (const crop of crops) {
      // Seed expense
      await prisma.expense.create({
        data: {
          farmerId: crop.farmerId,
          amount: 1200,
          category: `Seeds - ${crop.name}`,
          date: new Date(crop.plantingDate),
        },
      });

      // Fertilizer expense - 30 days after planting
      const fertDate = new Date(crop.plantingDate);
      fertDate.setDate(fertDate.getDate() + 30);

      await prisma.expense.create({
        data: {
          farmerId: crop.farmerId,
          amount: 2500,
          category: `Fertilizer - ${crop.name}`,
          date: fertDate,
        },
      });

      // Irrigation expense - 7 days after planting
      const irrigationDate = new Date(crop.plantingDate);
      irrigationDate.setDate(irrigationDate.getDate() + 7);

      await prisma.expense.create({
        data: {
          farmerId: crop.farmerId,
          amount: 800,
          category: `Irrigation - ${crop.name}`,
          date: irrigationDate,
        },
      });

      // Harvest expense - 90 days after planting
      const harvestDate = new Date(crop.plantingDate);
      harvestDate.setDate(harvestDate.getDate() + 90);

      await prisma.expense.create({
        data: {
          farmerId: crop.farmerId,
          amount: 5000,
          category: `Harvest - ${crop.name}`,
          date: harvestDate,
        },
      });

      console.log(`✅ Expenses logged for ${crop.name}`);
    }
  } catch (err) {
    console.error("❌ Expense job failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

