'use client';

import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  AlertTriangle,
  CheckCircle2,
  Check,
  Plus,
  SlidersHorizontal,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  RefreshCw,
  Zap,
  Info,
  Clock,
} from 'lucide-react';

interface Advisory {
  id: string;
  title: string;
  category: 'FERTILIZATION' | 'IRRIGATION' | 'PEST_CONTROL' | 'HARVEST_TIMING';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendation: string;
  farmName: string;
  createdAt: string;
  confidencePct: number;
  status: 'PENDING' | 'APPLIED';
}

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
  actions?: string[];
}

export default function AdvisorPage() {
  const [advisories, setAdvisories] = useState<Advisory[]>([
    {
      id: 'adv-101',
      title: 'Nitrogen Depletion Detected in Sector 3',
      category: 'FERTILIZATION',
      severity: 'HIGH',
      recommendation:
        'Apply organic N-P-K (20-10-10) liquid fertilizer within 48 hours to prevent corn yield degradation of ~8%.',
      farmName: 'Riverbend Field',
      createdAt: '10 mins ago',
      confidencePct: 96,
      status: 'PENDING',
    },
    {
      id: 'adv-102',
      title: 'Optimal Drip Irrigation Window Identified',
      category: 'IRRIGATION',
      severity: 'LOW',
      recommendation:
        'Schedule drip irrigation for 45 minutes at 06:00 AM tomorrow before midday sun increases evaporation rates.',
      farmName: 'Green Valley Plot A',
      createdAt: '4 hours ago',
      confidencePct: 94,
      status: 'PENDING',
    },
    {
      id: 'adv-103',
      title: 'Early Blight Fungus Risk (High Relative Humidity Alert)',
      category: 'PEST_CONTROL',
      severity: 'MEDIUM',
      recommendation:
        'Inspect leaves on southern edge of Sunrise Orchard. Apply copper bio-fungicide spray if brown spots appear.',
      farmName: 'Sunrise Orchard',
      createdAt: '12 hours ago',
      confidencePct: 89,
      status: 'PENDING',
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'AI',
      text: 'Hello Alex! I am AgriMate Agronomist AI v4.2. I have analyzed satellite data, soil moisture logs, and local weather forecasts for your 4 plots. How can I assist your field operations today?',
      timestamp: '09:00 AM',
      actions: [
        'How do I treat Nitrogen deficiency in Riverbend Field?',
        'What is the optimal harvest date for Corn Batch #1?',
        'Calculate water savings with automated drip irrigation',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText =
        'Based on multi-spectral satellite imagery and soil probe readings, your crop health index is 88%. ';
      let actions = ['Schedule Field Task', 'View Satellite Layer'];

      if (query.toLowerCase().includes('nitrogen') || query.toLowerCase().includes('fertilizer')) {
        responseText =
          'For Sector 3 (Riverbend Field), soil Nitrogen is at 28 mg/kg. I recommend applying 25 kg/Ha of calcium ammonium nitrate (CAN) or 40 L/Ha of liquid N28 solution via fertigation.';
        actions = ['Approve Fertigation Schedule', 'Order N28 Fertilizer'];
      } else if (query.toLowerCase().includes('harvest') || query.toLowerCase().includes('corn')) {
        responseText =
          'Corn Batch #1 in Green Valley Plot A is at 74% kernel milk line maturity. Target harvest window is October 10 to October 15, when grain moisture reaches ~15.5%.';
        actions = ['Reserve Grain Elevator Slot', 'Book Harvester Machinery'];
      } else if (query.toLowerCase().includes('water') || query.toLowerCase().includes('irrigation')) {
        responseText =
          'Automated soil moisture closed-loop control saves approximately 18.5% water compared to fixed schedules. Current soil VWC in Plot A is 36%, which is optimal.';
        actions = ['View Water Telemetry', 'Adjust Drip Valve Triggers'];
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'AI',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions,
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleApplyAdvisory = (id: string) => {
    setAdvisories((prev) =>
      prev.map((adv) => (adv.id === id ? { ...adv, status: 'APPLIED' } : adv))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e1b17] border border-emerald-900/40 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AgriGPT-v4 Active
            </span>
            <span className="text-xs text-slate-400">98.4% Diagnostic Precision</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Agronomist <span className="text-emerald-400">Advisor</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generative agronomic advisories, automated fertigation rules & yield optimization insights.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12221e] border border-emerald-800/40 rounded-xl text-xs text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">AI Models Operational</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Chat Assistant, Right Active Advisories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Interactive AI Chatbot */}
        <div className="lg:col-span-7 bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between h-[600px]">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-emerald-900/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-md shadow-emerald-950">
                <div className="w-full h-full bg-[#080e0c] rounded-[14px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Interactive AI Agronomist Chat</h3>
                <p className="text-[11px] text-slate-400">Trained on 500k+ agronomy research papers & satellite data</p>
              </div>
            </div>
            <button
              onClick={() =>
                setChatMessages([
                  {
                    id: 'msg-1',
                    sender: 'AI',
                    text: 'Chat history cleared. How can I help with your crops today?',
                    timestamp: 'Now',
                  },
                ])
              }
              className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'USER'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none shadow-md shadow-emerald-950/40'
                      : 'bg-[#080e0c] border border-emerald-900/30 text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Preset suggested action buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-emerald-900/30 space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Suggested Actions:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(act)}
                            className="text-[10px] bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/40 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <ArrowRight className="w-2.5 h-2.5" /> {act}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="text-[9px] text-slate-400 block mt-2 text-right opacity-70">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-[#080e0c] p-3 rounded-xl border border-emerald-900/30 max-w-xs animate-pulse">
                <Bot className="w-4 h-4 animate-spin" /> AgriMate AI is calculating recommendations...
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="pt-3 border-t border-emerald-900/30 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask AI agronomist e.g. 'How much fertilizer for corn?'..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-[#12221e] border border-emerald-900/40 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-950 flex items-center gap-1.5 transition-all"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>

        {/* Right 5 Columns: Active AI Advisory Alerts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Active AI Field Advisories
              </h3>
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                {advisories.filter((a) => a.status === 'PENDING').length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {advisories.map((adv) => (
                <div
                  key={adv.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    adv.status === 'APPLIED'
                      ? 'bg-[#080e0c]/50 border-emerald-900/20 opacity-60'
                      : adv.severity === 'HIGH'
                      ? 'bg-amber-950/20 border-amber-800/40'
                      : 'bg-emerald-950/20 border-emerald-800/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {adv.farmName}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {adv.createdAt}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-2">{adv.title}</h4>
                  <p className="text-[11px] text-slate-300 mt-1">{adv.recommendation}</p>

                  <div className="mt-3 pt-2.5 border-t border-emerald-900/20 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-emerald-400">
                      Confidence: {adv.confidencePct}%
                    </span>

                    {adv.status === 'APPLIED' ? (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Action Executed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApplyAdvisory(adv.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-xl shadow-md transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Execute Recommendation
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Settings Quick Toggle Box */}
          <div className="bg-[#0e1b17] border border-emerald-900/40 rounded-3xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" /> Agronomic Model Policy
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#080e0c] rounded-xl border border-emerald-900/30">
                <span className="text-slate-300">Automated Drip Fertigation</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Enabled
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#080e0c] rounded-xl border border-emerald-900/30">
                <span className="text-slate-300">Organic Certification Mode</span>
                <span className="text-xs font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30">
                  Strict
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
