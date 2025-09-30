import React from 'react';
import HeaderV2 from './Header';
import ProfileLayout from '@/components/profile/ProfileLayout';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F2F4F7]">
      <HeaderV2 />
      <ProfileLayout />
    </div>
  );
};

export default ProfilePage;
