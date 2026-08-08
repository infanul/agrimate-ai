
import { Request, Response } from "express";

interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg?: number;
  };
  clouds?: {
    all: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export const getWeather = async (
  req: Request,
  res: Response
) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "OpenWeather API key is not configured.",
      });
    }

    const city =
      typeof req.query.city === "string"
        ? req.query.city
        : "Kozhikode";

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}` +
      `&appid=${apiKey}` +
      `&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      return res.status(response.status).json({
        success: false,
        message:
          errorData?.message ||
          "Unable to fetch weather from OpenWeather.",
      });
    }

    const weather =
      (await response.json()) as OpenWeatherResponse;

    const currentWeather = {
      city: weather.name,
      country: weather.sys.country,

      temperature: Math.round(weather.main.temp * 10) / 10,
      feelsLike: Math.round(weather.main.feels_like * 10) / 10,
      minTemperature: Math.round(weather.main.temp_min * 10) / 10,
      maxTemperature: Math.round(weather.main.temp_max * 10) / 10,

      humidity: weather.main.humidity,
      pressure: weather.main.pressure,

      condition: weather.weather[0]?.main || "Unknown",
      description:
        weather.weather[0]?.description || "No description",

      icon: weather.weather[0]?.icon || "01d",

      windSpeed:
        Math.round(weather.wind.speed * 3.6 * 10) / 10,

      windDirection: weather.wind.deg ?? 0,

      cloudiness: weather.clouds?.all ?? 0,

      rain1h: weather.rain?.["1h"] ?? 0,
      rain3h: weather.rain?.["3h"] ?? 0,

      sunrise: weather.sys.sunrise,
      sunset: weather.sys.sunset,

      updatedAt: new Date(weather.dt * 1000).toISOString(),
    };

    return res.json({
      success: true,
      source: "OpenWeather",
      data: currentWeather,
    });
  } catch (error) {
    console.error("Weather API error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch live weather data.",
    });
  }
};

