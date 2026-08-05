'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sprout,
  Bot,
  TestTube,
  TrendingUp,
  CloudSun,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  Globe2,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080e0c] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080e0c]/80 backdrop-blur-xl border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#080e0c] rounded-[14px] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              AgriMate <span className="text-emerald-400">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#analytics" className="hover:text-emerald-400 transition-colors">AI Analytics</a>
            <a href="#impact" className="hover:text-emerald-400 transition-colors">Impact</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-emerald-950/40 rounded-xl border border-transparent hover:border-emerald-800/40 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all flex items-center gap-2"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Glow Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-xs font-semibold mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Next-Gen Autonomous Precision Farming</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
            Transform Your Farm Yield with <span className="gradient-text">Generative AI Intelligence</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
            AgriMate AI integrates soil NPK sensors, hyper-local climate models, and computer vision diagnostics to deliver real-time actionable recommendations for modern growers.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 group"
            >
              Launch Live Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-300 hover:text-white bg-[#101d19] hover:bg-[#162722] border border-emerald-800/40 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              Request AI Demo
            </Link>
          </div>

          {/* Interactive Feature Card Preview */}
          <div className="mt-16 max-w-5xl mx-auto glass-panel rounded-3xl p-4 sm:p-6 border border-emerald-500/20 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">AgriMate AI Engine • Active Telemetry</span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 bg-emerald-950/60 rounded-lg border border-emerald-800/40">
                Live Sensor Sync
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-[#0d1714] border border-emerald-900/40 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium">Soil Nitrogen (N)</span>
                  <span className="text-xs text-emerald-400 font-bold">+12% Optimal</span>
                </div>
                <div className="text-2xl font-bold text-white">48 mg/kg</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[78%]" />
                </div>
              </div>

              <div className="p-4 bg-[#0d1714] border border-emerald-900/40 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium">Crop Health Score</span>
                  <span className="text-xs text-teal-400 font-bold">94/100</span>
                </div>
                <div className="text-2xl font-bold text-white">Corn Sector 4</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-teal-400 h-full w-[94%]" />
                </div>
              </div>

              <div className="p-4 bg-[#0d1714] border border-emerald-900/40 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium">Next Irrigation</span>
                  <span className="text-xs text-amber-400 font-bold">In 14 Hours</span>
                </div>
                <div className="text-2xl font-bold text-white">45 Mins Drip</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-amber-400 h-full w-[40%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-[#060b09] border-t border-emerald-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold text-emerald-400 tracking-widest">Built For Future Farming</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
              Complete Agricultural Intelligence Suite
            </p>
            <p className="mt-4 text-slate-400 text-base">
              Everything you need to boost crop yields, optimize resource usage, and maximize profitability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Agronomist Chat</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant generative pest identification, disease diagnosis, and customized crop treatment plans.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform">
                <TestTube className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real-Time Soil Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Continuous telemetry monitoring for pH levels, nitrogen, phosphorus, potassium, and soil moisture.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                <CloudSun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Smart Irrigation AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hyper-local rain forecasting and automatic drip schedule calculations to eliminate water waste.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Market Price Forecasts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time regional commodity market tracking and predictive optimal harvest timing windows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="py-20 border-t border-emerald-900/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#0d1714] border border-emerald-900/40 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">98.4%</div>
              <div className="text-xs text-slate-400 font-medium mt-2">Pest Diagnostic Accuracy</div>
            </div>
            <div className="p-6 bg-[#0d1714] border border-emerald-900/40 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">35%</div>
              <div className="text-xs text-slate-400 font-medium mt-2">Water Consumption Saved</div>
            </div>
            <div className="p-6 bg-[#0d1714] border border-emerald-900/40 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">+28%</div>
              <div className="text-xs text-slate-400 font-medium mt-2">Average Crop Yield Boost</div>
            </div>
            <div className="p-6 bg-[#0d1714] border border-emerald-900/40 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-400">10,000+</div>
              <div className="text-xs text-slate-400 font-medium mt-2">Active Hectares Monitored</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#040806] border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-sm">AgriMate AI</span>
            <span className="text-xs text-slate-500">© 2026 AgriMate Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-emerald-400">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400">Documentation</a>
            <a href="#" className="hover:text-emerald-400">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
