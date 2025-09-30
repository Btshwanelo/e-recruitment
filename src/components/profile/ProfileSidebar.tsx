import React from 'react';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'qualifications', label: 'Qualifications' },
    { id: 'work-experience', label: 'Work Experience' },
    { id: 'documents', label: 'Documents' },
    { id: 'cv', label: 'Manage My CV' },
  ];

  return (
    <div className="w-full md:w-64 bg-white rounded-xl p-5">
      <div className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`block font-semibold rounded-md text-left pl-3 py-2 w-full ${
              activeTab === tab.id ? 'text-[#005f33] bg-[#F6F9FE]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
