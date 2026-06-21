import React, { useState } from 'react';
import { PieChart, Info } from 'lucide-react';

const SECTIONS = [
  { id: 'newsletter', label: 'Newsletter', value: 35, color: '#FF9800' }, // Ticket Orange
  { id: 'promo', label: 'Promotional', value: 30, color: '#FBBF24' },     // Amber Gold
  { id: 'automation', label: 'Automated', value: 20, color: '#FFC107' },  // Ticket Yellow
  { id: 'retargeting', label: 'Retargeting', value: 15, color: '#FDE68A' } // Light Yellow
];

export default function CampaignTypesChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const totalValue = SECTIONS.reduce((acc, curr) => acc + curr.value, 0);

  // SVG circle calculations
  const radius = 35;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // ~219.91

  let accumulatedPercent = 0;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md hover:border-slate-350 hover:-translate-y-1.5 transition-all duration-300 select-none h-full flex flex-col justify-between">
      
      {/* Chart Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <PieChart className="w-5 h-5 text-ticket-orange" />
            Campaign Types
          </h3>
          <p className="text-slate-400 text-xs mt-1 font-semibold">Distribution of message formats.</p>
        </div>
        <button className="text-slate-400 hover:text-slate-655 transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Donut and Legends Layout */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 flex-1">
        
        {/* SVG Donut Container */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {SECTIONS.map((section, idx) => {
              const dashArray = `${(section.value / 100) * circumference} ${circumference}`;
              const dashOffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += section.value;

              const isHovered = hoveredIdx === idx;

              return (
                <circle
                  key={section.id}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={section.color}
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 4px ${section.color}80)` : 'none'
                  }}
                />
              );
            })}
          </svg>

          {/* Central Text Panel */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            {hoveredIdx !== null ? (
              <div className="animate-fade-in space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  {SECTIONS[hoveredIdx].label}
                </span>
                <span className="text-2xl font-black text-slate-900 tracking-tight block">
                  {SECTIONS[hoveredIdx].value}%
                </span>
              </div>
            ) : (
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Newsletter
                </span>
                <span className="text-2xl font-black text-slate-900 tracking-tight block">
                  35%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Legend lists */}
        <div className="flex flex-col gap-2.5 w-full sm:w-auto">
          {SECTIONS.map((section, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div 
                key={section.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex items-center justify-between sm:justify-start gap-4 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  isHovered ? 'bg-slate-50 border border-slate-150' : 'border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3.5 h-3.5 rounded-md flex-shrink-0" 
                    style={{ backgroundColor: section.color }}
                  />
                  <span className={`text-xs font-bold text-slate-700 ${isHovered ? 'text-slate-950 font-extrabold' : ''}`}>
                    {section.label}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-slate-500 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-lg ml-auto">
                  {section.value}%
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
