import React, { useState, useEffect, useContext } from "react";
import VenueNavbar from "../venue-list/VenueNavbar";
import UserProfileCard from "./UserProfileCard";
import BookedVenues from "./BookedVenues";
import AdminMessages from "./AdminMessages";
import { Calendar, Mail } from "lucide-react";
import { AuthContext } from "../Auth/AuthContext";
import AXIOS_API from "../Api/api";




export function Profile() {
  const { user } = useContext(AuthContext);
  console.log("uuu", user?.userId);
  const userId = user?.userId;

  
  const [activeTab, setActiveTab] = useState("bookings");
  const [userVenue, setUserVenue] = useState([]);

  const userVenues = async () => {
    try {
      const response = await AXIOS_API.get(`/api/v2/list/${userId}/venueUser`);
      setUserVenue(response.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    if (userId) {
      userVenues();
    }

    
  }, [userId]);


  console.log("ve...", userVenue.length);

  return (
    <div className="min-h-screen w-full font-sans bg-gradient-to-b from-[#D4CEB8] via-[#F4F1E6] to-[#FAF9F6] text-slate-800 selection:bg-ticket-yellow selection:text-slate-900 pb-20 relative overflow-x-hidden">
     
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ticket-orange/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-ticket-yellow/10 rounded-full blur-[140px] pointer-events-none"></div>

      
      <VenueNavbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-10 relative z-10">
       
        <div className="mb-8 animate-fade-in-up" style={{ opacity: 0 }}>
          <span className="text-xs font-bold text-ticket-orange uppercase tracking-widest pl-0.5">
            User Dashboard
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-850 to-ticket-orange">
              {user?.userName}
            </span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage your details, bookings, and host inquiries in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         
          <div
            className="lg:col-span-4 animate-fade-in-up"
            style={{ animationDelay: "0.15s", opacity: 0 }}
          >
            <UserProfileCard user={user}  />
          </div>

          <div
            className="lg:col-span-8 space-y-6 animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            <div className="bg-white border border-slate-200/80 p-2 rounded-2xl flex gap-2.5 shadow-sm">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 
                  transition-all duration-300 ${
                  activeTab === "bookings"
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Calendar className="w-4 h-4" />
                My Bookings
                {userVenue?.length > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition-colors ${
                      activeTab === "bookings"
                        ? "bg-ticket-yellow text-slate-900"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {userVenue?.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("messages")}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 
                  transition-all duration-300 ${
                  activeTab === "messages"
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Mail className="w-4 h-4" />
                Messages Center
                {/* {unreadMessagesCount > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition-colors ${
                      activeTab === "messages"
                        ? "bg-ticket-orange text-white"
                        : "bg-ticket-orange/15 text-ticket-orange"
                    }`}
                  >
                    {unreadMessagesCount}
                  </span>
                )} */}
              </button>
            </div>

           
            <div
              key={activeTab}
              className="bg-transparent rounded-2xl animate-fade-in-up"
              style={{ opacity: 0, animationDuration: "350ms" }}
            >
              {activeTab === "bookings" ? (
                <BookedVenues
                  bookings={userVenue}
                 
                />
              ) : (
                <AdminMessages
                  // messages={messages}
   
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
