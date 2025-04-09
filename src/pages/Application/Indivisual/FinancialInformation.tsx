import React from 'react';
import FormStep from '../components/FormStep';
import { financialInformationFields } from '../components/indivisualFormConfig';

const FinancialInformation = ({ title, data, onChange, errors, isLoading }) => {
  return (
    <FormStep
      title={title}
      fields={financialInformationFields}
      data={data || {}}
      onChange={onChange}
      errors={errors}
      isLoading={isLoading}
    />
  );
};

export default FinancialInformation;
