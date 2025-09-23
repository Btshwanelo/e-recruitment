import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, ArrowLeft, Mail } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();

  // Password validation checks
  const hasMinLength = newPassword.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword;

  const validateEmail = () => {
    const newErrors: { email?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: { otp?: string } = {};
    if (!otp) {
      newErrors.otp = 'OTP is required';
    } else if (otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordReset = () => {
    const newErrors: {
      newPassword?: string;
      confirmPassword?: string;
    } = {};
    
    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain a special character';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      setIsLoading(true);
      setErrors({});

      // Simulate API call delay
      setTimeout(() => {
        // In a real app, this would send a reset email
        setStep('otp');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateOtp()) {
      setIsLoading(true);
      setErrors({});

      // Simulate API call delay
      setTimeout(() => {
        // In a real app, this would verify the OTP
        if (otp === '123456') {
          setStep('reset');
        } else {
          setErrors({ otp: 'Invalid OTP. Try 123456' });
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswordReset()) {
      setIsLoading(true);
      setErrors({});

      // Simulate API call delay
      setTimeout(() => {
        // In a real app, this would reset the password
        navigate('/?message=password-reset-success');
        setIsLoading(false);
      }, 1000);
    }
  };

  const goBack = () => {
    if (step === 'email') {
      navigate('/');
    } else if (step === 'otp') {
      setStep('email');
    } else {
      setStep('otp');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Logo */}
      <div className="mb-2">
        <img src="/dcs-logo.png" alt="RHS Services Logo" className="h-20" />
      </div>

      <div className="w-full max-w-md">
        

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            {step === 'email' && 'Reset Your Password'}
            {step === 'otp' && 'Verify Your Email'}
            {step === 'reset' && 'Create New Password'}
          </h1>
          <p className="mt-2 text-center text-gray-600">
            {step === 'email' && 'Enter your email address and we\'ll send you a verification code'}
            {step === 'otp' && `We've sent a 6-digit code to ${email}`}
            {step === 'reset' && 'Enter your new password below'}
          </p>
        </div>

        {/* General Error messages */}
        {errors.general && (
          <div className="p-3 mb-4 text-sm rounded bg-red-100 text-red-700 flex items-center">
            <AlertCircle size={16} className="mr-2" /> {errors.general}
          </div>
        )}

        {/* Step 1: Email Input */}
        {step === 'email' && (
          <form className="space-y-6" onSubmit={handleSendResetEmail}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <Button type="submit" className="w-full py-6 bg-[#005f33] font-semibold text-white" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </Button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <form className="space-y-6" onSubmit={handleVerifyOtp}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
                className={`w-full text-center text-2xl tracking-widest ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
              <p className="mt-2 text-xs text-gray-500">Try: 123456</p>
            </div>

            <Button type="submit" className="w-full py-6 bg-[#005f33] font-semibold text-white" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-sm text-[#005f33] hover:text-[#004d2a] font-medium"
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 'reset' && (
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={`w-full ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
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

            <Button type="submit" className="w-full py-6 bg-[#005f33] font-semibold text-white" disabled={isLoading}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-[#005f33] font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
