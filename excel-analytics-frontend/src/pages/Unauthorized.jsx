// pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <Shield className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <Link 
          to="/dashboard"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}