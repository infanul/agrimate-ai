'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Search,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Lock,
  Download,
  Building2,
  Calendar,
  X,
} from 'lucide-react';

interface Commodity {
  symbol: string;
  name: string;
  priceUSD: number;
  unit: string;
  changePct: number;
  high24h: number;
  low24h: number;
  trend: 'UP' | 'DOWN';
}

interface Contract {
  id: string;
  buyer: string;
  crop: string;
  quantityTons: number;
  agreedPricePerTon: number;
  deliveryDate: string;
  status: 'LOCKED' | 'PENDING_DELIVERY' | 'FULFILLED';
}

export default function MarketPage() {
  const [selectedCommoditySymbol, setSelectedCommoditySymbol] = useState('CORN');
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  const [commodities, setCommodities] = useState<Commodity[]>([
    {
      symbol: 'CORN',
      name: 'Corn Futures (CBOT)',
      priceUSD: 485.5,
      unit: 'Bushel',
      changePct: 2.4,
      high24h: 490.0,
      low24h: 472.0,
      trend: 'UP',
    },
    {
      symbol: 'SOY',
      name: 'Soybean Futures (CBOT)',
      priceUSD: 1240.2,
      unit: 'Metric Ton',
      changePct: 1.8,
      high24h: 1255.0,
      low24h: 1220.0,
      trend: 'UP',
    },
    {
      symbol: 'WHEAT',
      name: 'Wheat Chicago SRW',
      priceUSD: 612.0,
      unit: 'Bushel',
      changePct: -0.6,
      high24h: 620.0,
      low24h: 605.0,
      trend: 'DOWN',
    },
    {
      symbol: 'GRAPE',
      name: 'Cabernet Wine Grapes',
      priceUSD: 2100.0,
      unit: 'Metric Ton',
      changePct: 3.2,
      high24h: 2150.0,
      low24h: 2020.0,
      trend: 'UP',
    },
  ]);

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: 'CNT-2026-0801',
      buyer: 'Midwestern Grain Elevator',
      crop: 'Corn (Maize)',
      quantityTons: 200,
      agreedPricePerTon: 510,
      deliveryDate: '2026-10-15',
      status: 'LOCKED',
    },
    {
      id: 'CNT-2026-0802',
      buyer: 'Valley Agronomy Co-Op',
      crop: 'Soybeans',
      quantityTons: 120,
      agreedPricePerTon: 1260,
      deliveryDate: '2026-11-10',
      status: 'PENDING_DELIVERY',
    },
    {
      id: 'CNT-2026-0803',
      buyer: 'Pacific Grain Export Terminal',
      crop: 'Wheat',
      quantityTons: 150,
      agreedPricePerTon: 625,
      deliveryDate: '2026-09-25',
      status: 'LOCKED',
    },
  ]);

  const selectedCommodity =
    commodities.find((c) => c.symbol === selectedCommoditySymbol) || commodities[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full uppercase tracking-wider">
              CBOT & Global Exchanges
            </span>
            <span className="text-xs text-slate-400">Live Price Feed • Updated 1 min ago</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Market Intelligence & <span className="text-emerald-400">Price Index</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time grain futures, local elevator bids, forward harvest contracting & AI price predictions.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => setIsLockModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-semibold text-xs shadow-lg shadow-emerald-950 transition-all hover:scale-[1.02]"
          >
            <Lock className="w-4 h-4" /> Lock Futures Contract
          </button>
        </div>
      </div>

      {/* Commodity Ticker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {commodities.map((item) => {
          const isSelected = item.symbol === selectedCommoditySymbol;
          return (
            <div
              key={item.symbol}
              onClick={() => setSelectedCommoditySymbol(item.symbol)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border relative overflow-hidden ${
                isSelected
                  ? 'bg-[#0e1b17] border-emerald-500 shadow-lg shadow-emerald-950/80'
                  : 'bg-[#0a1210] border-emerald-900/30 hover:border-emerald-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{item.name}</span>
                {item.trend === 'UP' ? (
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-extrabold text-white">
                  ${item.priceUSD.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400 ml-1">/ {item.unit}</span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span
                  className={`font-semibold flex items-center gap-0.5 ${
                    item.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.changePct >= 0 ? '+' : ''}
                  {item.changePct}% 24h
                </span>
                <span className="text-slate-400 text-[10px]">Range: ${item.low24h} - ${item.high24h}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive 30-Day Price Trend & Local Elevator Bids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Chart SVG */}
        <div className="lg:col-span-2 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                30-Day Price Trend: {selectedCommodity.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Historical exchange prices & AI moving averages</p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              CBOT Live
            </span>
          </div>

          <div className="relative w-full h-56 bg-[#080e0c] rounded-2xl p-4 border border-emerald-900/30 flex flex-col justify-between">
            {/* Grid */}
            <div className="absolute inset-x-4 top-8 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-emerald-500 w-full" />
              <div className="border-b border-emerald-500 w-full" />
              <div className="border-b border-emerald-500 w-full" />
            </div>

            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 120 L 80 100 L 160 115 L 240 70 L 320 85 L 400 45 L 500 35 L 500 160 L 0 160 Z"
                fill="url(#marketGrad)"
              />
              <path
                d="M 0 120 L 80 100 L 160 115 L 240 70 L 320 85 L 400 45 L 500 35"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />
              <circle cx="240" cy="70" r="4" fill="#10b981" />
              <circle cx="400" cy="45" r="4" fill="#10b981" />
              <circle cx="500" cy="35" r="5" fill="#34d399" />
            </svg>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-emerald-900/20">
              <span>30 Days Ago</span>
              <span>15 Days Ago</span>
              <span className="text-emerald-400 font-bold">Today: ${selectedCommodity.priceUSD}</span>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/30 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-200">
                <strong>AI Forecast:</strong> Price expected to peak around <strong>+5.4%</strong> in 3 weeks due to export demand.
              </span>
            </div>
          </div>
        </div>

        {/* Local Elevator Bids Comparison */}
        <div className="bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl space-y-4 lg:col-span-1">
          <div className="border-b border-emerald-900/30 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" /> Local Elevator Cash Bids
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Net price after regional haulage</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-500/40 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span>Midwestern Grain Elevator</span>
                <span className="text-emerald-400">$510 / Ton</span>
              </div>
              <p className="text-[11px] text-slate-400">Distance: 18 km • Net Basis: +$24.50</p>
              <span className="inline-block mt-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                Highest Local Bid
              </span>
            </div>

            <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span>Valley Agronomy Co-Op</span>
                <span className="text-slate-200">$498 / Ton</span>
              </div>
              <p className="text-[11px] text-slate-400">Distance: 32 km • Net Basis: +$12.50</p>
            </div>

            <div className="p-3.5 bg-[#080e0c] rounded-2xl border border-emerald-900/30 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span>Pacific Grain Export Terminal</span>
                <span className="text-slate-200">$505 / Ton</span>
              </div>
              <p className="text-[11px] text-slate-400">Distance: 65 km • Net Basis: +$19.50</p>
            </div>
          </div>
        </div>
      </div>

      {/* Locked Forward Harvest Contracts Table */}
      <div className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-900/30 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" /> Active Forward Price Contracts
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Pre-harvest locked futures agreements</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#080e0c] text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-900/30">
              <tr>
                <th className="px-6 py-4">Contract Ref</th>
                <th className="px-6 py-4">Buyer Elevator</th>
                <th className="px-6 py-4">Crop</th>
                <th className="px-6 py-4">Quantity (MT)</th>
                <th className="px-6 py-4">Locked Price</th>
                <th className="px-6 py-4">Delivery Date</th>
                <th className="px-6 py-4">Contract Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/20">
              {contracts.map((cnt) => (
                <tr key={cnt.id} className="hover:bg-emerald-950/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-emerald-400 font-semibold">{cnt.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{cnt.buyer}</td>
                  <td className="px-6 py-4 text-slate-300">{cnt.crop}</td>
                  <td className="px-6 py-4 font-semibold">{cnt.quantityTons} MT</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">${cnt.agreedPricePerTon} / MT</td>
                  <td className="px-6 py-4 text-slate-400">{cnt.deliveryDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Locked
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lock Futures Modal */}
      {isLockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0e1b17] border border-emerald-800/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" /> Lock Futures Contract Price
              </h3>
              <button
                onClick={() => setIsLockModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-emerald-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLockModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Buyer Elevator</label>
                <select className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500">
                  <option>Midwestern Grain Elevator ($510/MT)</option>
                  <option>Valley Agronomy Co-Op ($498/MT)</option>
                  <option>Pacific Grain Export Terminal ($505/MT)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Harvest Crop</label>
                <select className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500">
                  <option>Corn (Maize)</option>
                  <option>Soybeans</option>
                  <option>Wheat</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Quantity (Metric Tons)</label>
                <input
                  type="number"
                  defaultValue={100}
                  className="w-full bg-[#12221e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 bg-emerald-950/30 border border-emerald-800/30 rounded-xl text-slate-300">
                Total Contract Value: <strong className="text-emerald-400">$51,000 USD</strong>
              </div>

              <div className="pt-3 border-t border-emerald-900/40 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLockModalOpen(false)}
                  className="px-4 py-2 bg-[#12221e] text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold"
                >
                  Lock Price Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
