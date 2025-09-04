import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderV2 = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-20 h-14 rounded flex items-center justify-center">
            <img src="/dcs-logo.png" alt="EZRA Logo" className="w-24 h-auto" />
          </div>
          <nav className="ml-8 hidden md:flex space-x-6">
            {/* <a  onClick={()=>navigate('/applications')} className="text-[#475467] cursor-pointer font-semibold hover:text-[#]">Home</a> */}
            <a onClick={() => navigate('/profile')} className="text-[#475467] font-semibold cursor-pointer hover:text-[#005f33]">
              Profile <span className="ml-1"></span>
            </a>
            <a onClick={() => navigate('/jobs')} className="text-[#475467] font-semibold cursor-pointer hover:text-[#005f33]">
              Jobs <span className="ml-1"></span>
            </a>
            <a onClick={() => navigate('/applications')} className="text-[#475467] font-semibold cursor-pointer hover:text-[#005f33]">
              Applications <span className="ml-1"></span>
            </a>
            {/* <a href="#" className="text-[#475467] font-semibold hover:text-[#]">Contact Us</a> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderV2;
