import React from 'react';
import FormStep from '../components/FormStep';
import { contactInfoFields } from '../components/indivisualFormConfig';

const ContactInformation = ({ title, data, onChange, errors, isLoading }) => {
  return <FormStep title={title} fields={contactInfoFields} data={data || {}} onChange={onChange} errors={errors} isLoading={isLoading} />;
};

export default ContactInformation;
