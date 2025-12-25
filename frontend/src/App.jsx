import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminHome from "./components/admin/AdminHome";
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LandingPage />} />

      {/* Admin routes with layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} /> {/* /admin */}
        <Route path="dashboard" element={<AdminDashboard />} />{" "}
        {/* /admin/dashboard */}
        {/* Add other admin pages here */}
      </Route>
    </Routes>
  );
};

export default App;
