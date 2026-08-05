'use client';

import React, { useState } from 'react';
import {
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Sunrise,
  Sunset,
  Zap,
  Activity,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface ForecastDay {
  day: string;
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  rainProbPct: number;
  windSpeedKm: number;
  spraySafety: 'OPTIMAL' | 'MODERATE' | 'NOT_RECOMMENDED';
}

export default function WeatherPage() {
  const [selectedUnit, setSelectedUnit] = useState<'C' | 'F'>('C');

  const [forecast] = useState<ForecastDay[]>([
    {
      day: 'Today',
      date: 'Aug 05',
      tempHigh: 26,
      tempLow: 16,
      condition: 'Sunny with Mild Breeze',
      rainProbPct: 5,
      windSpeedKm: 12,
      spraySafety: 'OPTIMAL',
    },
    {
      day: 'Tomorrow',
      date: 'Aug 06',
      tempHigh: 24,
      tempLow: 15,
      condition: 'Light Rain Showers',
      rainProbPct: 75,
      windSpeedKm: 18,
      spraySafety: 'NOT_RECOMMENDED',
    },
    {
      day: 'Friday',
      date: 'Aug 07',
      tempHigh: 27,
      tempLow: 17,
      condition: 'Partly Cloudy',
      rainProbPct: 20,
      windSpeedKm: 14,
      spraySafety: 'OPTIMAL',
    },
    {
      day: 'Saturday',
      date: 'Aug 08',
      tempHigh: 29,
      tempLow: 19,
      condition: 'Sunny & Warm',
      rainProbPct: 0,
      windSpeedKm: 10,
      spraySafety: 'OPTIMAL',
    },
    {
      day: 'Sunday',
      date: 'Aug 09',
      tempHigh: 31,
      tempLow: 20,
      condition: 'High Heat Wave Warning',
      rainProbPct: 0,
      windSpeedKm: 22,
      spraySafety: 'MODERATE',
    },
    {
      day: 'Monday',
      date: 'Aug 10',
      tempHigh: 25,
      tempLow: 16,
      condition: 'Thunderstorms Expected',
      rainProbPct: 85,
      windSpeedKm: 28,
      spraySafety: 'NOT_RECOMMENDED',
    },
    {
      day: 'Tuesday',
      date: 'Aug 11',
      tempHigh: 23,
      tempLow: 14,
      condition: 'Clear Sky',
      rainProbPct: 10,
      windSpeedKm: 11,
      spraySafety: 'OPTIMAL',
    },
  ]);

  const convertTemp = (tempC: number) => {
    if (selectedUnit === 'F') {
      return Math.round((tempC * 9) / 5 + 32);
    }
    return tempC;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full uppercase tracking-wider">
              On-Farm Doppler Weather Station #01
            </span>
            <span className="text-xs text-slate-400">Live Microclimate Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Weather & <span className="text-emerald-400">Climate Telemetry</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Hyper-local temperature, solar radiation, evapotranspiration rates (ET0) & pesticide spray safety alerts.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="bg-[#12221e] border border-emerald-800/40 rounded-xl p-1 flex items-center gap-1 text-xs">
            <button
              onClick={() => setSelectedUnit('C')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedUnit === 'C'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setSelectedUnit('F')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedUnit === 'F'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Main Current Conditions Hero Banner */}
      <div className="bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-emerald-900/30 pb-6 md:pb-0 md:pr-6">
          <div>
            <span className="text-xs text-slate-400 font-semibold">Current Microclimate</span>
            <div className="flex items-center gap-4 mt-2">
              <Sun className="w-16 h-16 text-amber-400 animate-spin-slow" />
              <div>
                <div className="text-4xl font-extrabold text-white">
                  {convertTemp(24)}°{selectedUnit}
                </div>
                <div className="text-xs text-emerald-400 font-medium mt-1">Feels like {convertTemp(26)}°</div>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-200 mt-3">Sunny • Clear Visibility</p>
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-900/30 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sunrise className="w-4 h-4 text-amber-400" /> 06:12 AM
            </span>
            <span className="flex items-center gap-1.5">
              <Sunset className="w-4 h-4 text-orange-400" /> 08:04 PM
            </span>
          </div>
        </div>

        {/* 6 Key Weather Telemetry Grid */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30">
            <span className="text-slate-400 text-[10px] block">Relative Humidity</span>
            <span className="text-emerald-400 font-bold text-base mt-0.5 block flex items-center gap-1">
              <Droplets className="w-4 h-4 text-cyan-400" /> 65%
            </span>
            <span className="text-[9px] text-slate-400">Optimal for corn growth</span>
          </div>

          <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30">
            <span className="text-slate-400 text-[10px] block">Wind Velocity</span>
            <span className="text-slate-200 font-bold text-base mt-0.5 block flex items-center gap-1">
              <Wind className="w-4 h-4 text-teal-400" /> 12 km/h NW
            </span>
            <span className="text-[9px] text-emerald-400 font-medium">Safe for spraying</span>
          </div>

          <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30">
            <span className="text-slate-400 text-[10px] block">Barometric Pressure</span>
            <span className="text-slate-200 font-bold text-base mt-0.5 block">1014 hPa</span>
            <span className="text-[9px] text-slate-400">Steady atmosphere</span>
          </div>

          <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30">
            <span className="text-slate-400 text-[10px] block">Solar Irradiance</span>
            <span className="text-amber-400 font-bold text-base mt-0.5 block">820 W/m²</span>
            <span className="text-[9px] text-slate-400">High solar absorption</span>
          </div>

          <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30">
            <span className="text-slate-400 text-[10px] block">Evapotranspiration (ET0)</span>
            <span className="text-cyan-300 font-bold text-base mt-0.5 block">4.8 mm/day</span>
            <span className="text-[9px] text-slate-400">Moisture depletion rate</span>
          </div>

          <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30">
            <span className="text-slate-400 text-[10px] block">UV Index</span>
            <span className="text-amber-400 font-bold text-base mt-0.5 block">6 (High)</span>
            <span className="text-[9px] text-slate-400">Midday protection suggested</span>
          </div>
        </div>
      </div>

      {/* 7-Day Hyper-Local Forecast */}
      <div className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-emerald-400" /> 7-Day Agricultural Forecast
          </h3>
          <span className="text-xs text-slate-400">High / Low Forecast</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {forecast.map((day, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                idx === 0
                  ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md shadow-emerald-950'
                  : 'bg-[#080e0c] border-emerald-900/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{day.day}</span>
                  <span className="text-[10px] text-slate-400">{day.date}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{day.condition}</p>
              </div>

              <div className="text-center py-2">
                <div className="text-lg font-extrabold text-white">
                  {convertTemp(day.tempHigh)}°{' '}
                  <span className="text-slate-400 text-xs font-normal">/ {convertTemp(day.tempLow)}°</span>
                </div>
              </div>

              <div className="space-y-1 text-[10px] pt-2 border-t border-emerald-900/20">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <CloudRain className="w-3 h-3 text-cyan-400" /> Rain:
                  </span>
                  <span className="font-bold text-cyan-300">{day.rainProbPct}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Wind className="w-3 h-3 text-teal-400" /> Wind:
                  </span>
                  <span className="font-semibold text-slate-200">{day.windSpeedKm} km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 24-Hour Precipitation & Evapotranspiration Chart */}
      <div className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400" /> 24-Hour Hourly Precipitation & Evapotranspiration
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Forecasted hourly rain volume vs water evaporation loss</p>
          </div>
        </div>

        <div className="relative w-full h-48 bg-[#080e0c] rounded-2xl p-4 border border-emerald-900/30 flex flex-col justify-between">
          <div className="absolute inset-x-4 top-8 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-emerald-500 w-full" />
            <div className="border-b border-emerald-500 w-full" />
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
            {/* Hourly rain bars */}
            <rect x="180" y="80" width="20" height="80" fill="#06b6d4" rx="3" opacity="0.8" />
            <rect x="210" y="50" width="20" height="110" fill="#06b6d4" rx="3" opacity="0.9" />
            <rect x="240" y="70" width="20" height="90" fill="#06b6d4" rx="3" opacity="0.8" />

            {/* Evapotranspiration line */}
            <path
              d="M 0 130 Q 120 100, 250 110 T 500 80"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />
          </svg>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-emerald-900/20">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <span className="w-2.5 h-2.5 bg-cyan-500 inline-block rounded-xs" /> Rain Volume (mm)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block" /> ET0 Evaporation Loss (mm)
              </span>
            </div>
            <span>06:00 AM - 06:00 AM Tomorrow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
