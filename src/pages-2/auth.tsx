import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AuthPageV2 = () => {
  const [activeTab, setActiveTab] = useState('signup');

  // Form states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form errors
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword;

  // Form validation
  const validateSignupForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

    if (!phone) newErrors.phone = 'Phone number is required';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) newErrors.password = 'Password must contain a special character';

    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!loginEmail) newErrors.loginEmail = 'Email is required';
    if (!loginPassword) newErrors.loginPassword = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login with dummy data
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Simple validation - in a real app this would be handled by your backend
        if (loginEmail === 'test@example.com' && loginPassword === 'Password123!') {
          navigate('/applications');
        } else {
          setErrors({ auth: 'Invalid email or password. Try test@example.com and Password123!' });
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  // Handle signup with dummy data
  const handleSignup = (e) => {
    e.preventDefault();
    if (validateSignupForm()) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // In a real app, this would create a new user in your backend
        navigate(`/verification?e=${email}&&c=${phone}`);
        setIsLoading(false);
      }, 1000);
    }
  };

  // Clear errors when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Logo */}
      <div className="mb-2">
        <img src="/images/Logo.svg" alt="RHS Services Logo" className="h-20" />
      </div>

      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Create an account</h1>
          <p className="mt-2 text-center text-gray-600">
            Don't worry if you're missing details! Use this profile to save your application and complete it when you're ready
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8">
          <button
            className={`flex-1 py-2 text-center border-2 ${
              activeTab === 'signup' ? 'bg-white border-primary text-gray-800 font-medium' : 'bg-gray-50 border-gray-200 text-gray-500'
            } rounded-l-md transition-colors`}
            onClick={() => handleTabChange('signup')}
            type="button"
          >
            Sign up
          </button>
          <button
            className={`flex-1 py-2 text-center border-2 ${
              activeTab === 'login' ? 'bg-white border-primary text-gray-800 font-medium' : 'bg-gray-50 border-gray-200 text-gray-500'
            } rounded-r-md transition-colors`}
            onClick={() => handleTabChange('login')}
            type="button"
          >
            Log in
          </button>
        </div>

        {/* API Error messages */}
        {errors.signup && (
          <div className="p-3 mb-4 text-sm rounded bg-red-100 text-red-700 flex items-center">
            <AlertCircle size={16} className="mr-2" /> {errors.signup}
          </div>
        )}

        {errors.auth && (
          <div className="p-3 mb-4 text-sm rounded bg-red-100 text-red-700 flex items-center">
            <AlertCircle size={16} className="mr-2" /> {errors.auth}
          </div>
        )}

        {/* Form */}
        {activeTab === 'signup' ? (
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Cellphone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your cellphone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={`w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Password requirements */}
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${hasMinLength ? 'text-green-500' : 'text-gray-300'}`}
                  fill={hasMinLength ? 'rgba(34, 197, 94, 0.2)' : 'none'}
                />
                <span className="text-gray-600">Must be at least 8 characters</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${hasSpecialChar ? 'text-green-500' : 'text-gray-300'}`}
                  fill={hasSpecialChar ? 'rgba(34, 197, 94, 0.2)' : 'none'}
                />
                <span className="text-gray-600">Must contain one special character</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${passwordsMatch ? 'text-green-500' : 'text-gray-300'}`}
                  fill={passwordsMatch ? 'rgba(34, 197, 94, 0.2)' : 'none'}
                />
                <span className="text-gray-600">Passwords must match</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-[#0086C9] hover:bg-[#0077b3] font-semibold text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Get started'}
            </Button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="loginEmail"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className={`w-full ${errors.loginEmail ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.loginEmail && <p className="mt-1 text-sm text-red-600">{errors.loginEmail}</p>}
            </div>

            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="loginPassword"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className={`w-full ${errors.loginPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.loginPassword && <p className="mt-1 text-sm text-red-600">{errors.loginPassword}</p>}
              <p className="mt-1 text-xs text-gray-500">Try test@example.com / Password123!</p>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-[#0086C9] hover:bg-[#0077b3] font-semibold text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {activeTab === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              className="text-[#0086C9] hover:text-[#0077b3] font-medium"
              onClick={() => handleTabChange(activeTab === 'signup' ? 'login' : 'signup')}
            >
              {activeTab === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPageV2;