import WeatherDashboard from "../components/WeatherDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">🌱 AgriMate AI Dashboard</h1>
      <WeatherDashboard />
    </main>
  );
}
