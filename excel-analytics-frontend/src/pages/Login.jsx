import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User as UserIcon, ArrowRight, Linkedin, Github, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Social media redirect handlers
  const handleLinkedInRedirect = () => {
    window.open('https://www.linkedin.com/in/kritika-gupta2106', '_blank');
  };

  const handleGitHubRedirect = () => {
    window.open('https://github.com/ksuvii21', '_blank');
  };

  const handleGoogleRedirect = () => {
    navigate('/');
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!credentials.email || !credentials.password) {
    setError('Please enter both email and password');
    return;
  }
  
  try {
    setIsLoading(true);
    setError('');
    console.log('Attempting login with:', credentials.email);
    
    // Use the actual login function from AuthContext
    const result = await login(credentials);
    console.log('Login result:', result);
    
    if (result.success) {
      console.log('Login successful, redirecting to dashboard');
      // Add a small delay to ensure state updates properly
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } else {
      setError(result.error || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('Login failed. Please try again.');
  } finally {
    setIsLoading(false);
    console.log('Login process finished');
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSkipLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200/60 bg-white/10 backdrop-blur-lg p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-400">Sign in to continue your analytics journey</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-900/50 rounded-lg text-center">
            <p className="text-red-200">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="w-full pl-10 px-4 py-3 rounded-2xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 outline-none transition"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
<div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle type based on state
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 outline-none transition"
              placeholder="••••••••"
            />
            {/* Show password toggle button */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 hover:text-gray-400" />
              )}
            </button>
          </div>
          <div className="mt-2 flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Forgot password?
            </Link>
          </div>
        </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-2xl text-white font-medium transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 flex items-center justify-center ${
              isLoading 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/30'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
          
          {/* Skip Login Button */}
          <button
            type="button"
            onClick={handleSkipLogin}
            className="w-full py-3 px-4 rounded-2xl text-gray-300 font-medium transition-all duration-300 border border-gray-700 hover:border-gray-500 hover:text-white flex items-center justify-center"
          >
            Continue without login
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-medium text-purple-400 hover:text-purple-300 transition"
              >
                Register now
              </Link>
            </p>
          </div>
        </form>
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button 
              onClick={handleLinkedInRedirect}
              className="flex justify-center py-2 px-4 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition group"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
            </button>
            
            <button 
              onClick={handleGitHubRedirect}
              className="flex justify-center py-2 px-4 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition group"
              aria-label="View GitHub profile"
            >
              <Github className="h-5 w-5 text-white group-hover:text-gray-300" />
            </button>
            
            <button 
              onClick={handleGoogleRedirect}
              className="flex justify-center py-2 px-4 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition group"
              aria-label="Return to home"
            >
              <svg className="h-5 w-5 text-red-500 group-hover:text-red-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}