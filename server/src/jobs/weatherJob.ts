
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const apiKey = process.env.OPENWEATHER_API_KEY || "b9a831ca75b614771605c4cbcb6075a3";

const cities = [
  "Thrissur",
  "Kochi",
  "Kozhikode",
  "Thiruvananthapuram",
];

interface WeatherResponse {
  cod: number | string;
  message?: string;
  weather?: {
    description: string;
  }[];
  main?: {
    temp: number;
  };
}

export async function updateWeatherAlerts() {
  try {
    for (const city of cities) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

      const response = await fetch(url);

      const data = (await response.json()) as WeatherResponse;

      if (Number(data.cod) !== 200) {
        console.error(
          `❌ Failed to fetch weather for ${city}:`,
          data.message || "Unknown error"
        );
        continue;
      }

      const description =
        data.weather?.[0]?.description || "No weather description";

      const temp = data.main?.temp ?? 0;

      console.log(
        `🌦️ ${city}: ${description}, Temperature: ${temp}°C`
      );

      // Find crops associated with this city/location
      const crops = await prisma.crop.findMany();

      for (const crop of crops) {
        await prisma.weatherAlert.create({
          data: {
            cropId: crop.id,
            title: `Weather Update - ${city}`,
            description: `${description}. Current temperature: ${temp}°C.`,
            severity: "INFO",
          },
        });
      }
    }

    console.log("✅ Weather alerts updated successfully.");
  } catch (err) {
    console.error("❌ Weather job failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

