import React, { useState, useEffect } from "react";
import { Bell, X, FileCheck, Repeat, FileText, Star, DollarSign, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import UptoSkillsLogo from "../../../assets/UptoSkills.webp";

const SIDEBAR_WIDTH = {
  expanded: 256,
  collapsed: 80,
};

export default function AdminNavbar({ isCollapsed }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "John Doe",
      description: "New resume template approved",
      time: "2 min ago",
      icon: FileCheck,
      iconColor: "text-white",
      iconBg: "bg-blue-500",
      isUnread: true,
      category: "today"
    },
    {
      id: 2,
      title: "Jane Smith",
      description: "User subscription renewed",
      time: "15 min ago",
      icon: Repeat,
      iconColor: "text-white",
      iconBg: "bg-green-500",
      isUnread: true,
      category: "today"
    },
    {
      id: 3,
      title: "Sarah Wilson",
      description: "New resume template submitted for review",
      time: "1 hr ago",
      icon: FileText,
      iconColor: "text-white",
      iconBg: "bg-purple-500",
      isUnread: true,
      category: "today"
    },
    {
      id: 4,
      title: "Mike Chen",
      description: "Premium plan activated",
      time: "yesterday",
      icon: Star,
      iconColor: "text-white",
      iconBg: "bg-orange-500",
      isUnread: false,
      category: "older"
    },
    {
      id: 5,
      title: "Emma Davis",
      description: "New payment received: $49.99",
      time: "2 days ago",
      icon: DollarSign,
      iconColor: "text-white",
      iconBg: "bg-teal-600",
      isUnread: false,
      category: "older"
    }
  ]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, isUnread: false } : n
    ));
  };

  // Limit notifications to prevent scrolling (e.g., show top 4)
  const displayedNotifications = notifications.slice(0, 4);

  // Calculate spacer width based on sidebar state
  const spacerWidth = isMobile
    ? 72 // Fixed space for mobile (for the hamburger button)
    : isCollapsed
      ? SIDEBAR_WIDTH.collapsed
      : SIDEBAR_WIDTH.expanded;

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 transition-all ${showNotifications ? 'z-[60]' : 'z-30'}`}>
      <div className="h-full flex items-center justify-between pr-6">

        {/* LEFT SECTION - Logo moves with sidebar */}
        <div className="flex items-center">
          {/* ANIMATED SPACER - Syncs with sidebar width */}
          <motion.div
            animate={{ width: spacerWidth }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 25,
              mass: 0.8
            }}
            className="h-full flex-shrink-0"
          />

          {/* LOGO - Moves smoothly as spacer changes */}
          <div
            className="flex items-center cursor-pointer ml-4"
            onClick={() => navigate("/")}
          >
            <img
              src={UptoSkillsLogo}
              alt="UptoSkills"
              className="h-8 object-contain"
            />
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button
              onClick={() => setShowNotifications((p) => !p)}
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
              aria-label="Notifications"
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/10 z-[60] backdrop-blur-[2px]"
                    onClick={() => setShowNotifications(false)}
                  />

                  {/* Sidebar */}
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 bottom-0 w-[420px] bg-white shadow-2xl z-[70] flex flex-col overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex-shrink-0 px-8 py-6 bg-white flex items-center justify-between border-b border-gray-50">
                      <h2 className="text-2xl font-bold text-gray-900">Alerts ({unreadCount})</h2>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-8 py-6">

                      {/* TODAY SECTION */}
                      {displayedNotifications.some(n => n.category === 'today') && (
                        <div className="mb-0">
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Today</h3>
                          <div className="space-y-8">
                            {displayedNotifications.filter(n => n.category === 'today').map(notification => (
                              <NotificationItem
                                key={notification.id}
                                data={notification}
                                onMarkRead={handleMarkRead}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* OLDER SECTION */}
                      {displayedNotifications.some(n => n.category === 'older') && (
                        <div className="mt-8">
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Older</h3>
                          <div className="space-y-8">
                            {displayedNotifications.filter(n => n.category === 'older').map(notification => (
                              <NotificationItem
                                key={notification.id}
                                data={notification}
                                onMarkRead={handleMarkRead}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          navigate('/admin/notifications');
                        }}
                        className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline py-2 transition-all"
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

// Separate component for cleaner render
function NotificationItem({ data, onMarkRead }) {
  const Icon = data.icon;

  return (
    <div className="flex gap-5 group">
      {/* Icon Column */}
      <div className="flex-shrink-0 relative">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${data.iconBg} ${data.iconColor}`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        {data.isUnread && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full translate-x-1 -translate-y-1"></span>
        )}
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{data.title}</h4>
          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{data.time}</span>
        </div>

        <p className="text-[13px] text-gray-500 leading-relaxed max-w-[95%] mb-2">
          {data.description}
        </p>

        {data.isUnread && (
          <button
            onClick={() => onMarkRead(data.id)}
            className="text-[13px] font-bold text-blue-600 hover:text-blue-700 transition-all cursor-pointer"
          >
            Mark as read
          </button>
        )}

        {/* Nested Items (for Dashboard type) */}
        {data.subItems && (
          <div className="mt-4 space-y-4">
            {data.subItems.map((sub, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <sub.icon size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{sub.text}</p>
                  <p className="text-xs font-medium text-gray-400">{sub.subText}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}