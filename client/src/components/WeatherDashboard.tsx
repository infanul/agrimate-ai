import { useEffect, useState } from "react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  condition: string;
  icon: string;
}

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError("");
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL || "https://agrimate-ai.onrender.com/api"}/weather?city=Kozhikode`
);
        

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const result = await response.json();

        if (result.success && result.data) {
          setWeather(result.data);
        } else {
          throw new Error("Invalid weather data");
        }
      } catch (err) {
        console.error("Weather error:", err);
        setError("Unable to load live weather.");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-emerald-900/40 bg-[#0d1815] p-6 text-center">
        <p className="text-emerald-400">
          Loading live weather...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-5">
        <p className="text-red-400">{error}</p>
        <p className="mt-2 text-sm text-slate-400">
          Make sure the AgriMate AI backend is running on port 5000.
        </p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-[#0d1815] p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Live Weather
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Real-time weather from OpenWeather
          </p>
        </div>

        <div className="text-3xl">🌦️</div>
      </div>

      <div className="mt-6">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-white">
            {weather.city}, {weather.country}
          </h3>

          <p className="mt-1 capitalize text-slate-400">
            {weather.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-emerald-950/30 p-5">
            <p className="text-sm text-slate-400">
              Temperature
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {weather.temperature}°C
            </p>
          </div>

          <div className="rounded-xl bg-emerald-950/30 p-5">
            <p className="text-sm text-slate-400">
              Feels Like
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {weather.feelsLike}°C
            </p>
          </div>

          <div className="rounded-xl bg-emerald-950/30 p-5">
            <p className="text-sm text-slate-400">
              Humidity
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {weather.humidity}%
            </p>
          </div>

          <div className="rounded-xl bg-emerald-950/30 p-5">
            <p className="text-sm text-slate-400">
              Wind Speed
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {weather.windSpeed} m/s
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-900/30 bg-[#091410] p-5">
            <p className="text-sm text-slate-400">
              Atmospheric Pressure
            </p>

            <p className="mt-2 text-xl font-semibold text-white">
              {weather.pressure} hPa
            </p>
          </div>

          <div className="rounded-xl border border-emerald-900/30 bg-[#091410] p-5">
            <p className="text-sm text-slate-400">
              Weather Condition
            </p>

            <p className="mt-2 text-xl font-semibold text-emerald-400">
              {weather.condition}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
