'use client';

import React, { useState, useRef, useEffect } from 'react';

interface OTPInputProps {
  length?: number;
  initialValues?: string[];
  onChange?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, initialValues = ['3', '0', '6', '6'], onChange }) => {
  const [otpValues, setOtpValues] = useState<string[]>(initialValues);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length);

    // Notify parent of initial values
    if (onChange) {
      onChange(otpValues.join(''));
    }
  }, [length, onChange, otpValues]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1);
    setOtpValues(newOtpValues);

    // Move to next input if current input is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (onChange) {
      onChange(newOtpValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Move to next input on right arrow
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move to previous input on left arrow
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Only proceed if pasted content is numeric
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, length).split('');
    const newOtpValues = [...otpValues];

    digits.forEach((digit, idx) => {
      if (idx < length) {
        newOtpValues[idx] = digit;
      }
    });

    setOtpValues(newOtpValues);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtpValues.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    if (onChange) {
      onChange(newOtpValues.join(''));
    }
  };

  return (
    <div className="flex gap-3 items-start w-full">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otpValues[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="overflow-hidden px-2 w-20 h-20 bg-white rounded-xl border-2 border-solid shadow-sm border-[#0BA5EC] min-h-20 text-5xl font-medium tracking-tighter text-center text-sky-600 max-md:text-4xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label={`Digit ${index + 1} of OTP`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
