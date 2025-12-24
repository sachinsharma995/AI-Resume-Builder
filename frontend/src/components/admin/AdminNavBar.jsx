import React, { useState } from "react";
import { User, LogOut, Settings } from "lucide-react";
import UptoSkillsLogo from "../../assets/UptoSkills.webp";
import { motion, AnimatePresence } from "framer-motion";

const AdminNavBar = ({ onLogout, onSettings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center  justify-between px-8 py-3 bg-slate-900 border-b border-gray-700 w-full relative">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <motion.img
          src={UptoSkillsLogo}
          alt="UptoSkills"
          className="w-28 sm:w-32 h-8 sm:h-10 object-contain"
          whileHover={{
            scale: 1.05,
            filter: "drop-shadow(0 0 12px rgba(99,102,241,0.9))",
          }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </div>

      {/* Center: Admin Panel text with corner frames */}
      <div className="relative flex justify-center items-center ">
        {/* Top-left corner frame */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500 rounded-sm"></div>

        {/* Bottom-right corner frame */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500 rounded-sm"></div>

        {/* Animated Center Text */}
        <motion.span
          className="text-white font-bold text-lg sm:text-xl tracking-wide z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Admin Panel
        </motion.span>
      </div>

      {/* Right: Account button */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition rounded-full bg-slate-800 p-2 sm:px-3 sm:py-1"
        >
          <User size={20} />
          <span className="hidden sm:inline text-sm">Account</span>
        </button>

        {/* Popout menu for small screens */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 5 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 bg-slate-800 border border-gray-700 rounded-md shadow-lg z-50 flex flex-col"
            >
              <button
                onClick={
                  onSettings ? onSettings : () => alert("Settings clicked")
                }
                className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-slate-700 transition"
              >
                <Settings size={18} /> Settings
              </button>
              <button
                onClick={onLogout ? onLogout : () => alert("Logout clicked")}
                className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-slate-700 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminNavBar;
