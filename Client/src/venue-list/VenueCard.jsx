import React, { useState } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Users,
  ArrowUpRight,
} from "lucide-react";

export function VenueCard({ venue,  index = 0 }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % venue.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex(
      (prev) => (prev - 1 + venue.images.length) % venue.images.length,
    );
  };

  const delayClass = `delay-${(index % 6) * 150}`;

  return (
    <div
      className={`group relative bg-[#F7F5EE] rounded-3xl overflow-hidden border
         border-slate-200/80 hover:border-slate-350 shadow-md hover:shadow-xl transition-all duration-500 
         hover:-translate-y-1.5 flex flex-col h-full cursor-pointer fadeInUp ${delayClass}`}
    >
      {/* Image Gallery Area */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={venue.image}
          alt={`${venue.name} - View ${currentImgIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

        {/* Carousel Arrow Buttons */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevImage}
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center border border-slate-200 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center border border-slate-200 shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-4 flex gap-1 z-10">
          {/* {venue.images.map((_, idx) => (
            <span 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentImgIndex ? 'bg-ticket-yellow w-3.5' : 'bg-white/60'
              }`}
            />
          ))} */}
        </div>

        {/* Category Label */}
        <span
          className="absolute bottom-4 right-4 bg-ticket-yellow text-slate-900 text-[10px] 
        font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm"
        >
          {venue.type}
        </span>
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-end justify-end gap-2">
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
            <Star className="w-3.5 h-3.5 fill-ticket-yellow text-ticket-yellow" />
            <span>{venue.rating}</span>
          </div>
        </div>

        <h3 className="mt-2 text-lg font-bold text-slate-900 leading-snug group-hover:text-ticket-orange transition-colors duration-300">
          {venue.name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-slate-500 text-xs">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{venue.place}</span>
        </div>

        <p className="mt-3 text-slate-600 text-xs line-clamp-2 leading-relaxed">
          {venue.description}
        </p>

        {/* Footer Area */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">
              Up to {venue.capacity} guests
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-slate-900">
              ${venue.price}
            </span>
            <span className="text-[10px] text-slate-400 block">/ hour</span>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full mt-4 bg-slate-50 hover:bg-ticket-orange text-slate-700 hover:text-white py-2.5 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1 group/btn border border-slate-250/60 active:scale-95 animate-fade-in"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

export default VenueCard;
