import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  required?: boolean;
  hasInfoIcon?: boolean;
  hasCheckIcon?: boolean;
  onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, required = false, hasInfoIcon = false, hasCheckIcon = false, onChange }) => {
  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex gap-0.5 items-center self-start text-sm font-medium leading-none">
        <label className="self-stretch my-auto text-slate-700">{label}</label>
        {required && <span className="self-stretch my-auto text-sky-600">*</span>}
        {hasInfoIcon && (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef4442833cf9279ba1a90837055b16afa6498f81a28103743a86ca5fd361a632?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            alt="Info icon"
          />
        )}
      </div>
      <div className="flex overflow-hidden flex-wrap gap-2 items-center px-3.5 py-2.5 mt-1.5 w-full text-base text-gray-900 whitespace-nowrap bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Colors-Border-border-primary,#D0D5DD)] max-md:max-w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="flex-1 shrink gap-2 self-stretch my-auto basis-0 min-w-60 text-ellipsis max-md:max-w-full outline-none"
        />
        {hasCheckIcon && (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9969fb79c7325fbded201d50a3f63c4cc01fdb7d030d670af4f04404b9fe4700?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            alt="Check icon"
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
