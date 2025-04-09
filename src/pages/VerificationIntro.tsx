import React from 'react';
import { BadgeCheck, CheckCheck, X } from 'lucide-react';

const SelfieVerificationIntro = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-6">
      {/* Close Button */}

      {/* Main Content */}
      <div className="text-center max-w-md w-full">
        <div className="flex  align-middle items-center gap-4">
          <button className=" text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 ">Verify yourself with a selfie</h2>
        </div>

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <img src="/images/verify.svg" alt="Calculator icon" />
        </div>

        {/* Instructions */}
        <p className="text-gray-600 text-left mb-6">This should take around 1-3 mins, you'll need:</p>

        {/* Checklist */}
        <div className="text-left mb-8">
          <div className="flex items-center mb-2 gap-2">
            <BadgeCheck />
            <span className="text-gray-700">To take a selfie using your phone</span>
          </div>
        </div>

        {/* Next Button */}
        <button className="w-full py-3 bg-[#4087F3] text-white rounded-lg text-base font-semibold hover:bg-blue-600 transition-colors">
          Next
        </button>
      </div>
    </div>
  );
};

export default SelfieVerificationIntro;
