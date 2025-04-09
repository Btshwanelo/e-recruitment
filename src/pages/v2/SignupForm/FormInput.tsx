import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-3.5 py-2.5 text-base text-gray-900 rounded-lg border border-gray-300 border-solid shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
      />
    </div>
  );
};

export default FormInput;
