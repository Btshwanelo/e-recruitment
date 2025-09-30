import React from 'react';

interface ProgressStepsProps {
  currentStep: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 'personal', label: 'Personal Info', number: 1 },
    { id: 'contact', label: 'Contact Info', number: 2 },
    { id: 'qualifications', label: 'Qualifications', number: 3 },
    { id: 'work-experience', label: 'Work Experience', number: 4 },
    { id: 'documents', label: 'Documents', number: 5 },
    { id: 'cv', label: 'CV Upload', number: 6 },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="flex items-center justify-center space-x-2 mb-6 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
                index <= currentStepIndex ? 'bg-[#005f33] text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step.number}
            </div>
            <span className={`ml-2 text-sm whitespace-nowrap ${index <= currentStepIndex ? 'text-[#005f33]' : 'text-gray-600'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && <div className={`w-8 h-px ml-2 ${index < currentStepIndex ? 'bg-[#005f33]' : 'bg-gray-300'}`}></div>}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
