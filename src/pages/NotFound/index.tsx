import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="h-14 w-14 rounded-lg border shadow-md flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">Sorry, this page isn't available.</h1>

          <p className="text-gray-500 text-lg font-medium">The link you followed maybe be broken, or the page may have been removed.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button className=" px-8 bg-[#0086C9] hover:bg-[#2a6b8b] " variant="default" onClick={() => navigate('/applications')}>
            ← Go To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
