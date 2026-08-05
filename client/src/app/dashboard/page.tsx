'use client';

import React, { useState, useEffect } from 'react';
import {
  Sprout,
  TestTube,
  Bot,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Droplets,
  Zap,
  Activity,
  ArrowUpRight,
  RefreshCw,
  SlidersHorizontal,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { apiRequest, getStoredUser, User } from '@/lib/api';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [summaryData, setSummaryData] = useState({
    totalAcreage: 142.5,
    activeFarms: 4,
    overallSoilHealthIndex: 88,
    pendingAdvisories: 3,
    recentCropHealth: [
      { id: 'farm-1', name: 'Green Valley Plot A', crop: 'Corn (Maize)', healthScore: 94, status: 'EXCELLENT', area: '45 Hectares' },
      { id: 'farm-2', name: 'Sunrise Orchard', crop: 'Soybeans', healthScore: 82, status: 'GOOD', area: '32 Hectares' },
      { id: 'farm-3', name: 'Riverbend Field', crop: 'Wheat', healthScore: 68, status: 'ATTENTION_NEEDED', area: '40 Hectares' },
      { id: 'farm-4', name: 'Highland Vineyard', crop: 'Grapes', healthScore: 91, status: 'EXCELLENT', area: '25.5 Hectares' },
    ],
    quickMetrics: {
      soilMoistureAvg: '34.2%',
      nitrogenLevelAvg: '48 mg/kg',
      phAvg: '6.8 (Optimal)',
      avgTemperature: '24.5°C',
    },
  });

  const [advisories, setAdvisories] = useState([
    {
      id: 'adv-101',
      title: 'Nitrogen Depletion Detected in Sector 3',
      category: 'FERTILIZATION',
      severity: 'HIGH',
      recommendation: 'Apply organic N-P-K (20-10-10) fertilizer within 48 hours to prevent corn yield degradation.',
      farmName: 'Riverbend Field',
      createdAt: '10 mins ago',
    },
    {
      id: 'adv-102',
      title: 'Optimal Irrigation Window Identified',
      category: 'IRRIGATION',
      severity: 'LOW',
      recommendation: 'Schedule drip irrigation for 45 minutes at 06:00 AM tomorrow before high midday evaporation.',
      farmName: 'Green Valley Plot A',
      createdAt: '4 hours ago',
    },
    {
      id: 'adv-103',
      title: 'Early Blight Fungus Risk (High Humidity Alert)',
      category: 'PEST_CONTROL',
      severity: 'MEDIUM',
      recommendation: 'Inspect leaves on southern edge of Sunrise Orchard. Apply bio-fungicide preventative spray if spots appear.',
      farmName: 'Sunrise Orchard',
      createdAt: '12 hours ago',
    },
  ]);

  useEffect(() => {
    setUser(getStoredUser());
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const summaryRes = await apiRequest('/dashboard/summary');
      if (summaryRes?.success && summaryRes?.data) {
        setSummaryData(summaryRes.data);
      }

      const advRes = await apiRequest('/dashboard/advisories');
      if (advRes?.success && advRes?.data) {
        setAdvisories(advRes.data);
      }
    } catch (error) {
      console.log('Using preloaded dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full uppercase tracking-wider">
              Live Telemetry
            </span>
            <span className="text-xs text-slate-400">Updated 2 mins ago</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, <span className="text-emerald-400">{user?.fullName || 'Demo Farmer'}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            All 4 farm sectors are active. 1 sector requires fertilization attention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="p-2.5 bg-[#142621] hover:bg-emerald-900/40 text-emerald-400 border border-emerald-800/40 rounded-xl text-xs flex items-center gap-2 font-semibold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Sync Sensors
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Run AI Diagnostic
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Acreage */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Monitored Area</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">{summaryData.totalAcreage} <span className="text-sm font-normal text-slate-400">Hectares</span></div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>4 Active Sectors Connected</span>
            </div>
          </div>
        </div>

        {/* Card 2: Soil Health Index */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Soil Health Index</span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <TestTube className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">{summaryData.overallSoilHealthIndex}<span className="text-sm font-normal text-slate-400">/100</span></div>
            <div className="flex items-center gap-1.5 text-xs text-teal-400 mt-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Optimal NPK Balance</span>
            </div>
          </div>
        </div>

        {/* Card 3: Soil Moisture */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Avg Soil Moisture</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">{summaryData.quickMetrics.soilMoistureAvg}</div>
            <div className="flex items-center gap-1.5 text-xs text-sky-400 mt-1 font-medium">
              <Zap className="w-3.5 h-3.5" />
              <span>Automated Drip Ready</span>
            </div>
          </div>
        </div>

        {/* Card 4: AI Advisories */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Pending AI Advisories</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">{summaryData.pendingAdvisories} <span className="text-sm font-normal text-slate-400">Action Items</span></div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-1 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>1 High Priority Action</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Crop Health Sectors Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/40">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-white">Crop Health & Sector Telemetry</h3>
                <p className="text-xs text-slate-400">Real-time status breakdown across registered farm sectors</p>
              </div>
              <button className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                View All Farms <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {summaryData.recentCropHealth.map((farm) => (
                <div
                  key={farm.id}
                  className="p-4 bg-[#0b1512] border border-emerald-900/40 rounded-2xl hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white truncate">{farm.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold border ${
                        farm.status === 'EXCELLENT'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : farm.status === 'GOOD'
                          ? 'bg-teal-500/10 text-teal-400 border-teal-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {farm.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 mb-3 flex items-center justify-between">
                    <span>🌾 {farm.crop}</span>
                    <span className="font-semibold text-slate-300">{farm.area}</span>
                  </div>

                  {/* Health Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Health Index</span>
                      <span className="font-bold text-white">{farm.healthScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          farm.healthScore >= 90
                            ? 'bg-emerald-400'
                            : farm.healthScore >= 80
                            ? 'bg-teal-400'
                            : 'bg-amber-400'
                        }`}
                        style={{ width: `${farm.healthScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Telemetry Bar */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/40">
            <h3 className="text-base font-bold text-white mb-4">Soil NPK & Parameter Telemetry</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 bg-[#0b1512] rounded-xl border border-emerald-900/30">
                <span className="text-[11px] text-slate-400">Soil pH Level</span>
                <div className="text-lg font-bold text-white mt-0.5">6.8</div>
                <span className="text-[10px] text-emerald-400 font-semibold">Optimal for Corn</span>
              </div>
              <div className="p-3.5 bg-[#0b1512] rounded-xl border border-emerald-900/30">
                <span className="text-[11px] text-slate-400">Nitrogen (N)</span>
                <div className="text-lg font-bold text-white mt-0.5">48 mg/kg</div>
                <span className="text-[10px] text-amber-400 font-semibold">Low in Sector 3</span>
              </div>
              <div className="p-3.5 bg-[#0b1512] rounded-xl border border-emerald-900/30">
                <span className="text-[11px] text-slate-400">Phosphorus (P)</span>
                <div className="text-lg font-bold text-white mt-0.5">22 mg/kg</div>
                <span className="text-[10px] text-emerald-400 font-semibold">Normal</span>
              </div>
              <div className="p-3.5 bg-[#0b1512] rounded-xl border border-emerald-900/30">
                <span className="text-[11px] text-slate-400">Potassium (K)</span>
                <div className="text-lg font-bold text-white mt-0.5">185 mg/kg</div>
                <span className="text-[10px] text-teal-400 font-semibold">Rich</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): AI Advisories & Recommendations Feed */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">AI Agronomist Feed</h3>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                Active AI
              </span>
            </div>

            <div className="space-y-3.5">
              {advisories.map((adv) => (
                <div
                  key={adv.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    adv.severity === 'HIGH'
                      ? 'bg-rose-950/20 border-rose-800/40'
                      : adv.severity === 'MEDIUM'
                      ? 'bg-amber-950/20 border-amber-800/40'
                      : 'bg-emerald-950/20 border-emerald-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        adv.severity === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : adv.severity === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {adv.category} • {adv.severity}
                    </span>
                    <span className="text-[10px] text-slate-500">{adv.createdAt}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-1">{adv.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    {adv.recommendation}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-400 font-medium">📍 {adv.farmName}</span>
                    <button className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/50 px-2.5 py-1 rounded-lg border border-emerald-800/40 transition-colors">
                      Execute Recommendation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
