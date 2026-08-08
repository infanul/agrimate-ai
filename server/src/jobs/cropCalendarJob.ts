import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const apiKey = process.env.OPENWEATHER_API_KEY || "b9a831ca75b614771605c4cbcb6075a3";

interface ForecastWeather {
  main: string;
}

interface ForecastEntry {
  weather: ForecastWeather[];
}

interface ForecastData {
  list: ForecastEntry[];
  cod: string | number;
  message?: string;
}

// Map crops to their growing cities
const cropCities = [
  { cropName: "Rice", city: "Thrissur" },
  { cropName: "Wheat", city: "Ludhiana" },
  { cropName: "Sugarcane", city: "Meerut" },
];

/**
 * Generates smart crop calendar events based on:
 * - Crop planting date
 * - Weather forecast
 * - Irrigation
 * - Fertilization
 * - Harvest
 */
export async function generateSmartCropCalendar() {
  try {
    for (const cropCity of cropCities) {
      const crop = await prisma.crop.findFirst({
        where: {
          name: cropCity.cropName,
        },
      });

      if (!crop) {
        console.log(`⚠️ Crop not found: ${cropCity.cropName}`);
        continue;
      }

      const plantingDate = new Date(crop.plantingDate);

      // Fetch 5-day weather forecast
      const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast` +
        `?q=${encodeURIComponent(cropCity.city)},IN` +
        `&appid=${apiKey}` +
        `&units=metric`;

      const forecastRes = await fetch(forecastUrl);

      if (!forecastRes.ok) {
        console.error(
          `❌ Weather API failed for ${cropCity.city}: ${forecastRes.status}`
        );
        continue;
      }

      const forecastData = (await forecastRes.json()) as ForecastData;

      // Check if rain is expected
      const rainExpected =
        Array.isArray(forecastData.list) &&
        forecastData.list.some((entry) =>
          entry.weather?.some((weather) =>
            weather.main.toLowerCase().includes("rain")
          )
        );

      // -----------------------------
      // IRRIGATION
      // -----------------------------

      const irrigationDate = new Date(plantingDate);
      irrigationDate.setDate(irrigationDate.getDate() + 7);

      if (rainExpected) {
        irrigationDate.setDate(irrigationDate.getDate() + 3);
      }

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Irrigation Reminder",
          description: rainExpected
            ? `Rain expected. Irrigation delayed to ${irrigationDate.toDateString()}.`
            : `Irrigate ${crop.name} on ${irrigationDate.toDateString()}.`,
          startDate: irrigationDate,
          endDate: irrigationDate,
          status: "PENDING",
          priority: rainExpected ? "LOW" : "HIGH",
        },
      });

      // -----------------------------
      // FERTILIZATION
      // -----------------------------

      const fertilizationDate = new Date(plantingDate);
      fertilizationDate.setDate(fertilizationDate.getDate() + 30);

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Fertilization Reminder",
          description: `Fertilize ${crop.name} on ${fertilizationDate.toDateString()}.`,
          startDate: fertilizationDate,
          endDate: fertilizationDate,
          status: "PENDING",
          priority: "MEDIUM",
        },
      });

      // -----------------------------
      // HARVEST
      // -----------------------------

      const harvestDate = new Date(plantingDate);
      harvestDate.setDate(harvestDate.getDate() + 90);

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Harvest Reminder",
          description: `Harvest ${crop.name} on ${harvestDate.toDateString()}.`,
          startDate: harvestDate,
          endDate: harvestDate,
          status: "PENDING",
          priority: "HIGH",
        },
      });

      console.log(
        `✅ Smart crop calendar generated for ${crop.name} (${cropCity.city})`
      );
    }
  } catch (err) {
    console.error("❌ Smart crop calendar job failed:", err);
  }
}

/**
 * Regular crop calendar generation.
 *
 * This function is kept because index.ts imports
 * generateCropCalendar separately.
 */
export async function generateCropCalendar() {
  try {
    for (const cropCity of cropCities) {
      const crop = await prisma.crop.findFirst({
        where: {
          name: cropCity.cropName,
        },
      });

      if (!crop) {
        console.log(`⚠️ Crop not found: ${cropCity.cropName}`);
        continue;
      }

      const plantingDate = new Date(crop.plantingDate);

      // Basic irrigation reminder
      const irrigationDate = new Date(plantingDate);
      irrigationDate.setDate(irrigationDate.getDate() + 7);

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Irrigation Reminder",
          description: `Irrigate ${crop.name} on ${irrigationDate.toDateString()}.`,
          startDate: irrigationDate,
          endDate: irrigationDate,
          status: "PENDING",
          priority: "MEDIUM",
        },
      });

      // Basic fertilization reminder
      const fertilizationDate = new Date(plantingDate);
      fertilizationDate.setDate(fertilizationDate.getDate() + 30);

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Fertilization Reminder",
          description: `Fertilize ${crop.name} on ${fertilizationDate.toDateString()}.`,
          startDate: fertilizationDate,
          endDate: fertilizationDate,
          status: "PENDING",
          priority: "MEDIUM",
        },
      });

      // Basic harvest reminder
      const harvestDate = new Date(plantingDate);
      harvestDate.setDate(harvestDate.getDate() + 90);

      await prisma.cropCalendarEvent.create({
        data: {
          cropId: crop.id,
          title: "Harvest Reminder",
          description: `Harvest ${crop.name} on ${harvestDate.toDateString()}.`,
          startDate: harvestDate,
          endDate: harvestDate,
          status: "PENDING",
          priority: "HIGH",
        },
      });

      console.log(
        `✅ Crop calendar generated for ${crop.name}`
      );
    }
  } catch (err) {
    console.error("❌ Crop calendar job failed:", err);
  }
}

