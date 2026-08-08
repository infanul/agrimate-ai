import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const city =
      typeof req.query.city === "string"
        ? req.query.city
        : "Kozhikode";

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "OpenWeather API key is not configured.",
      });
    }

    const url =
      "https://api.openweathermap.org/data/2.5/weather" +
      `?q=${encodeURIComponent(city)}` +
      `&appid=${apiKey}` +
      "&units=metric";

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data?.message || "Failed to fetch weather data.",
      });
    }

    return res.json({
      success: true,
      data: {
        city: data.name,
        country: data.sys?.country,
        temperature: data.main?.temp,
        feelsLike: data.main?.feels_like,
        humidity: data.main?.humidity,
        pressure: data.main?.pressure,
        windSpeed: data.wind?.speed,
        description: data.weather?.[0]?.description,
        condition: data.weather?.[0]?.main,
        icon: data.weather?.[0]?.icon,
      },
    });
  } catch (error) {
    console.error("Weather API error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch live weather.",
    });
  }
});

export default router;
