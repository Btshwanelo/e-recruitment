import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicationLayout from '@/Layouts/ApplicationLayout';
import useLoan from '@/hooks/useLoan';
import { useDispatch } from 'react-redux';
import { applicationResume, setApplicationData, setCurrentLoanStep, updateApplication } from '@/slices/loanSlice';
import {
  useCreateApplicationMutation,
  useRseumeApplicationMutation,
  useUpdateDebtorApplicationMutation,
} from '@/service/debtorAccountApplication';
import useAuth from '@/hooks/useAuth';

import { IndivisualFormSteps } from '../components/indivisualFormConfig';
import ApplicationSummary from './ApplicationSummary';
import SaveApplicationModal from '@/components/ConfirmationModal ';
import Documents from './Documents';
import Verify from './Verify';
import Offer from './Offer';
import DebitOrder from './DebitOrder';

const IndivisualFlow = () => {
  const steps = IndivisualFormSteps;

  const [stepData, setStepData] = useState({});
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    currentApplicationId, 
    currentStep, 
    isExistingApplication, 
    isNewApplication, 
    isResumeApplication, 
    applicationData 
  } = useLoan();
  const authDetails = useAuth();
console.log("DebtorId",authDetails)
  const [CreateApplication, createProps] = useCreateApplicationMutation();
  const [UpdateDebtorApplication, updateProps] = useUpdateDebtorApplicationMutation();
  const [RseumeApplication, resumeProps] = useRseumeApplicationMutation();

  // Mapping of step numbers to their corresponding data keys
  const stepKeyMap:any = {
    0: "personalInformation",
    1: "contactInformation",
    2: "identification",
    3: "professionalQualification",
    4: "financialInformation",
    5: "assetInformation",
    6: "incomeInformation"
  };

  // Get the current step key
  const currentStepKey = stepKeyMap[currentStep] || "unknown";

  useEffect(() => {
    // Load appropriate step data based on current step
    if (stepKeyMap[currentStep] && applicationData[stepKeyMap[currentStep]]) {
      setStepData(applicationData[stepKeyMap[currentStep]] || {});
    }
  }, [currentStep, applicationData]);

  const handleNext = async () => {
    const currentStepConfig = steps[currentStep];

    // Validate the current step data
    const validationResult = currentStepConfig.validate 
      ? currentStepConfig.validate(stepData) 
      : { valid: true, errors: {} };

      console.log("validationResult",validationResult)

    if (!validationResult.valid) {
      setErrors(validationResult.errors);
      return;
    }

    setErrors({});

    // Update application data in Redux
    const updatedApplicationData = {
      ...applicationData,
      [currentStepKey]: stepData // Use dynamic key based on current step
    };
    
    dispatch(setApplicationData(updatedApplicationData));

    if (isExistingApplication) {
      UpdateDebtorApplication({
        body: {
          entityName: 'DebtorAccountApplication',
          requestName: 'UpdateDebtorApplication',
          RecordId: currentApplicationId,
          inputParamters: {
            UpdateData: stepData,
          },
        },
      });
    } else if (isNewApplication) {
      CreateApplication({
        body: {
          entityName: 'DebtorAccountApplication',
          requestName: 'CreateApplication',
          inputParamters: {
            DebtorId: authDetails.user.relatedObjectId,
            Data: stepData,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (createProps.isSuccess) {
      dispatch(
        updateApplication({
          currentStep: currentStep + 1,
          isNewApplication: false,
          isExistingApplication: true,
          isResumeApplication: true,
          currentApplicationId: createProps.data.DebtorApplicationId,
        })
      );
    }
  }, [createProps.isSuccess]);

  useEffect(() => {
    if (updateProps.isSuccess) {
      dispatch(
        updateApplication({
          currentStep: currentStep + 1,
          isNewApplication: false,
          isExistingApplication: true,
          isResumeApplication: true,
          currentApplicationId: currentApplicationId,
        })
      );
    }
  }, [updateProps.isSuccess]);

  useEffect(() => {
    if (isResumeApplication && currentApplicationId) {
      RseumeApplication({
        body: {
          entityName: 'DebtorAccountApplication',
          requestName: 'ResumeApplication',
          RecordId: currentApplicationId,
        },
      });
    }
  }, [isResumeApplication, currentApplicationId]);

  useEffect(() => {
    if (resumeProps.isSuccess) {
      dispatch(applicationResume(resumeProps.data.PersonalDetails));
      dispatch(setCurrentLoanStep(resumeProps.data.CurrentStep));
    }
  }, [resumeProps.isSuccess]);

  const handlePrevious = () => {
    const updatedApplicationData = {
      ...applicationData,
      [currentStepKey]: stepData
    };
    
    dispatch(setApplicationData(updatedApplicationData));
    
    dispatch(
      updateApplication({
        currentStep: currentStep - 1,
        isNewApplication: false,
        isExistingApplication: true, 
        isResumeApplication: true,
        currentApplicationId: currentApplicationId,
      })
    );
  };

  const handleSave = () => {
    // Save current progress before exiting
    const updatedApplicationData = {
      ...applicationData,
      [currentStepKey]: stepData
    };
    
    dispatch(setApplicationData(updatedApplicationData));
    
    navigate('/dashboard');
    setIsModalOpen(false);
  };

  const handleStepDataChange = (newStepData) => {
    setStepData((prevData) => ({
      ...prevData,
      ...newStepData,
    }));
  };

  const handleSaveAndExit = () => {
    setIsModalOpen(true);
  };

  // Get the current step configuration
  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData?.component;

  if (currentStep === 7) {
    return <Documents />;
  }
  if (currentStep === 8) {
    return <Verify />;
  }
  if (currentStep === 9) {
    return <Offer />;
  }
  if (currentStep === 10) {
    return <DebitOrder />;
  }

  return (
    <ApplicationLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Title and Tabs Card */}
        <Card className="mb-4 shadow-sm border-0 bg-white">
          <CardContent className="p-0">
            <div className="flex justify-between items-center px-6 pt-6 pb-2">
              <h2 className="text-3xl font-semibold">{currentStepData?.title}</h2>
              <Button
                variant="outline"
                className="border border-cyan-500 text-cyan-500 hover:bg-cyan-50"
                onClick={handleSaveAndExit}
                disabled={createProps.isLoading || updateProps.isLoading}
              >
                Save & Exit
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto mt-4 gap-2 px-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`
                px-6 py-2 pb-3 border-t-4 flex-shrink-0 text-sm text-[#344054] font-semibold 
                ${
                  index === currentStep
                    ? 'border-[#095C37] font-medium'
                    : 'border-[#E4E7EC] text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
                >
                  {step.tabLabel}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Error Messages */}
        {createProps.isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {createProps.error?.data || 'Error creating application'}
          </div>
        )}
        {updateProps.isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {updateProps.error?.data || 'Error updating application'}
          </div>
        )}
        {resumeProps.isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {resumeProps.error?.data || 'Error resuming application'}
          </div>
        )}

        {/* Step Content */}
        {StepComponent && (
          <StepComponent
            title={currentStepData?.contentTitle || currentStepData?.tabLabel}
            data={stepData}
            onChange={handleStepDataChange}
            errors={errors}
            isLoading={createProps.isLoading || updateProps.isLoading}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between rounded-lg bg-white px-16 py-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className={`border-gray-300 text-gray-700 flex items-center px-6 
            ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentStep === 0 || createProps.isLoading || updateProps.isLoading}
          >
            <ChevronLeft size={18} className="mr-2" />
            Previous
          </Button>
          <Button 
            onClick={handleNext} 
            className="bg-sky-500 hover:bg-sky-600 text-white flex items-center px-6"
            disabled={createProps.isLoading || updateProps.isLoading}
          >
            {createProps.isLoading || updateProps.isLoading ? 'Saving...' : 'Next'}
            {!(createProps.isLoading || updateProps.isLoading) && <ChevronRight size={18} className="ml-2" />}
          </Button>
        </div>
      </div>

      <SaveApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleSave} 
      />
    </ApplicationLayout>
  );
};

export default IndivisualFlow;