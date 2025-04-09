import React from 'react';
import ApplicationHeader from '../components/ApplicationHeader';
import Header from '@/components/Header';

const DefaultLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 w-full h-full z-[-1]">
        <img src={'/images/bg-img.png'} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <Header />
      {children}
      <footer className="bg-white py-4 w-full  fixed  bottom-0 mt-1">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            <img
              src="/images/Logo.svg"
              alt="RHS Services Logo"
              className="h-6"
            />
          </div>
          <div className="text-sm text-gray-500">© 2024 Ezra 360 LMS. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
