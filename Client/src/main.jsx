import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./user-register/Login.jsx";
import Signup from "./user-register/Signup.jsx";
import VenueList from "./venue-list/VenueList.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import ProtectedLayout from "./Layout/ProtectedLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/venues" element={<VenueList />} />
          <Route element={<ProtectedLayout role="admin" />}>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
