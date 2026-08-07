import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/weather") // your backend endpoint
      .then(res => res.json())
      .then(data => setWeatherData(data));
  }, []);

  const chartData = {
    labels: weatherData.map((w) => w.city),
    datasets: [
      {
        label: "Temperature (°C)",
        data: weatherData.map((w) => w.temp),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // smooth curve
      },
    ],
  };

 return (
  <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg">
    <h2 className="text-white text-2xl font-bold mb-4">🌦️ Live Weather Dashboard</h2>

    {/* Live UI effect */}
    <div className="animate-pulse text-yellow-300 mb-4">
      ⚡ High Temperature Alert!
    </div>

    <Line data={chartData} />
  </div>
);
}