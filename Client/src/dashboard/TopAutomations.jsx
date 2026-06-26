import React, { useState } from 'react';
import { Play, Sparkles, UserCheck, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TopAutomations({ automations }) {
  const [selectedId, setSelectedId] = useState(null);

  const activeAutomation = automations.find(a => a.id === selectedId);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md hover:border-slate-350
     hover:-translate-y-1.5 transition-all
      duration-400 select-none h-full flex flex-col justify-between animate-fade-in-up">
      
     
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-ticket-orange fill-current" />
            Top Automations
          </h3>
          <p className="text-slate-400 text-xs mt-1 font-semibold">Best performing marketing sequences.</p>
        </div>
        <button className="text-xs text-ticket-orange font-bold hover:underline">
          View All
        </button>
      </div>

   
      <div className="space-y-4 flex-1">
        {automations.map((item, index) => {
          const isSelected = selectedId === item.id;
          const delayClass = `delay-${(index % 6) * 150}`;
          return (
            <div 
              key={item.id}
              onClick={() => setSelectedId(isSelected ? null : item.id)}
              className={`p-4 border rounded-2xl cursor-pointer transition-all duration-350 animate-fade-in-stagger ${delayClass} ${
                isSelected 
                  ? 'border-ticket-orange bg-slate-50 shadow-sm' 
                  : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-semibold">
                    <span>{item.triggered} triggered</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{item.completed} completed</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-900 block">{item.rate}%</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Conv. Rate</span>
                </div>
              </div>

            
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-ticket-yellow to-ticket-orange rounded-full transition-all duration-500"
                  style={{ width: `${item.rate}%` }}
                />
              </div>

             
              {isSelected && (
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-2.5 animate-fade-in">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-400">Trigger Mode:</span>
                    <span className="text-slate-800">User Signup Interaction</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-400">Target Segment:</span>
                    <span className="text-slate-800">New Workspaces Leads</span>
                  </div>

                 
                  <div className="space-y-1.5 pt-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Flow Steps</span>
                    <div className="flex items-center gap-1.5 font-semibold text-[10px] text-slate-500">
                      <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-700">Step 1: Welcome Email</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-700">Step 2: Promo Discount</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
