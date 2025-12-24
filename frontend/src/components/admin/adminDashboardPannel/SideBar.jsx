import React from "react";
import { Home, User, Settings, LogOut } from "lucide-react"; // lucide icons

const SideBar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        MyApp
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4">
        <ul className="space-y-4">
          <li className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition">
            <Home className="mr-3" />
            Home
          </li>
          <li className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition">
            <User className="mr-3" />
            Profile
          </li>
          <li className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition">
            <Settings className="mr-3" />
            Settings
          </li>
        </ul>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition">
          <LogOut className="mr-3" />
          Logout
        </div>
      </div>
    </div>
  );
};

export default SideBar;
