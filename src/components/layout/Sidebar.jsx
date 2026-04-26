import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  X,
  Home,
  Building2,
  BookOpen,
  HelpCircle,
  Brain,
  Map,
  ClipboardList,
  DollarSign,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { useUiStore } from "../../store/uiStore";
import { useAuthStore } from "../../store/authStore";

const navItems = [
  { label: "Home", to: "/", icon: <Home size={18} /> },
  { label: "Companies", to: "/companies", icon: <Building2 size={18} /> },
  { label: "Experiences", to: "/interviews", icon: <BookOpen size={18} /> },
  { label: "Questions", to: "/questions", icon: <HelpCircle size={18} /> },
  { label: "Quizzes", to: "/quizzes", icon: <Brain size={18} /> },
  { label: "Roadmaps", to: "/roadmaps", icon: <Map size={18} /> },
  { label: "Salaries", to: "/salary-insights", icon: <DollarSign size={18} /> },
];

const candidateItems = [
  { label: "My Plans", to: "/preparation", icon: <ClipboardList size={18} /> },
  { label: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={18} /> },
];

const adminItems = [{ label: "Admin Panel", to: "/admin", icon: <Shield size={18} /> }];

const SidebarLink = ({ item, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));

  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
        transition-all duration-200
        ${isActive ? "bg-primary-600/20 text-primary-400" : "text-dark-400 hover:text-white hover:bg-dark-800"}
      `}
    >
      <span className={isActive ? "text-primary-400" : "text-dark-500"}>{item.icon}</span>
      {item.label}
    </Link>
  );
};

const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useUiStore();
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={closeSidebar} />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-dark-900 border-r border-dark-800
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-dark-800">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Dispatch" className="w-7 h-7 rounded-lg" />
            <span className="text-white font-bold">Dispatch</span>
          </Link>
          <button onClick={closeSidebar} className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4 px-3 space-y-1">
          {/* Main nav */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <SidebarLink key={item.to} item={item} onClick={closeSidebar} />
            ))}
          </div>

          {/* Candidate items */}
          {isAuthenticated && user?.role === "candidate" && (
            <div className="pt-4">
              <p className="px-4 pb-2 text-xs font-semibold text-dark-600 uppercase tracking-wider">My Space</p>
              {candidateItems.map((item) => (
                <SidebarLink key={item.to} item={item} onClick={closeSidebar} />
              ))}
            </div>
          )}

          {/* Admin items */}
          {isAuthenticated && user?.role === "admin" && (
            <div className="pt-4">
              <p className="px-4 pb-2 text-xs font-semibold text-dark-600 uppercase tracking-wider">Admin</p>
              {adminItems.map((item) => (
                <SidebarLink key={item.to} item={item} onClick={closeSidebar} />
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
