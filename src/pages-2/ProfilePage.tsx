import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, CircleUser, Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderV2 from './Header';
import { useNavigate } from 'react-router-dom';


const ProgressStepsProgressIconsCentered = () => (
  <div className="flex items-center justify-center space-x-4 mb-6">
    <div className="flex items-center">
      <div className="bg-[#005f33] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">1</div>
      <span className="ml-2 text-sm text-[#005f33]">Personal Info</span>
    </div>
    <div className="w-12 h-px bg-gray-300"></div>
    <div className="flex items-center">
      <div className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">2</div>
      <span className="ml-2 text-sm text-gray-600">Contact Info</span>
    </div>
    <div className="w-12 h-px bg-gray-300"></div>
    <div className="flex items-center">
      <div className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">3</div>
      <span className="ml-2 text-sm text-gray-600">CV Upload</span>
    </div>
  </div>
);

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
}

interface ContactFormData {
  email: string;
  mobileNumber: string;
  alternativeNumber: string;
}

// Dummy data
const dummyPersonalInfo: ProfileFormData = {
  firstName: 'Zizipho',
  initial: 'ZN',
  title: 'Mrs',
  lastName: 'Nceku',
  idNumber: '9001016281082',
  age: '33',
  race: 'Black African',
  dateOfBirth: '1990-01-01',
  gender: 'Female',
  passportNumber: 'AB123456',
  rightToWork: 'South African Citizen',
};

const dummyContactInfo: ContactFormData = {
  email: 'zizipho.nceku@example.com',
  mobileNumber: '082 123 4567',
  alternativeNumber: '011 555 1234',
};

const ProfilePage: React.FC = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<string>('personal');

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
  const navigate = useNavigate()

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

    // In a real app, you would upload files to a server here
    navigate('/jobs');
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
          <ProgressStepsProgressIconsCentered />
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
                              <SelectItem value="Mr">Mr.</SelectItem>
                              <SelectItem value="Mrs">Mrs.</SelectItem>
                              <SelectItem value="Ms">Ms.</SelectItem>
                              <SelectItem value="Dr">Dr.</SelectItem>
                              <SelectItem value="Prof">Prof.</SelectItem>
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
                              <SelectItem value="Black African">Black African</SelectItem>
                              <SelectItem value="Coloured">Coloured</SelectItem>
                              <SelectItem value="Indian/Asian">Indian/Asian</SelectItem>
                              <SelectItem value="White">White</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
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
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
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
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="rightToWork">Right to Work status</Label>
                          <Select
                            value={personalFormData.rightToWork}
                            onValueChange={(value) => setPersonalFormData((prev) => ({ ...prev, rightToWork: value }))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="South African Citizen">South African Citizen</SelectItem>
                              <SelectItem value="Permanent Resident">Permanent Resident</SelectItem>
                              <SelectItem value="Work Permit Holder">Work Permit Holder</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
                        <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#005f33] w-[180px] hover:bg-[#005f33]">
                          Save
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

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
                        <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#005f33] w-[180px] hover:bg-[#005f33]">
                          Save
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
                      <Button onClick={handleSubmit} className="bg-[#005f33] w-[180px] hover:bg-[#005f33]">
                        Save
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
