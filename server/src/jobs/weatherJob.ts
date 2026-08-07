import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

// List of cities you want to fetch weather for
const cities = [
  "Amritsar", "Ludhiana", "Karnal", "Hisar", "Meerut",
  "Nashik", "Nagpur", "Indore", "Ahmedabad", "Rajkot",
  "Mysuru", "Coimbatore", "Madurai", "Thrissur", "Kozhikode"
];

const apiKey = "b9a831ca75b614771605c4cbcb6075a3"; // your actual API key

export async function updateWeatherAlerts() {
  try {
    for (const city of cities) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        console.error(`❌ Failed to fetch weather for ${city}:`, data.message);
        continue;
      }

      const description = data.weather[0].description;
      const temp = data.main.temp;

      // Insert into WeatherAlert table
      await prisma.weatherAlert.create({
        data: {
          cropId: 1, // link to an existing crop (e.g., Rice)
          title: `Weather in ${city}`,
          description: `Condition: ${description}, Temp: ${temp}°C`,
          severity: temp > 35 ? "HIGH" : "LOW",
        },
      });

      console.log(`✅ Weather alert saved for ${city}: ${description}, ${temp}°C`);
    }
  } catch (err) {
    console.error("❌ Weather job failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}
