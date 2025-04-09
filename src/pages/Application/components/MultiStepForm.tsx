// MultiStepForm.jsx - Container for multi-step form
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicationLayout from '@/Layouts/ApplicationLayout';
import useLoan from '@/hooks/useLoan';
import { useDispatch } from 'react-redux';
import { applicationResume, setCurrentLoanStep, updateApplication } from '@/slices/loanSlice';
import {
  useCreateApplicationMutation,
  useRseumeApplicationMutation,
  useUpdateDebtorApplicationMutation,
} from '@/service/debtorAccountApplication';
import useAuth from '@/hooks/useAuth';
import SaveApplicationModal from '@/components/ConfirmationModal ';

const MultiStepForm = ({ steps }: any) => {
  const [formData, setFormData] = useState({});
  const [stepData, setStepData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentApplicationId, currentStep, isExistingApplication, isNewApplication, isResumeApplication, applicationData } = useLoan();
  const authDetails = useAuth();

  const [CreateApplication, createProps] = useCreateApplicationMutation();
  const [UpdateDebtorApplication, updateProps] = useUpdateDebtorApplicationMutation();
  const [RseumeApplication, resumeProps] = useRseumeApplicationMutation();

  useEffect(() => {
    if (currentStep === 0) {
      setStepData(applicationData.personalInformation);
    }
    if (currentStep === 1) {
      setStepData(applicationData.contactInformation);
    }
    if (currentStep === 2) {
      setStepData(applicationData.identification);
    }
    console.log(applicationData);
  }, []);

  const handleNext = async () => {
    const currentStepId = steps[currentStep].id;
    const currentStepConfig = steps[currentStep];

    const validationResult = currentStepConfig.validate ? currentStepConfig.validate(stepData) : { valid: true, errors: {} };

    if (!validationResult.valid) {
      setErrors(validationResult.errors);
      return;
    }

    setErrors({});

    console.log('---', stepData);

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
    }

    if (isNewApplication) {
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
          isResumeApplication: false,
          currentApplicationId: createProps.data.DebtorApplicationId.DebtorApplicationId,
        })
      );
    }
  }, [createProps.isSuccess]);
  useEffect(() => {
    if (updateProps.isSuccess) {
      // dispatch() //update local state
      dispatch(
        updateApplication({
          currentStep: currentStep + 1,
          isNewApplication: false,
          isExistingApplication: true,
          isResumeApplication: false,
          currentApplicationId: currentApplicationId,
        })
      );
    }
  }, [updateProps.isSuccess]);

  useEffect(() => {
    if (isResumeApplication) {
      RseumeApplication({
        body: {
          entityName: 'DebtorAccountApplication',
          requestName: 'ResumeApplication',
          RecordId: currentApplicationId,
        },
      });
    }
  }, []);
  useEffect(() => {
    if (resumeProps.isSuccess) {
      dispatch(applicationResume(resumeProps.data.PersonalDetails));
      dispatch(setCurrentLoanStep(resumeProps.data.CurrentStep));
    }
  }, [resumeProps.isSuccess]);

  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      // Set the data for the previous step
      const prevStepId = steps[prevStep].id;
      setStepData(formData[prevStepId] || {});
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Application saved!');
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
  const StepComponent = currentStepData.component;

  return (
    <ApplicationLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Title and Tabs Card */}
        <Card className="mb-4 shadow-sm border-0 bg-white">
          <CardContent className="p-0">
            <div className="flex justify-between items-center px-6 pt-6 pb-2">
              <h2 className="text-3xl font-semibold">{currentStepData.title}</h2>
              <Button
                variant="outline"
                className="border border-cyan-500 text-cyan-500 hover:bg-cyan-50"
                onClick={() => setIsModalOpen(true)}
                disabled={loading}
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

        {/* API Error Message */}
        {createProps.isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">{createProps.error.data}</div>
        )}
        {updateProps.isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">{updateProps.error.data}</div>
        )}

        {/* Step Content */}
        <StepComponent
          title={currentStepData.contentTitle || currentStepData.tabLabel}
          data={stepData}
          onChange={handleStepDataChange}
          errors={errors}
          isLoading={loading}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between rounded-lg bg-white px-16 py-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className={`border-gray-300 text-gray-700 flex items-center px-6 
              ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={18} className="mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={loading} className="bg-sky-500 hover:bg-sky-600 text-white flex items-center px-6">
            {createProps.isLoading || updateProps.isLoading ? 'Saving...' : 'Next'}
            {!loading && <ChevronRight size={18} className="ml-2" />}
          </Button>
        </div>
      </div>

      <SaveApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleSave} />
    </ApplicationLayout>
  );
};

export default MultiStepForm;
