// src/hooks/useDashboardData.js
import { useState, useEffect } from 'react';
import { dashboardAPI, fileAPI } from '../utils/api';

export const useDashboardData = () => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalCharts: 0,
    storageUsed: 0,
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalFiles: 0
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch dashboard data and file stats in parallel
      const [dashboardResponse, filesResponse] = await Promise.all([
        dashboardAPI.getUserDashboard(),
        fileAPI.getUserFiles(1, 5) // Get first 5 files
      ]);
      
      // Extract data from responses
      const dashboardData = dashboardResponse.data;
      const filesData = filesResponse.data;
      
      // Update stats
      setStats({
        totalFiles: dashboardData.totalFiles || 0,
        totalCharts: dashboardData.totalCharts || 0,
        storageUsed: dashboardData.storageUsed || 0,
      });
      
      // Update files
      setFiles(filesData.files || []);
      setPagination({
        currentPage: filesData.currentPage || 1,
        totalPages: filesData.totalPages || 1,
        totalFiles: filesData.totalFiles || 0
      });
      
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      
      // Set fallback data for development
      setStats({
        totalFiles: 12,
        totalCharts: 8,
        storageUsed: 2.4 * 1024 * 1024, // 2.4 MB
      });
      
      setFiles([
        { 
          _id: '1', 
          filename: 'sales-report-q3.xlsx', 
          fileSize: 245760, 
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
          _id: '2', 
          filename: 'customer-data-2023.xlsx', 
          fileSize: 512000, 
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() 
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await fileAPI.getUserFiles(page, limit);
      const filesData = response.data;
      
      setFiles(filesData.files || []);
      setPagination({
        currentPage: filesData.currentPage || 1,
        totalPages: filesData.totalPages || 1,
        totalFiles: filesData.totalFiles || 0
      });
    } catch (err) {
      console.error('Files fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    files,
    loading,
    error,
    pagination,
    refetchData: fetchDashboardData,
    refetchFiles: fetchFiles
  };
};