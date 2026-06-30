import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useAuth from "../Auth/useAuth";
import AXIOS_API from "../Api/api";
import DetailModal from "./NewVenues/DetailModal";

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  const isAdmin = user.role === "admin";
  const isOrganizer = user.role === "organizer";
  const userId = user.userId;
  // console.log("ooo", user);

  const [users, setUsers] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [venues, setVenues] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [detailModal, setDetailModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserFetch = async () => {
    try {
      if (isAdmin) {
        const userResponse = await AXIOS_API.get("/api/v1/register/getAll");
        setUsers(
          userResponse.data.users.filter((item) => item.role === "user"),
        );
        setOrganizers(
          userResponse.data.users.filter((item) => item.role === "organizer"),
        );
      }

      // if(isOrganizer){

      // }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleApprove = (data) => {
    setSelectedVenue("");
    setSelectedVenue(data);
    setDetailModal(true);
  };

  const handleVenueFetch = async () => {
    setIsLoading(true);
    try {
      if (isAdmin) {
        const venueRes = await AXIOS_API.get("/api/v2/list/getAll");
        setVenues(venueRes.data.venue);
      }

      if (isOrganizer) {
        const venueRes = await AXIOS_API.get(`/api/v2/list/venueOrg/${userId}`);
        setVenues(venueRes.data.venue);
      }
    } catch (error) {
      console.error("Failed to fetch venues", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await AXIOS_API.put(`/api/v2/list/verify/${id}`);
      handleVenueFetch();

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setDetailModal(false);
    }
  };

  // console.log("se...",selectedVenue.organiZerId);

  const org = organizers.filter(
    (i) => i.organiZerId === selectedVenue?.organiZerId,
  );

  useEffect(() => {
    handleUserFetch();
    handleVenueFetch();
  }, []);

  return (
    <div
      className="h-screen w-full flex bg-gradient-to-b from-[#D4CEB8] via-[#F4F1E6] to-[#FAF9F6]
     text-slate-800 font-sans overflow-hidden animate-fade-in-up"
    >
      <div className="hidden xl:flex flex-shrink-0 h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex flex-col bg-[#F7F5EE] w-64 h-full animate-slide-in-left z-50">
            <Sidebar
              sidebarOpen={true}
              setSidebarOpen={() => {}}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {detailModal && (
        <DetailModal
          venue={selectedVenue}
          organizer={org}
          onClose={() => setDetailModal(false)}
          fetchVenue={handleVenueFetch}
          verify={handleVerify}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 p-5 space-y-4 custom-scrollbar">
          <Outlet
            context={{
              user,
              users,
              setUsers,
              organizers,
              setOrganizers,
              venues,
              setVenues,
              handleApprove,
              isLoading,
              handleVerify,
            }}
          />
        </main>
      </div>
    </div>
  );
}
