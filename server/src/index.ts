import { logCropExpenses } from "./jobs/expenseJob";
import { generateSmartCropCalendar } from "./jobs/cropCalendarJob";
import { generateCropCalendar } from "./jobs/cropCalendarJob";
import cron from "node-cron";
import { updateWeatherAlerts } from "./jobs/weatherJob";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import calendarRoutes from './routes/calendar.routes';
import financeRoutes from './routes/finance.routes';
import diagnosticsRoutes from './routes/diagnostics.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration: Supports local dev and production client URL (e.g. Vercel)
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL, 'http://localhost:3000', 'http://localhost:5000']
  : true;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// Root & Health Check Endpoints
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'AgriMate AI Backend API',
    environment: process.env.NODE_ENV || 'development',
    documentation: '/api/health',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'AgriMate AI Backend API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/diagnostics', diagnosticsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

app.listen(PORT, () => {
  console.log(`🌾 AgriMate AI Server running on http://localhost:${PORT}`);
});
// Run every day at 6 AM
cron.schedule("0 6 * * *", () => {
  console.log("🌦️ Running daily weather job...");
  updateWeatherAlerts();
});
// Run crop calendar job every day at 7 AM
cron.schedule("0 7 * * *", () => {
  console.log("📅 Running crop calendar job...");
  generateCropCalendar();
});
// Run smart crop calendar job every day at 7 AM
cron.schedule("0 7 * * *", () => {
  console.log("📅 Running smart crop calendar job...");
  generateSmartCropCalendar();
});// Run expense tracker job every day at 8 AM
cron.schedule("0 8 * * *", () => {
  console.log("💰 Running expense tracker job...");
  logCropExpenses();
});





