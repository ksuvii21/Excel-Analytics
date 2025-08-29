import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import UserManagement from '../../components/admin/UserManagement';
import { Users, FileText, BarChart3, Activity, Shield, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      {/* Enhanced Background */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-16 right-24 w-36 h-36 bg-gradient-to-r from-blue-500/15 to-indigo-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-24 left-16 w-44 h-44 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-indigo-400/15 to-purple-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '6s' }} />
        
        {/* Admin-themed floating elements */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400/20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Grid pattern with admin theme */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/60 dark:from-zinc-800/95 dark:to-blue-900/30 backdrop-blur-md border border-blue-200/40 dark:border-blue-700/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-indigo-600/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400/20 to-indigo-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors duration-300 mb-1">156</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    +12 this month
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Files Uploaded Card */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-emerald-50/60 dark:from-zinc-800/95 dark:to-emerald-900/30 backdrop-blur-md border border-emerald-200/40 dark:border-emerald-700/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-green-600/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-400/20 to-green-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 transition-colors duration-300 mb-1">342</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Files Uploaded</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    +28 today
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Created Card */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-purple-50/60 dark:from-zinc-800/95 dark:to-purple-900/30 backdrop-blur-md border border-purple-200/40 dark:border-purple-700/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-violet-600/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-400/20 to-violet-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-purple-600 transition-colors duration-300 mb-1">128</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Charts Created</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    +15 this week
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Sessions Card */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-orange-50/60 dark:from-zinc-800/95 dark:to-orange-900/30 backdrop-blur-md border border-orange-200/40 dark:border-orange-700/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-amber-600/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-400/20 to-amber-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 transition-colors duration-300 mb-1">24</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Sessions</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-orange-600 dark:text-orange-400 font-medium">
                    <Clock className="h-4 w-4 mr-2" />
                    Real-time
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced User Management Section */}
        <div className="grid gap-8">
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-zinc-800/90 dark:to-blue-900/20 backdrop-blur-sm border border-white/30 dark:border-zinc-700/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-indigo-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Enhanced border glow */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-400/30 to-indigo-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Section Header */}
                <div className="flex items-center mb-8">
                  <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl mr-6 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors duration-300 mb-2">User Management</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Monitor and manage system users</p>
                  </div>
                </div>
                
                {/* Quick Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">142</div>
                        <div className="text-sm text-blue-500 dark:text-blue-300 font-medium">Active Users</div>
                      </div>
                      <div className="p-3 bg-blue-500 rounded-xl">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-200/30 dark:border-emerald-700/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">14</div>
                        <div className="text-sm text-emerald-500 dark:text-emerald-300 font-medium">New Today</div>
                      </div>
                      <div className="p-3 bg-emerald-500 rounded-xl">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-orange-200/30 dark:border-orange-700/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</div>
                        <div className="text-sm text-orange-500 dark:text-orange-300 font-medium">Pending Review</div>
                      </div>
                      <div className="p-3 bg-orange-500 rounded-xl">
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Management Component */}
                <UserManagement />
                
              </div>
            </div>
          </div>
        </div>

        {/* Admin Quick Actions */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-zinc-800/80 dark:to-blue-900/20 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">Manage Users</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add, edit, or remove users</p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/80 to-emerald-50/50 dark:from-zinc-800/80 dark:to-emerald-900/20 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors duration-300">View Reports</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">System analytics & insights</p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-zinc-800/80 dark:to-purple-900/20 backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 transition-colors duration-300">Security</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage permissions & roles</p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/80 to-orange-50/50 dark:from-zinc-800/80 dark:to-orange-900/20 backdrop-blur-sm border border-orange-200/30 dark:border-orange-700/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 transition-colors duration-300">Activity Log</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monitor system activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
