import React from "react";
import AdminHome from "./components/admin/AdminHome";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
