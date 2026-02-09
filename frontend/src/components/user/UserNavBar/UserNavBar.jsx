import React, { useState, useEffect } from "react";
import { Bell, User, X, CheckCircle2, AlertTriangle, Info, Clock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import UptoSkillsLogo from "../../../assets/UptoSkills.webp";

export default function UserNavbar({ onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: "System",
      text: "Your resume has been successfully updated.",
      type: "success",
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false
    },
    {
      id: 2,
      user: "AI Coach",
      text: "You have a new suggestion for your skills section.",
      type: "info",
      time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      isRead: false
    },
    {
      id: 3,
      user: "System",
      text: "Your subscription is expiring soon.",
      type: "warning",
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true
    },
    {
      id: 4,
      user: "Support",
      text: "Your ticket #1234 has been resolved.",
      type: "success",
      time: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      isRead: true
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const displayNotifications = activeTab === 'unread' ? unreadNotifications : notifications;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const handleMarkRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getAvatarColor = (user) => {
    const name = user?.toLowerCase() || '';
    if (name.includes('system')) return 'bg-blue-500';
    if (name.includes('ai')) return 'bg-purple-500';
    if (name.includes('support')) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const formatTimeAgo = (time) => {
    if (!time) return 'Just now';
    const now = new Date();
    const notificationTime = new Date(time);
    const diffMs = now - notificationTime;
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200 md:z-50 z-20">
      {/* Logo */}
      <img
        src={UptoSkillsLogo}
        alt="UptoSkills"
        onClick={() => navigate("/")}
        className="w-40 h-10 md:ml-8 ml-10 object-contain cursor-pointer hover:opacity-90 transition-opacity"
      />

      {/* Right actions */}
      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
          >
            <Bell size={22} />
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
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
                  className="fixed inset-0 bg-black/30 z-[60] backdrop-blur-sm"
                  onClick={() => setShowNotifications(false)}
                />

                {/* Sidebar */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 w-80 sm:w-96 bg-white shadow-2xl border-l border-gray-100 z-[70] flex flex-col"
                >
                  {/* Header */}
                  <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-900 font-semibold text-lg">Notifications</h4>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={markAllAsRead}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          Mark all read
                        </button>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                      <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'all'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setActiveTab('unread')}
                        className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'unread'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        Unread
                      </button>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="flex-1 overflow-y-auto min-h-0 bg-white">
                    {displayNotifications.length === 0 ? (
                      <div className="px-6 py-12 text-center h-full flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100/50 rounded-full flex items-center justify-center mb-4">
                          <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-900 font-medium mb-1">No notifications</p>
                        <p className="text-gray-500 text-sm">You're all caught up!</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {displayNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`group relative p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
                            onMouseEnter={() => setHoveredId(notification.id)}
                            onMouseLeave={() => setHoveredId(null)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm ring-2 ring-white ${getAvatarColor(notification.user)}`}>
                                {notification.user.charAt(0).toUpperCase()}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <h3 className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'text-gray-700 font-medium'}`}>
                                    {notification.user}
                                  </h3>
                                  <span className="text-[10px] text-gray-400 flex-shrink-0 bg-gray-50 px-1.5 py-0.5 rounded-full border border-gray-100">
                                    {formatTimeAgo(notification.time)}
                                  </span>
                                </div>

                                <p className={`text-sm leading-snug ${!notification.isRead ? 'text-gray-900' : 'text-gray-500'}`}>
                                  {notification.text}
                                </p>

                                <div className="mt-3 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {!notification.isRead && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMarkRead(notification.id);
                                      }}
                                      className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                    >
                                      <CheckCircle2 size={12} />
                                      Mark read
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(notification.id);
                                    }}
                                    className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                                  >
                                    <Trash2 size={12} />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex-shrink-0 p-4 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        // Navigate to full page if exists, or just close
                        navigate('/user/dashboard');
                      }}
                      className="w-full py-2.5 text-sm text-center text-gray-700 font-medium hover:bg-white hover:shadow-sm hover:border-gray-300 rounded-lg transition-all border border-gray-200 bg-white shadow-sm"
                    >
                      View all
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <span className="hidden sm:block text-sm text-gray-800 font-medium">User</span>
        </div>
      </div>
    </header>
  );
}
