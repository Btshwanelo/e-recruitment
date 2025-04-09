import React from 'react';
import CheckIcon from './CheckIcon';

interface PasswordRequirementProps {
  text: string;
  isValid: boolean;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({ text, isValid }) => {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <CheckIcon />
      </div>
      <span className="text-sm leading-5 text-slate-600">{text}</span>
    </div>
  );
};

export default PasswordRequirement;
