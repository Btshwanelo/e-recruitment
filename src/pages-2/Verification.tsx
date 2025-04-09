import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock user data (in a real app, this would come from context/state management)
const useUserData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  return {
    email: queryParams.get('e') || 'user@example.com',
    mobile: queryParams.get('c') || '071 234 5678'
  };
};

// 1. OTP Notification Screen
export const OTPNotification = () => {
  const navigate = useNavigate();
  const userData = useUserData();

  const handleEnterManually = () => {
    navigate('/verification/enter-otp');
  };

  const handleBackToLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Email/Phone Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <Mail className="h-8 w-8 text-gray-500" />
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-semibold text-center mb-2">Check your phone</h1>
        <p className="text-gray-600 text-center mb-8">
          Keep your phone close. We sent you an OTP to {userData.mobile} for verification.
        </p>

        {/* Action Button */}
        <Button
          className="w-full bg-[#0288D1] hover:bg-[#0277BD] font-semibold text-white py-6"
          onClick={handleEnterManually}
        >
          Enter code manually
        </Button>

        {/* Back to Login */}
        <button className="mt-6 flex items-center text-gray-600 hover:text-gray-800" onClick={handleBackToLogin}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to log in
        </button>
      </div>
    </div>
  );
};

// 2. OTP Input Screen
export const OTPInput = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const userData = useUserData();

  // Correct OTP for demo purposes
  const CORRECT_OTP = "1234";

  const handleChange = (index, value) => {
    // Clear any existing error when user starts typing
    if (error) setError('');

    // Only allow numbers
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).split('');

    // Only proceed if pasted content is all numbers
    if (pastedData.some((char) => !/^[0-9]$/.test(char))) {
      setError('OTP must contain only numbers');
      return;
    }

    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      if (index < 4) newOtp[index] = value;
    });

    setOtp(newOtp);

    // Focus the next empty input or the last input
    const lastFilledIndex = Math.min(pastedData.length - 1, 3);
    inputRefs[lastFilledIndex].current.focus();
  };

  const handleVerify = () => {
    const otpString = otp.join('');

    if (otpString.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setIsVerifying(true);

    // Simulate API call with timeout
    setTimeout(() => {
      if (otpString === CORRECT_OTP) {
        // Success - navigate to success page
        navigate('/verification/success');
      } else {
        // Error - show message
        setError('Invalid OTP. Please try again. Hint: Try 1234');
        setIsVerifying(false);
      }
    }, 1500);
  };

  const handleResend = () => {
    setIsResending(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setSuccessMessage('OTP has been resent successfully');
      setIsResending(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate('/auth');
  };

  // Check if OTP is complete
  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Email Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <Mail className="h-8 w-8 text-gray-500" />
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-semibold text-center mb-2">Check your phone</h1>
        <p className="text-gray-600 text-center mb-4">Please enter the OTP sent to {userData.mobile}.</p>
        <p className="text-gray-400 text-xs text-center mb-4">(Hint: The correct OTP is 1234)</p>

        {/* Error Message */}
        {error && (
          <div className="w-full p-3 mb-4 flex items-center bg-red-50 text-red-700 rounded">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="w-full p-3 mb-4 flex items-center bg-green-50 text-green-700 rounded">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* OTP Input Fields */}
        <div className="flex justify-center space-x-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-16 h-16 text-center text-3xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={inputRefs[index]}
              autoFocus={index === 0}
              disabled={isVerifying}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          className={`w-full py-6 ${
            isOtpComplete && !isVerifying
              ? 'bg-[#0288D1] hover:bg-[#0277BD] font-semibold text-white'
              : 'bg-[#E0E0E0] text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleVerify}
          disabled={!isOtpComplete || isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify OTP'}
        </Button>

        {/* Resend Link */}
        <p className="mt-4 text-sm text-gray-600">
          Didn't receive the OTP?
          <button className="ml-1 text-[#0288D1] font-semibold hover:underline" onClick={handleResend} disabled={isResending}>
            {isResending ? 'Resending...' : 'Click to resend'}
          </button>
        </p>

        {/* Back to Login */}
        <button className="mt-6 flex items-center text-gray-600 hover:text-gray-800" onClick={handleBackToLogin}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to log in
        </button>
      </div>
    </div>
  );
};

// 3. Verification Success Screen
export const VerificationSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-semibold text-center mb-2">Phone number verified</h1>
        <p className="text-gray-600 text-center mb-8">Your phone number has been successfully verified. You can now access your account.</p>

        {/* Continue Button */}
        <Button className="w-full bg-[#0288D1] hover:bg-[#0277BD] font-semibold text-white py-6" onClick={handleContinue}>
          Continue to Profile
        </Button>
      </div>
    </div>
  );
};

// Router configuration example (for reference)
const OTPVerificationRoutes = [
  { path: '/verification', element: <OTPNotification /> },
  { path: '/verification/enter-otp', element: <OTPInput /> },
  { path: '/verification/success', element: <VerificationSuccess /> }
];

export default OTPVerificationRoutes;