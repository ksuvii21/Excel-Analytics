import React from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';
import UserManagement from '../../components/admin/UserManagement';
import SystemMetrics from '../../components/superadmin/SystemMetrics';
import { Users, FileText, BarChart3, Server, Shield, Database, Monitor, Zap, Globe, TrendingUp, AlertCircle, PieChart } from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <SuperAdminLayout>
      {/* Enhanced Background with Super Admin Theme */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {/* Animated gradient orbs with purple/violet theme */}
        <div className="absolute top-20 right-32 w-40 h-40 bg-gradient-to-r from-purple-500/12 to-violet-600/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-gradient-to-r from-indigo-400/8 to-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/5 right-1/4 w-32 h-32 bg-gradient-to-r from-violet-400/10 to-pink-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '7s' }} />
        <div className="absolute top-1/4 left-1/3 w-36 h-36 bg-gradient-to-r from-purple-600/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Enhanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Hexagonal pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Super Admin Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Total Users Card */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-purple-50/70 dark:from-zinc-800/95 dark:to-purple-900/40 backdrop-blur-lg border border-purple-200/50 dark:border-purple-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 hover:scale-[1.03]">
              {/* Multi-layer animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '0.2s' }} />
              
              {/* Enhanced glow effect */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-400/30 to-violet-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-5 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 rounded-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">256</div>
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Users</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    +23 this month
                  </div>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Files Uploaded Card */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-cyan-50/70 dark:from-zinc-800/95 dark:to-cyan-900/40 backdrop-blur-lg border border-cyan-200/50 dark:border-cyan-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 hover:scale-[1.03]">
              {/* Multi-layer animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '0.2s' }} />
              
              {/* Enhanced glow effect */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-400/30 to-blue-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-5 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">642</div>
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Files Uploaded</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    +47 today
                  </div>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Created Card */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-emerald-50/70 dark:from-zinc-800/95 dark:to-emerald-900/40 backdrop-blur-lg border border-emerald-200/50 dark:border-emerald-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 hover:scale-[1.03]">
              {/* Multi-layer animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tl from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '0.2s' }} />
              
              {/* Enhanced glow effect */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-400/30 to-green-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-5 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                    <BarChart3 className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">328</div>
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Charts Created</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    +31 this week
                  </div>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* System Health Card */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-rose-50/70 dark:from-zinc-800/95 dark:to-rose-900/40 backdrop-blur-lg border border-rose-200/50 dark:border-rose-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 hover:scale-[1.03]">
              {/* Multi-layer animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/5 via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '0.2s' }} />
              
              {/* Enhanced glow effect */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-rose-400/30 to-pink-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-5 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 rounded-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                    <Server className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">98%</div>
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">System Health</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Zap className="h-5 w-5 mr-2" />
                    All systems operational
                  </div>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pie Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* User Distribution Chart */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-purple-50/70 dark:from-zinc-800/95 dark:to-purple-900/40 backdrop-blur-lg border border-purple-200/50 dark:border-purple-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-400/30 to-violet-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <PieChart className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User Distribution</h3>
                
                {/* Simplified Pie Chart Visualization */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-8 border-purple-500"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-indigo-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-violet-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 75% 0%, 100% 50%)' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent">100%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span>Admins: 12%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                    <span>Editors: 45%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-violet-500 rounded-full mr-2"></div>
                    <span>Viewers: 43%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Usage Chart */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-cyan-50/70 dark:from-zinc-800/95 dark:to-cyan-900/40 backdrop-blur-lg border border-cyan-200/50 dark:border-cyan-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-400/30 to-blue-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Storage Usage</h3>
                
                {/* Simplified Pie Chart Visualization */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-8 border-cyan-400"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">72%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                    <span>Used: 72%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Free: 28%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Rate Chart */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/95 to-emerald-50/70 dark:from-zinc-800/95 dark:to-emerald-900/40 backdrop-blur-lg border border-emerald-200/50 dark:border-emerald-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-400/30 to-green-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Activity Rate</h3>
                
                {/* Simplified Pie Chart Visualization */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-8 border-emerald-400"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-teal-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">89%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
                    <span>Active: 65%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Idle: 24%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                    <span>Offline: 11%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Main Content Grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* User Management Container */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-50/90 to-purple-100/80 dark:from-purple-900/30 dark:to-purple-800/40 backdrop-blur-md border border-purple-200/50 dark:border-purple-700/40 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Enhanced border glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-400/25 to-violet-600/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="p-4 bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800 rounded-2xl shadow-2xl mr-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-purple-600 transition-colors duration-300 mb-2">Advanced User Management</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Full system user control and administration</p>
                  </div>
                </div>
                
                {/* Enhanced User Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 rounded-2xl p-4 border border-purple-200/40 dark:border-purple-700/40 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">189</div>
                        <div className="text-sm text-purple-500 dark:text-purple-300 font-medium">Total Active</div>
                      </div>
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 rounded-2xl p-4 border border-indigo-200/40 dark:border-indigo-700/40 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">12</div>
                        <div className="text-sm text-indigo-500 dark:text-indigo-300 font-medium">Admins</div>
                      </div>
                      <div className="p-2 bg-indigo-500 rounded-lg">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div id="users" className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                  <UserManagement />
                </div>
              </div>
            </div>
          </div>

          {/* System Metrics Container */}
          <div className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/90 to-cyan-50/60 dark:from-zinc-800/90 dark:to-cyan-900/30 backdrop-blur-md border border-white/30 dark:border-zinc-700/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Enhanced border glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400/25 to-blue-600/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="p-4 bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl mr-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Monitor className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-cyan-600 transition-colors duration-300 mb-2">System Metrics</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Real-time system performance monitoring</p>
                  </div>
                </div>
                
                {/* Enhanced System Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl p-4 border border-emerald-200/40 dark:border-emerald-700/40 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.9%</div>
                        <div className="text-sm text-emerald-500 dark:text-emerald-300 font-medium">Uptime</div>
                      </div>
                      <div className="p-2 bg-emerald-500 rounded-lg">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-4 border border-orange-200/40 dark:border-orange-700/40 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">2.3GB</div>
                        <div className="text-sm text-orange-500 dark:text-orange-300 font-medium">Memory</div>
                      </div>
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <Database className="h-5 w-5 text-white" />
                      </div>
                    </div>
                </div>
                </div>

                <SystemMetrics />
              </div>
            </div>
          </div>
        </div>

        {/* System Status Banner */}
        <div className="mt-8 group">
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/20 via-green-400/20 to-teal-500/20 dark:from-emerald-900/40 dark:via-green-800/40 dark:to-teal-900/40 backdrop-blur-sm border border-emerald-300/30 dark:border-emerald-600/30 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-green-300/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 transition-colors duration-300">System Status: All Systems Operational</h4>
                  <p className="text-gray-600 dark:text-gray-400">Last updated: 2 minutes ago • Next maintenance: Sunday 3:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
