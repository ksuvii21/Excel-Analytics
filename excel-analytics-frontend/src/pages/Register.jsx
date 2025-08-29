import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Linkedin, Github, X, Eye, EyeOff } from 'lucide-react';

// Terms and Conditions Modal Component
const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-purple-500/20 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Terms and Conditions
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Close terms modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="prose prose-invert prose-purple max-w-none">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using Excel Analytics services, you accept and agree to be bound by the terms and provisions of this agreement. 
              All users must comply with these terms to use our platform.
            </p>
            
            <h3>2. User Responsibilities</h3>
            <p>
              As a user of Excel Analytics, you are responsible for maintaining the confidentiality of your account information, including your password, 
              and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account.
            </p>
            
            <h3>3. Data Usage and Privacy</h3>
            <p>
              Excel Analytics collects and processes personal data in accordance with our Privacy Policy. By using our services, you consent to such processing 
              and you warrant that all data provided by you is accurate.
            </p>
            
            <h3>4. Intellectual Property</h3>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Excel Analytics and its licensors. 
              The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <h3>5. Termination</h3>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, 
              for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
            
            <h3>6. Limitation of Liability</h3>
            <p>
              In no event shall Excel Analytics, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, 
              special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
            
            <h3>7. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
            
            <h3>8. Changes to Terms</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those 
              revisions become effective, you agree to be bound by the revised terms.
            </p>
            
            <div className="mt-8 p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-300 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-400">
                If you have any questions about these Terms, please contact us at support@excelanalytics.com
              </p>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-gray-900 border-t border-purple-500/20 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Modal Component
const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-purple-500/20 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Privacy Policy
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Close privacy modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="prose prose-invert prose-purple max-w-none">
            <h3>1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. 
              This may include name, email address, and any other information you choose to provide.
            </p>
            
            <h3>2. How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to develop new services, and to protect Excel Analytics and our users.
            </p>
            
            <h3>3. Information Sharing</h3>
            <p>
              We do not sell your personal information to third parties. We may share your information with trusted third-party service providers 
              who assist us in operating our website, conducting our business, or servicing you.
            </p>
            
            <h3>4. Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h3>5. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal information. You can also object to the processing of your personal information, 
              ask us to restrict processing of your personal information, or request portability of your personal information.
            </p>
            
            <h3>6. Cookies and Tracking</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve and analyze our service.
            </p>
            
            <h3>7. Changes to This Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating 
              the "effective date" at the top of this Privacy Policy.
            </p>
            
            <h3>8. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@excelanalytics.com.
            </p>
            
            <div className="mt-8 p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-300 mb-2">Your Privacy Matters</h4>
              <p className="text-sm text-gray-400">
                We are committed to protecting your personal information and your right to privacy.
              </p>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-gray-900 border-t border-purple-500/20 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
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
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Use the actual register function from AuthContext
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      
      <div className="w-full max-w-md rounded-3xl border border-zinc-200/60 bg-white/10 backdrop-blur-lg p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="mt-2 text-gray-400">Join Excel Analytics today</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-900/50 rounded-lg text-center">
            <p className="text-red-200">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 outline-none transition"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-12 py-3 rounded-2xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 outline-none transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Use 8+ characters with a mix of letters, numbers & symbols
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-12 py-3 rounded-2xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 outline-none transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
              I agree to the{' '}
              <button 
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="text-purple-400 hover:text-purple-300 transition hover:underline"
              >
                Terms
              </button>{' '}
              and{' '}
              <button 
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="text-purple-400 hover:text-purple-300 transition hover:underline"
              >
                Privacy Policy
              </button>
            </label>
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
                Creating Account...
              </>
            ) : (
              <>
                <User className="h-5 w-5 mr-2" />
                Register Now
              </>
            )}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-purple-400 hover:text-purple-300 transition"
              >
                Sign in
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
