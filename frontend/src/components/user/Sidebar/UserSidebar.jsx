import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  LayoutDashboard,
  FileText,
  FileUser,
  FilePen,
  CheckCircle,
  Files,
  Download,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";

// Constants
const SIDEBAR_WIDTH = {
  expanded: 256,
  collapsed: 80,
};

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
<<<<<<< Updated upstream
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((n) => !n.read).length;
=======
  const [isCollapsed, setIsCollapsed] = useState(false);
>>>>>>> Stashed changes

  // Check if mobile on mount and resize
  useEffect(() => {
<<<<<<< Updated upstream
    setIsCollapsed(!isMobile);
  }, [isMobile]);

  // Load user notifications from localStorage (simple shared store)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("userNotifications");
      if (raw) setNotifications(JSON.parse(raw));
    } catch (e) {
      setNotifications([]);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run once on mount
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
=======
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(false); // Reset collapse state on mobile
      }
>>>>>>> Stashed changes
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update collapse state based on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);

<<<<<<< Updated upstream
    // Notifications for users
    {
      id: "notifications",
      icon: Bell,
      label: "Notifications",
      path: "/user/notifications",
    },

    {
      id: "myresumes",
      icon: Files,
      label: "My Resumes",
      path: "/user/my-resumes",
    },
    {
      id: "downloads",
      icon: Download,
      label: "Downloads",
      path: "/user/downloads",
    },
  ];
=======
  const menuItems = useMemo(
    () => [
      {
        id: "dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/user/dashboard",
      },
      {
        id: "resume",
        icon: FileText,
        label: "AI Resume Builder",
        path: "/user/resume-builder",
      },
      {
        id: "cv",
        icon: FileUser,
        label: "CV",
        path: "/user/cv",
      },
      {
        id: "coverletter",
        icon: FilePen,
        label: "Cover Letter",
        path: "/user/cover-letter",
      },
      {
        id: "ats",
        icon: CheckCircle,
        label: "ATS Score Checker",
        path: "/user/ats-checker",
      },
      {
        id: "myresumes",
        icon: Files,
        label: "My Resumes",
        path: "/user/my-resumes",
      },
      {
        id: "downloads",
        icon: Download,
        label: "Downloads",
        path: "/user/downloads",
      },
    ],
    []
  );
>>>>>>> Stashed changes

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setIsMobileOpen(false);
    },
    [navigate]
  );

  const isActive = useCallback(
    (itemPath) => {
      if (itemPath === "/user/dashboard") {
        return location.pathname === "/user/dashboard";
      }
      return location.pathname.startsWith(itemPath);
    },
    [location.pathname]
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setIsMobileOpen(false);
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 100);
  };

  return (
    <>
      {/* Desktop Hamburger Button - Only visible on desktop */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:block fixed top-4 left-4 z-50 p-2 hover:bg-slate-50 rounded-lg transition-colors bg-white shadow-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white active:bg-white"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <RxHamburgerMenu size={24} className="text-slate-700" />
      </button>

      {/* Mobile menu toggle - Only visible on mobile */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-md border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white active:bg-white"
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? <X size={24} className="text-slate-700" /> : <Menu size={24} className="text-slate-700" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className="fixed top-0 left-0 z-40 bg-white border-r border-slate-200 flex flex-col"
        style={{
          width: isMobile ? SIDEBAR_WIDTH.expanded : isCollapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded,
          height: "100vh",
        }}
        animate={{ x: isMobile && !isMobileOpen ? -SIDEBAR_WIDTH.expanded : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
      >
        {/* Menu */}
        <nav className="p-3 space-y-2 mt-20 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center rounded-xl transition-all
<<<<<<< Updated upstream
                    ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3
                    ${active ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                    ${item.id === 'notifications' && unreadCount > 0 ? 'relative' : ''}`}
=======
                    ${isCollapsed && !isMobile ? "justify-center px-0" : "gap-3 px-4"} py-3 font-medium
                    ${active
                      ? "bg-blue-50 text-blue-600 font-bold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
>>>>>>> Stashed changes
                >
                  <Icon size={22} />
                  {(!isCollapsed || isMobile) && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                  {item.id === 'notifications' && unreadCount > 0 && (
                    <motion.div
                      className={`ml-auto w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg absolute -top-2 -right-2 transform translate-x-1/2 -translate-y-1/2 ${isCollapsed ? 'right-1 top-1' : ''}`}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.div>
                  )}
                </button>

                {/* Tooltip when collapsed - Desktop only */}
                <AnimatePresence>
                  {isCollapsed && !isMobile && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:flex pointer-events-none z-50"
                      role="tooltip"
                    >
                      <div className="bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                        {item.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-slate-200">
          <div className="relative group">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center rounded-xl transition-all text-red-500 hover:bg-red-50
                ${isCollapsed && !isMobile ? "justify-center px-0" : "gap-3 px-4"} py-3`}
            >
              <LogOut size={22} />
              {(!isCollapsed || isMobile) && <span>Logout</span>}
            </button>

            {/* Tooltip when collapsed - Desktop only */}
            {isCollapsed && !isMobile && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:flex pointer-events-none z-50"
                role="tooltip"
              >
                <div className="bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">
                  Logout
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Padding - To push content when sidebar expands/collapses */}
      <div
        className={`transition-all duration-300 min-h-screen bg-slate-50 pt-16
          ${isCollapsed && !isMobile ? "md:ml-[80px]" : "md:ml-[256px]"}`}
      >
        <Outlet />
      </div>
    </>
  );
}
