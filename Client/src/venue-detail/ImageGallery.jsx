import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export function ImageGallery({ images = [] }) {
  // Store the indices of images assigned to slots: 
  // slots[0] is the main large slot, slots[1] is top right, slots[2] is bottom right
  const [slots, setSlots] = useState([0, 1, 2]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [fadeState, setFadeState] = useState(false);

  const swapSlots = (clickedSlotIndex) => {
    if (clickedSlotIndex === 0) {
      // Main image clicked -> open lightbox
      setLightboxIndex(slots[0]);
      setLightboxOpen(true);
      return;
    }

    setFadeState(true);
    setTimeout(() => {
      setSlots((prevSlots) => {
        const nextSlots = [...prevSlots];
        // Swap slots[0] and slots[clickedSlotIndex]
        const temp = nextSlots[0];
        nextSlots[0] = nextSlots[clickedSlotIndex];
        nextSlots[clickedSlotIndex] = temp;
        return nextSlots;
      });
      setFadeState(false);
    }, 200); // match fade duration
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full relative">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px] md:h-[450px]">
        {/* Main Large Image Slot */}
        <div 
          onClick={() => swapSlots(0)}
          className={`md:col-span-2 h-full rounded-[2rem] overflow-hidden relative cursor-pointer group bg-slate-900 border border-slate-200/50 shadow-md transition-all duration-300 ${
            fadeState ? 'opacity-80 scale-[0.99]' : 'opacity-100 scale-100'
          }`}
        >
          <img 
            src={images[slots[0]]} 
            alt="Main property view" 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
          
          {/* Zoom Overlay Icon */}
          <div className="absolute bottom-6 right-6 bg-white/70 hover:bg-white backdrop-blur-md text-slate-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 active:scale-95">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Right Stack Slot */}
        <div className="flex flex-row md:flex-col gap-4 h-full">
          {/* Top Right Slot */}
          <div 
            onClick={() => swapSlots(1)}
            className={`flex-1 rounded-[2rem] overflow-hidden relative cursor-pointer group bg-slate-900 border border-slate-200/50 shadow-sm transition-all duration-300 ${
              fadeState ? 'opacity-80 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            <img 
              src={images[slots[1]]} 
              alt="Property detail top" 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>

          {/* Bottom Right Slot */}
          <div 
            onClick={() => swapSlots(2)}
            className={`flex-1 rounded-[2rem] overflow-hidden relative cursor-pointer group bg-slate-900 border border-slate-200/50 shadow-sm transition-all duration-300 ${
              fadeState ? 'opacity-80 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            <img 
              src={images[slots[2]]} 
              alt="Property detail bottom" 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        </div>
      </div>

      {/* Full Screen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-55 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center border border-white/10 shadow-lg transition-colors active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Main image container */}
          <div 
            className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={images[lightboxIndex]} 
              alt={`Gallery detail view ${lightboxIndex + 1}`} 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* Left Nav Arrow */}
            <button 
              onClick={handlePrevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-12 h-12 rounded-full flex items-center justify-center border border-white/10 shadow-md transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button 
              onClick={handleNextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-12 h-12 rounded-full flex items-center justify-center border border-white/10 shadow-md transition-colors active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image index count */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs font-semibold tracking-wider">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
