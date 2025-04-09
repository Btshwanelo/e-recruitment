import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuthData } from '@/slices/authSlice';
import { newApplication, resetForm } from '@/slices/loanSlice';
import useProfile from '@/hooks/useProfile';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileDetails = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(clearAuthData());
    dispatch(resetForm());
    navigate('/auth'); // Redirect to login page after logout
    setIsDropdownOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile'); // Navigate to profile page
    setIsDropdownOpen(false);
  };
  const handleApply = () => {
    dispatch(newApplication());
    navigate('/application');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 mb-4">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="text-blue-500 font-bold flex items-center">
            <span className="text-xl">RH</span>
            <span className="text-sm rotate-90 -mr-1">❯</span>
            <span className="text-gray-500 text-sm">Services</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/dashboard" className="text-gray-700">
              Home
            </a>
            <a href="#" className="text-gray-700 flex items-center">
              Products <span className="ml-1"></span>
            </a>
            <a href="/saved-applications" className="text-gray-700 flex items-center">
              Applications <span className="ml-1"></span>
            </a>
            <a href="/case" className="text-gray-700 flex items-center cursor-pointer">
              Cases <span className="ml-1"></span>
            </a>
          </nav>
          <Button
            onClick={handleApply}
            variant={'outline'}
            className="border border-primary text-primary bg-white px-4 py-2 rounded-md cursor-pointer"
          >
            Apply
          </Button>
        </div>

        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          <div className="flex items-center ml-4 cursor-pointer" onClick={toggleDropdown}>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600">👤</span>
            </div>
            <div className="ml-2 hidden md:block">
              <div className="text-sm font-medium">{profileDetails.profileDetails.Name}</div>
              <div className="text-xs text-gray-500">{profileDetails.profileDetails.Email}</div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button onClick={handleProfile} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
