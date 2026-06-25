import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { venues } from "../venue-list/venuesData";
import VenueNavbar from "../venue-list/VenueNavbar";
import ImageGallery from "./ImageGallery";
import VenueHeader from "./VenueHeader";
import VenueFeatures from "./VenueFeatures";
import VenueAbout from "./VenueAbout";
import VenueAmenities from "./VenueAmenities";
import BookingCard from "./BookingCard";
import ActionModals from "./ActionModals";
import AXIOS_API from "../Api/api";

export function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null); // 'contact', 'tour', or null

  const venueDetails = async () => {
    try {
      const response = await AXIOS_API.get(`/api/v2/list/getOne/${id}`);
      console.log("venue..", response);
    } catch (error) {
      console.log(error);
    }
  };

  // Find the requested venue
  const venue = venues.find((v) => v.id === parseInt(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    venueDetails()
  }, [id]);

  if (!venue) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-[#D4CEB8] via-[#F4F1E6] to-[#FAF9F6] font-sans
       flex flex-col items-center justify-center p-6 text-center venue-detail-page"
      >
        <div className="bg-[#F7F5EE] border border-slate-200 rounded-[2rem] p-8 max-w-sm w-full shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Venue Not Found
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            The listing you are trying to view does not exist or has been
            removed.
          </p>
          <Link
            to="/venues"
            className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-sm transition-colors active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full font-sans bg-gradient-to-b from-[#D4CEB8] via-[#F4F1E6] to-[#FAF9F6]
     text-slate-800 selection:bg-ticket-yellow selection:text-slate-900 pb-20 relative overflow-x-hidden venue-detail-page"
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ticket-orange/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-ticket-yellow/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Header Navigation */}
      <VenueNavbar />

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 mt-6 relative z-10">
        {/* Breadcrumb / Back Button Link */}
        <div className="mb-6 flex items-center justify-between animate-fade-in-up-stagger delay-75">
          <Link
            to="/venues"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-ticket-orange transition-colors duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </Link>

          <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
            Product Code: TS-00{venue.id}
          </div>
        </div>

        {/* Gallery Section */}
        <section className="mb-8 animate-fade-in-up-stagger delay-150">
          <ImageGallery images={venue.images} />
        </section>

        {/* Two Column details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Info, Features, Description, Amenities */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Title Header area */}
            <section className="bg-white/50 border border-slate-200/50 rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] animate-fade-in-up-stagger delay-225">
              <VenueHeader venue={venue} />
            </section>

            {/* Features Info grid */}
            <section className="bg-white/50 border border-slate-200/50 rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] animate-fade-in-up-stagger delay-300">
              <VenueFeatures venue={venue} />
            </section>

            {/* About / Description text */}
            <section className="bg-white/50 border border-slate-200/50 rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] animate-fade-in-up-stagger delay-375">
              <VenueAbout venue={venue} />
            </section>

            {/* Grid of Amenities */}
            <section className="animate-fade-in-up-stagger delay-450">
              <VenueAmenities venue={venue} />
            </section>
          </div>

          {/* Right Column: Pricing & Booking Sidebar */}
          <div className="lg:col-span-1 animate-fade-in-up-stagger delay-300">
            <BookingCard
              venue={venue}
              onContactAgent={() => setModalType("contact")}
              onScheduleTour={() => setModalType("tour")}
            />
          </div>
        </div>
      </main>

      {/* Booking Form Modals */}
      {modalType && (
        <ActionModals
          type={modalType}
          venue={venue}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}

export default VenueDetail;
