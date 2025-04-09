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

import { LocalFormSteps } from '../components/localFormConfig';
import ApplicationSummary from './ApplicationSummary';
import SaveApplicationModal from '@/components/ConfirmationModal ';
import DebitOrder from './DebitOrder';
import Offer from './Offer';
import Verify from './Verify';
import Documents from './Documents';
import useLocalApplication from '@/hooks/useLocalApplication';

// currentLoan
// current loan active step
// next
// prev


const LocalFlow = () => {
  const steps = LocalFormSteps;
   // Mapping of step numbers to their corresponding data keys
   const stepKeyMap:any = {
    0: "personalInformation",
    1: "contactInformation",
    2: "identification",
    3: "professionalQualification",
    4: "financialInformation",
    5: "assetInformation",
    6: "incomeInformation",
    7: "documents",
    8: "verify",
    9: "offer",
    10: "debutOrder"
  };

  const [stepData, setStepData] = useState({});
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {activeApplications,currentApplication} = useLocalApplication()
  const authDetails = useAuth();

  const currentLoan = activeApplications[currentApplication.loanIndex]
  const currentLoanActiveStepNumber = currentLoan.currentStep
  const currentLoanActiveStepTitle = stepKeyMap[currentLoanActiveStepNumber]
  const currentLoanActiveStep = currentLoan[currentLoanActiveStepTitle]

 

  // Get the current step key
  const currentStepKey = stepKeyMap[currentApplication.loanIndex] || "unknown";

  const handleNext = async () => {
    const currentStepConfig = steps[currentApplication.loanIndex];

    // Validate the current step data
    const validationResult = currentStepConfig.validate 
      ? currentStepConfig.validate(stepData) 
      : { valid: true, errors: {} };

    if (!validationResult.valid) {
      setErrors(validationResult.errors);
      return;
    }

    setErrors({});

  

  };









  const handlePrevious = () => {

  };

  const handleSave = () => {
    
    navigate('/dashboard');
    setIsModalOpen(false);
  };

  const handleStepDataChange = (newStepData:any) => {
    setStepData((prevData) => ({
      ...prevData,
      ...newStepData,
    }));
  };

  const handleSaveAndExit = () => {
    setIsModalOpen(true);
  };

  // Get the current step configuration
  const currentStepData = steps[currentApplication.loanIndex];
  const StepComponent = currentStepData?.component;

  if (currentApplication.loanIndex === 7) {
    return <Documents />;
  }
  if (currentApplication.loanIndex === 8) {
    return <Verify />;
  }
  if (currentApplication.loanIndex === 9) {
    return <Offer />;
  }
  if (currentApplication.loanIndex === 10) {
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


        {/* Step Content */}
        {StepComponent && (
          <StepComponent
            title={currentStepData?.contentTitle || currentStepData?.tabLabel}
            data={stepData}
            onChange={handleStepDataChange}
            errors={errors}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between rounded-lg bg-white px-16 py-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className={`border-gray-300 text-gray-700 flex items-center px-6 
            ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronLeft size={18} className="mr-2" />
            Previous
          </Button>
          <Button 
            onClick={handleNext} 
            className="bg-sky-500 hover:bg-sky-600 text-white flex items-center px-6"
          >
            Next
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

export default LocalFlow;