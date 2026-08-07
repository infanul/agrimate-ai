import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function logCropExpenses() {
  try {
    // Example: fetch all crops
    const crops = await prisma.crop.findMany();

    for (const crop of crops) {
      // Seed expense (on planting date)
      await prisma.expense.create({
        data: {
          cropId: crop.id,
          title: "Seed Purchase",
          amount: 1200, // adjust as needed
          category: "Seeds",
          date: new Date(crop.plantingDate),
        },
      });

      // Fertilizer expense (30 days after planting)
      const fertDate = new Date(crop.plantingDate);
      fertDate.setDate(fertDate.getDate() + 30);

      await prisma.expense.create({
        data: {
          cropId: crop.id,
          title: "Fertilizer Purchase",
          amount: 2500,
          category: "Fertilizer",
          date: fertDate,
        },
      });

      // Irrigation expense (7 days after planting)
      const irrigationDate = new Date(crop.plantingDate);
      irrigationDate.setDate(irrigationDate.getDate() + 7);

      await prisma.expense.create({
        data: {
          cropId: crop.id,
          title: "Irrigation Cost",
          amount: 800,
          category: "Irrigation",
          date: irrigationDate,
        },
      });

      // Harvest expense (90 days after planting)
      const harvestDate = new Date(crop.plantingDate);
      harvestDate.setDate(harvestDate.getDate() + 90);

      await prisma.expense.create({
        data: {
          cropId: crop.id,
          title: "Harvesting Labor",
          amount: 5000,
          category: "Harvest",
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
