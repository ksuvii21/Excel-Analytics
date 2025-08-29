import axios from 'axios';

// Use relative path for API requests in development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API = axios.create({ baseURL: API_URL });

// Set up Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
const fetchUsers = async () => {
  try {
    const users = await adminAPI.getUsers();
    const filteredUsers = users.filter(u => u.role === 'user' || u.role === 'admin');
    setUsers(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    setLoading(false);
  }
};

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify'),
};

// File API
export const fileAPI = {
  uploadFile: (formData) => api.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getUserFiles: () => api.get('/files'),
  getFile: (id) => api.get(`/files/${id}`),
  deleteFile: (id) => api.delete(`/files/${id}`),
};

// Dashboard API
export const dashboardAPI = {
  getUserDashboard: () => api.get('/dashboard/user'),
  getAdminDashboard: () => api.get('/dashboard/admin'),
  getSuperAdminDashboard: () => api.get('/dashboard/superadmin'),
};

// Admin API
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`)
};

// History API
export const historyAPI = {
  saveAnalysis: (data) => API.post("/history", data),
  getUserHistory: (userId) => API.get(`/history/${userId}`),
  getSummary: (data) => API.post("/history/summary", data),
};

// In your API utility functions, add error handling
export const getUsers = async () => {
  try {
    const response = await axios.get('/api/admin/users');
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Endpoint not found. Please check the server routes.');
    } else if (error.response) {
      // The server responded with a status code outside 2xx
      console.error('Server error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response received
      console.error('Network error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export default api;