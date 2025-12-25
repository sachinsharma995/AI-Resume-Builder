import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import UptoSkillsLogo from "../../assets/UptoSkills.webp";
import { motion } from "framer-motion";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "home", icon: Home, label: "Home", path: "/admin" },
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      id: "resumes",
      icon: FileText,
      label: "Resumes-Templates",
      path: "/admin/templates",
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Analytics",
      path: "/admin/analytics",
    },
    {
      id: "ai-models",
      icon: Sparkles,
      label: "AI Models",
      path: "/admin/ai-models",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md bg-slate-900 text-white shadow-lg"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 z-50 min-h-screen flex flex-col bg-slate-900 border-r border-slate-700`}
        initial={{ x: "-100%" }}
        animate={{ x: isMobileOpen || window.innerWidth >= 768 ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ width: isCollapsed ? 80 : 256 }} // matches w-20 / w-64
      >
        {/* Header */}
        <div className="relative p-4 border-b border-slate-700 h-20 flex items-center">
          {!isCollapsed && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src={UptoSkillsLogo}
                alt="UptoSkills"
                className="w-40 h-10 object-contain"
                whileHover={{
                  scale: 1.05,
                  filter: "drop-shadow(0 0 12px rgba(99,102,241,0.9))",
                }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <span className="font-bold text-white text-lg mt-1">
                Admin Panel
              </span>
            </motion.div>
          )}

          {/* Collapse Button */}
          <div className="ml-auto hidden md:block z-10">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 mt-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-slate-950 text-white shadow-lg border-gray-500 border-t border-r"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700">
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
