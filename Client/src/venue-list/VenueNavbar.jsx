import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export function VenueNavbar() {
  return (
    <div className="w-full relative z-30 px-6 md:px-12 pt-6 animate-fade-in">
      <nav className="flex items-center justify-between px-6 py-4 bg-[#F7F5EE]/90 backdrop-blur-md border border-slate-200 rounded-full shadow-sm max-w-5xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-[#F7F5EE] rounded-xl flex items-center justify-center border border-slate-200 shadow-sm p-1">
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
          <span className="text-slate-900 text-xl md:text-2xl font-bold tracking-tight">
            Book My Venue
          </span>
        </Link>

    
        <div className="hidden lg:flex items-center gap-8 text-slate-650 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-slate-900">
            Home
          </Link>
          <Link
            to="/venues"
            className="flex items-center gap-1.5 text-ticket-orange font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ticket-orange animate-pulse"></span>
            Venues
          </Link>
          <Link
            to="/dashboard"
            className="transition-colors hover:text-slate-900"
          >
            Dashboard
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden sm:block text-slate-600 font-medium text-sm hover:text-ticket-orange transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-ticket-yellow hover:bg-ticket-yellow/90 text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default VenueNavbar;
