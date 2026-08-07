import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();
const apiKey = "b9a831ca75b614771605c4cbcb6075a3"; // your OpenWeather key

// Map crops to their growing cities (adjust as needed)
const cropCities = [
  { cropName: "Rice", city: "Thrissur" },
  { cropName: "Wheat", city: "Ludhiana" },
  { cropName: "Sugarcane", city: "Meerut" },
];

export async function generateSmartCropCalendar() {
  try {
    for (const cropCity of cropCities) {
      const crop = await prisma.crop.findFirst({
        where: { name: cropCity.cropName },
      });
      if (!crop) continue;

      const plantingDate = new Date(crop.plantingDate);

      // Fetch 5-day forecast for the crop’s city
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cropCity.city},IN&appid=${apiKey}&units=metric`;
      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();

      // Check if rain is expected in next 3 days
      const rainExpected = forecastData.list.some((entry: any) =>
        entry.weather[0].main.toLowerCase().includes("rain")
      );

      // Irrigation reminder (7 days after planting, delay if rain expected)
      const irrigationDate = new Date(plantingDate);
      irrigationDate.setDate(irrigationDate.getDate() + 7);
      if (rainExpected) {
        irrigationDate.setDate(irrigationDate.getDate() + 3); // delay irrigation
      }

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Irrigation Reminder",
          description: rainExpected
            ? `Rain expected, irrigation delayed to ${irrigationDate.toDateString()}`
            : `Irrigate ${crop.name} on ${irrigationDate.toDateString()}`,
          date: irrigationDate,
        },
      });

      // Fertilization reminder (30 days after planting)
      const fertilizationDate = new Date(plantingDate);
      fertilizationDate.setDate(fertilizationDate.getDate() + 30);

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Fertilization Reminder",
          description: `Fertilize ${crop.name} on ${fertilizationDate.toDateString()}`,
          date: fertilizationDate,
        },
      });

      // Harvest reminder (90 days after planting)
      const harvestDate = new Date(plantingDate);
      harvestDate.setDate(harvestDate.getDate() + 90);

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Harvest Reminder",
          description: `Harvest ${crop.name} on ${harvestDate.toDateString()}`,
          date: harvestDate,
        },
      });

      console.log(`✅ Smart crop calendar generated for ${crop.name} (${cropCity.city})`);
    }
  } catch (err) {
    console.error("❌ Smart crop calendar job failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}
