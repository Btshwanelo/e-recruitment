import React from 'react';
import FormStep from '../components/FormStep';
import { incomeInformationFields } from '../components/indivisualFormConfig';

const IncomeInformation = ({ title, data, onChange, errors, isLoading }) => {
  return (
    <FormStep title={title} fields={incomeInformationFields} data={data || {}} onChange={onChange} errors={errors} isLoading={isLoading} />
  );
};

export default IncomeInformation;
