'use client';

import React, { useState } from 'react';
import {
  Settings,
  User,
  Sprout,
  Cpu,
  SlidersHorizontal,
  Bell,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Save,
  Key,
  Globe,
  Mail,
  Zap,
  Layers,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'iot' | 'ai' | 'notifications' | 'account'>('profile');
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [farmProfile, setFarmProfile] = useState({
    farmName: 'Green Valley Agricultural Enterprise',
    location: 'California Delta - Sector 14',
    totalAreaHa: '142.5',
    soilType: 'Rich Organic Loam (Clay-Silt Balance)',
    primaryCrop: 'Corn (Maize)',
    gpsCoords: '38.5816° N, 121.4944° W',
  });

  const [iotSettings, setIotSettings] = useState({
    gatewaySyncIntervalMin: '5',
    johnDeereTelematics: true,
    arableProbes: true,
    senteraMultispectral: true,
  });

  const [aiSettings, setAiSettings] = useState({
    advisorySensitivity: 'BALANCED',
    autoIrrigationTrigger: true,
    organicCompliance: true,
    preferredUnit: 'METRIC',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsUrgentAlerts: true,
    pushPestRisk: true,
    weeklyYieldReport: true,
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full uppercase tracking-wider">
              System Configuration
            </span>
            <span className="text-xs text-slate-400">AgriMate AI PRO v2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Platform <span className="text-emerald-400">Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage farm profile parameters, hardware telematics sync, AI decision thresholds, and alert channels.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          {isSaved && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Settings Saved!
            </div>
          )}
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-emerald-900/40 pb-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-emerald-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
          }`}
        >
          <Sprout className="w-4 h-4" /> Farm Profile & GIS
        </button>

        <button
          onClick={() => setActiveTab('iot')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'iot'
              ? 'bg-emerald-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
          }`}
        >
          <Cpu className="w-4 h-4" /> IoT & Hardware Sync
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'ai'
              ? 'bg-emerald-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" /> AI Model Rules
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'bg-emerald-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
          }`}
        >
          <Bell className="w-4 h-4" /> Alert Channels
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'account'
              ? 'bg-emerald-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
          }`}
        >
          <User className="w-4 h-4" /> Account & Team
        </button>
      </div>

      {/* Main Settings Card Content */}
      <form onSubmit={handleSaveSettings} className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* TAB 1: Farm Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" /> Farm Profile & Geographic Boundaries
              </h3>
              <p className="text-xs text-slate-400 mt-1">Configure primary farm location details for weather & satellite model tuning.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Farm Enterprise Name</label>
                <input
                  type="text"
                  value={farmProfile.farmName}
                  onChange={(e) => setFarmProfile({ ...farmProfile, farmName: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Primary Region / Sector</label>
                <input
                  type="text"
                  value={farmProfile.location}
                  onChange={(e) => setFarmProfile({ ...farmProfile, location: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Total Cultivated Area (Ha)</label>
                <input
                  type="number"
                  step="0.1"
                  value={farmProfile.totalAreaHa}
                  onChange={(e) => setFarmProfile({ ...farmProfile, totalAreaHa: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Soil Classification</label>
                <input
                  type="text"
                  value={farmProfile.soilType}
                  onChange={(e) => setFarmProfile({ ...farmProfile, soilType: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Primary Cultivar</label>
                <input
                  type="text"
                  value={farmProfile.primaryCrop}
                  onChange={(e) => setFarmProfile({ ...farmProfile, primaryCrop: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Center GPS Coordinates</label>
                <input
                  type="text"
                  value={farmProfile.gpsCoords}
                  onChange={(e) => setFarmProfile({ ...farmProfile, gpsCoords: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IoT Hardware */}
        {activeTab === 'iot' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" /> IoT Hardware & Machinery Telematics Integrations
              </h3>
              <p className="text-xs text-slate-400 mt-1">Connect third-party smart tractors, soil probes, and drone sensors.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#080e0c] rounded-2xl border border-emerald-900/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">John Deere Operations Center API</h4>
                  <p className="text-[11px] text-slate-400">Sync tractor fuel consumption, GPS seed placement, and yield maps.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIotSettings({ ...iotSettings, johnDeereTelematics: !iotSettings.johnDeereTelematics })}
                  className={`px-4 py-1.5 rounded-xl font-bold transition-colors ${
                    iotSettings.johnDeereTelematics
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {iotSettings.johnDeereTelematics ? 'Connected' : 'Disabled'}
                </button>
              </div>

              <div className="p-4 bg-[#080e0c] rounded-2xl border border-emerald-900/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">Arable Mark 2 Weather & Canopy Probes</h4>
                  <p className="text-[11px] text-slate-400">Stream microclimate temperature and ET0 calculations every 5 minutes.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIotSettings({ ...iotSettings, arableProbes: !iotSettings.arableProbes })}
                  className={`px-4 py-1.5 rounded-xl font-bold transition-colors ${
                    iotSettings.arableProbes
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {iotSettings.arableProbes ? 'Connected' : 'Disabled'}
                </button>
              </div>

              <div className="p-4 bg-[#080e0c] rounded-2xl border border-emerald-900/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">Sentera Multispectral Drone Layers</h4>
                  <p className="text-[11px] text-slate-400">Ingest high-res aerial imagery for disease detection.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIotSettings({ ...iotSettings, senteraMultispectral: !iotSettings.senteraMultispectral })}
                  className={`px-4 py-1.5 rounded-xl font-bold transition-colors ${
                    iotSettings.senteraMultispectral
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {iotSettings.senteraMultispectral ? 'Connected' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AI Rules */}
        {activeTab === 'ai' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-400" /> AI Agronomy Model Rules & Sensitivity
              </h3>
              <p className="text-xs text-slate-400 mt-1">Adjust automated recommendation thresholds and farming philosophy.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Advisory Sensitivity Level</label>
                <select
                  value={aiSettings.advisorySensitivity}
                  onChange={(e) => setAiSettings({ ...aiSettings, advisorySensitivity: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="CONSERVATIVE">Conservative (Low Alert Frequency)</option>
                  <option value="BALANCED">Balanced (Recommended)</option>
                  <option value="AGGRESSIVE">Aggressive Yield Maximization</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Preferred Unit Standard</label>
                <select
                  value={aiSettings.preferredUnit}
                  onChange={(e) => setAiSettings({ ...aiSettings, preferredUnit: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="METRIC">Metric (Hectares, Metric Tons, °C)</option>
                  <option value="IMPERIAL">Imperial (Acres, Bushels, °F)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-400" /> Alert & Notification Channels
              </h3>
              <p className="text-xs text-slate-400 mt-1">Choose how and when AgriMate AI alerts you regarding crop health risks.</p>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-white block">Email Advisory Digests</span>
                    <span className="text-[11px] text-slate-400">Receive daily summary of soil metrics and weather.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailAlerts}
                  onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-bold text-white block">SMS Emergency Alerts</span>
                    <span className="text-[11px] text-slate-400">Instant SMS for frost warnings or irrigation pipe breaks.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.smsUrgentAlerts}
                  onChange={(e) => setNotifications({ ...notifications, smsUrgentAlerts: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500"
                />
              </label>
            </div>
          </div>
        )}

        {/* TAB 5: Account & Team */}
        {activeTab === 'account' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-400" /> User Profile & Team Permissions
              </h3>
              <p className="text-xs text-slate-400 mt-1">Manage user credentials and access control for farm operators.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Alex Vance"
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Account Email</label>
                <input
                  type="email"
                  defaultValue="alex.vance@agrimate.ai"
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-800/30 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-200">Role Access: <strong>Head Agronomist (Full Admin)</strong></span>
              </div>
              <span className="text-emerald-400 font-semibold">2FA Security Enabled</span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-emerald-900/30 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950 transition-all hover:scale-[1.02]"
          >
            <Check className="w-4 h-4" /> Apply Changes
          </button>
        </div>
      </form>
    </div>
  );
}
