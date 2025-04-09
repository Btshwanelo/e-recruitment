'use client';

import React, { useState } from 'react';
import OTPInput from './OTPInput';
import Button from './Button';
import TextLink from './TextLink';

const OTP: React.FC = () => {
  const [otp, setOtp] = useState<string>('3066');

  const handleVerify = () => {
    // Handle verification logic here
    console.log('Verifying OTP:', otp);
  };

  const handleResend = () => {
    // Handle resend logic here
    console.log('Resending OTP');
  };

  const handleBackToLogin = () => {
    // Handle navigation back to login
    console.log('Navigating back to login');
  };

  return (
    <main className="flex overflow-hidden flex-col items-center bg-white min-w-80">
      <div className="flex flex-col items-center w-full max-w-[1200px] max-md:max-w-full">
        <section className="flex flex-col items-center pt-24 pb-12 w-full bg-white min-h-[960px] max-md:max-w-full">
          <div className="flex flex-col items-center px-8 w-full max-w-screen-xl max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col max-w-[360px] w-[360px]">
              <header className="flex flex-col w-full text-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2616721e28da48c162da13131ece9f43607e3c423d58f55e27bb779a0c719ad5?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
                  alt="Verification icon"
                  className="object-contain self-center w-14 shadow-sm aspect-square"
                />
                <div className="flex flex-col items-start mt-6 w-full">
                  <h1 className="text-3xl font-semibold leading-none text-gray-900">Check your phone</h1>
                  <p className="mt-3 text-base text-slate-600">Please enter the otp.</p>
                </div>
              </header>

              <div className="flex flex-col mt-8 w-full rounded-xl">
                <div className="self-center w-full text-5xl font-medium tracking-tighter leading-none text-center text-sky-600 whitespace-nowrap max-md:text-4xl">
                  <div className="w-full max-md:text-4xl">
                    <OTPInput onChange={setOtp} />
                  </div>
                </div>

                <div className="mt-8 w-full">
                  <Button onClick={handleVerify}>Verify email</Button>
                </div>
              </div>

              <div className="flex gap-1 justify-center items-start mt-8 w-full text-sm leading-none">
                <p className="text-slate-600">Didn't receive the email?</p>
                <TextLink onClick={handleResend} className="text-sky-700">
                  Click to resend
                </TextLink>
              </div>

              <div className="flex justify-center mt-8">
                <TextLink
                  onClick={handleBackToLogin}
                  className="text-sm text-slate-600"
                  icon={
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/75da64756fb48e825c8744c7fadc64456a6d7723a5b15e0bcf98919b0b713da9?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
                      alt="Back arrow"
                      className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    />
                  }
                >
                  Back to log in
                </TextLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default OTP;
