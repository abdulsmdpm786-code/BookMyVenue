import React, { useState } from 'react';
import { Search, Bell, Sparkles, X, Menu, Check } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onToggleAiDrawer, 
  onToggleMobileSidebar, 
  notifications,
  onDismissNotification
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-20 bg-[#F7F5EE] border-b border-slate-200 flex items-center justify-between px-6 md:px-8 
    relative z-30 flex-shrink-0">
      
      {/* Search Input and Mobile Menu toggle */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button 
          onClick={onToggleMobileSidebar}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-655 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>
 

      </div>
 
      {/* Action Items */}
      <div className="flex items-center gap-4">
        
        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors relative ${showNotifications ? 'border-ticket-yellow bg-slate-50/50 text-slate-900' : ''}`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-ticket-orange border-2 border-white rounded-full flex items-center justify-center text-[8px] font-black text-white">
                {unreadCount}
              </span>
            )}
          </button>
 
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#F7F5EE] border border-slate-200 rounded-3xl shadow-xl z-50 overflow-hidden animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-extrabold text-slate-900">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-ticket-yellow/20 text-ticket-orange font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 flex gap-3 text-left hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-slate-50/30' : ''}`}>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-800 leading-normal">{notif.text}</p>
                        <span className="text-[10px] text-slate-400 font-semibold block mt-1">{notif.time}</span>
                      </div>
                      <button 
                        onClick={() => onDismissNotification(notif.id)}
                        className="text-slate-350 hover:text-slate-600 transition-colors flex-shrink-0"
                        title="Dismiss"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-8 px-4 text-center text-slate-400 text-xs font-medium">
                    No new notifications.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>



      </div>
    </header>
  );
}
