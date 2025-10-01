import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CircleAlert, Mail, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { showErrorToast } from '@/components/ErrorToast ';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (otp: string) => void;
  isLoading: boolean;
  isError: boolean;
  isLoadingSubmit: boolean;
  length?: number;
  title?: string;
  errorMessage?: string;
  description?: string;
  icon?: React.ReactNode;
  reset?: any;
  onNewOtp?: () => void;
}

const TIMER_DURATION = 180; // 3 minutes in seconds
const TIMER_KEY = 'otpTimer';
const EXPIRY_KEY = 'otpExpiry';

const OTPModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  isLoadingSubmit,
  errorMessage,
  reset,
  onNewOtp,
  isError,
  length = 4,
  title = 'Please check your email.',
  description = `We've sent a code to your email`,
  icon = <CircleAlert className="h-6 w-6 text-[#005f33]" />,
}: OTPModalProps) => {
  const [otp, setOtp] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [inputRefs, setInputRefs] = useState<React.RefObject<HTMLInputElement>[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  console.log('--');

  // Initialize OTP array and refs
  useEffect(() => {
    setOtp(Array(length).fill(''));
    setInputRefs(
      Array(length)
        .fill(null)
        .map(() => React.createRef<HTMLInputElement>())
    );
  }, [length]);

  // Timer management
  useEffect(() => {
    const initializeTimer = () => {
      const savedExpiry = localStorage.getItem(EXPIRY_KEY);
      if (savedExpiry) {
        const expiryTime = parseInt(savedExpiry);
        if (expiryTime > Date.now()) {
          const remaining = Math.round((expiryTime - Date.now()) / 1000);
          setTimeRemaining(remaining);
          setCanResend(false);
          return;
        }
      }
      // If no valid timer exists, start a new one
      const newExpiry = Date.now() + TIMER_DURATION * 1000;
      localStorage.setItem(EXPIRY_KEY, newExpiry.toString());
      setTimeRemaining(TIMER_DURATION);
      setCanResend(false);
    };

    if (isOpen) {
      initializeTimer();
    }
  }, [isOpen]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setCanResend(true);
            localStorage.removeItem(EXPIRY_KEY);
            clearInterval(timer);
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(Array(length).fill(''));
      setIsValid(false);
      setResendSuccess(false);
      inputRefs[0]?.current?.focus();
    }
  }, [isOpen, length]);

  // Validate OTP
  useEffect(() => {
    setIsValid(otp.every((digit) => digit !== ''));
  }, [otp]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const regex = new RegExp(`^\\d{${length}}$`);
    if (!regex.test(pastedData)) return;

    const digits = pastedData.split('');
    setOtp(digits);
    inputRefs[length - 1]?.current?.focus();
  };

  const handleConfirm = () => {
    onConfirm(otp.join(''));
  };

  const handleResend = async () => {
    if (onNewOtp) {
      onNewOtp();
      onClose();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isError) {
      showErrorToast(errorMessage);
    }
  }, [isError]);

  return (
    <>
      <div className="fixed inset-0 bg-[#6B7280]/40 backdrop-blur-[2px]" aria-hidden="true" />

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[400px] pt-10 rounded-4xl bg-white">
          {/* {isError && (
            <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
              <AlertDescription className="text-red-600 font-medium text-center">{errorMessage}</AlertDescription>
            </Alert>
          )} */}
          {resendSuccess && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="text-green-600 font-medium text-center">OTP resent successfully!</AlertDescription>
            </Alert>
          )}
          {isLoading && <Spinner />}
          {!isLoading && (
            <>
              <DialogHeader className="text-center">
                <div className="w-12 h-12 rounded-xl border border-[#E1E1E2] items-center flex justify-center">{icon}</div>
                <DialogTitle className="text-lg font-semibold text-[#181D27] mb-2">{title}</DialogTitle>
                <DialogDescription className="text-left text-[#535862] font-normal text-sm">{description}</DialogDescription>
              </DialogHeader>
              <div className="flex justify-evenly gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    ref={inputRefs[index]}
                    placeholder='0'
                    className="w-14 h-14 text-center placeholder:text-gray-300 placeholder:font-semibold text-4xl font-semibold border border-[#005f33] text-black"
                  />
                ))}
              </div>
              <div className="flex justify-center items-center gap-2">
                {timeRemaining > 0 ? (
                  <span className="text-sm text-gray-600">OTP expires in {formatTime(timeRemaining)}</span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResend}
                    disabled={isResending || !canResend}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {isResending ? <Spinner className="mr-2 h-4 w-4" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                    Generate new OTP
                  </Button>
                )}
              </div>
              <DialogFooter>
                <div className="flex flex-col w-full gap-3">
                  <Button variant="outline" className="flex-1 bg-white hover:bg-white" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button className="flex-1" variant="default" disabled={!isValid} onClick={handleConfirm}>
                    {isLoadingSubmit ? <Spinner /> : 'Confirm'}
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OTPModal;
