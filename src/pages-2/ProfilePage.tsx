import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderV2 from './Header';
import { useNavigate } from 'react-router-dom';
import { useExecuteRequest1Mutation } from '@/slices/services';

// Master data types
interface MasterDataOption {
  lable: string;
  value: string;
}

interface MasterDataSchema {
  schemaName: string;
  options: MasterDataOption[];
}

interface MasterDataResponse {
  staticData: MasterDataSchema[];
  clientMessage: string | null;
  results: any;
  gotoUrl: string | null;
}

// Custom hook for managing master data
const useMasterData = (currentStep: string) => {
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
  const getOptionsForSchema = (schemaName: string): MasterDataOption[] => {
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

const ProgressStepsProgressIconsCentered = ({ currentStep }: { currentStep: string }) => {
  const steps = [
    { id: 'personal', label: 'Personal Info', number: 1 },
    { id: 'contact', label: 'Contact Info', number: 2 },
    { id: 'qualifications', label: 'Qualifications', number: 3 },
    { id: 'work-experience', label: 'Work Experience', number: 4 },
    { id: 'cv', label: 'CV Upload', number: 5 },
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

const Footer = () => (
  <footer className="bg-[#005f33] text-white w-full py-6 mt-10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0"></div>
      <div>
        <p className="text-sm">© 2077 EZRA. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// File upload interfaces
interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  file: File;
}

interface FileUploadError {
  message: string;
  type: 'size' | 'type' | 'general';
}

// Form data interfaces
interface Language {
  id: string;
  language: string;
  proficiency: string;
}

interface Qualification {
  id: string;
  qualification: string;
  institution: string;
  yearObtained: string;
}

interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  fromDate: string;
  toDate: string;
  reasonForLeaving: string;
}

interface ProfileFormData {
  firstName: string;
  initial: string;
  title: string;
  lastName: string;
  idNumber: string;
  age: string;
  race: string;
  dateOfBirth: string;
  gender: string;
  passportNumber: string;
  rightToWork: string;
  disabilityStatus: string;
  disabilityNature: string;
  languages: Language[];
  qualifications: Qualification[];
  workExperience: WorkExperience[];
}

interface ContactFormData {
  email: string;
  mobileNumber: string;
  alternativeNumber: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

// Dummy data
const dummyPersonalInfo: ProfileFormData = {
  firstName: '',
  initial: '',
  title: '',
  lastName: '',
  idNumber: '',
  age: '',
  race: '',
  dateOfBirth: '',
  gender: '',
  passportNumber: '',
  rightToWork: '',
  disabilityStatus: '',
  disabilityNature: '',
  languages: [
    { id: '1', language: 'English', proficiency: 'Fluent' },
    { id: '2', language: 'Zulu', proficiency: 'Native' },
  ],
  qualifications: [
    { id: '1', qualification: "Bachelor's Degree", institution: 'University of Cape Town', yearObtained: '2015' },
    { id: '2', qualification: 'National Senior Certificate (NSC)', institution: 'Rondebosch Boys High School', yearObtained: '2011' },
  ],
  workExperience: [
    {
      id: '1',
      companyName: 'ABC Corporation',
      position: 'Software Developer',
      fromDate: '2020-01-01',
      toDate: '2023-12-31',
      reasonForLeaving: 'Career advancement opportunity',
    },
  ],
};

const dummyContactInfo: ContactFormData = {
  email: '',
  mobileNumber: '',
  alternativeNumber: '',
  streetAddress: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
};

const ProfilePage: React.FC = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<string>('personal');

  // Use the custom master data hook
  const { getOptionsForSchema } = useMasterData(activeTab);

  // Form data states
  const [personalFormData, setPersonalFormData] = useState<ProfileFormData>(dummyPersonalInfo);
  const [contactFormData, setContactFormData] = useState<ContactFormData>(dummyContactInfo);

  // File upload states
  const [cvFile, setCvFile] = useState<UploadedFile | null>(null);
  const [documents, setDocuments] = useState<UploadedFile[]>([]);
  const [uploadErrors, setUploadErrors] = useState<FileUploadError[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState<string>('cv');

  // File input refs
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const documentsFileInputRef = useRef<HTMLInputElement>(null);

  // Mock navigate function
  const navigate = useNavigate();

  // Step navigation logic
  const getNextStep = (currentStep: string): string => {
    const stepOrder = ['personal', 'contact', 'qualifications', 'work-experience', 'cv'];
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : 'cv';
  };

  const handleStepSave = (e: React.FormEvent) => {
    e.preventDefault();
    const nextStep = getNextStep(activeTab);

    if (nextStep === 'cv') {
      // After CV step, navigate to jobs
      navigate('/jobs');
    } else {
      // Move to next step
      setActiveTab(nextStep);
    }
  };

  // File validation
  const validateFile = (file: File, isCV: boolean = false): FileUploadError | null => {
    const maxSize = isCV ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for CV, 10MB for documents
    const allowedTypes = isCV
      ? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      : [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpeg',
          'image/png',
        ];

    if (file.size > maxSize) {
      return {
        message: `File size must be less than ${isCV ? '5MB' : '10MB'}`,
        type: 'size',
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        message: isCV ? 'CV must be PDF, DOC, or DOCX format' : 'File must be PDF, DOC, DOCX, JPG, or PNG format',
        type: 'type',
      };
    }

    return null;
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle CV file upload
  const handleCvFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const error = validateFile(file, true);

    if (error) {
      setUploadErrors([error]);
      return;
    }

    setIsUploading(true);
    setUploadErrors([]);

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        file: file,
      };

      setCvFile(uploadedFile);

      // Reset file input
      if (cvFileInputRef.current) {
        cvFileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadErrors([
        {
          message: 'Failed to upload file. Please try again.',
          type: 'general',
        },
      ]);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle documents file upload
  const handleDocumentsFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadErrors([]);

    const newDocuments: UploadedFile[] = [];
    const errors: FileUploadError[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const error = validateFile(file, false);

      if (error) {
        errors.push({
          message: `${file.name}: ${error.message}`,
          type: error.type,
        });
        continue;
      }

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + i,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        file: file,
      };

      newDocuments.push(uploadedFile);
    }

    if (errors.length > 0) {
      setUploadErrors(errors);
    }

    if (newDocuments.length > 0) {
      setDocuments((prev) => [...prev, ...newDocuments]);
    }

    // Reset file input
    if (documentsFileInputRef.current) {
      documentsFileInputRef.current.value = '';
    }

    setIsUploading(false);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, isCV: boolean = false) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (isCV) {
      handleCvFileUpload(files);
    } else {
      handleDocumentsFileUpload(files);
    }
  };

  // Delete file handlers
  const handleDeleteCV = () => {
    setCvFile(null);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  // Form handlers
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (value: string) => {
    setPersonalFormData((prev) => ({ ...prev, title: value }));
  };

  const handleDisabilityStatusChange = (value: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      disabilityStatus: value,
      disabilityNature: value === 'No' ? '' : prev.disabilityNature,
    }));
  };

  const handleLanguageAdd = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      language: '',
      proficiency: '',
    };
    setPersonalFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLanguage],
    }));
  };

  const handleLanguageChange = (id: string, field: 'language' | 'proficiency', value: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    }));
  };

  const handleLanguageRemove = (id: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  // Qualification handlers
  const handleQualificationAdd = () => {
    const newQualification: Qualification = {
      id: Date.now().toString(),
      qualification: '',
      institution: '',
      yearObtained: '',
    };
    setPersonalFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, newQualification],
    }));
  };

  const handleQualificationChange = (id: string, field: 'qualification' | 'institution' | 'yearObtained', value: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.map((qual) => (qual.id === id ? { ...qual, [field]: value } : qual)),
    }));
  };

  const handleQualificationRemove = (id: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((qual) => qual.id !== id),
    }));
  };

  // Work Experience handlers
  const handleWorkExperienceAdd = () => {
    const newWorkExperience: WorkExperience = {
      id: Date.now().toString(),
      companyName: '',
      position: '',
      fromDate: '',
      toDate: '',
      reasonForLeaving: '',
    };
    setPersonalFormData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newWorkExperience],
    }));
  };

  const handleWorkExperienceChange = (id: string, field: keyof WorkExperience, value: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((work) => (work.id === id ? { ...work, [field]: value } : work)),
    }));
  };

  const handleWorkExperienceRemove = (id: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((work) => work.id !== id),
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Personal Info:', personalFormData);
    console.log('Contact Info:', contactFormData);
    console.log('CV File:', cvFile);
    console.log('Documents:', documents);

    // Use step navigation logic
    handleStepSave(e);
  };

  // Clear errors
  const clearErrors = () => {
    setUploadErrors([]);
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7]">
      <HeaderV2 />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <Card
          className="w-full min-h-[180px] mb-10 text-white border-none"
          style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-8">Profile</CardTitle>
            <p className="text-gray-300 font-normal text-xl mt-2">Manage your profile here</p>
          </CardHeader>
        </Card>

        <div className="mb-8">
          <ProgressStepsProgressIconsCentered currentStep={activeTab} />
        </div>

        {/* Error Display */}
        {uploadErrors.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Upload Errors</h3>
                <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                  {uploadErrors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button onClick={clearErrors} className="text-red-600 hover:text-red-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex bg-white rounded-xl flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl p-5">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('personal')}
                className={`block font-semibold rounded-md text-left pl-3 py-2 w-full ${
                  activeTab === 'personal' ? 'text-[#005f33] bg-[#F6F9FE]' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`block font-semibold rounded-md text-left pl-3 py-2 w-full ${
                  activeTab === 'contact' ? 'text-[#005f33] bg-[#F6F9FE]' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Contact Info
              </button>
              <button
                onClick={() => setActiveTab('qualifications')}
                className={`block font-semibold rounded-md text-left pl-3 py-2 w-full ${
                  activeTab === 'qualifications' ? 'text-[#005f33] bg-[#F6F9FE]' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Qualifications
              </button>
              <button
                onClick={() => setActiveTab('work-experience')}
                className={`block font-semibold rounded-md text-left pl-3 py-2 w-full ${
                  activeTab === 'work-experience' ? 'text-[#005f33] bg-[#F6F9FE]' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Work Experience
              </button>
              <button
                onClick={() => setActiveTab('cv')}
                className={`block font-semibold rounded-md text-left pl-3 py-2 w-full ${
                  activeTab === 'cv' ? 'text-[#005f33] bg-[#F6F9FE]' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Manage My CV
              </button>
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1 mb-20 rounded-lg">
            <Card className="bg-white border-none rounded-lg shadow-none">
              <CardContent className="pt-6 rounded-lg">
                {/* Personal Info Tab */}
                {activeTab === 'personal' && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Personal info</h2>
                    <p className="text-gray-500 text-sm mb-4">
                      Please provide some information about yourself. The First Name and Last Name you provide will be displayed alongside
                      any comments, forum posts, or ideas you make on the site.
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                      The Email Address and Phone number will not be displayed on the site. Your Organization and Title are optional. They
                      will be displayed with your comments and forum posts.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Select value={personalFormData.title} onValueChange={handleTitleChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a title" />
                            </SelectTrigger>
                            <SelectContent>
                              {getOptionsForSchema('TitleId').map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.lable}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name(s)</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={personalFormData.firstName}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="initial">Initial</Label>
                          <Input
                            id="initial"
                            name="initial"
                            value={personalFormData.initial}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={personalFormData.lastName}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="idNumber">ID number</Label>
                          <Input
                            id="idNumber"
                            name="idNumber"
                            value={personalFormData.idNumber}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
                          <p className="text-xs text-gray-500">Your ID number as it appears in your SA ID</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input id="age" name="age" value={personalFormData.age} onChange={handlePersonalChange} className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="race">Race</Label>
                          <Select
                            value={personalFormData.race}
                            onValueChange={(value) => setPersonalFormData((prev) => ({ ...prev, race: value }))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select race" />
                            </SelectTrigger>
                            <SelectContent>
                              {getOptionsForSchema('RaceId').map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.lable}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of birth</Label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={personalFormData.dateOfBirth}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select
                            value={personalFormData.gender}
                            onValueChange={(value) => setPersonalFormData((prev) => ({ ...prev, gender: value }))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              {getOptionsForSchema('GenderId').map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.lable}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passportNumber">Passport Number (optional)</Label>
                          <Input
                            id="passportNumber"
                            name="passportNumber"
                            value={personalFormData.passportNumber}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rightToWork">Right to Work status</Label>
                          <Select
                            value={personalFormData.rightToWork}
                            onValueChange={(value) => setPersonalFormData((prev) => ({ ...prev, rightToWork: value }))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {getOptionsForSchema('RightToWorkStatusId').map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.lable}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="disabilityStatus">Disability Status</Label>
                          <Select value={personalFormData.disabilityStatus} onValueChange={handleDisabilityStatusChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select disability status" />
                            </SelectTrigger>
                            <SelectContent>
                              {getOptionsForSchema('Disabled').map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.lable}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {personalFormData.disabilityStatus === 'Yes' && (
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="disabilityNature">Nature of Disability</Label>
                            <Input
                              id="disabilityNature"
                              name="disabilityNature"
                              value={personalFormData.disabilityNature}
                              onChange={handlePersonalChange}
                              placeholder="Please describe the nature of your disability"
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>

                      {/* Languages Section */}
                      <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">Languages & Proficiency</h3>
                          <Button type="button" onClick={handleLanguageAdd} className="bg-[#005f33] hover:bg-[#005f33] text-white">
                            Add Language
                          </Button>
                        </div>

                        {personalFormData.languages.map((language) => (
                          <div
                            key={language.id}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg"
                          >
                            <div className="space-y-2">
                              <Label htmlFor={`language-${language.id}`}>Language</Label>
                              <Select
                                value={language.language}
                                onValueChange={(value) => handleLanguageChange(language.id, 'language', value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getOptionsForSchema('LanguageId').map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.lable}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`proficiency-${language.id}`}>Speak - Proficiency Level</Label>
                              <Select
                                value={language.proficiency}
                                onValueChange={(value) => handleLanguageChange(language.id, 'proficiency', value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select proficiency" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getOptionsForSchema('SpeakingProficiencyId').map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.lable}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`proficiency-${language.id}`}>Read/Write - Proficiency Level</Label>
                              <Select
                                value={language.proficiency}
                                onValueChange={(value) => handleLanguageChange(language.id, 'proficiency', value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select proficiency" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getOptionsForSchema('ReadOrWriteProficiencyId').map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.lable}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-end">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleLanguageRemove(language.id)}
                                className="w-full h-11 text-red-600 border-red-300 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}

                        {personalFormData.languages.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <p>No languages added yet. Click "Add Language" to get started.</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
                        <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#005f33] w-[180px] hover:bg-[#005f33]">
                          Next Step
                        </Button>
                      </div>
                    </form>
                  </>
                )}

                {/* Contact Info Tab */}
                {activeTab === 'contact' && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Contact info</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Please provide your contact information. This information will be used to communicate with you regarding job
                      applications and other important updates.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="email">Email address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={contactFormData.email}
                            onChange={handleContactChange}
                            className="w-full"
                          />
                          <p className="text-xs text-gray-500">This email will be used for all communications</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Mobile number</Label>
                          <Input
                            id="mobileNumber"
                            name="mobileNumber"
                            value={contactFormData.mobileNumber}
                            onChange={handleContactChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alternativeNumber">Alternative number (optional)</Label>
                          <Input
                            id="alternativeNumber"
                            name="alternativeNumber"
                            value={contactFormData.alternativeNumber}
                            onChange={handleContactChange}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Residential Address Section */}
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Residential Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="streetAddress">Street Address</Label>
                            <Input
                              id="streetAddress"
                              name="streetAddress"
                              value={contactFormData.streetAddress}
                              onChange={handleContactChange}
                              placeholder="Enter your street address"
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={contactFormData.city}
                              onChange={handleContactChange}
                              placeholder="Enter your city"
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="province">Province</Label>
                            <Select
                              value={contactFormData.province}
                              onValueChange={(value) => setContactFormData((prev) => ({ ...prev, province: value }))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select province" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                                <SelectItem value="Free State">Free State</SelectItem>
                                <SelectItem value="Gauteng">Gauteng</SelectItem>
                                <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                                <SelectItem value="Limpopo">Limpopo</SelectItem>
                                <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                                <SelectItem value="Northern Cape">Northern Cape</SelectItem>
                                <SelectItem value="North West">North West</SelectItem>
                                <SelectItem value="Western Cape">Western Cape</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                              id="postalCode"
                              name="postalCode"
                              value={contactFormData.postalCode}
                              onChange={handleContactChange}
                              placeholder="Enter postal code"
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              value={contactFormData.country}
                              onChange={handleContactChange}
                              placeholder="Enter country"
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
                        <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#005f33] w-[180px] hover:bg-[#005f33]">
                          Next Step
                        </Button>
                      </div>
                    </form>
                  </>
                )}

                {/* Qualifications Tab */}
                {activeTab === 'qualifications' && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Please provide details about your educational qualifications and certifications.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Your Qualifications</h3>
                        <Button type="button" onClick={handleQualificationAdd} className="bg-[#005f33] hover:bg-[#005f33] text-white">
                          Add Qualification
                        </Button>
                      </div>

                      {personalFormData.qualifications.map((qualification) => (
                        <div
                          key={qualification.id}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="space-y-2">
                            <Label htmlFor={`qualification-${qualification.id}`}>Qualification</Label>
                            <Select
                              value={qualification.qualification}
                              onValueChange={(value) => handleQualificationChange(qualification.id, 'qualification', value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select qualification" />
                              </SelectTrigger>
                              <SelectContent>
                                {getOptionsForSchema('QualificationTypeId').map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.lable}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`institution-${qualification.id}`}>Institution</Label>
                            <Input
                              id={`institution-${qualification.id}`}
                              value={qualification.institution}
                              onChange={(e) => handleQualificationChange(qualification.id, 'institution', e.target.value)}
                              placeholder="e.g., University of Cape Town"
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`year-${qualification.id}`}>Year Obtained</Label>
                            <Input
                              id={`year-${qualification.id}`}
                              value={qualification.yearObtained}
                              onChange={(e) => handleQualificationChange(qualification.id, 'yearObtained', e.target.value)}
                              placeholder="e.g., 2020"
                              className="w-full"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleQualificationRemove(qualification.id)}
                              className="w-full text-red-600 border-red-300 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}

                      {personalFormData.qualifications.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <p>No qualifications added yet. Click "Add Qualification" to get started.</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
                        <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#005f33] w-[180px] hover:bg-[#005f33]">
                          Next Step
                        </Button>
                      </div>
                    </form>
                  </>
                )}

                {/* Work Experience Tab */}
                {activeTab === 'work-experience' && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
                    <p className="text-gray-500 text-sm mb-6">Please provide details about your work experience and employment history.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Your Work Experience</h3>
                        <Button type="button" onClick={handleWorkExperienceAdd} className="bg-[#005f33] hover:bg-[#005f33] text-white">
                          Add Work Experience
                        </Button>
                      </div>

                      {personalFormData.workExperience.map((work) => (
                        <div key={work.id} className="p-4 border border-gray-200 rounded-lg mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor={`company-${work.id}`}>Company Name</Label>
                              <Input
                                id={`company-${work.id}`}
                                value={work.companyName}
                                onChange={(e) => handleWorkExperienceChange(work.id, 'companyName', e.target.value)}
                                placeholder="Enter company name"
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`position-${work.id}`}>Position</Label>
                              <Input
                                id={`position-${work.id}`}
                                value={work.position}
                                onChange={(e) => handleWorkExperienceChange(work.id, 'position', e.target.value)}
                                placeholder="Enter your position"
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`fromDate-${work.id}`}>From Date</Label>
                              <Input
                                id={`fromDate-${work.id}`}
                                type="date"
                                value={work.fromDate}
                                onChange={(e) => handleWorkExperienceChange(work.id, 'fromDate', e.target.value)}
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`toDate-${work.id}`}>To Date</Label>
                              <Input
                                id={`toDate-${work.id}`}
                                type="date"
                                value={work.toDate}
                                onChange={(e) => handleWorkExperienceChange(work.id, 'toDate', e.target.value)}
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor={`reason-${work.id}`}>Reason for Leaving</Label>
                              <Input
                                id={`reason-${work.id}`}
                                value={work.reasonForLeaving}
                                onChange={(e) => handleWorkExperienceChange(work.id, 'reasonForLeaving', e.target.value)}
                                placeholder="Enter reason for leaving"
                                className="w-full"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleWorkExperienceRemove(work.id)}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}

                      {personalFormData.workExperience.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <p>No work experience added yet. Click "Add Work Experience" to get started.</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
                        <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#005f33] w-[180px] hover:bg-[#005f33]">
                          Next Step
                        </Button>
                      </div>
                    </form>
                  </>
                )}

                {/* CV Management Tab */}
                {activeTab === 'cv' && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Manage my CV</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Upload your CV and supporting documents. These documents will be attached to your job applications.
                    </p>

                    <Tabs defaultValue="cv" className="w-full mb-6">
                      <TabsList className="grid w-fit grid-cols-2 bg-white shadow-none text-[#026AA2]">
                        <TabsTrigger
                          value="cv"
                          onClick={() => setActiveDocTab('cv')}
                          className={activeDocTab === 'cv' ? 'text-[#026AA2] font-semibold shadow-none bg-[#F0F9FF]' : ''}
                        >
                          My CV
                        </TabsTrigger>
                        <TabsTrigger
                          value="documents"
                          onClick={() => setActiveDocTab('documents')}
                          className={activeDocTab === 'documents' ? 'text-[#026AA2] font-semibold shadow-none bg-[#F0F9FF]' : ''}
                        >
                          Documents
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="cv" className="mt-6">
                        <div
                          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#005f33] transition-colors"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, true)}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Upload className={`h-12 w-12 mb-4 ${isUploading ? 'text-[#005f33] animate-pulse' : 'text-gray-400'}`} />
                            <h3 className="text-lg font-medium mb-2">{isUploading ? 'Uploading...' : 'Upload CV'}</h3>
                            <p className="text-sm text-gray-500 mb-4">Drag and drop your CV file here, or click to browse</p>
                            <p className="text-xs text-gray-400 mb-4">Supported formats: PDF, DOC, DOCX (Max size: 5MB)</p>
                            <Button
                              onClick={() => cvFileInputRef.current?.click()}
                              className="bg-[#005f33] hover:bg-[#005f33]"
                              disabled={isUploading}
                            >
                              {isUploading ? 'Uploading...' : 'Browse Files'}
                            </Button>
                            <input
                              ref={cvFileInputRef}
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => handleCvFileUpload(e.target.files)}
                            />
                          </div>
                        </div>

                        {cvFile && (
                          <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-6 w-6 mr-2 text-[#005f33]" />
                                <div>
                                  <p className="font-medium">{cvFile.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {formatFileSize(cvFile.size)} • Uploaded on {new Date(cvFile.uploadDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={handleDeleteCV}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="documents" className="mt-6">
                        <div
                          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#005f33] transition-colors"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, false)}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Upload className={`h-12 w-12 mb-4 ${isUploading ? 'text-[#005f33] animate-pulse' : 'text-gray-400'}`} />
                            <h3 className="text-lg font-medium mb-2">{isUploading ? 'Uploading...' : 'Upload Documents'}</h3>
                            <p className="text-sm text-gray-500 mb-4">Drag and drop your documents here, or click to browse</p>
                            <p className="text-xs text-gray-400 mb-4">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max size: 10MB)</p>
                            <Button
                              onClick={() => documentsFileInputRef.current?.click()}
                              className="bg-[#005f33] hover:bg-[#005f33]"
                              disabled={isUploading}
                            >
                              {isUploading ? 'Uploading...' : 'Browse Files'}
                            </Button>
                            <input
                              ref={documentsFileInputRef}
                              type="file"
                              multiple
                              className="hidden"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleDocumentsFileUpload(e.target.files)}
                            />
                          </div>
                        </div>

                        {documents.length > 0 && (
                          <div className="mt-6 space-y-4">
                            <h3 className="font-medium">Your Documents ({documents.length})</h3>
                            {documents.map((doc) => (
                              <div key={doc.id} className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <FileText className="h-6 w-6 mr-2 text-[#005f33]" />
                                    <div>
                                      <p className="font-medium">{doc.name}</p>
                                      <p className="text-xs text-gray-500">
                                        {formatFileSize(doc.size)} • Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDeleteDocument(doc.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
                      <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
                        Cancel
                      </Button>
                      <Button onClick={handleStepSave} className="bg-[#005f33] w-[180px] hover:bg-[#005f33]">
                        Complete Profile
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
