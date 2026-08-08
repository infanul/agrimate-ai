import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";

import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import calendarRoutes from "./routes/calendar.routes";
import financeRoutes from "./routes/finance.routes";
import diagnosticsRoutes from "./routes/diagnostics.routes";
import weatherRoutes from "./routes/weather.routes";

import { logCropExpenses } from "./jobs/expenseJob";
import { generateSmartCropCalendar } from "./jobs/cropCalendarJob";
import { updateWeatherAlerts } from "./jobs/weatherJob";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

// --------------------------------------------------
// CORS
// --------------------------------------------------

const allowedOrigins = process.env.CLIENT_URL
  ? [
      process.env.CLIENT_URL,
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:3004",
    ]
  : true;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json());

// --------------------------------------------------
// Root
// --------------------------------------------------

app.get("/", (_req, res) => {
  res.json({
    status: "online",
    service: "AgriMate AI Backend API",
    environment: process.env.NODE_ENV || "development",
    documentation: "/api/health",
  });
});

// --------------------------------------------------
// Health
// --------------------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({
    status: "online",
    service: "AgriMate AI Backend API",
    timestamp: new Date().toISOString(),
  });
});

// --------------------------------------------------
// API Routes
// --------------------------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/diagnostics", diagnosticsRoutes);
app.use("/api/weather", weatherRoutes);

// --------------------------------------------------
// 404
// --------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Endpoint Not Found",
    path: req.originalUrl,
  });
});

// --------------------------------------------------
// Error Handler
// --------------------------------------------------

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Server error:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
);

// --------------------------------------------------
// Start Server
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(`AgriMate AI Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`Weather: http://localhost:${PORT}/api/weather`);
});

// --------------------------------------------------
// Scheduled Jobs
// --------------------------------------------------

cron.schedule("0 6 * * *", () => {
  console.log("Running daily weather job...");

  updateWeatherAlerts().catch((error) => {
    console.error("Weather job failed:", error);
  });
});

cron.schedule("0 7 * * *", () => {
  console.log("Running smart crop calendar job...");

  generateSmartCropCalendar().catch((error) => {
    console.error("Smart crop calendar job failed:", error);
  });
});

cron.schedule("0 8 * * *", () => {
  console.log("Running expense tracker job...");

  logCropExpenses().catch((error) => {
    console.error("Expense tracker job failed:", error);
  });
});
