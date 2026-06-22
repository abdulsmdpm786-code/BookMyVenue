import React, { useState } from "react";
import {
  LayoutDashboard,
  Mail,
  Users,
  BarChart3,
  ChevronLast,
  ChevronFirst,
  LogOut,
  Sparkles,
  University ,
  UserPen 
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "NewVenues", label: "New venues", icon: Mail, badge: 3 },
    { id: "Venues", label: "Venues", icon: University  },
    { id: "Users", label: "Users", icon: Users },
    { id: "Organizers", label: "Organizers", icon: UserPen  },
  ];

  return (
    <aside
      className={`flex flex-col bg-[#F7F5EE] border-r border-slate-200 transition-all duration-300 h-full ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200/50 flex-shrink-0">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-[#FAF9F6] rounded-xl flex items-center justify-center border border-slate-200 shadow-sm p-1 flex-shrink-0">
            <img
              src={logo}
              alt=""
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<span class="text-ticket-orange font-bold text-xl">TS</span>';
              }}
            />
          </div>
          {sidebarOpen && (
            <span className="text-slate-900 text-xl font-bold tracking-tight whitespace-nowrap animate-fade-in">
              Book My Venue
            </span>
          )}
        </Link>

        {/* Collapsible toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-all"
        >
          {sidebarOpen ? (
            <ChevronFirst className="w-4 h-4" />
          ) : (
            <ChevronLast className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const delays = [
            "delay-0",
            "delay-75",
            "delay-150",
            "delay-225",
            "delay-300",
            "delay-375",
            "delay-450",
            "delay-525",
          ];
          const delayClass = delays[idx % delays.length];

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 relative group font-medium animate-fade-in-up-stagger ${delayClass} ${
                isActive
                  ? "bg-ticket-yellow/20 text-slate-900 shadow-sm border-l-4 border-ticket-yellow"
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-800 border-l-4 border-transparent"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-ticket-orange" : "text-slate-400"}`}
              />

              {sidebarOpen && (
                <span className="text-sm font-semibold tracking-wide flex-1 text-left whitespace-nowrap">
                  {item.label}
                </span>
              )}

              
              {!sidebarOpen && (
                <span className="absolute left-20 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200 z-50 shadow-md whitespace-nowrap">
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 bg-ticket-yellow text-slate-900 font-extrabold px-1 rounded-md text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </span>
              )}

             
              {sidebarOpen && item.badge && (
                <span className="bg-ticket-yellow text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      
      <div className="p-4 border-t border-slate-200/50 relative flex-shrink-0">
        {profileOpen && sidebarOpen && (
          <div
            className="absolute bottom-20 left-4 right-4 bg-[#F7F5EE] border border-slate-200 p-3 rounded-2xl shadow-xl space-y-1 z-50 animate-fade-in-up"
            style={{ animationDuration: "0.2s" }}
          >
            <div className="px-2 py-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
              Account
            </div>
            <Link
              to="/"
              className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </Link>
          </div>
        )}

        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className={`w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-white/50 transition-colors text-left border ${profileOpen ? "border-ticket-yellow bg-white/30" : "border-transparent"}`}
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200 border border-slate-300/60 shadow-sm flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
              alt="John Doe"
              className="w-full h-full object-cover"
            />
          </div>

          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-slate-900 truncate">
                John Doe
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-ticket-orange"></span>{" "}
                Pro Plan
              </div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
