import { FileText, Plus, Sparkles, Users } from "lucide-react";
import React from "react";
export default function AdminHome() {
  const cards = [
    {
      icon: <Plus className="text-blue-500" size={28} />,
      title: "Create Template",
      desc: "Add a new resume template",
      hover: "hover:border-blue-500",
    },
    {
      icon: <FileText className="text-green-400" size={28} />,
      title: "Resume Templates",
      desc: "View & manage templates",
      hover: "hover:border-green-400",
    },
    {
      icon: <Users className="text-yellow-400" size={28} />,
      title: "Users",
      desc: "Manage platform users",
      hover: "hover:border-yellow-400",
    },
    {
      icon: <Sparkles className="text-pink-400" size={28} />,
      title: "AI Models",
      desc: "Configure AI features",
      hover: "hover:border-pink-400",
    },
  ];

  return (
    <div className="flex-1 flex flex-col p-5 sm:p-8 lg:p-10">
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Welcome, Admin 👋
        </h1>
        <p className="text-slate-400 mt-3 max-w-2xl text-sm sm:text-base lg:text-lg">
          Manage resume templates, users, and AI-powered features from one
          powerful dashboard.
        </p>
        <p className="text-slate-500 mt-2 italic text-xs sm:text-sm">
          Tip: Check analytics regularly to track template performance.
        </p>
      </div>

      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          Quick Actions
        </h2>
        <p className="text-slate-400 mt-1 text-sm sm:text-base">
          Jump straight into managing your platform.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 flex-1">
        {cards.map((card) => (
          <button
            key={card.title}
            className={`flex flex-col gap-4 p-6 rounded-2xl bg-gray-800 
            border border-gray-700 ${card.hover}
            hover:bg-gray-700 transition-all duration-200
            hover:-translate-y-1 shadow-lg`}
          >
            {card.icon}
            <div className="text-left">
              <p className="font-semibold text-base sm:text-lg">{card.title}</p>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {card.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-14 text-center text-xs sm:text-sm text-slate-500">
        © {new Date().getFullYear()} AI Resume Builder Admin Panel
      </footer>
    </div>
  );
}
