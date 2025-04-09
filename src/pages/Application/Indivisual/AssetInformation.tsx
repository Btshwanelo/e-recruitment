import React from 'react';
import FormStep from '../components/FormStep';
import { assetInformationFields } from '../components/indivisualFormConfig';

const AssetInformation = ({ title, data, onChange, errors, isLoading }) => {
  return (
    <FormStep title={title} fields={assetInformationFields} data={data || {}} onChange={onChange} errors={errors} isLoading={isLoading} />
  );
};

export default AssetInformation;
