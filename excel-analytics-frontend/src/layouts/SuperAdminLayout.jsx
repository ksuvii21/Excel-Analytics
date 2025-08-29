import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  Users,
  Settings,
  LogOut,
  User,
  Bell,
  Menu,
  X,
  Search,
  BarChart3,
  Shield,
  Database,
  Presentation,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import UserManagement from '../components/admin/UserManagement.jsx';

const navLinks = [
  { to: '/dashboard/superadmin', label: 'Dashboard', icon: BarChart3 },
  { to: '#users', label: 'User Management', icon: Users },
  { to: '/superadmin/presentation', label: 'Analyse', icon: Presentation },
  { to: '/superadmin/register', label: 'Add User', icon: UserPlus },
];

export default function SuperAdminLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;
    
    if (path === '/dashboard/superadmin') setActiveTab('Dashboard');
    else if (hash === '#users') setActiveTab('User Management');
    else if (path === '/superadmin/presentation') setActiveTab('Analyse');
    else if (path === '/superadmin/register') setActiveTab('Add User');
  }, [location]);

  const handleLogout = () => {
    logout();
    nav('/');
  };

  const handleNavClick = (to, label) => {
    if (to === '#users') {
      setActiveTab('User Management');
    }
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-purple-700 text-white">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-semibold">Super Admin Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-purple-800 text-white w-64 flex-shrink-0 flex flex-col h-screen fixed top-0 left-0 z-10 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-purple-700">
          {/* Branding */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Super Admin</h2>
              <p className="text-purple-200 text-sm">SYSTEM ADMINISTRATOR</p>
            </div>
          </div>

          {/* User profile */}
          <div className="bg-purple-900/50 rounded-lg p-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-700 p-2 rounded-lg">
                <User className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{currentUser?.name || 'Super Admin'}</p>
                <p className="text-purple-300 text-xs truncate">{currentUser?.email || 'superadmin@example.com'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => handleNavClick(to, label)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === label
                    ? 'bg-white/10 backdrop-blur-md shadow-lg'
                    : 'hover:bg-purple-700/50'
                }`
              }
              aria-current={activeTab === label ? 'page' : undefined}
            >
              <div
                className={`p-2 rounded-lg ${
                  activeTab === label
                    ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white'
                    : 'bg-purple-700/30 text-purple-300'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-purple-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-700/50 text-purple-200 transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-purple-700/30 text-purple-300">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{activeTab}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeTab === 'Dashboard'
                ? 'System overview and metrics'
                : activeTab === 'User Management'
                ? 'Manage all users and admins'
                : activeTab === 'Analyse'
                ? 'Analyze system data and performance'
                : 'Add new users to the system'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-400 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser?.name?.charAt(0) || 'S'}
              </div>
              <div className="hidden md:block">
                <p className="font-medium text-gray-800 dark:text-white">{currentUser?.name || 'Super Admin'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin Account</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-800">
          {activeTab === 'User Management' ? (
            <div id="users" className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
              <UserManagement />
            </div>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Excel Analytics Super Admin Panel. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
