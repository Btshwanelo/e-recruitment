import React from 'react';
import FormStep from '../components/FormStep';
import { identificationFields } from '../components/indivisualFormConfig';

const Identification = ({ title, data, onChange, errors, isLoading }) => {
  return (
    <FormStep title={title} fields={identificationFields} data={data || {}} onChange={onChange} errors={errors} isLoading={isLoading} />
  );
};

export default Identification;
