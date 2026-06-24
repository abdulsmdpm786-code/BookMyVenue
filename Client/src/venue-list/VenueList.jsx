import React, { useEffect, useMemo, useState } from "react";
import { Search, Heart } from "lucide-react";
import { venues } from "./venuesData";
import VenueNavbar from "./VenueNavbar";
import VenueHero from "./VenueHero";
import VenueFilters from "./VenueFilters";
import VenueCard from "./VenueCard";
import AXIOS_API from "../Api/api";

export function VenueList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [venueData, setVenueData] = useState([]);

  console.log("sort..", selectedCategory);

  const handleFetch = async () => {
    try {
      const venueRes = await AXIOS_API.get("/api/v2/list/getAll");
      console.log(venueRes.data.venue);
      setVenueData(venueRes.data.venue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const filteredVenues = useMemo(() => {
    return venueData
      .filter((item) => {
        const matchSearch = item.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchCapacity = Number(item.capacity) >= Number(selectedCapacity);
        const matchCategory =
          selectedCategory === "All" || item.type.toLowerCase().includes(selectedCategory.toLowerCase()) 

        return matchSearch && matchCapacity && matchCategory;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          return a.price - b.price;
        }
        if (sortBy === "price-high") {
          return b.price - a.price;
        }
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }
      });
  }, [venueData, selectedCapacity, searchQuery, sortBy, selectedCategory]);

  const categories = [...new Set(venueData.map((item) => item.type))];

  console.log("serach...", filteredVenues);


  const sortedVenues = venues;

  return (
    <div
      className="min-h-screen w-full font-sans bg-gradient-to-b from-[#D4CEB8] via-[#F4F1E6] to-[#FAF9F6]
     text-slate-800 selection:bg-ticket-yellow selection:text-slate-900 pb-20 relative overflow-x-hidden"
    >
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-stagger {
          opacity: 0;
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-0 { animation-delay: 0ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-450 { animation-delay: 450ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-750 { animation-delay: 750ms; }
      `}</style>

      {/* Decorative Light Glows */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ticket-orange/5 rounded-full blur-[160px] 
      pointer-events-none"
      ></div>
      <div
        className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-ticket-yellow/10 rounded-full blur-[140px] 
      pointer-events-none"
      ></div>

      {/* Header / Navbar */}
      <VenueNavbar />

      {/* Hero Section */}
      <VenueHero />

      {/* Interactive Filter & List Section */}
      <main className="w-full px-6 md:px-12 relative z-10 mt-6">
        <div className="max-w-7xl mx-auto">
          {/* Controls / Filters */}
          <VenueFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCapacity={selectedCapacity}
            setSelectedCapacity={setSelectedCapacity}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          {/* Listing Results Summary */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-500 text-sm font-medium">
              Showing{" "}
              <span className="text-slate-900 font-bold">
                {sortedVenues.length}
              </span>{" "}
              venues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venueData.map((venue, index) => (
              <VenueCard key={venue._id} venue={venue} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default VenueList;
