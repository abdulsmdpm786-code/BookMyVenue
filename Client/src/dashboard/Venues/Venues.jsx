import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, MapPin, Users, DollarSign, Plus, Trash2 } from "lucide-react";

export default function Venues() {
  const { venues, setVenues, handleAddNotification } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleDelete = (id, name) => {
    setVenues((prev) => prev.filter((v) => v.id !== id));
    handleAddNotification(`Venue '${name}' was deleted successfully.`);
  };

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || venue.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Venues Directory</h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse and manage all registered location properties.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by venue name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-ticket-orange focus:ring-1 focus:ring-ticket-orange/20 transition-all outline-none text-sm text-slate-700 font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {["All", "Approved", "Pending"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                filterStatus === status
                  ? "bg-ticket-yellow/20 border-ticket-yellow text-slate-900 shadow-sm"
                  : "bg-transparent border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{venue.name}</h3>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider border ${
                      venue.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200/50"
                        : "bg-amber-50 text-amber-600 border-amber-200/50"
                    }`}
                  >
                    {venue.status}
                  </span>
                </div>

                <div className="space-y-2.5 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Up to {venue.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Rent Rate: {venue.price}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handleDelete(venue.id, venue.name)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 font-bold text-xs transition-colors active:scale-95 border border-transparent hover:border-red-100"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Venue
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">No Venues Found</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
            Try adjusting your search query or filter tags to see matching venues.
          </p>
        </div>
      )}
    </div>
  );
}
