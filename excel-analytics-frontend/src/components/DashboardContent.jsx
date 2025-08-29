// src/components/DashboardContent.jsx
import React, { useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { 
  FileText, 
  BarChart3, 
  Database, 
  Download, 
  Share, 
  Trash2, 
  RefreshCw,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

const DashboardContent = () => {
  const { stats, files, loading, error, pagination, refetchData } = useDashboardData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchData();
    setIsRefreshing(false);
  };

  if (loading && !isRefreshing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 flex items-start">
          <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Please check your connection and try again.</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Files</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalFiles}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Charts Created</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalCharts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Database className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage Used</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatFileSize(stats.storageUsed)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Files */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Files</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your recently uploaded files</p>
          </div>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium">
            View all
          </button>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {files.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No files uploaded yet</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by uploading your first Excel file.</p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload File
                </button>
              </div>
            </div>
          ) : (
            files.map((file) => (
              <div key={file._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{file.filename || 'Unnamed file'}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;