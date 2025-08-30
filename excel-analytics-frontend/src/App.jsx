import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from '../src/components/AdminRoute';
import SuperAdminRoute from '../src/components/SuperAdminRoute';

// Import pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard';
import Upload from './pages/Upload';
import Presentation from './pages/Presentation';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import Admin from './pages/admin';

// Dashboard redirect component (needs to be inside AuthProvider)
// Dashboard redirect component
// Dashboard redirect component
function DashboardRedirect() {
  const { user, loading } = useAuth();
  useEffect(() => {
  console.log('App - Auth state changed:', { user, loading });
  }, [user, loading]);
  console.log('DashboardRedirect - user:', user, 'loading:', loading);

  if (loading) {
    console.log('DashboardRedirect - Still loading');
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (user) {
    console.log('DashboardRedirect - User found, redirecting based on role:', user.role);
    switch(user.role) {
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      case 'superadmin':
        return <Navigate to="/dashboard/superadmin" replace />;
      default:
        return <Navigate to="/dashboard/user" replace />;
    }
  }
  
  console.log('DashboardRedirect - No user found, redirecting to login');
  return <Navigate to="/login" replace />;
}

function RequireRole({ roles, children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!roles.includes(payload.role)) return <Navigate to="/unauthorized" replace />;
  } catch {}
  return children;
}

export default function App() {
  return (
    <BrowserRouter basename="/Excel-Analytics">
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/admin" element={<RequireRole roles={['admin','superadmin']}><Admin /></RequireRole>} />

          {/* Protected routes with role-based access */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/dashboard/user" element={<UserDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
            <Route path="/dashboard/superadmin" element={<SuperAdminDashboard />} />
            <Route path="/superadmin/presentation" element={<Presentation />} />
            <Route path="/superadmin/register" element={<Register />} />
          </Route>

          {/* Redirect to appropriate dashboard based on role */}
          <Route 
            path="/dashboard" 
            element={<Navigate to="/dashboard/redirect" replace />} 
          />
          
          <Route 
            path="/dashboard/redirect" 
            element={<DashboardRedirect />} 
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
