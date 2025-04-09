import React from 'react';

interface TabNavigationProps {
  activeTab: 'signup' | 'login';
  onTabChange: (tab: 'signup' | 'login') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex p-0.5 w-full bg-gray-50 rounded-lg border border-gray-200 border-solid">
      <button
        className={`flex-1 h-9 text-sm font-semibold text-gray-500 cursor-pointer border-none ${
          activeTab === 'signup' ? 'bg-white rounded-md shadow-sm' : ''
        }`}
        onClick={() => onTabChange('signup')}
        type="button"
      >
        Sign up
      </button>
      <button
        className={`flex-1 h-9 text-sm font-semibold text-gray-500 cursor-pointer border-none ${
          activeTab === 'login' ? 'bg-white rounded-md shadow-sm' : ''
        }`}
        onClick={() => onTabChange('login')}
        type="button"
      >
        Log in
      </button>
    </nav>
  );
};

export default TabNavigation;
