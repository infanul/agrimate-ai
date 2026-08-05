'use client';

import React, { useState } from 'react';
import {
  TestTube,
  Droplets,
  Activity,
  Zap,
  RefreshCw,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Thermometer,
  ShieldCheck,
  Search,
  Filter,
} from 'lucide-react';

interface SoilProbe {
  id: string;
  name: string;
  field: string;
  depth: string;
  moistureVwc: number;
  temperatureC: number;
  nitrogenMgKg: number;
  ph: number;
  batteryPct: number;
  status: 'ONLINE' | 'CALIBRATING' | 'LOW_BATTERY';
  lastSync: string;
}

export default function SoilPage() {
  const [selectedField, setSelectedField] = useState('Green Valley Plot A');
  const [selectedDepth, setSelectedDepth] = useState('30cm (Root Zone)');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [probes, setProbes] = useState<SoilProbe[]>([
    {
      id: 'SOIL-PROBE-01',
      name: 'North Ridge Probe A',
      field: 'Green Valley Plot A',
      depth: '30cm (Root Zone)',
      moistureVwc: 36.4,
      temperatureC: 21.2,
      nitrogenMgKg: 52,
      ph: 6.8,
      batteryPct: 98,
      status: 'ONLINE',
      lastSync: '1 min ago',
    },
    {
      id: 'SOIL-PROBE-02',
      name: 'East Basin Probe B',
      field: 'Sunrise Orchard',
      depth: '30cm (Root Zone)',
      moistureVwc: 31.8,
      temperatureC: 22.5,
      nitrogenMgKg: 44,
      ph: 6.5,
      batteryPct: 92,
      status: 'ONLINE',
      lastSync: '3 mins ago',
    },
    {
      id: 'SOIL-PROBE-03',
      name: 'Riverbend Floodplain C',
      field: 'Riverbend Field',
      depth: '30cm (Root Zone)',
      moistureVwc: 24.1,
      temperatureC: 24.0,
      nitrogenMgKg: 28,
      ph: 7.2,
      batteryPct: 88,
      status: 'ONLINE',
      lastSync: 'Just now',
    },
    {
      id: 'SOIL-PROBE-04',
      name: 'West Slope Probe D',
      field: 'Highland Vineyard',
      depth: '30cm (Root Zone)',
      moistureVwc: 28.5,
      temperatureC: 19.8,
      nitrogenMgKg: 49,
      ph: 6.7,
      batteryPct: 95,
      status: 'ONLINE',
      lastSync: '5 mins ago',
    },
    {
      id: 'SOIL-PROBE-05',
      name: 'Subsoil Deep Sensor E',
      field: 'Green Valley Plot A',
      depth: '60cm (Subsoil)',
      moistureVwc: 42.0,
      temperatureC: 18.1,
      nitrogenMgKg: 38,
      ph: 6.9,
      batteryPct: 79,
      status: 'ONLINE',
      lastSync: '2 mins ago',
    },
  ]);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setProbes((prev) =>
        prev.map((p) => ({
          ...p,
          lastSync: 'Just now',
          moistureVwc: Number((p.moistureVwc + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        }))
      );
      setIsRefreshing(false);
    }, 800);
  };

  const filteredProbes = probes.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full uppercase tracking-wider">
              IoT Sensor Network
            </span>
            <span className="text-xs text-slate-400">12 Connected Telemetry Nodes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Soil Health & <span className="text-emerald-400">Moisture Telemetry</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time N-P-K nutrient density, volumetric water content (VWC), electrical conductivity & pH levels.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#12221e] hover:bg-emerald-900/40 border border-emerald-800/40 text-emerald-300 rounded-xl font-semibold text-xs transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Syncing Sensors...' : 'Sync IoT Telemetry'}
          </button>
        </div>
      </div>

      {/* Field & Depth Selector Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0d1815] border border-emerald-900/30 p-4 rounded-2xl">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Select Plot:</span>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="bg-[#12221e] border border-emerald-900/40 text-emerald-300 font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="Green Valley Plot A">Green Valley Plot A (Corn)</option>
              <option value="Sunrise Orchard">Sunrise Orchard (Soybeans)</option>
              <option value="Riverbend Field">Riverbend Field (Wheat)</option>
              <option value="Highland Vineyard">Highland Vineyard (Grapes)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Sensor Depth:</span>
            <select
              value={selectedDepth}
              onChange={(e) => setSelectedDepth(e.target.value)}
              className="bg-[#12221e] border border-emerald-900/40 text-slate-300 font-medium rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="10cm (Topsoil)">10cm (Topsoil Surface)</option>
              <option value="30cm (Root Zone)">30cm (Root Zone)</option>
              <option value="60cm (Subsoil)">60cm (Deep Subsoil)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Field: <strong className="text-white">{selectedField}</strong></span>
        </div>
      </div>

      {/* Primary Soil Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e1b17] border border-emerald-900/30 p-5 rounded-2xl relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Soil Moisture (VWC)</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">34.2%</div>
          <div className="text-[11px] text-cyan-400 mt-1 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Moisture Balance
          </div>
        </div>

        <div className="bg-[#0e1b17] border border-emerald-900/30 p-5 rounded-2xl relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Nitrogen Level (N)</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TestTube className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">48 mg/kg</div>
          <div className="text-[11px] text-amber-400 mt-1 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Low in Sector 3 (Riverbend)
          </div>
        </div>

        <div className="bg-[#0e1b17] border border-emerald-900/30 p-5 rounded-2xl relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Soil pH Balance</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">6.8 pH</div>
          <div className="text-[11px] text-teal-300 mt-1 font-medium">Neutral / Slightly Acidic</div>
        </div>

        <div className="bg-[#0e1b17] border border-emerald-900/30 p-5 rounded-2xl relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Soil Temperature</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">21.5°C</div>
          <div className="text-[11px] text-slate-400 mt-1">Measured at 30cm depth</div>
        </div>
      </div>

      {/* N-P-K Nutrients breakdown & 24-Hour Moisture Trend SVG Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* N-P-K Spectrum Card */}
        <div className="bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl space-y-4 lg:col-span-1">
          <div className="border-b border-emerald-900/30 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TestTube className="w-4 h-4 text-emerald-400" /> N-P-K Nutrients Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Target ratio for current growth phase</p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Nitrogen */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Nitrogen (N)
                </span>
                <span className="text-emerald-400 font-bold">48 / 60 mg/kg</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '80%' }} />
              </div>
              <span className="text-[10px] text-slate-400 block">Slight deficit. Top-dressing recommended.</span>
            </div>

            {/* Phosphorus */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" /> Phosphorus (P)
                </span>
                <span className="text-teal-400 font-bold">24 / 25 mg/kg</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full" style={{ width: '96%' }} />
              </div>
              <span className="text-[10px] text-slate-400 block">Optimal level for root development.</span>
            </div>

            {/* Potassium */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Potassium (K)
                </span>
                <span className="text-cyan-400 font-bold">32 / 35 mg/kg</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '91%' }} />
              </div>
              <span className="text-[10px] text-slate-400 block">Good resistance to drought stress.</span>
            </div>

            {/* Organic Matter */}
            <div className="pt-2 border-t border-emerald-900/30 flex justify-between items-center">
              <span className="text-slate-400">Organic Matter Content</span>
              <span className="text-white font-bold">4.2% (Rich Topsoil)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Electrical Conductivity (EC)</span>
              <span className="text-white font-bold">1.4 dS/m (Safe)</span>
            </div>
          </div>
        </div>

        {/* 24-Hour Telemetry Chart Representation */}
        <div className="bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl space-y-4 lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> 24-Hour Soil Moisture & Temperature Curves
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Automated telemetry hourly telemetry logs</p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Live Feed
            </span>
          </div>

          {/* Custom SVG Line Chart */}
          <div className="relative w-full h-48 sm:h-56 bg-[#080e0c] rounded-2xl p-4 border border-emerald-900/30 flex flex-col justify-between">
            {/* Grid lines */}
            <div className="absolute inset-x-4 top-8 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-emerald-500 w-full" />
              <div className="border-b border-emerald-500 w-full" />
              <div className="border-b border-emerald-500 w-full" />
            </div>

            {/* SVG Path line graph */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <path
                d="M 0 110 Q 75 70, 150 90 T 300 50 T 450 65 L 500 80 L 500 160 L 0 160 Z"
                fill="url(#moistureGrad)"
              />

              {/* Moisture Line */}
              <path
                d="M 0 110 Q 75 70, 150 90 T 300 50 T 450 65 L 500 80"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />

              {/* Temp Line (dashed cyan) */}
              <path
                d="M 0 130 Q 80 120, 160 110 T 320 125 T 460 100 L 500 110"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Data points */}
              <circle cx="150" cy="90" r="4" fill="#10b981" />
              <circle cx="300" cy="50" r="4" fill="#10b981" />
              <circle cx="450" cy="65" r="4" fill="#10b981" />
            </svg>

            {/* Chart Legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-emerald-900/20">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                  <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> Moisture VWC (%)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-cyan-400">
                  <span className="w-2.5 h-0.5 bg-cyan-400 border-dashed inline-block" /> Soil Temp (°C)
                </span>
              </div>
              <span>00:00 - 24:00 Today</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-[#080e0c] rounded-xl border border-emerald-900/30">
              <span className="text-slate-400 text-[10px] block">24h Max Moisture</span>
              <span className="text-emerald-400 font-bold">38.1% VWC</span>
            </div>
            <div className="p-3 bg-[#080e0c] rounded-xl border border-emerald-900/30">
              <span className="text-slate-400 text-[10px] block">24h Min Moisture</span>
              <span className="text-slate-200 font-bold">29.4% VWC</span>
            </div>
            <div className="p-3 bg-[#080e0c] rounded-xl border border-emerald-900/30">
              <span className="text-slate-400 text-[10px] block">Avg Temp</span>
              <span className="text-cyan-300 font-bold">21.8°C</span>
            </div>
          </div>
        </div>
      </div>

      {/* IoT Probe Hardware Table */}
      <div className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" /> Active IoT Hardware Probes
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Deployed hardware sensors streaming to gateway</p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search probe ID or plot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#12221e] border border-emerald-900/40 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#080e0c] text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-900/30">
              <tr>
                <th className="px-6 py-4">Probe ID</th>
                <th className="px-6 py-4">Sensor Name</th>
                <th className="px-6 py-4">Assigned Field</th>
                <th className="px-6 py-4">Depth</th>
                <th className="px-6 py-4">Moisture</th>
                <th className="px-6 py-4">Nitrogen</th>
                <th className="px-6 py-4">Battery</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/20">
              {filteredProbes.map((probe) => (
                <tr key={probe.id} className="hover:bg-emerald-950/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-emerald-400 font-semibold">{probe.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{probe.name}</td>
                  <td className="px-6 py-4 text-slate-300">{probe.field}</td>
                  <td className="px-6 py-4 text-slate-400">{probe.depth}</td>
                  <td className="px-6 py-4 text-cyan-300 font-bold">{probe.moistureVwc}% VWC</td>
                  <td className="px-6 py-4 font-medium">{probe.nitrogenMgKg} mg/kg</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <Zap className="w-3 h-3 fill-emerald-400" /> {probe.batteryPct}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Online
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
