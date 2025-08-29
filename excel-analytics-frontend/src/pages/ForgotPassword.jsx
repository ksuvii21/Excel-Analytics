import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Linkedin, Github, Lock, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
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
    setIsLoading(true);
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage(`Password reset instructions sent to ${email}`);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200/60 bg-white/10 backdrop-blur-lg p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Forgot Password ?
          </h1>
          <p className="mt-2 text-gray-400">
            Enter your email to receive password reset instructions
          </p>
        </div>
        
        {message && (
          <div className="mb-6 p-3 bg-green-900/50 rounded-lg text-center">
            <p className="text-green-200">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-900/50 rounded-lg text-center">
            <p className="text-red-200">{error}</p>
          </div>
        )}
        
        {message ? (
          <div className="mb-6 p-4 bg-green-900/30 rounded-lg text-center border border-green-700/50">
            <p className="text-green-300">{message}</p>
            <p className="mt-2 text-sm text-gray-400">
              Redirecting to login page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 px-4 py-3 rounded-2xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 outline-none transition"
                  placeholder="you@example.com"
                />
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
                  Sending instructions...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Remember your password?{' '}
            <Link 
              to="/login" 
              className="font-medium text-purple-400 hover:text-purple-300 transition"
            >
              Sign in
            </Link>
          </p>
          <p className="mt-2 text-gray-400">
            Need an account?{' '}
            <Link 
              to="/register" 
              className="font-medium text-purple-400 hover:text-purple-300 transition"
            >
              Register now
            </Link>
          </p>
        </div>
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-500">
                Or connect with us
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
