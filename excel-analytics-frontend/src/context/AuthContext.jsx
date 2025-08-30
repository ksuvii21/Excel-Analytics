import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://excel-analytics-zo51.onrender.com/api";

  if (token && userData) {
    try {
      const parsedUser = JSON.parse(userData);

      fetch(`${API_BASE}/api/users/${parsedUser.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then(dbUser => {
          const mergedUser = { ...parsedUser, ...dbUser };
          setUser(mergedUser);
          localStorage.setItem('user', JSON.stringify(mergedUser));
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch user profile:", err);
          logout(); // clear invalid session
          setLoading(false);
        });
    } catch (error) {
      console.error("Error parsing user data:", error);
      logout();
      setLoading(false);
    }
  } else {
    setLoading(false);
  }
}, []);



const login = async (credentials) => {
  try {
    console.log('AuthContext: Starting login process');
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000);
    });

    // Race the fetch against the timeout
const response = await Promise.race([
  fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }),
  timeoutPromise
]);

    console.log('AuthContext: Received response, status:', response.status);
    
    // Check if response is OK before trying to parse JSON
    if (!response.ok) {
      // If server returns an error status, try to get error message from response
      let errorMessage = 'Login failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If we can't parse JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      console.log('AuthContext: Login failed with message:', errorMessage);
      return { success: false, error: errorMessage };
    }
    
    // If response is OK, parse JSON
    const data = await response.json();
    console.log('AuthContext: Response data:', data);

    console.log('AuthContext: Login successful');
    // Store user data and token
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return { success: true };
  } catch (error) {
    console.error('AuthContext: Login error:', error);
    return { 
      success: false, 
      error: error.message || 'Network error. Please try again.' 
    };
  }
};

const register = async (userData) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Check if response is OK before trying to parse JSON
    if (!response.ok) {
      let errorMessage = 'Registration failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      return { success: false, error: errorMessage };
    }

    const data = await response.json();

    // Store user data and token
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: error.message || 'Network error. Please try again.' 
    };
  }
};
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
