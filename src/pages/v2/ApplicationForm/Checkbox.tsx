'use client';

import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-start mt-6 w-full max-md:max-w-full">
      <div className="flex justify-center items-center pt-0.5 w-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fc1d1ccfb34167f5454feabd8d37a8c9fa74d0bfa2ea5a94a6eca118a61b48a?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
          className="object-contain self-stretch my-auto w-4 rounded aspect-square"
          alt="Checkbox"
          onClick={handleChange}
          role="checkbox"
          aria-checked={isChecked}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleChange();
              e.preventDefault();
            }
          }}
        />
      </div>
      <label
        className="flex-1 shrink text-sm font-medium leading-none basis-0 min-w-60 text-slate-700 max-md:max-w-full"
        onClick={handleChange}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
