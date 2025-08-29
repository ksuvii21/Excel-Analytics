import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  // Render appropriate dashboard based on user role
  switch (user.role) {
    case 'user':
      return <UserDashboard />;
    case 'admin':
      return <div>Admin Dashboard - To be implemented</div>;
    case 'superadmin':
      return <div>SuperAdmin Dashboard - To be implemented</div>;
    default:
      return <div>Loading...</div>;
  }
}