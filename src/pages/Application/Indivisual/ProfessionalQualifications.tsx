import React from 'react';
import FormStep from '../components/FormStep';
import { professionalQualificationFields } from '../components/indivisualFormConfig';

const ProfessionalQualifications = ({ title, data, onChange, errors, isLoading }) => {
  return (
    <FormStep
      title={title}
      fields={professionalQualificationFields}
      data={data || {}}
      onChange={onChange}
      errors={errors}
      isLoading={isLoading}
    />
  );
};

export default ProfessionalQualifications;
