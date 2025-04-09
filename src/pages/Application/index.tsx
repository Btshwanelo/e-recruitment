import React, { useEffect, useState } from 'react';
import useProfile from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const ApplicationPage = () => {
  const navigate = useNavigate();
  const profileDetails = useProfile();

  useEffect(() => {
    if (profileDetails.profileDetails.UserType === '1040') {
      navigate('/indivisual-application');
    }
    if (profileDetails.profileDetails.UserType === '1039') {
      navigate('/entity-application');
    }
  }, [profileDetails.profileDetails.UserType]);

  return null;
};

export default ApplicationPage;
