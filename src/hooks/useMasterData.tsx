import { useState, useEffect } from 'react';
import { useExecuteRequest1Mutation } from '@/slices/services';
import { MasterDataResponse } from '@/types/profile';

// Custom hook for managing master data
export const useMasterData = (currentStep: string) => {
  const [masterData, setMasterData] = useState<MasterDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [getMasterData] = useExecuteRequest1Mutation();

  // Map step names to API page parameters
  const getPageParameter = (step: string): string => {
    const stepMap: { [key: string]: string } = {
      personal: 'personal-info',
      contact: 'contact-info',
      qualifications: 'qualifications',
      'work-experience': 'work-experience',
      cv: 'cv-upload',
    };
    return stepMap[step] || 'personal-info';
  };

  // Load master data for current step
  const loadMasterData = async (step: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getMasterData({
        body: {
          entityName: 'Applicant',
          requestName: 'RetrieveMasterValues',
          inputParamters: {
            Page: getPageParameter(step),
          },
        },
      }).unwrap();

      console.log(`Master data for ${step}:`, response);
      setMasterData(response);
    } catch (err) {
      setError('Failed to load master data');
      console.error('Error loading master data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get options for a specific schema
  const getOptionsForSchema = (schemaName: string) => {
    if (!masterData?.staticData) return [];

    const schema = masterData.staticData.find((item) => item.schemaName === schemaName);
    return schema?.options || [];
  };

  // Load master data when step changes
  useEffect(() => {
    loadMasterData(currentStep);
  }, [currentStep]);

  return {
    masterData,
    isLoading,
    error,
    getOptionsForSchema,
    loadMasterData,
  };
};
