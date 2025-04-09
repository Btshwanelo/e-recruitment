// EligibilityErrorPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const EligibilityErrorPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-cente space-y-6  justify-center bg-white px-4">
      {/* Close Button */}
      <div className=" flex justify-center w-full">
        <button className="rounded-full bg-gray-50 border border-gray-200 p-3 shadow-sm">
          <X size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Error Content */}
      <div className="text-center flex flex-col items-center mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Eligibility Error</h1>
        <p className="text-gray-600 mb-8">Based on the information provided, you do not meet the eligibility criteria for this loan.</p>

        <Button variant="outline" className="border-gray-300 text-gray-700 flex items-center w-fit px-6 py-2" onClick={handleBackToHome}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default EligibilityErrorPage;
