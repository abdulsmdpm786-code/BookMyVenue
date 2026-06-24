import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronDown, User } from 'lucide-react';
import CalendarDropdown from './CalendarDropdown';

export function BookingCard({ venue, onContactAgent, onScheduleTour }) {
  // Setup default dates: Move in 11/09/2025, Move out 20/09/2026 (1 year default for lease)
  const [moveInDate, setMoveInDate] = useState(new Date(2025, 8, 11)); // Sept 11, 2025
  const [moveOutDate, setMoveOutDate] = useState(new Date(2026, 8, 11)); // Sept 11, 2026
  
  const [leaseDuration, setLeaseDuration] = useState("1 Year");
  const [tenantsCount, setTenantsCount] = useState("02");
  
  const [showInCalendar, setShowInCalendar] = useState(false);
  const [showOutCalendar, setShowOutCalendar] = useState(false);

  const inCalendarRef = useRef(null);
  const outCalendarRef = useRef(null);

  // Close calendar dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (inCalendarRef.current && !inCalendarRef.current.contains(event.target)) {
        setShowInCalendar(false);
      }
      if (outCalendarRef.current && !outCalendarRef.current.contains(event.target)) {
        setShowOutCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Base monthly rent is derived from venue.price
  // e.g. price 350 -> monthly rent $2,800
  const baseMonthlyRent = venue.price * 8;
  const utilitiesEst = 150; // $150/mo

  // Calculate lease months based on Move In / Move Out dates
  const calculateMonthsRange = (start, end) => {
    if (!start || !end || end <= start) return 0;
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();
    const daysDiff = end.getDate() - start.getDate();
    
    let totalMonths = yearsDiff * 12 + monthsDiff;
    if (daysDiff > 15) {
      totalMonths += 1;
    } else if (daysDiff < -15) {
      totalMonths -= 1;
    }
    return Math.max(1, totalMonths);
  };

  const getMonthsCount = () => {
    if (leaseDuration === "1 Year") return 12;
    if (leaseDuration === "6 Months") return 6;
    if (leaseDuration === "3 Months") return 3;
    if (leaseDuration === "1 Month") return 1;
    
    // Custom duration based on date range
    return calculateMonthsRange(moveInDate, moveOutDate);
  };

  const monthsCount = getMonthsCount();

  // Adjust Move Out date when Lease Duration dropdown changes
  const handleLeaseDurationChange = (e) => {
    const val = e.target.value;
    setLeaseDuration(val);
    
    if (val === "1 Year") {
      const newOut = new Date(moveInDate);
      newOut.setFullYear(newOut.getFullYear() + 1);
      setMoveOutDate(newOut);
    } else if (val === "6 Months") {
      const newOut = new Date(moveInDate);
      newOut.setMonth(newOut.getMonth() + 6);
      setMoveOutDate(newOut);
    } else if (val === "3 Months") {
      const newOut = new Date(moveInDate);
      newOut.setMonth(newOut.getMonth() + 3);
      setMoveOutDate(newOut);
    } else if (val === "1 Month") {
      const newOut = new Date(moveInDate);
      newOut.setMonth(newOut.getMonth() + 1);
      setMoveOutDate(newOut);
    }
  };

  const handleMoveInSelect = (date) => {
    setMoveInDate(date);
    setShowInCalendar(false);
    
    // Update move out date if lease duration is fixed
    if (leaseDuration === "1 Year") {
      const newOut = new Date(date);
      newOut.setFullYear(newOut.getFullYear() + 1);
      setMoveOutDate(newOut);
    } else if (leaseDuration === "6 Months") {
      const newOut = new Date(date);
      newOut.setMonth(newOut.getMonth() + 6);
      setMoveOutDate(newOut);
    } else if (leaseDuration === "3 Months") {
      const newOut = new Date(date);
      newOut.setMonth(newOut.getMonth() + 3);
      setMoveOutDate(newOut);
    } else if (leaseDuration === "1 Month") {
      const newOut = new Date(date);
      newOut.setMonth(newOut.getMonth() + 1);
      setMoveOutDate(newOut);
    } else {
      // If Custom and start date exceeds end date, push end date
      if (date >= moveOutDate) {
        const newOut = new Date(date);
        newOut.setDate(newOut.getDate() + 30);
        setMoveOutDate(newOut);
      }
    }
  };

  const handleMoveOutSelect = (date) => {
    if (date <= moveInDate) {
      alert("Move-out date must be after Move-in date.");
      return;
    }
    setMoveOutDate(date);
    setShowOutCalendar(false);
    setLeaseDuration("Custom");
  };

  // Format dates for display
  const formatDate = (date) => {
    if (!date) return '';
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  // Calculate pricing breakdown
  const monthlyTotal = baseMonthlyRent + utilitiesEst;
  const annualTotal = monthlyTotal * monthsCount;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-6 sticky top-24">
      {/* Header Info */}
      <div>
        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Premium Listing</div>
        <h4 className="text-xl font-bold text-slate-800 leading-snug mt-1">{venue.name}</h4>
        <p className="text-xs text-slate-500 mt-1">{venue.type} • {venue.location}</p>
      </div>

      {/* Main pricing tag */}
      <div className="flex items-baseline gap-1 py-4 border-y border-slate-100">
        <span className="text-3xl font-black text-slate-900">${baseMonthlyRent.toLocaleString()}</span>
        <span className="text-slate-500 text-sm font-semibold">/month</span>
      </div>

      {/* Booking Inputs Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Move In */}
          <div className="relative" ref={inCalendarRef}>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-1">Move In</label>
            <button
              type="button"
              onClick={() => {
                setShowInCalendar(!showInCalendar);
                setShowOutCalendar(false);
              }}
              className="w-full bg-[#FAF9F6] border border-slate-200 hover:border-slate-350 focus:border-ticket-orange focus:ring-1 focus:ring-ticket-orange rounded-2xl py-3 px-4 flex items-center justify-between text-slate-700 text-xs font-bold transition-all"
            >
              <span>{formatDate(moveInDate)}</span>
              <CalendarIcon className="w-4 h-4 text-slate-400" />
            </button>
            {showInCalendar && (
              <CalendarDropdown
                selectedStartDate={moveInDate}
                selectedEndDate={moveOutDate}
                onSelectDate={handleMoveInSelect}
                onClose={() => setShowInCalendar(false)}
                activeField="start"
              />
            )}
          </div>

          {/* Move Out */}
          <div className="relative" ref={outCalendarRef}>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-1">Move Out</label>
            <button
              type="button"
              onClick={() => {
                setShowOutCalendar(!showOutCalendar);
                setShowInCalendar(false);
              }}
              className="w-full bg-[#FAF9F6] border border-slate-200 hover:border-slate-350 focus:border-ticket-orange focus:ring-1 focus:ring-ticket-orange rounded-2xl py-3 px-4 flex items-center justify-between text-slate-700 text-xs font-bold transition-all"
            >
              <span>{formatDate(moveOutDate)}</span>
              <CalendarIcon className="w-4 h-4 text-slate-400" />
            </button>
            {showOutCalendar && (
              <CalendarDropdown
                selectedStartDate={moveInDate}
                selectedEndDate={moveOutDate}
                onSelectDate={handleMoveOutSelect}
                onClose={() => setShowOutCalendar(false)}
                activeField="end"
              />
            )}
          </div>
        </div>

        {/* Lease Duration Dropdown */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-1">Lease Duration</label>
          <div className="relative">
            <select
              value={leaseDuration}
              onChange={handleLeaseDurationChange}
              className="w-full bg-[#FAF9F6] border border-slate-200 hover:border-slate-350 focus:border-ticket-orange focus:ring-1 focus:ring-ticket-orange rounded-2xl py-3 px-4 text-slate-700 text-xs font-bold appearance-none cursor-pointer pr-10 transition-all outline-none"
            >
              <option value="1 Year">1 Year</option>
              <option value="6 Months">6 Months</option>
              <option value="3 Months">3 Months</option>
              <option value="1 Month">1 Month</option>
              <option value="Custom">Custom Range</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Numbers Of Tenants */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-1">Numbers Of Tenants</label>
          <div className="relative">
            <select
              value={tenantsCount}
              onChange={(e) => setTenantsCount(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-slate-200 hover:border-slate-350 focus:border-ticket-orange focus:ring-1 focus:ring-ticket-orange rounded-2xl py-3 px-4 text-slate-700 text-xs font-bold appearance-none cursor-pointer pr-10 transition-all outline-none"
            >
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05+">05+</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Red bordered Price Breakdown box */}
      <div className="border border-red-200 bg-red-50/20 rounded-2xl p-4 flex flex-col gap-3.5 transition-all">
        <div className="text-red-800 text-xs font-bold uppercase tracking-wider">Price Breakdown</div>
        
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Monthly Rent</span>
          <span className="font-bold text-slate-800">${baseMonthlyRent.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Lease Duration</span>
          <span className="font-bold text-slate-800">× {monthsCount} month{monthsCount !== 1 ? 's' : ''}</span>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Utilities (Est.)</span>
          <span className="font-bold text-slate-800">${utilitiesEst}/mo</span>
        </div>

        <div className="h-px bg-red-100 my-1"></div>

        <div className="flex justify-between items-baseline">
          <span className="text-red-900 font-bold text-sm">Total Estimate:</span>
          <span className="text-xl font-black text-slate-900">${annualTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-2 mt-2">
        <button
          onClick={onScheduleTour}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold text-xs transition-all shadow-md active:scale-[0.98]"
        >
          Schedule a Tour
        </button>
        <button
          onClick={onContactAgent}
          className="w-full bg-transparent border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 rounded-2xl font-bold text-xs transition-all active:scale-[0.98]"
        >
          Contact Agent
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
