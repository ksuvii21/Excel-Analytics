import { useAuth } from '../context/AuthContext';
import UserLayout from './UserLayout';
// Import other layouts as needed

export default function LayoutSwitcher({ children }) {
  const { user } = useAuth();

  switch (user?.role) {
    case 'user':
      return <UserLayout>{children}</UserLayout>;
    // Add cases for other roles
    default:
      return <div>{children}</div>;
  }
}