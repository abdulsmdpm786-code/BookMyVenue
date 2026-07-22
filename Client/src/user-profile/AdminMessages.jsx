import React, { useState } from "react";
import {
  Mail,
  MailOpen,
  MessageSquare,
  Reply,
  Send,
  Check,
  Shield,
} from "lucide-react";

export default function AdminMessages({ message, isLoading, handleSelect }) {
  console.log("...", handleSelect);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm h-40 animate-pulse flex flex-col overflow-hidden"
          >
            <div className="h-11 bg-slate-200/60 w-full" />

            <div className="p-5 flex-1 space-y-4">
              <div className="h-5 bg-slate-200 rounded-md w-2/3" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-100 rounded-md w-full" />
                <div className="h-4 bg-slate-100 rounded-md w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
      {message.length > 0 ? (
        message.map((item, index) => (
          <div
            key={index}
            className="group bg-white border border-slate-200/60 rounded-3xl shadow-sm 
              overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-slate-200
              flex flex-col h-full hover:-translate-y-1"
          >
            <div className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 flex items-center gap-2 border-b border-orange-500/20">
              <Mail className="w-4 h-4 text-white/90" />
              <span className="text-white text-sm font-medium tracking-wide">
                Message
              </span>
            </div>

            <div className="p-5 flex flex-col gap-2.5 bg-slate-50/30 group-hover:bg-white transition-colors h-full">
              <h3 className="text-lg font-bold text-slate-800 line-clamp-1 leading-tight">
                {item?.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {item?.description}
              </p>
            </div>
            <div className="p-2">
              <button
                onClick={() => handleSelect(item)}
                className="w-full bg-slate-200 hover:bg-ticket-orange transition-colors rounded-3xl py-2 text-sm hover:text-white"
              >
                View Message
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center flex flex-col items-center justify-center transition-all hover:bg-slate-50">
          <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-5">
            <Inbox className="w-8 h-8 text-slate-400" />
          </div>
          <h4 className="text-lg font-bold text-slate-700">No Messages Yet</h4>
          <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
            You haven't received any messages from the admin or organizer yet.
            Check back later!
          </p>
        </div>
      )}
    </div>
  );
}
