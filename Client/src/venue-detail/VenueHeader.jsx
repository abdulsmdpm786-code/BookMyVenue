import React, { useState } from 'react';
import { Share2, Bookmark, MoreHorizontal, AlertCircle, Download, Printer, Heart } from 'lucide-react';

export function VenueHeader({ venue }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => {
      setShowShareToast(false);
    }, 2000);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-4 relative">
      {/* Title and Address info */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {venue.name}
        </h1>
        <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-1.5">
          <span className="text-slate-400">Premium location</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-350"></span>
          <span className="text-slate-400">Luxury amenities</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-350"></span>
          <span className="text-slate-400">City views</span>
        </p>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">
          {venue.location}
        </p>
      </div>

      {/* Interactive Action Buttons */}
      <div className="flex items-center gap-2 md:self-start relative">
        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="w-11 h-11 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
          title="Share Listing"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Wishlist Bookmark Button */}
        <button 
          onClick={handleBookmarkToggle}
          className={`w-11 h-11 border rounded-full flex items-center justify-center shadow-sm transition-all duration-305 hover:scale-105 active:scale-90 ${
            isBookmarked 
              ? 'bg-red-500 border-red-500 text-white' 
              : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-600 hover:text-red-500'
          }`}
          title={isBookmarked ? "Remove from Saved" : "Save to Wishlist"}
        >
          <Heart className={`w-4 h-4 transition-transform duration-300 ${isBookmarked ? 'scale-115 fill-current text-white' : ''}`} />
        </button>

        {/* Triple Dot Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowMenuDropdown(!showMenuDropdown)}
            className="w-11 h-11 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
            title="More Actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {/* Menu Dropdown Popup */}
          {showMenuDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowMenuDropdown(false)}
              ></div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#FAF9F6] border border-slate-200/80 rounded-2xl shadow-xl py-2 z-50 animate-fade-in origin-top-right">
                <button 
                  onClick={() => { setShowMenuDropdown(false); alert("Brochure download started!"); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-slate-450" /> Download Brochure
                </button>
                <button 
                  onClick={() => { setShowMenuDropdown(false); window.print(); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-450" /> Print Details
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button 
                  onClick={() => { setShowMenuDropdown(false); alert("Listing reported successfully."); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50/55 flex items-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" /> Report Listing
                </button>
              </div>
            </>
          )}
        </div>

        {/* Copy Link Toast Notification */}
        {showShareToast && (
          <div className="absolute bottom-full right-0 mb-3 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5 animate-fade-in-up z-50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450"></span>
            Link Copied to Clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default VenueHeader;
