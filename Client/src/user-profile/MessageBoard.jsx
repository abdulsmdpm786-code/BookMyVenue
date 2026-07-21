import React, { useState } from "react";
import { Mail, Inbox, X, ArrowRight } from "lucide-react";

export default function MessageBoard({selectedMessage, isLoading = false, onClose }) {
console.log("..",selectedMessage);


  return (
    <>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ">
        
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm "
          
        />

        
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl 
        overflow-hidden animate-slide-up flex flex-col max-h-[90vh] animate-fade-in-up duration-300 transition-all">
        
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Message Details
                </h2>
              </div>
            </div>
            <button
             onClick={() => onClose()}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">
              {selectedMessage?.title}
            </h3>
            <div className="prose prose-slate prose-sm sm:prose-base">
              <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                {selectedMessage?.description}
              </p>
            </div>
          </div>

        
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button
              onClick={() => onClose()}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              Close Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
