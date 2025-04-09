// FormStep.jsx - Reusable form step component
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FormField from './FormField';

const FormStep = ({ title, fields, data, onChange, errors = {}, isLoading = false }:any) => {
  const handleFieldChange = (name:any, value:any) => {
    onChange({
      [name]: value,
    });
  };

  return (
    <>
      <Card className="mb-4 shadow-sm border-none rounded-xl bg-white">
        <CardContent className="p-0 rounded-xl">
          <div className="bg-[#F9FAFB] py-4 px-6 rounded-xl mb-6">
            <h3 className="text-lg font-semibold text-center">{title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-12">
            {fields.map((field:any) => (
              <FormField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type || 'text'}
                value={data?.[field.name] || ''}
                onChange={handleFieldChange}
                options={field.options || []}
                placeholder={field.placeholder || ''}
                required={field.required || false}
                error={errors[field.name]}
                className={field.className}
                disabled={isLoading}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FormStep;
