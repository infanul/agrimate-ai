'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sprout,
  TestTube,
  Bot,
  TrendingUp,
  Calendar,
  DollarSign,
  Scan,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Cpu,
  CloudSun,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'AI Disease Scan',
      href: '/dashboard/diagnostics',
      icon: Scan,
      badge: '98.4% Acc',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      name: 'Crop Calendar',
      href: '/dashboard/calendar',
      icon: Calendar,
      badge: '5 Due',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      name: 'Finances & Profit',
      href: '/dashboard/finance',
      icon: DollarSign,
      badge: '+100.8% ROI',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    },
    {
      name: 'Farms & Crops',
      href: '/dashboard/farms',
      icon: Sprout,
      badge: '4 Farms',
    },
    {
      name: 'Soil & Moisture',
      href: '/dashboard/soil',
      icon: TestTube,
      badge: null,
    },
    {
      name: 'AI Advisor',
      href: '/dashboard/advisor',
      icon: Bot,
      badge: '3 Alerts',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    },
    {
      name: 'Market Intelligence',
      href: '/dashboard/market',
      icon: TrendingUp,
      badge: null,
    },
    {
      name: 'Weather & Climate',
      href: '/dashboard/weather',
      icon: CloudSun,
      badge: null,
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-20 bg-[#0a1210] border-r border-emerald-900/30 transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Navigation Links */}
      <div className="p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-400'
                }`}
              />

              {!collapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0e1b17] text-white text-xs rounded-lg shadow-xl border border-emerald-800/40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Collapse Toggle & System Health Footer */}
      <div className="p-3 border-t border-emerald-900/30 bg-[#080e0c]/60">
        {!collapsed && (
          <div className="mb-3 p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" /> AI Engine
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-400" /> IoT Sensors
              </span>
              <span className="text-slate-300 font-medium">12 Online</span>
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-emerald-400 bg-[#12221e]/60 hover:bg-emerald-950/40 border border-emerald-800/30 rounded-xl text-xs transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
