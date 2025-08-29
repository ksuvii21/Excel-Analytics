import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  console.log('ProtectedRoute - user:', user, 'loading:', loading, 'allowedRoles:', allowedRoles);
  
  if (loading) {
    console.log('ProtectedRoute - Still loading');
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log('ProtectedRoute - User role not allowed, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }
  
  console.log('ProtectedRoute - Access granted');
  return <Outlet />;
};

export default ProtectedRoute;
