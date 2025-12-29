// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import AdminHome from "./components/admin/AdminHome";
// import AdminUsers from "./components/admin/AdminUser/AdminUsers";
// import LandingPage from "./pages/Landingpage";
// import AdminLayout from "./components/admin/AdminLayout";

// import AdminDashboard from "./components/admin/AdminDashboard/AdminDashboard";
// import AdminCreateTemplate from "./components/admin/AdminCreateTemplates/AdminCreateTemplate";

// const App = () => {
//   return (
//     <Routes>
//       {/* Public route */}
//       <Route path="/" element={<LandingPage />} />

//       {/* Admin routes with layout */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminHome />} /> {/* /admin */}
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route
//           path="/admin/create-templates"
//           element={<AdminCreateTemplate />}
//         />
//         <Route path="/admin/user" element={<AdminUsers />} />
//         {/* /admin/dashboard */}
//         {/* Add other admin pages here */}
//       </Route>
//     </Routes>
//   );
// };

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landingpage";

import AdminLayout from "./components/admin/AdminLayout";

import AdminDashboard from "./components/admin/AdminDashboard/AdminDashboard";
import AdminCreateTemplate from "./components/admin/AdminCreateTemplates/AdminCreateTemplate";
import AdminUsers from "./components/admin/AdminUser/AdminUsers";
import Resume from "./components/admin/resume";
import AdminSubscription from "./components/admin/AdminSubscription/AdminSubscription";
import AdminAcceptUser from "./components/admin/AdminAcceptUserTemplate/AdminAcceptUser";
import AdminAnalytics from "./components/admin/AdminAnalytics/AdminAnalytics";
import TemplateDocs from "./components/admin/AdminCreateTemplates/TemplateDocs";

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LandingPage />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} /> {/* /admin */}
        <Route path="create-templates" element={<TemplateDocs />} />
        <Route path="templates" element={<Resume />} />
        <Route path="users" element={<AdminUsers />} /> {/* ✅ FIXED */}
        <Route path="templates" element={<Resume />} />
        <Route path="subscription" element={<AdminSubscription />} />
        <Route path="/admin/template-requests" element={<AdminAcceptUser />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
      </Route>
    </Routes>
  );
};

export default App;
