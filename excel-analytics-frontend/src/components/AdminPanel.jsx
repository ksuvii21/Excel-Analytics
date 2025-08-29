// components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({});

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  // Fetch users and analytics data
  useEffect(() => {
    // Implement API calls to get users and analytics
    const fetchData = async () => {
      try {
        // Mock data - replace with actual API calls
        const mockUsers = [
          { id: 1, email: 'user1@example.com', role: 'user', uploads: 5 },
          { id: 2, email: 'user2@example.com', role: 'user', uploads: 3 },
        ];
        
        const mockAnalytics = {
          totalUsers: 10,
          totalUploads: 47,
          storageUsed: '2.3GB'
        };
        
        setUsers(mockUsers);
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl">{analytics.totalUsers || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Uploads</h3>
          <p className="text-3xl">{analytics.totalUploads || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Storage Used</h3>
          <p className="text-3xl">{analytics.storageUsed || '0GB'}</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Uploads</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.uploads}</td>
                <td>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;