import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  BarChart3,
  LogOut,
  Sparkles,
  Home,
  Plus,
} from "lucide-react";
import UptoSkillsLogo from "../../assets/UptoSkills.webp";
import { motion } from "framer-motion";

export default function AdminBottomNav() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "create", icon: Plus, label: "Create-Templatess" },
    { id: "resumes", icon: FileText, label: "Resumes-Templates" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-gray-400">
      {/* Top Header */}
      {/* <div className="flex items-center justify-center py-4 border-b border-gray-700 relative">
        <img
          src={UptoSkillsLogo}
          alt="UptoSkills"
          className="w-32 h-10 object-contain"
        />
        <span className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold text-lg tracking-wide">
          Admin Panel
        </span>
      </div> */}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-gray-700 flex justify-around items-center p-2 z-50">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex flex-col items-center justify-center transition-all ${
                isActive
                  ? "text-white scale-110"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <motion.div
                animate={{
                  scale: isActive ? [1, 1.3, 1] : 1,
                  rotate: isActive ? [0, 15, -15, 0] : 0,
                }}
                transition={{ duration: 0.6 }}
              >
                <Icon size={24} />
              </motion.div>
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
