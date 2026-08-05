'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sprout,
  Droplets,
  TestTube,
  Bug,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trash2,
  X,
  Bell,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { apiRequest } from '@/lib/api';

export interface CalendarEvent {
  id: string;
  farmId: string;
  farmName: string;
  cropName: string;
  stage: 'PLANNING' | 'SOIL_PREPARATION' | 'SOWING' | 'IRRIGATION' | 'FERTILIZATION' | 'PEST_MANAGEMENT' | 'HARVESTING';
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isReminderSet: boolean;
  reminderDate?: string;
}

export default function CropCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 'evt-1',
      farmId: 'farm-1',
      farmName: 'Green Valley Plot A',
      cropName: 'Corn (Maize)',
      stage: 'SOIL_PREPARATION',
      title: 'Soil Aeration & Deep Tillage',
      description: 'Prepare 45 hectares in Sector 1 & 2 for upcoming spring corn sowing.',
      startDate: '2026-08-01',
      endDate: '2026-08-04',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      isReminderSet: true,
    },
    {
      id: 'evt-2',
      farmId: 'farm-1',
      farmName: 'Green Valley Plot A',
      cropName: 'Corn (Maize)',
      stage: 'SOWING',
      title: 'Precision Seed Sowing',
      description: 'Sow high-yield hybrid seed batch #C-804 at 75,000 seeds/ha depth.',
      startDate: '2026-08-05',
      endDate: '2026-08-08',
      status: 'IN_PROGRESS',
      priority: 'CRITICAL',
      isReminderSet: true,
    },
    {
      id: 'evt-3',
      farmId: 'farm-3',
      farmName: 'Riverbend Field',
      cropName: 'Wheat',
      stage: 'FERTILIZATION',
      title: 'Nitrogen Booster Spray (N-20)',
      description: 'Address Sector 3 nitrogen deficiency flagged by AI soil sensors.',
      startDate: '2026-08-06',
      endDate: '2026-08-07',
      status: 'SCHEDULED',
      priority: 'HIGH',
      isReminderSet: true,
    },
    {
      id: 'evt-4',
      farmId: 'farm-2',
      farmName: 'Sunrise Orchard',
      cropName: 'Soybeans',
      stage: 'PEST_MANAGEMENT',
      title: 'Fungicide Foliar Inspection',
      description: 'Inspect southern edge for early blight symptoms due to recent morning humidity.',
      startDate: '2026-08-10',
      endDate: '2026-08-11',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      isReminderSet: true,
    },
    {
      id: 'evt-5',
      farmId: 'farm-1',
      farmName: 'Green Valley Plot A',
      cropName: 'Corn (Maize)',
      stage: 'IRRIGATION',
      title: 'Automated Drip Cycle #1',
      description: 'Run 45-minute root hydration drip cycle before midday sun.',
      startDate: '2026-08-12',
      endDate: '2026-08-12',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      isReminderSet: true,
    },
    {
      id: 'evt-6',
      farmId: 'farm-4',
      farmName: 'Highland Vineyard',
      cropName: 'Grapes',
      stage: 'HARVESTING',
      title: 'Pre-Harvest Sugar Brix Testing',
      description: 'Measure refractometer sucrose levels across vineyard blocks A & B.',
      startDate: '2026-08-20',
      endDate: '2026-08-22',
      status: 'SCHEDULED',
      priority: 'HIGH',
      isReminderSet: true,
    },
  ]);

  const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month');
  const [selectedFarmFilter, setSelectedFarmFilter] = useState('ALL');
  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [farmName, setFarmName] = useState('Green Valley Plot A');
  const [cropName, setCropName] = useState('Corn (Maize)');
  const [stage, setStage] = useState<CalendarEvent['stage']>('SOWING');
  const [priority, setPriority] = useState<CalendarEvent['priority']>('HIGH');
  const [startDate, setStartDate] = useState('2026-08-15');
  const [endDate, setEndDate] = useState('2026-08-17');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await apiRequest('/calendar/events');
      if (res?.success && Array.isArray(res.data)) {
        setEvents(res.data);
      }
    } catch (e) {
      console.log('Loaded local calendar state.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate) return;

    const newEvt: CalendarEvent = {
      id: `evt-${Date.now()}`,
      farmId: 'farm-1',
      farmName,
      cropName,
      stage,
      title,
      description,
      startDate,
      endDate: endDate || startDate,
      status: 'SCHEDULED',
      priority,
      isReminderSet: true,
    };

    try {
      await apiRequest('/calendar/events', {
        method: 'POST',
        body: JSON.stringify(newEvt),
      });
    } catch (err) {
      // Local fallback
    }

    setEvents((prev) => [...prev, newEvt]);
    setShowModal(false);
    resetForm();
  };

  const handleApplyTemplate = async () => {
    try {
      const res = await apiRequest('/calendar/events', {
        method: 'POST',
        body: JSON.stringify({ template: 'CORN_120' }),
      });
      if (res?.success && res.data) {
        setEvents((prev) => [...prev, ...res.data]);
      }
    } catch (e) {
      // Local template fallback
      const generated: CalendarEvent[] = [
        {
          id: `evt-${Date.now()}-1`,
          farmId: 'farm-1',
          farmName: 'Green Valley Plot A',
          cropName: 'Corn (Maize)',
          stage: 'SOIL_PREPARATION',
          title: 'Organic Soil Compost Application',
          description: 'Enrich soil microbial density before main sowing.',
          startDate: '2026-08-15',
          endDate: '2026-08-17',
          status: 'SCHEDULED',
          priority: 'MEDIUM',
          isReminderSet: true,
        },
        {
          id: `evt-${Date.now()}-2`,
          farmId: 'farm-1',
          farmName: 'Green Valley Plot A',
          cropName: 'Corn (Maize)',
          stage: 'HARVESTING',
          title: 'Combine Harvester Operations',
          description: 'Begin main corn harvest.',
          startDate: '2026-08-28',
          endDate: '2026-08-30',
          status: 'SCHEDULED',
          priority: 'CRITICAL',
          isReminderSet: true,
        },
      ];
      setEvents((prev) => [...prev, ...generated]);
    }
  };

  const toggleEventStatus = (id: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === id) {
          const nextStatus = evt.status === 'COMPLETED' ? 'SCHEDULED' : 'COMPLETED';
          return { ...evt, status: nextStatus };
        }
        return evt;
      })
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate('2026-08-15');
    setEndDate('2026-08-17');
  };

  // Filter events
  const filteredEvents = events.filter((evt) => {
    if (selectedFarmFilter !== 'ALL' && evt.farmName !== selectedFarmFilter) return false;
    if (selectedStageFilter !== 'ALL' && evt.stage !== selectedStageFilter) return false;
    return true;
  });

  const stageBadgeColor = (stg: CalendarEvent['stage']) => {
    switch (stg) {
      case 'SOIL_PREPARATION':
        return 'bg-amber-950/40 text-amber-300 border-amber-800/40';
      case 'SOWING':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40';
      case 'IRRIGATION':
        return 'bg-sky-950/40 text-sky-300 border-sky-800/40';
      case 'FERTILIZATION':
        return 'bg-teal-950/40 text-teal-300 border-teal-800/40';
      case 'PEST_MANAGEMENT':
        return 'bg-rose-950/40 text-rose-300 border-rose-800/40';
      case 'HARVESTING':
        return 'bg-purple-950/40 text-purple-300 border-purple-800/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Days in August 2026 (August 1, 2026 is a Saturday)
  const augustDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const leadingBlankDays = Array.from({ length: 6 }, (_, i) => i); // Sat is 6th index (Sun=0)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Seasonal Crop Planner
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Crop Calendar & Reminders
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Schedule sowing, fertilization, irrigation, and harvest milestones across your farm sectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleApplyTemplate}
            className="px-3.5 py-2.5 bg-[#142621] hover:bg-emerald-900/40 text-emerald-300 border border-emerald-800/40 rounded-xl text-xs flex items-center gap-2 font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" /> 1-Click Corn Cycle Template
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Crop Task
          </button>
        </div>
      </div>

      {/* Seasonal Growth Stages Timeline */}
      <div className="glass-panel p-5 rounded-3xl border border-emerald-900/40">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Standard Crop Growth Lifecycle
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          <div className="p-2.5 bg-amber-950/30 border border-amber-800/40 rounded-xl text-center">
            <span className="text-[10px] text-amber-400 font-bold block">Stage 1</span>
            <span className="text-xs font-semibold text-slate-200">Soil Prep</span>
          </div>
          <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-center shadow-lg shadow-emerald-950/50">
            <span className="text-[10px] text-emerald-400 font-bold block">Stage 2 (Active)</span>
            <span className="text-xs font-semibold text-emerald-300">Sowing</span>
          </div>
          <div className="p-2.5 bg-sky-950/30 border border-sky-800/40 rounded-xl text-center">
            <span className="text-[10px] text-sky-400 font-bold block">Stage 3</span>
            <span className="text-xs font-semibold text-slate-200">Irrigation</span>
          </div>
          <div className="p-2.5 bg-teal-950/30 border border-teal-800/40 rounded-xl text-center">
            <span className="text-[10px] text-teal-400 font-bold block">Stage 4</span>
            <span className="text-xs font-semibold text-slate-200">Fertilization</span>
          </div>
          <div className="p-2.5 bg-rose-950/30 border border-rose-800/40 rounded-xl text-center">
            <span className="text-[10px] text-rose-400 font-bold block">Stage 5</span>
            <span className="text-xs font-semibold text-slate-200">Pest Control</span>
          </div>
          <div className="p-2.5 bg-purple-950/30 border border-purple-800/40 rounded-xl text-center">
            <span className="text-[10px] text-purple-400 font-bold block">Stage 6</span>
            <span className="text-xs font-semibold text-slate-200">Harvesting</span>
          </div>
        </div>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0c1613] p-4 rounded-2xl border border-emerald-900/30">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* View Switcher */}
          <div className="flex bg-[#12221e] p-1 rounded-xl border border-emerald-800/30">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'month'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Month View
            </button>
            <button
              onClick={() => setViewMode('agenda')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'agenda'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Agenda List
            </button>
          </div>

          {/* Month Indicator */}
          <div className="text-sm font-bold text-white flex items-center gap-2 pl-2 border-l border-emerald-900/40">
            <span>August 2026</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={selectedFarmFilter}
            onChange={(e) => setSelectedFarmFilter(e.target.value)}
            className="bg-[#12221e] border border-emerald-800/40 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Farm Sectors</option>
            <option value="Green Valley Plot A">Green Valley Plot A</option>
            <option value="Sunrise Orchard">Sunrise Orchard</option>
            <option value="Riverbend Field">Riverbend Field</option>
            <option value="Highland Vineyard">Highland Vineyard</option>
          </select>

          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="bg-[#12221e] border border-emerald-800/40 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Growth Stages</option>
            <option value="SOIL_PREPARATION">Soil Prep</option>
            <option value="SOWING">Sowing</option>
            <option value="IRRIGATION">Irrigation</option>
            <option value="FERTILIZATION">Fertilization</option>
            <option value="PEST_MANAGEMENT">Pest Control</option>
            <option value="HARVESTING">Harvesting</option>
          </select>
        </div>
      </div>

      {/* Content Layout: Calendar Grid / Agenda + Reminders Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Calendar Grid */}
        <div className="lg:col-span-2 space-y-6">
          {viewMode === 'month' ? (
            <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-emerald-900/40">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2 border-b border-emerald-900/40 pb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {/* Leading Empty Cells */}
                {leadingBlankDays.map((blank) => (
                  <div key={`blank-${blank}`} className="h-24 bg-[#0a1210]/40 rounded-xl p-1.5 text-slate-700 text-xs font-medium opacity-30" />
                ))}

                {/* August Days */}
                {augustDays.map((dayNum) => {
                  const dayStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                  const dayEvents = filteredEvents.filter(
                    (e) => e.startDate <= dayStr && e.endDate >= dayStr
                  );

                  const isToday = dayNum === 5;

                  return (
                    <div
                      key={`day-${dayNum}`}
                      className={`h-24 p-1.5 rounded-xl border flex flex-col justify-between transition-all ${
                        isToday
                          ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950'
                          : 'bg-[#0b1512] border-emerald-950 hover:border-emerald-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isToday ? 'text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-md' : 'text-slate-300'
                          }`}
                        >
                          {dayNum}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>

                      {/* Event Badges */}
                      <div className="space-y-1 overflow-y-auto max-h-16">
                        {dayEvents.map((evt) => (
                          <div
                            key={evt.id}
                            className={`p-1 rounded text-[9px] font-bold border truncate cursor-pointer ${stageBadgeColor(
                              evt.stage
                            )}`}
                            title={`${evt.title} (${evt.cropName})`}
                          >
                            {evt.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Agenda List View */
            <div className="glass-panel p-6 rounded-3xl border border-emerald-900/40 space-y-3">
              <h3 className="text-base font-bold text-white mb-4">Crop Activity Schedule</h3>
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 bg-[#0b1512] border border-emerald-900/40 rounded-2xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleEventStatus(evt.id)}
                      className={`mt-0.5 p-1 rounded-lg border transition-colors ${
                        evt.status === 'COMPLETED'
                          ? 'bg-emerald-500 text-white border-emerald-400'
                          : 'border-slate-600 text-transparent hover:border-emerald-400'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border ${stageBadgeColor(
                            evt.stage
                          )}`}
                        >
                          {evt.stage}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">📍 {evt.farmName}</span>
                      </div>
                      <h4 className={`text-sm font-bold ${evt.status === 'COMPLETED' ? 'line-through text-slate-500' : 'text-white'}`}>
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{evt.description}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold text-emerald-400 block">{evt.startDate}</span>
                    <span className="text-[10px] text-slate-500 font-medium uppercase">Priority: {evt.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Upcoming Reminders */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Upcoming Tasks & Reminders</h3>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                {filteredEvents.filter((e) => e.status !== 'COMPLETED').length} Due
              </span>
            </div>

            <div className="space-y-3">
              {filteredEvents
                .filter((e) => e.status !== 'COMPLETED')
                .map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3.5 bg-[#0b1512] border border-emerald-900/40 rounded-2xl hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white truncate">{evt.title}</span>
                      <button
                        onClick={() => toggleEventStatus(evt.id)}
                        className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 px-2 py-0.5 bg-emerald-950/60 rounded border border-emerald-800/40"
                      >
                        Done
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
                      <span>🌾 {evt.cropName}</span>
                      <span className="font-semibold text-emerald-400">{evt.startDate}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1613] border border-emerald-800/50 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Add Crop Task</h3>
            <p className="text-xs text-slate-400 mb-5">Schedule a new sowing, fertilization, or harvest activity.</p>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sowing Hybrid Corn Batch #3"
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Farm Sector</label>
                  <select
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Green Valley Plot A">Green Valley Plot A</option>
                    <option value="Sunrise Orchard">Sunrise Orchard</option>
                    <option value="Riverbend Field">Riverbend Field</option>
                    <option value="Highland Vineyard">Highland Vineyard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Growth Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="SOIL_PREPARATION">Soil Prep</option>
                    <option value="SOWING">Sowing</option>
                    <option value="IRRIGATION">Irrigation</option>
                    <option value="FERTILIZATION">Fertilization</option>
                    <option value="PEST_MANAGEMENT">Pest Control</option>
                    <option value="HARVESTING">Harvesting</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="LOW font-semibold">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Notes, seed depth, fertilizer formula..."
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 mt-4"
              >
                Save Task to Calendar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
