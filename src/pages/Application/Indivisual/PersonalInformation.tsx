import React from 'react';
import FormStep from '../components/FormStep';
import { personalInfoFields } from '../components/indivisualFormConfig';

const PersonalInformation = ({ title, data, onChange, errors, isLoading }) => {
  return <FormStep title={title} fields={personalInfoFields} data={data || {}} onChange={onChange} errors={errors} isLoading={isLoading} />;
};

export default PersonalInformation;
