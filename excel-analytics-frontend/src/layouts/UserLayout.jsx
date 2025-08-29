import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  FileSpreadsheet, 
  Settings, 
  LogOut,
  BarChart4,
  User,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function UserLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('My Charts');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('Home');
    else if (path === '/dashboard') setActiveTab('My Charts');
    else if (path === '/upload') setActiveTab('Analyse');
    else if (path === '/register') setActiveTab('Add User');
  }, [location]);

  const links = [
    { to: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { to: '/dashboard', label: 'My Charts', icon: <LineChart className="h-5 w-5" /> },
    { to: '/upload', label: 'Analyse', icon: <FileSpreadsheet className="h-5 w-5" /> },
    { to: '/register', label: 'Add User', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    nav('/');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-indigo-700 text-white">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">
              {currentUser?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <span className="font-semibold">Excel Analytics</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`bg-indigo-800 text-white w-64 flex-shrink-0 flex flex-col fixed md:sticky top-0 z-10 transition-transform duration-300 h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-indigo-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">
                {currentUser?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold">Excel Analytics</h2>
              <p className="text-indigo-200 text-sm">USER DASHBOARD</p>
            </div>
          </div>
          
          <div className="bg-indigo-900/50 rounded-lg p-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-700 p-2 rounded-lg">
                <User className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{currentUser?.name || 'User Name'}</p>
                <p className="text-indigo-300 text-xs truncate">{currentUser?.email || 'user@example.com'}</p>
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
                    : 'hover:bg-indigo-700/50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeTab === link.label
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                    : 'bg-indigo-700/30 text-indigo-300'
                }`}>
                  {link.icon}
                </div>
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-indigo-700 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-700/50 text-indigo-200 transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-indigo-700/30 text-indigo-300">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-0">
        {/* Topbar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{activeTab}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeTab === 'My Charts' 
                ? 'Upload Excel and visualize your data' 
                : activeTab === 'Analyse'
                ? 'Upload and analyze your spreadsheets'
                : 'Manage your account and preferences'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block">
                <p className="font-medium text-gray-800 dark:text-white">{currentUser?.name || 'Username'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Free Account</p>
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
          © 2023 Excel Analytics Dashboard. All rights reserved.
        </div>
      </div>
    </div>
  );
}