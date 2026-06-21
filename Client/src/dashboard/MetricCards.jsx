import React from 'react';
import { Mail, Users, Percent, DollarSign, ArrowUpRight, ArrowDownRight, Plus, Play } from 'lucide-react';

// Reusable card sub-component defined outside the main component to prevent remounts/re-render animation replays
const Card = ({ title, value, icon: Icon, change, isPositive, sparklinePoints, delayClass }) => {
  const cardId = title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

  return (
    <div className={`bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md hover:border-slate-350 hover:-translate-y-1.5 transition-all duration-300 group select-none flex flex-col justify-between h-40 animate-fade-in-stagger ${delayClass}`}>
      <div className="flex items-start justify-between w-full">
        {/* Left info */}
        <div className="space-y-1.5">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
            {title}
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
            {value}
          </h3>
        </div>
        
        {/* Icon box */}
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-500 group-hover:border-ticket-yellow group-hover:text-ticket-orange transition-all duration-350">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom Sparkline and Badge row */}
      <div className="flex items-end justify-between mt-auto">
        {/* Badge */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
          isPositive 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
            : 'bg-rose-50 text-rose-600 border border-rose-150'
        }`}>
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{change}</span>
        </div>

        {/* Sparkline Graph */}
        <div className="w-24 h-10">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${cardId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#FFC107' : '#F43F5E'} stopOpacity="0.4" />
                <stop offset="100%" stopColor={isPositive ? '#FFC107' : '#F43F5E'} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Grid lines (Subtle) */}
            <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
            <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.5" />

            {/* Area path */}
            <path
              d={`M 0,40 L 0,${sparklinePoints[0]} ${sparklinePoints.map((p, i) => `L ${(i / (sparklinePoints.length - 1)) * 100},${p}`).join(' ')} L 100,40 Z`}
              fill={`url(#gradient-${cardId})`}
            />
            {/* Line path */}
            <path
              d={sparklinePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (sparklinePoints.length - 1)) * 100},${p}`).join(' ')}
              fill="none"
              stroke={isPositive ? '#FF9800' : '#E11D48'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="path-draw-animation"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function MetricCards({ 
  stats, 
  onOpenNewCampaign, 
  onOpenCreateAutomation 
}) {
  
  return (
    <div className="space-y-6">
      
      {/* Greetings area with action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#FFFDF5] to-[#FFF9E6] border border-amber-100 p-6 rounded-3xl animate-fade-in-up-stagger delay-0">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
            Welcome back, <span className="bg-gradient-to-r from-ticket-orange to-amber-500 bg-clip-text text-transparent">Be!</span>
          </h1>
          <p className="text-slate-500 text-xs font-semibold mt-2.5">
            Welcome back! Here's what's happening today in your space booking & marketing.
          </p>
        </div>

        {/* Creation Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenNewCampaign}
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-250 shadow-sm font-bold text-xs px-4 py-3 rounded-2xl flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <Plus className="w-4 h-4 text-ticket-orange" />
            New Campaign
          </button>
          <button 
            onClick={onOpenCreateAutomation}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-3 rounded-2xl flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-slate-950/20"
          >
            <Play className="w-4 h-4 text-ticket-yellow fill-current" />
            Create Automation
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          title="Total Campaigns"
          value={stats.totalCampaigns.value}
          icon={Mail}
          change={stats.totalCampaigns.change}
          isPositive={true}
          sparklinePoints={[28, 24, 30, 20, 18, 15, 12]}
          delayClass="delay-150"
        />
        <Card 
          title="Active Contacts"
          value={stats.activeContacts.value}
          icon={Users}
          change={stats.activeContacts.change}
          isPositive={true}
          sparklinePoints={[35, 30, 28, 22, 19, 16, 10]}
          delayClass="delay-300"
        />
        <Card 
          title="Avg. Open Rate"
          value={stats.avgOpenRate.value}
          icon={Percent}
          change={stats.avgOpenRate.change}
          isPositive={true}
          sparklinePoints={[32, 28, 26, 29, 21, 15, 14]}
          delayClass="delay-450"
        />
        <Card 
          title="Revenue (MTD)"
          value={stats.revenue.value}
          icon={DollarSign}
          change={stats.revenue.change}
          isPositive={false}
          sparklinePoints={[10, 12, 15, 22, 25, 29, 32]}
          delayClass="delay-600"
        />
      </div>

    </div>
  );
}
