import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { useConfirmOTPReqMutation, useResendOTPReqMutation } from '@/service/genericServices';
import { AlertCircle, ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [confirmStep, setConfirmStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const auth = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('e');
  const contact = searchParams.get('c');
  console.log(email, contact);

  // RTK Query hooks
  const [confirmOTP, { isLoading: isConfirming, isError: isConfirmError, error: confirmErrorData, isSuccess }] = useConfirmOTPReqMutation();

  const [resendOTP, { isLoading: isResending, isSuccess: isResendSuccess, isError: isResendError, error: resendErrorData }] =
    useResendOTPReqMutation();

  // Check auth on mount
  // useEffect(() => {
  //   if (!auth.mobile && !auth.email) {
  //     setError('Authentication information missing. Please log in again.');
  //   }
  // }, [auth]);

  // Handle resend success/error
  useEffect(() => {
    if (isResendSuccess) {
      setSuccessMessage('OTP has been resent successfully');
      // Clear success message after 3 seconds
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }

    if (isResendError && resendErrorData) {
      setError(resendErrorData?.data?.message || 'Failed to resend OTP. Please try again.');
      // Clear error after 3 seconds
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [isResendSuccess, isResendError, resendErrorData]);

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

  const handleVerify = async () => {
    const otpString = otp.join('');

    if (otpString.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    try {
      await confirmOTP({
        body: {
          requestName: 'ConfirmOTPReq',
          inputParamters: {
            OTPInformation: {
              OTPNo: otpString,
              email: email,
              mobile: contact,
            },
          },
        },
      }).unwrap();

      // If we get here, verification was successful
      navigate('/verify/success');
    } catch (err) {
      setError(err.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP({
        body: {
          requestName: 'ResendOTP',
          inputParamters: {
            email: auth.email,
            mobile: auth.mobile,
          },
        },
      }).unwrap();
      // Success is handled in the useEffect
    } catch (err) {
      // Error is handled in the useEffect
    }
  };

  const handleBackToLogin = () => {
    navigate('/auth');
  };

  // Check if OTP is complete
  const isOtpComplete = otp.every((digit) => digit !== '');

  if (confirmStep === 1) {
    return <OTPNotification setConfirmStep={setConfirmStep} />;
  }

  if (isSuccess) {
    return <VerificationSuccess />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Email Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <Mail className="h-8 w-8 text-gray-500" />
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-semibold text-center mb-2">Check your phone</h1>
        <p className="text-gray-600 text-center mb-4">Please enter the OTP sent to {auth.mobile || 'your phone'}.</p>

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
              disabled={isConfirming}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          className={`w-full py-6 ${
            isOtpComplete && !isConfirming
              ? 'bg-[#0288D1] hover:bg-[#0277BD] font-semibold text-white'
              : 'bg-[#E0E0E0] text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleVerify}
          disabled={!isOtpComplete || isConfirming}
        >
          {isConfirming ? 'Verifying...' : 'Verify OTP'}
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

export default EmailVerificationPage;

const OTPNotification = ({ setConfirmStep }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [error, setError] = useState('');

  // Check if we have the necessary auth info
  // useEffect(() => {
  //   if (!auth.mobile && !auth.email) {
  //     setError('Authentication information missing. Please log in again.');
  //   }
  // }, [auth]);

  const handleEnterManually = () => {
    setConfirmStep(2);
  };

  const handleBackToLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Email Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <Mail className="h-8 w-8 text-gray-500" />
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-semibold text-center mb-2">Check your phone</h1>
        <p className="text-gray-600 text-center mb-8">
          Keep your phone close. We sent you an OTP to {auth.mobile || 'your phone'} for verification.
        </p>

        {/* Error Message */}
        {error && (
          <div className="w-full p-3 mb-4 flex items-center bg-red-50 text-red-700 rounded">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <Button
          className="w-full bg-[#0288D1] hover:bg-[#0277BD] font-semibold text-white py-6"
          onClick={handleEnterManually}
          // disabled={!!error}
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

const VerificationSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-semibold text-center mb-2">Phone number verified</h1>
        <p className="text-gray-600 text-center mb-8">Your phone number has been successfully verified. You can now access your account.</p>

        {/* Continue Button */}
        <Button className="w-full bg-primary hover:bg-primary font-semibold text-white py-6" onClick={handleContinue}>
          Continue to Login
        </Button>
      </div>
    </div>
  );
};
