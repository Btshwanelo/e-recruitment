import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, CircleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FooterV2 from '@/pages-2/Footer';
import Footer from '../v2/ApplicationForm/Footer';
import HeaderV2 from '@/pages-2/Header';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderV2 />
      <div className="max-w-xl mx-auto justify-center items-center flex flex-col min-h-[calc(100vh-90px)] w-full text-center space-y-6">
        {/* Success Icon */}
        <div className="mb-4">
          <div className="h-14 w-14 rounded-xl border border-[#E1E1E2] shadow-md flex items-center justify-center mx-auto">
            <CircleAlert className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">Sorry, This page isn't available.</h1>

          <p className="text-gray-400">The link you followed maybe be broken, or the page may have been removed.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button className=" px-8 bg-[#005f33] hover:bg-[#005f33] rounded-[8px]" variant="default" onClick={() => navigate('/')}>
            Go To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
