import React, { useState } from "react";
import { Search } from "lucide-react";
import { useOutletContext } from "react-router-dom";

function BookingsDetails() {
  const { bookedVenues, isLoading } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSelect = (item) => {
    setSelectedDate(item._id);
  };

  //   const filteredItems = ()=>{
  //     const searchItem = bookedVenues.
  //   }

  console.log("booo", bookedVenues);

  return (
    <div className="max-w-none mx-auto space-y-6 animate-fade-in-up p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Booked Venues
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Booked venues will listed here.
          </p>
        </div>
      </div>

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
      </div>
      <div className="flex flex-row ">
        {bookedVenues.map((venue) =>
          venue.bookedRanges.map((item, i) => (
            <div
              onClick={() => handleSelect(item)}
              key={i}
              className={`px-5 ${selectedDate === item._id ? "bg-ticket-orange" : "bg-slate-300"}  rounded-lg py-2 flex mx-2 gap-2 
              font-medium cursor-pointer transition-colors text-xs `}
            >
              <span>{item.startDate.split("T")[0]} --</span>
              <span>{item.endDate.split("T")[0]}</span>
            </div>
          )),
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="group relative bg-[#F7F5EE] rounded-3xl overflow-hidden border
         border-slate-200/80 shadow-md flex flex-col h-full"
            >
              <div className="relative h-60 w-full bg-slate-200 animate-pulse"></div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-end justify-end gap-2">
                  <div className="h-4 w-10 bg-slate-200 rounded animate-pulse"></div>
                </div>

                <div className="mt-2 h-6 w-3/4 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="mt-2 h-4 w-1/2 bg-slate-200 rounded animate-pulse"></div>

                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-slate-200 rounded animate-pulse"></div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-8 w-16 bg-slate-200 rounded animate-pulse"></div>
                </div>

                <div className="flex gap-2 mt-4">
                  <div className="h-10 w-full bg-slate-200 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-full bg-slate-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div
            className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-sm font-sans 
            transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
          >
            <div className="bg-ticket-orange p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-400 overflow-hidden flex-shrink-0">
                  <img
                    src="https://i.pravatar.cc/150?img=32"
                    alt="Jason Gibson"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-white text-lg font-semibold leading-tight">
                    Jason Gibson
                  </h2>
                  <p className="text-white/90 text-sm mt-0.5">
                    Dates needed: 1/20/2024
                  </p>
                </div>
              </div>

              <div className="bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                $15/hr
              </div>
            </div>

            <div className="p-4 pt-3">
              <p className="text-gray-800 text-sm font-medium mb-2">
                Interests:{" "}
                <span className="text-blue-500 font-semibold">Football</span>
              </p>

              <div className="flex justify-between items-end gap-4 mt-2">
                <p className="text-gray-600 text-sm leading-relaxed max-w-[75%]">
                  "Hoping to find a young man to play some football with my son
                  on this day."
                </p>


              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingsDetails;
