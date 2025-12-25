import React from "react";
import { Users, FileText, Sparkles, TrendingUp, Plus } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Templates",
      value: "36",
      icon: FileText,
      color: "text-green-400",
    },
    {
      title: "AI Requests",
      value: "8,920",
      icon: Sparkles,
      color: "text-pink-400",
    },
    {
      title: "Growth",
      value: "+18%",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Overview of platform performance & activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-700 transition"
            >
              <div className={`p-3 rounded-xl bg-slate-800 ${item.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">{item.title}</p>
                <p className="text-2xl font-semibold">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <ul className="space-y-4">
            {[
              "New resume template added",
              "AI model updated",
              "5 new users registered",
              "Analytics report generated",
            ].map((activity, idx) => (
              <li key={idx} className="flex items-center gap-3 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
              <Plus size={18} />
              Create Template
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
              <Users size={18} />
              Manage Users
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
              <Sparkles size={18} />
              AI Settings
            </button>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">Analytics Overview</h2>
        <div className="h-64 flex items-center justify-center text-slate-500 border border-dashed border-slate-700 rounded-xl">
          Chart will go here (Recharts / Chart.js)
        </div>
      </div>
    </div>
  );
}
