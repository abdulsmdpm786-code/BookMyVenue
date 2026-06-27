import React from "react";
import { 
  X, MapPin, Star, Users, Check, XCircle, 
  Wifi, Coffee, Shield, Music, MonitorPlay, Wind
} from 'lucide-react';

function DetailModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up">
      {/* Modal Container - Wide and constrained height for scrolling */}
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-[24px] bg-[#fdfdfc] shadow-2xl
       max-h-[90vh] animate-fade-in-up">
        {/* Floating Close Button */}
        <button
        //   onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero Image Section */}
          <div className="relative h-64 w-full sm:h-96 shrink-0 bg-gray-100">
            <img
              src="/api/placeholder/1200/600"
              alt="Aurora Grand Theatre"
              className="h-full w-full object-cover"
            />
            {/* Category Badge */}
            <div className="absolute bottom-6 right-6 rounded-full bg-[#FFD700] px-4 py-1.5 text-xs font-bold tracking-widest text-black shadow-md">
              THEATRE
            </div>
          </div>

          {/* Detailed Content Section */}
          <div className="p-6 sm:p-8 lg:p-10 text-[#1a1f2c]">
            {/* Header Row: Title & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Aurora Grand Theatre
                </h2>
                <div className="mt-2 flex items-center gap-1.5 text-base text-gray-500">
                  <MapPin className="h-4.5 w-4.5" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-lg font-bold">
                <Star className="h-6 w-6 fill-[#FFC107] text-[#FFC107]" />
                4.9{" "}
                <span className="text-sm font-normal text-gray-400">
                  (124 reviews)
                </span>
              </div>
            </div>

            {/* Main Details Grid */}
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
              {/* Left Column: Description & Long Text (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-xl font-bold mb-3">About the Venue</h3>
                  <p className="leading-relaxed text-[#596274]">
                    A state-of-the-art performing arts theatre featuring premium
                    seating, advanced stage technology, and unparalleled
                    acoustics. Perfect for large-scale productions and
                    prestigious corporate events.
                  </p>
                  <p className="mt-4 leading-relaxed text-[#596274]">
                    The venue boasts a 60-foot proscenium arch, fully automated
                    fly system, and an orchestra pit capable of accommodating a
                    50-piece ensemble. Recently renovated in 2023, it includes
                    modernized backstage facilities, VIP green rooms, and
                    accessible seating throughout the auditorium.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4">Premium Amenities</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Wifi className="h-5 w-5 text-gray-400" /> High-Speed WiFi
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MonitorPlay className="h-5 w-5 text-gray-400" /> 4K
                      Projection
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Music className="h-5 w-5 text-gray-400" /> Surround Sound
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Wind className="h-5 w-5 text-gray-400" /> Climate Control
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Shield className="h-5 w-5 text-gray-400" /> 24/7 Security
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Coffee className="h-5 w-5 text-gray-400" /> Catering Prep
                      Area
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-3">Approval Notes</h3>
                  <div className="rounded-xl bg-amber-50 p-4 border border-amber-100">
                    <p className="text-sm text-amber-800">
                      <strong>Pending checks:</strong> Fire safety certificate
                      expires next month. Please verify renewal status with the
                      host before final approval.
                    </p>
                  </div>
                </section>
              </div>

              {/* Right Column: Key Stats (1/3 width) */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Key Specifications
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Maximum Capacity
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-lg">
                        <Users className="h-5 w-5 text-[#FFD700]" />
                        Up to 1800 guests
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">
                        Base Pricing
                      </div>
                      <div className="text-3xl font-extrabold tracking-tight">
                        ₹25,000
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        per hour
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">
                        Minimum Booking
                      </div>
                      <div className="font-semibold text-lg">4 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer for Actions */}
        <div className="border-t border-gray-100 bg-white p-4 sm:px-8 sm:py-5 shrink-0 flex items-center justify-between">
          <button className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
            Request Changes
          </button>

          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-2.5 text-sm font-bold text-red-700 transition-all hover:bg-red-100 focus:ring-2 focus:ring-red-200 focus:outline-none">
              <XCircle className="h-4 w-4" />
              Reject
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#1a1f2c] px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-black focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:outline-none">
              <Check className="h-4 w-4" />
              Approve Venue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
