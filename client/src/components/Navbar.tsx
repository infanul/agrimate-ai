'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {
  Sprout,
  Search,
  Bell,
  Sun,
  ChevronDown,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Menu,
} from 'lucide-react';
import { getStoredUser, removeToken, User } from '@/lib/api';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState('Green Valley Plot A');

  useEffect(() => {
    const loadedUser = getStoredUser();
    if (loadedUser) {
      setUser(loadedUser);
    } else {
      // Fallback demo user details if not yet logged in
      setUser({
        id: 'demo-user',
        fullName: 'Alex Vance',
        email: 'alex.vance@agrimate.ai',
        role: 'FARMER',
        location: 'California Delta',
      });
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#0c1613]/90 backdrop-blur-md border-b border-emerald-900/30 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Brand */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-emerald-950/40 md:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#080e0c] rounded-[10px] flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              AgriMate <span className="text-emerald-400 font-extrabold">AI</span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">PRO</span>
            </span>
          </div>
        </Link>

        {/* Farm Selector Dropdown */}
        <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-emerald-900/40">
          <span className="text-xs text-slate-400 mr-2">Active Farm:</span>
          <select
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
            className="bg-[#12221e] border border-emerald-800/40 text-emerald-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-medium"
          >
            <option value="Green Valley Plot A">🌾 Green Valley Plot A (45 Ha)</option>
            <option value="Sunrise Orchard">🍎 Sunrise Orchard (32 Ha)</option>
            <option value="Riverbend Field">🌽 Riverbend Field (40 Ha)</option>
            <option value="Highland Vineyard">🍇 Highland Vineyard (25.5 Ha)</option>
          </select>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Ask AI or search crops, soil metrics, pest alerts..."
            className="w-full bg-[#111e1b] border border-emerald-900/40 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
        </div>
      </div>

      {/* Right: Weather Pill, Notifications & User Menu */}
      <div className="flex items-center gap-3">
        {/* Weather Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-950/30 border border-emerald-800/30 rounded-full text-xs text-slate-300">
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span className="font-semibold text-slate-200">24°C</span>
          <span className="text-slate-400">Sunny • 65% Humidity</span>
        </div>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-300 hover:text-emerald-400 bg-[#12221e] hover:bg-emerald-900/30 border border-emerald-800/30 rounded-xl relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0d1815] border border-emerald-800/50 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-3 border-b border-emerald-900/40 pb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Notifications</h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/30 rounded-xl text-xs">
                  <div className="font-medium text-emerald-300">Fertilizer Alert</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Nitrogen deficiency detected in Sector 3.</div>
                  <div className="text-[10px] text-slate-500 mt-1">10 mins ago</div>
                </div>
                <div className="p-2.5 bg-amber-950/20 border border-amber-800/30 rounded-xl text-xs">
                  <div className="font-medium text-amber-300">Weather Forecast Update</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Light rain expected tomorrow morning.</div>
                  <div className="text-[10px] text-slate-500 mt-1">2 hours ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 bg-[#12221e] hover:bg-emerald-900/30 border border-emerald-800/30 rounded-xl transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="hidden md:block text-xs font-medium text-slate-200">
              {user?.fullName || 'Farmer Alex'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#0d1815] border border-emerald-800/50 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-2.5 border-b border-emerald-900/40 mb-1">
                <p className="text-xs font-semibold text-white">{user?.fullName || 'Alex Vance'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || 'alex@agrimate.ai'}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> {user?.role || 'FARMER'}
                </span>
              </div>
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-emerald-900/30 hover:text-emerald-300 rounded-lg flex items-center gap-2 transition-colors"
              >
                <UserIcon className="w-4 h-4" /> Farm Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg flex items-center gap-2 transition-colors mt-1"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
