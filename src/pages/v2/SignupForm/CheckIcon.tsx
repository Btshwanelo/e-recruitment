import React from 'react';

const CheckIcon: React.FC = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="check-icon">
      <path
        d="M0 10.0002C0 4.4774 4.47715 0.000244141 10 0.000244141C15.5228 0.000244141 20 4.4774 20 10.0002C20 15.5231 15.5228 20.0002 10 20.0002C4.47715 20.0002 0 15.5231 0 10.0002Z"
        fill="#17B26A"
      />
      <path d="M6.25 10.0002L8.75 12.5002L13.75 7.50024" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default CheckIcon;
