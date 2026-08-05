'use client';

import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Plus,
  Printer,
  Download,
  Filter,
  Search,
  PieChart,
  BarChart3,
  Calendar,
  CheckCircle2,
  X,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { apiRequest } from '@/lib/api';

export interface FinancialTransaction {
  id: string;
  farmId: string;
  farmName: string;
  cropName: string;
  type: 'INCOME' | 'EXPENSE';
  category: 'SEEDS' | 'FERTILIZER' | 'IRRIGATION_WATER' | 'PEST_CONTROL' | 'EQUIPMENT_FUEL' | 'LABOR' | 'EQUIPMENT_RENTAL' | 'CROP_SALES' | 'GOVT_SUBSIDY' | 'OTHER';
  title: string;
  amountUSD: number;
  date: string;
  notes?: string;
  receiptRef?: string;
}

export default function FinancePage() {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([
    {
      id: 'tx-101',
      farmId: 'farm-1',
      farmName: 'Green Valley Plot A',
      cropName: 'Corn (Maize)',
      type: 'INCOME',
      category: 'CROP_SALES',
      title: 'Corn Batch #1 Early Grain Sale',
      amountUSD: 42500,
      date: '2026-08-01',
      notes: 'Sold 85 metric tons at $500/ton to Midwestern Grain Elevator.',
      receiptRef: 'REC-2026-0801',
    },
    {
      id: 'tx-102',
      farmId: 'farm-1',
      farmName: 'Green Valley Plot A',
      cropName: 'Corn (Maize)',
      type: 'EXPENSE',
      category: 'FERTILIZER',
      title: 'N-P-K Organic Fertilizer Bulk Purchase',
      amountUSD: 8400,
      date: '2026-07-28',
      notes: '12 Tons of custom nitrogen blend for Sector 1 & 2.',
      receiptRef: 'INV-AGRI-4091',
    },
    {
      id: 'tx-103',
      farmId: 'farm-2',
      farmName: 'Sunrise Orchard',
      cropName: 'Soybeans',
      type: 'EXPENSE',
      category: 'SEEDS',
      title: 'Certified Non-GMO Soybean Seeds',
      amountUSD: 6200,
      date: '2026-07-20',
      notes: 'High-germination seed bags for 32 hectares.',
      receiptRef: 'INV-SEED-8812',
    },
    {
      id: 'tx-104',
      farmId: 'farm-3',
      farmName: 'Riverbend Field',
      cropName: 'Wheat',
      type: 'EXPENSE',
      category: 'EQUIPMENT_FUEL',
      title: 'Tractor & Harvester Diesel Fuel',
      amountUSD: 3100,
      date: '2026-07-15',
      notes: '1,000 Gallons ultra-low sulfur agricultural diesel.',
      receiptRef: 'REC-FUEL-5011',
    },
    {
      id: 'tx-105',
      farmId: 'farm-4',
      farmName: 'Highland Vineyard',
      cropName: 'Grapes',
      type: 'EXPENSE',
      category: 'LABOR',
      title: 'Seasonal Pruning & Canopy Management',
      amountUSD: 4800,
      date: '2026-07-10',
      notes: 'Contracted 6 field technicians for 4 days.',
      receiptRef: 'REC-PAY-0941',
    },
    {
      id: 'tx-106',
      farmId: 'farm-1',
      farmName: 'Green Valley Plot A',
      cropName: 'Corn (Maize)',
      type: 'INCOME',
      category: 'GOVT_SUBSIDY',
      title: 'Sustainable Water Conservation Grant',
      amountUSD: 7500,
      date: '2026-06-30',
      notes: 'USDA smart drip irrigation technology rebate.',
      receiptRef: 'GOV-REF-3321',
    },
    {
      id: 'tx-107',
      farmId: 'farm-1',
      farmName: 'Green Valley Plot A',
      cropName: 'Corn (Maize)',
      type: 'EXPENSE',
      category: 'IRRIGATION_WATER',
      title: 'Seasonal Water Rights & Drip Maintenance',
      amountUSD: 2400,
      date: '2026-06-18',
      notes: 'Canal water access fee & solenoid valve replacement.',
      receiptRef: 'REC-[#WATER-901]',
    },
  ]);

  const [typeFilter, setTypeFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal Form State
  const [title, setTitle] = useState('');
  const [amountUSD, setAmountUSD] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [category, setCategory] = useState<FinancialTransaction['category']>('FERTILIZER');
  const [farmName, setFarmName] = useState('Green Valley Plot A');
  const [cropName, setCropName] = useState('Corn (Maize)');
  const [date, setDate] = useState('2026-08-05');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    setLoading(true);
    try {
      const res = await apiRequest('/finance/transactions');
      if (res?.success && Array.isArray(res.data)) {
        setTransactions(res.data);
      }
    } catch (e) {
      console.log('Using local financial transactions state.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amountUSD) return;

    const newTx: FinancialTransaction = {
      id: `tx-${Date.now()}`,
      farmId: 'farm-1',
      farmName,
      cropName,
      type,
      category,
      title,
      amountUSD: parseFloat(amountUSD),
      date,
      notes,
      receiptRef: `REC-${Date.now().toString().slice(-6)}`,
    };

    try {
      await apiRequest('/finance/transactions', {
        method: 'POST',
        body: JSON.stringify(newTx),
      });
    } catch (e) {
      // Local fallback
    }

    setTransactions((prev) => [newTx, ...prev]);
    setShowModal(false);
    resetForm();
  };

  const handleDeleteTransaction = async (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const resetForm = () => {
    setTitle('');
    setAmountUSD('');
    setNotes('');
    setDate('2026-08-05');
  };

  // Aggregates
  const totalRevenue = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amountUSD, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amountUSD, 0);

  const netProfit = totalRevenue - totalExpenses;
  const netMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0.0';
  const roi = totalExpenses > 0 ? (((totalRevenue - totalExpenses) / totalExpenses) * 100).toFixed(1) : '0.0';

  const filteredTransactions = transactions.filter((t) => {
    if (typeFilter !== 'ALL' && t.type !== typeFilter) return false;
    if (
      searchTerm &&
      !t.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !t.cropName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !t.farmName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const categoryColor = (cat: FinancialTransaction['category']) => {
    switch (cat) {
      case 'CROP_SALES':
        return 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40';
      case 'GOVT_SUBSIDY':
        return 'bg-teal-950/50 text-teal-300 border-teal-800/40';
      case 'FERTILIZER':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30';
      case 'SEEDS':
        return 'bg-amber-950/40 text-amber-300 border-amber-800/30';
      case 'LABOR':
        return 'bg-sky-950/40 text-sky-300 border-sky-800/30';
      case 'EQUIPMENT_FUEL':
        return 'bg-indigo-950/40 text-indigo-300 border-indigo-800/30';
      case 'IRRIGATION_WATER':
        return 'bg-cyan-950/40 text-cyan-300 border-cyan-800/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Financial & Profit Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Expense & Profit Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor crop input costs, harvest revenues, ROI per hectare, and export formal financial P&L reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPdfPreview(true)}
            className="px-3.5 py-2.5 bg-[#142621] hover:bg-emerald-900/40 text-emerald-300 border border-emerald-800/40 rounded-xl text-xs flex items-center gap-2 font-semibold transition-all"
          >
            <Printer className="w-4 h-4 text-emerald-400" /> Export PDF Statement
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Log Transaction
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Revenue */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Gross Harvest Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+28.4% vs Previous Season</span>
            </div>
          </div>
        </div>

        {/* Card 2: Operating Expenses */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Operating Expenses</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">${totalExpenses.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
              <span>Seeds, Fertilizer, Fuel & Labor</span>
            </div>
          </div>
        </div>

        {/* Card 3: Net Operating Profit */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Net Operating Profit</span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-400">${netProfit.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 text-xs text-teal-400 mt-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{netMargin}% Net Margin</span>
            </div>
          </div>
        </div>

        {/* Card 4: ROI per Hectare */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Projected ROI</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">+{roi}%</div>
            <div className="flex items-center gap-1.5 text-xs text-sky-400 mt-1 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>$176 Net Profit / Hectare</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Comparison Graph */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-emerald-900/40">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Revenue vs Expenses Trend</h3>
              <p className="text-xs text-slate-400">Comparative financial breakdown for current 2026 season</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-slate-300">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500" />
                <span className="text-slate-300">Expenses</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-emerald-900/40">
            {[
              { month: 'Apr', rev: 35, exp: 25 },
              { month: 'May', rev: 45, exp: 30 },
              { month: 'Jun', rev: 60, exp: 40 },
              { month: 'Jul', rev: 75, exp: 50 },
              { month: 'Aug', rev: 100, exp: 58 },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div
                    className="w-1/2 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${bar.rev}%` }}
                    title={`Revenue: ${bar.rev}%`}
                  />
                  <div
                    className="w-1/2 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${bar.exp}%` }}
                    title={`Expenses: ${bar.exp}%`}
                  />
                </div>
                <span className="text-xs font-bold text-slate-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Expense Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/40">
          <h3 className="text-base font-bold text-white mb-1">Expense Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Breakdown of operational farm input costs</p>

          <div className="space-y-3.5">
            {[
              { cat: 'Fertilizers & Soil Blends', amount: '$8,400', pct: 33.7, color: 'bg-emerald-400' },
              { cat: 'Seeds & Hybrids', amount: '$6,200', pct: 24.9, color: 'bg-teal-400' },
              { cat: 'Labor & Technicians', amount: '$4,800', pct: 19.3, color: 'bg-amber-400' },
              { cat: 'Tractor Fuel & Diesel', amount: '$3,100', pct: 12.4, color: 'bg-sky-400' },
              { cat: 'Irrigation & Water', amount: '$2,400', pct: 9.7, color: 'bg-indigo-400' },
            ].map((item) => (
              <div key={item.cat} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.cat}</span>
                  <span className="font-bold text-white">{item.amount} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Financial Transaction Ledger</h3>
            <p className="text-xs text-slate-400">Detailed records of income sales and operational expenses</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111e1b] border border-emerald-900/50 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex bg-[#12221e] p-1 rounded-xl border border-emerald-800/30 text-xs">
              <button
                onClick={() => setTypeFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  typeFilter === 'ALL' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTypeFilter('INCOME')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  typeFilter === 'INCOME' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setTypeFilter('EXPENSE')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  typeFilter === 'EXPENSE' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                Expense
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0b1512] text-slate-400 font-bold border-b border-emerald-900/40 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Title & Details</th>
                <th className="p-3">Category</th>
                <th className="p-3">Farm Sector</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-right">Amount ($)</th>
                <th className="p-3 text-right">Receipt Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-emerald-950/30 transition-colors">
                  <td className="p-3 font-semibold text-slate-400">{tx.date}</td>
                  <td className="p-3">
                    <div className="font-bold text-white">{tx.title}</div>
                    {tx.notes && <div className="text-[11px] text-slate-500 truncate max-w-xs">{tx.notes}</div>}
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${categoryColor(tx.category)}`}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">📍 {tx.farmName} ({tx.cropName})</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        tx.type === 'INCOME' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className={`p-3 text-right font-extrabold ${tx.type === 'INCOME' ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}${tx.amountUSD.toLocaleString()}
                  </td>
                  <td className="p-3 text-right text-slate-500 font-mono text-[11px]">{tx.receiptRef}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1613] border border-emerald-800/50 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button onClick={() => setShowModal(false)} className="absolute right-5 top-5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Log Financial Transaction</h3>
            <p className="text-xs text-slate-400 mb-5">Record a crop revenue sale or farm input expense.</p>

            <form onSubmit={handleCreateTransaction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Transaction Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="EXPENSE">🔴 Operational Expense</option>
                    <option value="INCOME">🟢 Harvest Income / Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="FERTILIZER">Fertilizers & NPK</option>
                    <option value="SEEDS">Seeds & Hybrids</option>
                    <option value="LABOR">Labor & Field Technicians</option>
                    <option value="EQUIPMENT_FUEL">Tractor Fuel & Diesel</option>
                    <option value="IRRIGATION_WATER">Irrigation & Water Rights</option>
                    <option value="CROP_SALES">Crop Sales</option>
                    <option value="GOVT_SUBSIDY">Govt Subsidy / Grant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title / Description</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bulk Nitrogen Fertilizer Purchase"
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amountUSD}
                    onChange={(e) => setAmountUSD(e.target.value)}
                    placeholder="8400.00"
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Transaction Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes / Vendor Receipt</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Invoice references, quantity, vendor..."
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 mt-4"
              >
                Record Financial Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Printable PDF Financial Statement Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 w-full max-w-3xl rounded-3xl p-8 shadow-2xl relative my-8">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">AgriMate AI • Statement of Profit & Loss</h2>
                <p className="text-xs text-slate-500">Official Financial Audit Report • August 2026</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" /> Print / Save PDF
                </button>
                <button onClick={() => setShowPdfPreview(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* P&L Statement Grid */}
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Gross Revenue</span>
                  <span className="text-lg font-extrabold text-emerald-600">${totalRevenue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Operating Costs</span>
                  <span className="text-lg font-extrabold text-rose-600">${totalExpenses.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Net Profit</span>
                  <span className="text-lg font-extrabold text-slate-900">${netProfit.toLocaleString()} ({netMargin}%)</span>
                </div>
              </div>

              {/* Itemized Table */}
              <div>
                <h4 className="font-bold text-sm text-slate-800 mb-2">Itemized Revenue & Cost Ledger</h4>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-slate-100 text-[10px] uppercase text-slate-600 font-bold">
                      <th className="p-2">Date</th>
                      <th className="p-2">Transaction Description</th>
                      <th className="p-2">Category</th>
                      <th className="p-2 text-right">Amount ($)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-700">
                    {transactions.map((t) => (
                      <tr key={t.id}>
                        <td className="p-2 font-mono text-[11px]">{t.date}</td>
                        <td className="p-2 font-semibold">{t.title}</td>
                        <td className="p-2 text-[11px]">{t.category}</td>
                        <td className={`p-2 text-right font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {t.type === 'INCOME' ? '+' : '-'}${t.amountUSD.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature block */}
              <div className="pt-6 border-t flex justify-between items-end text-[11px] text-slate-500">
                <div>
                  <p>Certified by: <strong>AgriMate AI Financial Controller</strong></p>
                  <p>Date Generated: August 5, 2026</p>
                </div>
                <div className="text-right">
                  <div className="w-32 border-b border-slate-400 mb-1" />
                  <p>Authorized Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
