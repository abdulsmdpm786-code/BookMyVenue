import React from "react";
import { useOutletContext } from "react-router-dom";
import { Check, X, MapPin, Users, DollarSign, Calendar } from "lucide-react";

export default function NewVenues() {
  const { venues, setVenues, handleAddNotification } = useOutletContext();

  // Filter for pending venues
  const pendingVenues = venues.filter((v) => v.status === "Pending" || v.status === "pending");

  const handleApprove = (id, name) => {
    setVenues((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Approved" } : v))
    );
    handleAddNotification(`Venue '${name}' has been approved and published.`);
  };

  const handleReject = (id, name) => {
    setVenues((prev) => prev.filter((v) => v.id !== id));
    handleAddNotification(`Venue '${name}' approval request was rejected.`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">New Venue Approvals</h1>
          <p className="text-slate-500 text-sm mt-1">
            Review and approve pending venue submissions from organizers.
          </p>
        </div>
        <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 self-start md:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-ticket-orange animate-pulse"></span>
          <span className="text-xs font-bold text-slate-700">
            {pendingVenues.length} Pending Submission{pendingVenues.length !== 1 && "s"}
          </span>
        </div>
      </div>

      {pendingVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{venue.name}</h3>
                  <span className="bg-amber-50 text-amber-600 border border-amber-200/50 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider flex-shrink-0">
                    Pending
                  </span>
                </div>

                <div className="space-y-2.5 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Capacity: {venue.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Rate: {venue.price}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-100">
                <button
                  onClick={() => handleReject(venue.id, venue.name)}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs transition-colors active:scale-95"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  onClick={() => handleApprove(venue.id, venue.name)}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors active:scale-95 shadow-sm shadow-emerald-600/10"
                >
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">All Caught Up!</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
            There are no pending venue approval requests at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
