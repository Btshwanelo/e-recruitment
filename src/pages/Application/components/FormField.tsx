// FormField.jsx - Reusable form field component
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options = [],
  placeholder = '',
  required = false,
  error = null,
  className = '',
  disabled = false,
}) => {
  const handleChange = (e) => {
    const fieldValue = e.target.value;
    onChange(name, fieldValue);
  };

  const handleSelectChange = (selectValue) => {
    onChange(name, selectValue);
  };

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      </div>

      {type === 'select' ? (
        <Select value={value || ''} onValueChange={(value) => handleSelectChange(value)} disabled={disabled}>
          <SelectTrigger id={name} className="w-full bg-white border-gray-300">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : type === 'date' ? (
        <Input
          type="date"
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          className="border-gray-300"
          disabled={disabled}
        />
      ) : (
        <Input
          type={type}
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className="border-gray-300"
          disabled={disabled}
        />
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
