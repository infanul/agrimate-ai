'use client';

import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Activity,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Layers,
  Sparkles,
  Calendar,
  X,
  Eye,
  Edit,
} from 'lucide-react';

interface Farm {
  id: string;
  name: string;
  location: string;
  crop: string;
  areaHa: number;
  healthScore: number;
  status: 'EXCELLENT' | 'GOOD' | 'ATTENTION_NEEDED';
  soilMoisture: string;
  plantingDate: string;
  estHarvestDate: string;
  estYieldTons: number;
  irrigationType: string;
  manager: string;
}

export default function FarmsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFarmDetails, setSelectedFarmDetails] = useState<Farm | null>(null);

  const [farms, setFarms] = useState<Farm[]>([
    {
      id: 'farm-1',
      name: 'Green Valley Plot A',
      location: 'Sector 14 - North Ridge',
      crop: 'Corn (Maize)',
      areaHa: 45.0,
      healthScore: 94,
      status: 'EXCELLENT',
      soilMoisture: '36%',
      plantingDate: '2026-05-12',
      estHarvestDate: '2026-10-10',
      estYieldTons: 620,
      irrigationType: 'Center Pivot Automated',
      manager: 'Alex Vance',
    },
    {
      id: 'farm-2',
      name: 'Sunrise Orchard',
      location: 'Sector 08 - East Basin',
      crop: 'Soybeans',
      areaHa: 32.0,
      healthScore: 82,
      status: 'GOOD',
      soilMoisture: '31%',
      plantingDate: '2026-06-01',
      estHarvestDate: '2026-11-05',
      estYieldTons: 380,
      irrigationType: 'Drip Line Telemetry',
      manager: 'Maria Santos',
    },
    {
      id: 'farm-3',
      name: 'Riverbend Field',
      location: 'Sector 03 - River Floodplain',
      crop: 'Wheat',
      areaHa: 40.0,
      healthScore: 68,
      status: 'ATTENTION_NEEDED',
      soilMoisture: '24%',
      plantingDate: '2026-04-20',
      estHarvestDate: '2026-09-18',
      estYieldTons: 490,
      irrigationType: 'Sub-surface Drip',
      manager: 'David Chen',
    },
    {
      id: 'farm-4',
      name: 'Highland Vineyard',
      location: 'Sector 22 - West Slopes',
      crop: 'Grapes (Cabernet)',
      areaHa: 25.5,
      healthScore: 91,
      status: 'EXCELLENT',
      soilMoisture: '28%',
      plantingDate: '2026-03-15',
      estHarvestDate: '2026-10-25',
      estYieldTons: 350,
      irrigationType: 'Micro-Sprinklers',
      manager: 'Elena Rostova',
    },
  ]);

  // Form State for New Farm Modal
  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    crop: 'Corn (Maize)',
    areaHa: '',
    irrigationType: 'Drip Line Telemetry',
  });

  const filteredFarms = farms.filter((farm) => {
    const matchesSearch =
      farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || farm.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarm.name || !newFarm.areaHa) return;

    const created: Farm = {
      id: `farm-${Date.now()}`,
      name: newFarm.name,
      location: newFarm.location || 'Sector 01 - Custom Field',
      crop: newFarm.crop,
      areaHa: parseFloat(newFarm.areaHa),
      healthScore: 88,
      status: 'GOOD',
      soilMoisture: '32%',
      plantingDate: new Date().toISOString().split('T')[0],
      estHarvestDate: '2026-11-30',
      estYieldTons: Math.round(parseFloat(newFarm.areaHa) * 10),
      irrigationType: newFarm.irrigationType,
      manager: 'Alex Vance',
    };

    setFarms([created, ...farms]);
    setIsAddModalOpen(false);
    setNewFarm({
      name: '',
      location: '',
      crop: 'Corn (Maize)',
      areaHa: '',
      irrigationType: 'Drip Line Telemetry',
    });
  };

  const getStatusBadge = (status: Farm['status']) => {
    switch (status) {
      case 'EXCELLENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Health
          </span>
        );
      case 'GOOD':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Stable
          </span>
        );
      case 'ATTENTION_NEEDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> Action Needed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full uppercase tracking-wider">
              GIS Field Mapping
            </span>
            <span className="text-xs text-slate-400">4 Active Plots Configured</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Farms & Field <span className="text-emerald-400">Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor field boundaries, crop health scores, canopy density, and yield projections across all plots.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-semibold text-xs shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" /> Add New Field Plot
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e1b17] border border-emerald-900/30 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Managed Area</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">142.5 Ha</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12 Ha expanded this season
          </div>
        </div>

        <div className="bg-[#0e1b17] border border-emerald-900/30 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active Cultivars</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">4 Crops</div>
          <div className="text-[11px] text-slate-400 mt-1">Corn, Soybeans, Wheat, Grapes</div>
        </div>

        <div className="bg-[#0e1b17] border border-emerald-900/30 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Average Crop Health</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">83.7%</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-medium">High NDVI Canopy Index</div>
        </div>

        <div className="bg-[#0e1b17] border border-emerald-900/30 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Est. Total Harvest</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">1,840 MT</div>
          <div className="text-[11px] text-teal-300 mt-1 font-medium">Projected gross yield</div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0d1815] border border-emerald-900/30 p-4 rounded-2xl">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search farm name, location or crop type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#12221e] border border-emerald-900/40 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#12221e] border border-emerald-900/40 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Health Statuses</option>
              <option value="EXCELLENT">Optimal Health</option>
              <option value="GOOD">Stable</option>
              <option value="ATTENTION_NEEDED">Action Needed</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="bg-[#12221e] p-1 rounded-xl border border-emerald-900/40 flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* GIS Field Sector Interactive Map Component */}
      <div className="bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-900/30 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              GIS Satellite Canopy & Soil Heatmap
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live multispectral satellite layer & IoT soil probe distribution
            </p>
          </div>
          <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Sentinel-2 Imagery Active
          </span>
        </div>

        {/* Visual Simulated Satellite Sector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {farms.map((farm) => (
            <div
              key={farm.id}
              onClick={() => setSelectedFarmDetails(farm)}
              className="group cursor-pointer bg-[#080e0c] border border-emerald-900/30 hover:border-emerald-500/50 rounded-2xl p-4 transition-all hover:shadow-lg hover:shadow-emerald-950/60 relative overflow-hidden"
            >
              {/* Heatmap overlay representation */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 transition-opacity group-hover:opacity-40 pointer-events-none ${
                  farm.healthScore > 90
                    ? 'bg-emerald-400'
                    : farm.healthScore > 75
                    ? 'bg-teal-400'
                    : 'bg-amber-400'
                }`}
              />

              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {farm.location}
                </span>
                {getStatusBadge(farm.status)}
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                {farm.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" /> {farm.crop} • {farm.areaHa} Ha
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">NDVI Health Index:</span>
                  <span className="font-bold text-emerald-400">{farm.healthScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      farm.healthScore > 90
                        ? 'bg-emerald-400'
                        : farm.healthScore > 75
                        ? 'bg-teal-400'
                        : 'bg-amber-400'
                    }`}
                    style={{ width: `${farm.healthScore}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-900/20 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-cyan-400" /> {farm.soilMoisture} VWC
                </span>
                <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                  View Telemetry <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content View (Grid or Table) */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFarms.map((farm) => (
            <div
              key={farm.id}
              className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-6 shadow-xl space-y-5 flex flex-col justify-between hover:border-emerald-800/60 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      {farm.location}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{farm.name}</h3>
                  </div>
                  {getStatusBadge(farm.status)}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 bg-[#080e0c] p-3.5 rounded-2xl border border-emerald-900/30 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Crop</span>
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
                      <Sprout className="w-3.5 h-3.5 text-emerald-400" /> {farm.crop}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Field Area</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{farm.areaHa} Hectares</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Planting Date</span>
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" /> {farm.plantingDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Est. Harvest</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{farm.estHarvestDate}</span>
                  </div>
                </div>

                {/* Progress bar to harvest */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Growth & Harvest Cycle</span>
                    <span className="text-emerald-400 font-semibold">Stage 4: Maturation</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-3/4" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-900/30 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-400">Est. Yield: </span>
                  <span className="font-bold text-white">{farm.estYieldTons} Metric Tons</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedFarmDetails(farm)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#12221e] hover:bg-emerald-900/40 text-emerald-300 rounded-xl text-xs font-semibold border border-emerald-800/40 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#080e0c] text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-900/30">
                <tr>
                  <th className="px-6 py-4">Farm Plot Name</th>
                  <th className="px-6 py-4">Crop Cultivar</th>
                  <th className="px-6 py-4">Area (Ha)</th>
                  <th className="px-6 py-4">Health Score</th>
                  <th className="px-6 py-4">Soil Moisture</th>
                  <th className="px-6 py-4">Est. Harvest</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20">
                {filteredFarms.map((farm) => (
                  <tr key={farm.id} className="hover:bg-emerald-950/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">
                      <div>{farm.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{farm.location}</div>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-400" /> {farm.crop}
                    </td>
                    <td className="px-6 py-4 font-semibold">{farm.areaHa} Ha</td>
                    <td className="px-6 py-4">{getStatusBadge(farm.status)}</td>
                    <td className="px-6 py-4 text-cyan-300 font-medium">{farm.soilMoisture}</td>
                    <td className="px-6 py-4">{farm.estHarvestDate}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedFarmDetails(farm)}
                        className="px-3 py-1.5 bg-[#12221e] hover:bg-emerald-900/40 text-emerald-300 border border-emerald-800/40 rounded-xl font-medium"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add New Farm Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0e1b17] border border-emerald-800/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" /> Add New Field Plot
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-emerald-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFarm} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Field Plot Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. West Meadow Plot C"
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">GIS Sector / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Sector 18 - South Ridge"
                  value={newFarm.location}
                  onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Crop Cultivar</label>
                  <select
                    value={newFarm.crop}
                    onChange={(e) => setNewFarm({ ...newFarm, crop: e.target.value })}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Corn (Maize)">Corn (Maize)</option>
                    <option value="Soybeans">Soybeans</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Grapes (Cabernet)">Grapes</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Tomatoes">Tomatoes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Area (Hectares)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="e.g. 28.5"
                    value={newFarm.areaHa}
                    onChange={(e) => setNewFarm({ ...newFarm, areaHa: e.target.value })}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Irrigation Setup</label>
                <select
                  value={newFarm.irrigationType}
                  onChange={(e) => setNewFarm({ ...newFarm, irrigationType: e.target.value })}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Center Pivot Automated">Center Pivot Automated</option>
                  <option value="Drip Line Telemetry">Drip Line Telemetry</option>
                  <option value="Sub-surface Drip">Sub-surface Drip</option>
                  <option value="Micro-Sprinklers">Micro-Sprinklers</option>
                </select>
              </div>

              <div className="pt-3 border-t border-emerald-900/40 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-[#12221e] text-slate-300 rounded-xl font-medium hover:bg-emerald-950"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-md hover:from-emerald-500 hover:to-teal-500"
                >
                  Save Field Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Inspector Drawer / Modal */}
      {selectedFarmDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0e1b17] border border-emerald-800/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {selectedFarmDetails.location}
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1">{selectedFarmDetails.name}</h3>
              </div>
              <button
                onClick={() => setSelectedFarmDetails(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-emerald-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#080e0c] p-4 rounded-2xl border border-emerald-900/30">
                <div>
                  <span className="text-slate-400">Crop Cultivar:</span>
                  <p className="font-bold text-white mt-0.5">{selectedFarmDetails.crop}</p>
                </div>
                <div>
                  <span className="text-slate-400">Field Size:</span>
                  <p className="font-bold text-white mt-0.5">{selectedFarmDetails.areaHa} Ha</p>
                </div>
                <div>
                  <span className="text-slate-400">Manager:</span>
                  <p className="font-bold text-white mt-0.5">{selectedFarmDetails.manager}</p>
                </div>
                <div>
                  <span className="text-slate-400">Irrigation:</span>
                  <p className="font-bold text-white mt-0.5">{selectedFarmDetails.irrigationType}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">
                  Live Sensor Readings
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-[#12221e] rounded-xl border border-emerald-900/30">
                    <span className="text-slate-400 block text-[10px]">Health</span>
                    <span className="text-emerald-400 font-extrabold text-sm">{selectedFarmDetails.healthScore}%</span>
                  </div>
                  <div className="p-3 bg-[#12221e] rounded-xl border border-emerald-900/30">
                    <span className="text-slate-400 block text-[10px]">Moisture</span>
                    <span className="text-cyan-400 font-extrabold text-sm">{selectedFarmDetails.soilMoisture}</span>
                  </div>
                  <div className="p-3 bg-[#12221e] rounded-xl border border-emerald-900/30">
                    <span className="text-slate-400 block text-[10px]">Est. Yield</span>
                    <span className="text-amber-400 font-extrabold text-sm">{selectedFarmDetails.estYieldTons} MT</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/30 rounded-2xl text-slate-300">
                <span className="font-bold text-emerald-400 block mb-1">AI Agronomist Note:</span>
                Canopy coverage is optimal. Nitrogen level is within target range. Recommend scheduling next drip irrigation cycle for early morning.
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-900/40 flex justify-end">
              <button
                onClick={() => setSelectedFarmDetails(null)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
