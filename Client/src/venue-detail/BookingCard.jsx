import React, { useState, useEffect, useRef } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";

// --- DARK THEMED CALENDAR COMPONENT ---
const DarkCalendarPopup = ({ selectedDate, onSelectDate }) => {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="absolute top-full left-0 mt-2 z-50 bg-[#242731] p-5 rounded-xl w-72 shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 text-white">
        <button
          onClick={(e) => {
            e.preventDefault();
            prevMonth();
          }}
          className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
        >
          &lt;
        </button>
        <span className="font-semibold text-sm">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            nextMonth();
          }}
          className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
        >
          &gt;
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-slate-500 text-xs font-semibold"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-1">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="h-8 w-full" />
        ))}
        {days.map((day) => {
          // CHECK IF DATE IS IN THE PAST
          const currentDate = new Date(year, month, day);
          const isPastDate = currentDate < today;

          const isSelected =
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === month &&
            selectedDate?.getFullYear() === year;

          return (
            <button
              key={day}
              disabled={isPastDate} // Disable native button interaction
              onClick={(e) => {
                e.preventDefault();
                if (!isPastDate) {
                  onSelectDate(currentDate);
                }
              }}
              className={`
                h-8 w-full flex items-center justify-center rounded-lg text-xs font-medium transition-all
                ${
                  isPastDate
                    ? "opacity-30 cursor-not-allowed text-slate-500" // Blurred/Disabled styling
                    : isSelected
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                      : "text-slate-200 hover:bg-slate-700"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export function BookingCard({ venue, onContactAgent, onScheduleTour, data }) {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 17));
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [selectedDays, setSelectedDays] = useState(1);
  const [extended, setExtended] = useState("");
  console.log(extended);

  const price = data?.price;

  const [finalPrice, setFinalPrice] = useState(price);
  console.log("sel", finalPrice);

  const [leaseDuration, setLeaseDuration] = useState("1 Year");
  const [tenantsCount, setTenantsCount] = useState("02");

  // Close calendar dropdown when clicking outside
  useEffect(() => {
    setFinalPrice(price);
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [price]);

  // Base monthly rent is derived from venue.price
  const baseMonthlyRent = (venue?.price || 350) * 8;
  const utilitiesEst = 150; // $150/mo

  const getMonthsCount = () => {
    if (leaseDuration === "1 Year") return 12;
    if (leaseDuration === "6 Months") return 6;
    if (leaseDuration === "3 Months") return 3;
    if (leaseDuration === "1 Month") return 1;
    return 1; // Default to 1 month if anything else
  };

  const monthsCount = getMonthsCount();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const monthlyTotal = baseMonthlyRent + utilitiesEst;
  const annualTotal = monthlyTotal * monthsCount;

  const handleForward = () => {
    const newDays = selectedDays + 1;
    setSelectedDays(newDays);

    setFinalPrice(price * newDays);

    const newExtendedDate = new Date(selectedDate);

    newExtendedDate.setDate(selectedDate.getDate() + newDays);

    setExtended(newExtendedDate);
  };

  const handleBackward = () => {
    if (selectedDays <= 1) {
      setSelectedDays(1);
    } else {
      setSelectedDays(selectedDays - 1);
    }
  };

  return (
    <div
      className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-6 flex flex-col 
    gap-6 sticky top-24 animate-fade-in-up"
    >
      <div>
        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
          Premium Listing
        </div>
        <h4 className="text-xl font-bold text-slate-800 leading-snug mt-1">
          {data?.name || "Luxury Apartment"}
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          {data?.type || "Entire Home"} • {data?.place || "City Center"}
        </p>
      </div>

      <div className="flex items-baseline gap-1 py-4 border-y border-slate-100">
        <span className="text-3xl font-black text-slate-900">
          ${data?.price || 350}
        </span>
        <span className="text-slate-500 text-sm font-semibold">/day</span>
      </div>

      <div className="space-y-5">
        <div className="relative" ref={calendarRef}>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">
            Select Your Slot
          </label>
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full bg-[#F8F9FA] border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-[20px] py-3.5 px-5 flex items-center justify-between text-slate-800 text-sm font-bold transition-all"
          >
            <span>{formatDate(selectedDate)}</span>
            <CalendarIcon className="w-5 h-5 text-slate-400" />
          </button>

          {showCalendar && (
            <DarkCalendarPopup
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />
          )}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500  uppercase tracking-wider mb-1.5 pl-1">
            Lease Duration
          </label>
          <div className="relative overflow-hidden">
            <input
              type="number"
              value={selectedDays}
              readOnly
              className="w-full text-center bg-[#FAF9F6] border border-slate-200  hover:border-slate-300 rounded-2xl py-3 
                px-10 text-slate-700 text-xs font-bold appearance-none cursor-pointer pr-10   transition-all outline-none overflow-hidden"
            />
            <Minus
              onClick={() => handleBackward()}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-full"
            />
            <Plus
              onClick={() => handleForward()}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="border border-red-200 bg-red-50/20 rounded-2xl p-4 flex flex-col gap-3.5 mt-2 transition-all">
        <div className="text-red-800 text-xs font-bold uppercase tracking-wider">
          Price Breakdown
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Daily Rent</span>
          <span className="font-bold text-slate-800">
            ${baseMonthlyRent.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Lease Duration</span>
          <span className="font-bold text-slate-800">
            × {monthsCount} month{monthsCount !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Utilities (Est.)</span>
          <span className="font-bold text-slate-800">${utilitiesEst}/days</span>
        </div>

        <div className="h-px bg-red-100 my-1"></div>

        <div className="flex justify-between items-baseline">
          <span className="text-red-900 font-bold text-sm">
            Total Estimate:
          </span>
          <span className="text-xl font-black text-slate-900">
            ${annualTotal.toLocaleString()}
          </span>
        </div>
      </div>

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
