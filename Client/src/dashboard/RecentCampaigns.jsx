import React, { useState } from "react";
import {
  MoreVertical,
  ChevronDown,
  Check,
  Play,
  Pause,
  Trash2,
  ArrowUpDown,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function RecentCampaigns({
  campaigns,
  onUpdateCampaign,
  onDeleteCampaign,
}) {
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Toggle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === "string") {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
  });

  const getStatusBadge = (status) => {
    const base =
      "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border";
    switch (status) {
      case "Active":
        return `${base} bg-emerald-50 text-emerald-600 border-emerald-100`;
      case "Scheduled":
        return `${base} bg-sky-50 text-sky-600 border-sky-100`;
      case "Completed":
        return `${base} bg-slate-50 text-slate-550 border-slate-200`;
      case "Paused":
        return `${base} bg-amber-50 text-amber-600 border-amber-100`;
      default:
        return `${base} bg-slate-50 text-slate-600 border-slate-200`;
    }
  };

  return (
    <div
      className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md 
    hover:border-slate-350 hover:-translate-y-1.5 transition-all duration-300 select-none 
    max-h-96 flex flex-col justify-between animate-fade-in-up"
     >
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Recent Campaigns
          </h3>
          <p className="text-slate-400 text-xs mt-1 font-semibold">
            Track your delivery performance metrics.
          </p>
        </div>

      
        <div className="flex items-center gap-3 self-end sm:self-auto">
          
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 focus:border-ticket-orange rounded-xl px-3 py-1.5 text-xs font-medium outline-none transition-all w-36 sm:w-44"
          />

          {/* Status dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-700 font-bold text-xs pl-3 pr-8 py-1.5 rounded-xl outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Paused">Paused</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Campaigns Table Grid */}
      <div className="overflow-x-auto custom-scrollbar flex-1">
        <table className="w-full text-left text-sm border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-slate-700 transition-colors"
                >
                  Campaign <ArrowUpDown className="w-3 h-3 text-slate-300" />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 hover:text-slate-700 transition-colors"
                >
                  Status <ArrowUpDown className="w-3 h-3 text-slate-300" />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort("sent")}
                  className="flex items-center gap-1 hover:text-slate-700 transition-colors"
                >
                  Sent Contacts{" "}
                  <ArrowUpDown className="w-3 h-3 text-slate-300" />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort("opens")}
                  className="flex items-center gap-1 hover:text-slate-700 transition-colors"
                >
                  Opens <ArrowUpDown className="w-3 h-3 text-slate-300" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody
            key={`${statusFilter}-${searchFilter}-${sortField}-${sortOrder}`}
            className="divide-y divide-slate-100 text-slate-700 font-medium"
          >
            {sortedCampaigns.length > 0 ? (
              sortedCampaigns.map((row, index) => {
                const delayClass = `delay-${(index % 6) * 150}`;
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-50/50 transition-colors animate-fade-in-stagger ${delayClass}`}
                  >
                    <td className="py-4 px-4">
                      <span className="text-slate-900 font-bold block">
                        {row.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {row.date}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={getStatusBadge(row.status)}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {row.sent.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {row.opens.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right relative">
                      <button
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === row.id ? null : row.id,
                          )
                        }
                        className="w-8 h-8 rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 inline-flex items-center justify-center text-slate-550 transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Popover Action Menu */}
                      {activeMenuId === row.id && (
                        <>
                          {/* Overlay backdrop to dismiss */}
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setActiveMenuId(null)}
                          />
                          <div
                            className="absolute right-4 mt-1 w-36 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-1.5 text-left animate-fade-in-up"
                            style={{ animationDuration: "0.15s" }}
                          >
                            {row.status === "Active" ? (
                              <button
                                onClick={() => {
                                  onUpdateCampaign(row.id, {
                                    status: "Paused",
                                  });
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-2 text-xs text-slate-750 hover:bg-slate-50 flex items-center gap-2 font-bold"
                              >
                                <Pause className="w-3.5 h-3.5 text-amber-500" />{" "}
                                Pause
                              </button>
                            ) : (
                              row.status !== "Completed" && (
                                <button
                                  onClick={() => {
                                    onUpdateCampaign(row.id, {
                                      status: "Active",
                                    });
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-2 text-xs text-slate-750 hover:bg-slate-50 flex items-center gap-2 font-bold"
                                >
                                  <Play className="w-3.5 h-3.5 text-emerald-500" />{" "}
                                  Resume
                                </button>
                              )
                            )}
                            <button
                              onClick={() => {
                                onDeleteCampaign(row.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-2 text-xs text-red-650 hover:bg-red-50 flex items-center gap-2 font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-slate-400 text-xs font-semibold"
                >
                  No campaigns found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
