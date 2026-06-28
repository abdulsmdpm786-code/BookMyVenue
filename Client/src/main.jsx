import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./user-register/Login.jsx";
import Signup from "./user-register/Signup.jsx";
import VenueList from "./venue-list/VenueList.jsx";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import ProtectedLayout from "./Layout/ProtectedLayout.jsx";
import VenueDetail from "./venue-detail/VenueDetail.jsx";
import DashboardLayout from "./dashboard/DashboardLayout.jsx";
import Overview from "./dashboard/Overview/Overview.jsx";
import NewVenues from "./dashboard/NewVenues/NewVenues.jsx";
import Venues from "./dashboard/Venues/Venues.jsx";
import Users from "./dashboard/Users/Users.jsx";
import Organizers from "./dashboard/Organizers/Organizers.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route element={<ProtectedLayout role={"admin", "organizer"} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="new-venues" element={<NewVenues />} />
              <Route path="venues" element={<Venues />} />
              <Route path="users" element={<Users />} />
              <Route path="organizers" element={<Organizers />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
