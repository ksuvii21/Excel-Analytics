import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Settings, 
  LogOut,
  User,
  HelpCircle,
  Bell,
  Menu,
  X,
  Search,
  BarChart3,
  Shield,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard/admin') setActiveTab('Dashboard');
    else if (path === '/admin/users') setActiveTab('User Management');
    else if (path === '/landing') setActiveTab('Landing');
    else if (path === '/presentation') setActiveTab('Analyse');
  }, [location]);

  const links = [
    { to: '/dashboard/admin', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { to: '/presentation', label: 'Analyse', icon: <TrendingUp className="h-5 w-5" /> },
    { to: '/admin/users', label: 'User Management', icon: <Users className="h-5 w-5" /> },
    { to: '/landing', label: 'Landing', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    nav('/');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-blue-700 text-white">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-semibold">Admin Panel</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`bg-blue-800 text-white w-64 flex-shrink-0 md:flex flex-col h-screen fixed md:sticky top-0 z-10 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <p className="text-blue-200 text-sm">ADMIN DASHBOARD</p>
            </div>
          </div>
          
          <div className="bg-blue-900/50 rounded-lg p-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-700 p-2 rounded-lg">
                <User className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{currentUser?.name || 'Admin User'}</p>
                <p className="text-blue-300 text-xs truncate">{currentUser?.email || 'admin@example.com'}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => {
                  e.preventDefault();
                  nav(link.to);
                  setActiveTab(link.label);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === link.label
                    ? 'bg-white/10 backdrop-blur-md shadow-lg'
                    : 'hover:bg-blue-700/50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeTab === link.label
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                    : 'bg-blue-700/30 text-blue-300'
                }`}>
                  {link.icon}
                </div>
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700/50 text-blue-200 transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-blue-700/30 text-blue-300">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{activeTab}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeTab === 'Dashboard' 
                ? 'Admin overview and metrics' 
                : activeTab === 'User Management'
                ? 'Manage system users'
                : activeTab === 'Analyse'
                ? 'Analyze your data'
                : 'Landing page'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden md:block">
                <p className="font-medium text-gray-800 dark:text-white">{currentUser?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Account</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-800">
          {children}
        </div>
        
        {/* Footer */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2023 Excel Analytics Admin Panel. All rights reserved.
        </div>
      </div>
    </div>
  );
}