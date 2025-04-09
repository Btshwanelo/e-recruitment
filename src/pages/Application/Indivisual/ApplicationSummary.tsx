import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ApplicationLayout from '@/Layouts/ApplicationLayout';
import { useNavigate } from 'react-router-dom';
import SaveApplicationModal from '@/components/ConfirmationModal ';
import { updateApplication } from '@/slices/loanSlice';
import { useDispatch } from 'react-redux';
import useLoan from '@/hooks/useLoan';

const AccordionSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <div className="flex justify-between  py-4 px-6 cursor-pointer hover:bg-gray-50" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h3 className="text-base font-semibold text-[#101828]">{title}</h3>
          <p className="text-sm text-[#475467]">
            This section compiles personal information gathered from various sources, providing a comprehensive overview of individual
            identity attributes.
          </p>
        </div>
        {isOpen ? <PlusCircle className="text-[#98A2B3]" /> : <MinusCircle className="text-[#98A2B3]" />}
      </div>
      {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
};

const ApplicationSummary = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const { currentApplicationId, currentStep, isExistingApplication, isNewApplication, isResumeApplication, applicationData } = useLoan();

  const dispatch = useDispatch();
  const handleSave = () => {
    navigate('/dashboard');
    setIsModalOpen(false);
  };

  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    dispatch(
      updateApplication({
        currentStep: 6,
        isNewApplication: false,
        isExistingApplication: true,
        isResumeApplication: true,
        currentApplicationId: currentApplicationId,
      })
    );
  };

  return (
    <ApplicationLayout>
      <div className="max-w-6xl mx-auto my-8 p-4">
        {/* Top Section */}
        <div className="bg-white rounded-lg p-4 md:p-6 mb-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Loan Application</h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              className="text-[#58B6E9] border-[#58B6E9] hover:bg-blue-50 w-full md:w-auto"
            >
              Save & Exit
            </Button>
          </div>

          <AccordionSection title="Personal Details" defaultOpen={true}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Title</p>
                <p className="font-medium">Dr</p>
              </div>
              <div>
                <p className="text-gray-600">First Name</p>
                <p className="font-medium">Thandiswa</p>
              </div>
              <div>
                <p className="text-gray-600">Surname</p>
                <p className="font-medium">Masiza</p>
              </div>
              <div>
                <p className="text-gray-600">Nationality</p>
                <p className="font-medium">South African</p>
              </div>
              <div>
                <p className="text-gray-600">ID No</p>
                <p className="font-medium">9902023024083</p>
              </div>
              <div>
                <p className="text-gray-600">Date of Birth</p>
                <p className="font-medium">15/09/1992</p>
              </div>
              <div>
                <p className="text-gray-600">Gender</p>
                <p className="font-medium">Female</p>
              </div>
              <div>
                <p className="text-gray-600">Marital Status</p>
                <p className="font-medium">Single</p>
              </div>
              <div>
                <p className="text-gray-600">Postal Address</p>
                <p className="font-medium">14 Harfield street, Pretoria, 0082</p>
              </div>
              <div>
                <p className="text-gray-600">Postal Code</p>
                <p className="font-medium">0082</p>
              </div>
              <div>
                <p className="text-gray-600">Cell No</p>
                <p className="font-medium">081 786 0932</p>
              </div>
              <div>
                <p className="text-gray-600">Tel No</p>
                <p className="font-medium">-</p>
              </div>
              <div>
                <p className="text-gray-600">Email Address</p>
                <p className="font-medium">thandiswa@gmail.com</p>
              </div>
              <div>
                <p className="text-gray-600">Race</p>
                <p className="font-medium">African</p>
              </div>
              <div>
                <p className="text-gray-600">Criminal Record</p>
                <p className="font-medium">Clear</p>
              </div>
            </div>
          </AccordionSection>
          <AccordionSection title="Personal Details" defaultOpen={true}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Title</p>
                <p className="font-medium">Dr</p>
              </div>
              <div>
                <p className="text-gray-600">First Name</p>
                <p className="font-medium">Thandiswa</p>
              </div>
              <div>
                <p className="text-gray-600">Surname</p>
                <p className="font-medium">Masiza</p>
              </div>
              <div>
                <p className="text-gray-600">Nationality</p>
                <p className="font-medium">South African</p>
              </div>
              <div>
                <p className="text-gray-600">ID No</p>
                <p className="font-medium">9902023024083</p>
              </div>
              <div>
                <p className="text-gray-600">Date of Birth</p>
                <p className="font-medium">15/09/1992</p>
              </div>
              <div>
                <p className="text-gray-600">Gender</p>
                <p className="font-medium">Female</p>
              </div>
              <div>
                <p className="text-gray-600">Marital Status</p>
                <p className="font-medium">Single</p>
              </div>
              <div>
                <p className="text-gray-600">Postal Address</p>
                <p className="font-medium">14 Harfield street, Pretoria, 0082</p>
              </div>
              <div>
                <p className="text-gray-600">Postal Code</p>
                <p className="font-medium">0082</p>
              </div>
              <div>
                <p className="text-gray-600">Cell No</p>
                <p className="font-medium">081 786 0932</p>
              </div>
              <div>
                <p className="text-gray-600">Tel No</p>
                <p className="font-medium">-</p>
              </div>
              <div>
                <p className="text-gray-600">Email Address</p>
                <p className="font-medium">thandiswa@gmail.com</p>
              </div>
              <div>
                <p className="text-gray-600">Race</p>
                <p className="font-medium">African</p>
              </div>
              <div>
                <p className="text-gray-600">Criminal Record</p>
                <p className="font-medium">Clear</p>
              </div>
            </div>
          </AccordionSection>

          {/* Professional Qualifications Section */}
          <AccordionSection title="Professional Qualifications">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Certification No</p>
                <p className="font-medium">Sefako Makgatho Health Sciences University</p>
              </div>
              <div>
                <p className="text-gray-600">Qualification Name</p>
                <p className="font-medium">Doctor of Medicine</p>
              </div>
              <div>
                <p className="text-gray-600">Qualification Type</p>
                <p className="font-medium">Doctor of Medicine</p>
              </div>
              <div>
                <p className="text-gray-600">Qualification Status</p>
                <p className="font-medium">Qualification Year Obtained</p>
              </div>
              <div>
                <p className="text-gray-600">Qualification Details</p>
                <p className="font-medium">Thandiswa@za.360.com</p>
              </div>
              <div>
                <p className="text-gray-600">Qualification Year</p>
                <p className="font-medium">2022</p>
              </div>
            </div>
          </AccordionSection>

          {/* Financial History Section */}
          <AccordionSection title="Financial History">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Credit Cards</p>
                <p className="font-medium">2</p>
              </div>
              <div>
                <p className="text-gray-600">Total Loans</p>
                <p className="font-medium">1</p>
              </div>
              <div>
                <p className="text-gray-600">Vehicle Finance</p>
                <p className="font-medium">-</p>
              </div>
              <div>
                <p className="text-gray-600">Others</p>
                <p className="font-medium">Thandiswa@za.360.com</p>
              </div>
              <div>
                <p className="text-gray-600">3 Months Bank Statement</p>
                <p className="font-medium">Uploaded</p>
              </div>
            </div>
          </AccordionSection>

          {/* Income and Cashflow Section */}
          <AccordionSection title="Income and Cashflow">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Employment</p>
                <p className="font-medium">Employed</p>
              </div>
              <div>
                <p className="text-gray-600">Operating Activities Cash out (OCO)</p>
                <p className="font-medium">2990</p>
              </div>
              <div>
                <p className="text-gray-600">Investment Activities Cash out (ICO)</p>
                <p className="font-medium">8766</p>
              </div>
              <div>
                <p className="text-gray-600">Financial Activities Cash out (FCO)</p>
                <p className="font-medium">57845</p>
              </div>
              <div>
                <p className="text-gray-600">Total Cash Payments (OCO+ICO+FCO)</p>
                <p className="font-medium">5543</p>
              </div>
              <div>
                <p className="text-gray-600">Employment Type</p>
                <p className="font-medium">Employed</p>
              </div>
              <div>
                <p className="text-gray-600">Cash Flow Type</p>
                <p className="font-medium">Operating Activities</p>
              </div>
              <div>
                <p className="text-gray-600">Cash Inflows</p>
                <p className="font-medium">2990</p>
              </div>
              <div>
                <p className="text-gray-600">Cash Outflows</p>
                <p className="font-medium">748</p>
              </div>
            </div>
          </AccordionSection>

          {/* Personal and Business Assets Section */}
          <AccordionSection title="Personal and Business Assets">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Asset Type</p>
                <p className="font-medium">Vehicle</p>
              </div>
              <div>
                <p className="text-gray-600">Asset Category</p>
                <p className="font-medium">Personal</p>
              </div>
              <div>
                <p className="text-gray-600">Asset Name</p>
                <p className="font-medium">Audi A3</p>
              </div>
              <div>
                <p className="text-gray-600">Asset Address</p>
                <p className="font-medium">12 Invicta Road</p>
              </div>
              <div>
                <p className="text-gray-600">Asset Tel No</p>
                <p className="font-medium">Thandiswa@za.360.com</p>
              </div>
              <div>
                <p className="text-gray-600">Asset Location</p>
                <p className="font-medium">Urban</p>
              </div>
            </div>
          </AccordionSection>

          {/* Debt to Income Ratio Section */}
          <AccordionSection title="Debt to Income Ratio">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Monthly Nett Income</p>
                <p className="font-medium">67000</p>
              </div>
              <div>
                <p className="text-gray-600">Total Monthly Debt Repo</p>
                <p className="font-medium">20000</p>
              </div>
              <div>
                <p className="text-gray-600">Total Monthly Exit Debt</p>
                <p className="font-medium">10000</p>
              </div>
              <div>
                <p className="text-gray-600">Total Monthly Net Income</p>
                <p className="font-medium">81000</p>
              </div>
              <div>
                <p className="text-gray-600">Total Monthly Debt</p>
                <p className="font-medium">20000</p>
              </div>
            </div>
          </AccordionSection>

          <div className="flex justify-between mt-6 px-4">
            <Button onClick={handlePrevious} variant="outline" className="px-6 border border-[#D0D5DD] text-[#344054]">
              Previous
            </Button>
            <Button onClick={() => navigate('/dashboard')} className="bg-sky-500 hover:bg-sky-600 text-white px-6">
              Next
            </Button>
          </div>
        </div>

        {/* Navigation Buttons */}
      </div>
      <SaveApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleSave} />
    </ApplicationLayout>
  );
};

export default ApplicationSummary;
