import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Bell, ChevronDown, User, Settings, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../common/Avatar";
import Badge from "../common/Badge";

import Logo from "../../assets/logo.png";

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        text-sm font-medium transition-colors duration-200
        ${isActive ? "text-white" : "text-dark-400 hover:text-white"}
      `}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { toggleSidebar } = useUiStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    setUserMenu(false);
    logout.mutate();
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-dark-800">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* ------------------------------------------------ */}
          {/* Left — Logo + mobile menu                        */}
          {/* ------------------------------------------------ */}
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Dispatch" className="w-8 h-8 rounded-lg" />
              <span className="text-white font-bold text-lg hidden sm:block">Dispatch</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6 ml-6">
              <NavLink to="/companies">Companies</NavLink>
              <NavLink to="/interviews">Experiences</NavLink>
              <NavLink to="/questions">Questions</NavLink>
              <NavLink to="/quizzes">Quizzes</NavLink>
              <NavLink to="/roadmaps">Roadmaps</NavLink>
              <NavLink to="/salary-insights">Salaries</NavLink>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Right — Search + Auth                            */}
          {/* ------------------------------------------------ */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
            >
              <Search size={18} />
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="relative p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
                >
                  <Bell size={18} />
                  {/* Unread badge — will be dynamic later */}
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
                </Link>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenu(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-dark-800 transition-colors"
                  >
                    <Avatar src={user?.avatar} name={user?.name} size="sm" />
                    <span className="hidden sm:block text-sm text-dark-200 max-w-25 truncate">{user?.name}</span>
                    <ChevronDown
                      size={14}
                      className={`text-dark-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenu(false)} />

                      <div className="absolute right-0 top-12 z-20 w-56 card shadow-xl py-1">
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-dark-800">
                          <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                          <p className="text-xs text-dark-400 truncate">{user?.email}</p>
                          <Badge variant="primary" size="sm" className="mt-1.5">
                            {user?.role}
                          </Badge>
                        </div>

                        {/* Menu items */}
                        <div className="py-1">
                          <DropdownItem
                            icon={<LayoutDashboard size={15} />}
                            label="Dashboard"
                            to="/dashboard"
                            onClick={() => setUserMenu(false)}
                          />
                          <DropdownItem
                            icon={<User size={15} />}
                            label="My Profile"
                            to={`/profile/${user?.username}`}
                            onClick={() => setUserMenu(false)}
                          />
                          <DropdownItem
                            icon={<Settings size={15} />}
                            label="Edit Profile"
                            to="/profile/edit"
                            onClick={() => setUserMenu(false)}
                          />

                          {user?.role === "admin" && (
                            <DropdownItem
                              icon={<Shield size={15} />}
                              label="Admin Panel"
                              to="/admin"
                              onClick={() => setUserMenu(false)}
                            />
                          )}

                          {user?.role === "candidate" && (
                            <DropdownItem
                              icon={<LayoutDashboard size={15} />}
                              label="My Plans"
                              to="/preparation"
                              onClick={() => setUserMenu(false)}
                            />
                          )}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-dark-800 py-1">
                          <button
                            onClick={handleLogout}
                            disabled={logout.isPending}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-dark-800 transition-colors"
                          >
                            <LogOut size={15} />
                            {logout.isPending ? "Logging out..." : "Logout"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              /* Guest buttons */
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-sm py-2 px-3">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-3">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search bar — expandable */}
        {searchOpen && (
          <div className="py-3 border-t border-dark-800">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                autoFocus
                type="text"
                placeholder="Search companies, interviews, questions..."
                className="input-base pl-9 pr-9"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Reusable dropdown item
const DropdownItem = ({ icon, label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-800 transition-colors"
  >
    <span className="text-dark-400">{icon}</span>
    {label}
  </Link>
);

export default Navbar;
