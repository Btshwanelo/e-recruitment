import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import ApplicationLayout from '@/Layouts/ApplicationLayout';
import { SaveApplicationModal } from '@/components/ConfirmationModal ';
import { useNavigate } from 'react-router-dom';

// Initial state for personal details
const initialPersonalDetails = {
  postalAddress: '123 Main Street',
  postalCode: '12345',
  cellNumber: '+27 81 234 5678',
  telNumber: '+27 11 987 6543',
  emailAddress: 'johndoe@example.com',
};

// Initial state for qualifications
const initialQualifications = {
  certificationNo: 'CERT-2024-001',
  qualificationName: 'Bachelor of Business Administration',
  qualificationStatus: 'Completed',
  qualificationDetails: 'Full-time undergraduate degree',
  institutionName: 'University of Technology',
  qualificationType: 'Undergraduate',
  qualificationYear: '2022',
};

const AssetsPage = () => {
  // State for personal details
  const [personalDetails, setPersonalDetails] = useState(initialPersonalDetails);
  const navigate = useNavigate();
  // State for qualifications
  const [qualifications, setQualifications] = useState(initialQualifications);

  // State to track current section
  const [currentSection, setCurrentSection] = useState('personalDetails');

  // Handle input changes for personal details
  const handlePersonalDetailsChange = (field, value) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle input changes for qualifications
  const handleQualificationsChange = (field, value) => {
    setQualifications((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log('Application saved!');
    navigate('/saved-applications');
    setIsModalOpen(false);
  };

  // Tab navigation
  const tabItems = [
    { id: 'personal', label: 'Personal details', active: currentSection === 'personalDetails' },
    { id: 'qualification', label: 'Qualification', active: currentSection === 'qualifications' },
    { id: 'financial', label: 'Financial History', active: false },
    { id: 'assets', label: 'Assets', active: false },
    { id: 'income', label: 'Income details', active: false },
    { id: 'offer', label: 'Offer', active: false },
    { id: 'selfie', label: 'Selfie Verification', active: false },
  ];

  // Handle next and previous navigation
  const handleNext = () => {
    if (currentSection === 'personalDetails') {
      setCurrentSection('qualifications');
    }
  };

  const handlePrevious = () => {
    if (currentSection === 'qualifications') {
      setCurrentSection('personalDetails');
    }
  };

  const handleSaveAndExit = () => {
    setIsModalOpen(true);
  };

  return (
    <ApplicationLayout>
      <div className="container mx-auto px-4 py-6">
        {/* First Card - Title and Tabs */}
        <Card className="mb-4 shadow-sm border-0 bg-white">
          <CardContent className="p-0">
            <div className="flex justify-between items-center px-6 pt-6 pb-2">
              <h2 className="text-3xl font-semibold">{currentSection === 'personalDetails' ? 'Personal Details' : 'Qualifications'}</h2>
              <Button variant="outline" className="border border-cyan-500 text-cyan-500 hover:bg-cyan-50" onClick={handleSaveAndExit}>
                Save & Exit
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto mt-4 gap-2 px-6">
              {tabItems.map((tab) => (
                <div
                  key={tab.id}
                  className={`
                    px-6 py-2 pb-3 border-t-4 flex-shrink-0 text-sm text-[#344054] font-semibold 
                    ${
                      tab.active
                        ? 'border-[#095C37] font-medium'
                        : 'border-[#E4E7EC] text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Second Card - Form Content */}
        <Card className="mb-4 shadow-sm border-0 bg-white">
          <CardContent className="p-0">
            <div className="bg-[#F9FAFB] py-4 px-6 mb-6">
              <h3 className="text-lg font-semibold text-center">
                {currentSection === 'personalDetails' ? 'Personal Details Information' : 'Qualifications Information'}
              </h3>
            </div>

            {/* Personal Details Section */}
            {currentSection === 'personalDetails' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-12">
                {/* Postal Address */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Address <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="text"
                    className="border-gray-300"
                    value={personalDetails.postalAddress}
                    onChange={(e) => handlePersonalDetailsChange('postalAddress', e.target.value)}
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="text"
                    className="border-gray-300"
                    value={personalDetails.postalCode}
                    onChange={(e) => handlePersonalDetailsChange('postalCode', e.target.value)}
                  />
                </div>

                {/* Cell Number */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Cell Number <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="tel"
                    className="border-gray-300"
                    value={personalDetails.cellNumber}
                    onChange={(e) => handlePersonalDetailsChange('cellNumber', e.target.value)}
                  />
                </div>

                {/* Tel Number */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Tel Number <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="tel"
                    className="border-gray-300"
                    value={personalDetails.telNumber}
                    onChange={(e) => handlePersonalDetailsChange('telNumber', e.target.value)}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="email"
                    className="border-gray-300"
                    value={personalDetails.emailAddress}
                    onChange={(e) => handlePersonalDetailsChange('emailAddress', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Qualifications Section */}
            {currentSection === 'qualifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-12">
                {/* Certification Number */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Certification Number <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="text"
                    className="border-gray-300"
                    value={qualifications.certificationNo}
                    onChange={(e) => handleQualificationsChange('certificationNo', e.target.value)}
                  />
                </div>

                {/* Qualification Name */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Qualification Name <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="text"
                    className="border-gray-300"
                    value={qualifications.qualificationName}
                    onChange={(e) => handleQualificationsChange('qualificationName', e.target.value)}
                  />
                </div>

                {/* Qualification Status */}
                <div>
                  <div className="mb-1 flex items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Qualification Status <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Select
                    value={qualifications.qualificationStatus}
                    onValueChange={(value) => handleQualificationsChange('qualificationStatus', value)}
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Qualification Details */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Qualification Details <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="text"
                    className="border-gray-300"
                    value={qualifications.qualificationDetails}
                    onChange={(e) => handleQualificationsChange('qualificationDetails', e.target.value)}
                  />
                </div>

                {/* Institution Name */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Institution Name <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="text"
                    className="border-gray-300"
                    value={qualifications.institutionName}
                    onChange={(e) => handleQualificationsChange('institutionName', e.target.value)}
                  />
                </div>

                {/* Qualification Type */}
                <div>
                  <div className="mb-1 flex items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Qualification Type <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Select
                    value={qualifications.qualificationType}
                    onValueChange={(value) => handleQualificationsChange('qualificationType', value)}
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300">
                      <SelectValue placeholder="Select Qualification Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Qualification Year */}
                <div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Qualification Year <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    type="text"
                    className="border-gray-300"
                    value={qualifications.qualificationYear}
                    onChange={(e) => handleQualificationsChange('qualificationYear', e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between rounded-lg bg-white px-16 py-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className={`border-gray-300 text-gray-700 flex items-center px-6 
              ${currentSection === 'personalDetails' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentSection === 'personalDetails'}
          >
            <ChevronLeft size={18} className="mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className={`bg-sky-500 hover:bg-sky-600 text-white flex items-center px-6 
              ${currentSection === 'qualifications' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentSection === 'qualifications'}
          >
            Next
            <ChevronRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
      <SaveApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleSave} />
    </ApplicationLayout>
  );
};

export default AssetsPage;
