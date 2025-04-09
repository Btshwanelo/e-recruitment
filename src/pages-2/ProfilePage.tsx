import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, CircleUser, Upload, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgressStepsProgressIconsCentered from "@/components/ProgressStepsProgressIconsCentered";
import HeaderV2 from "./Header";
import SubscribeAlertsModal from "./SubscribeAlertsModal";

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

interface CVFormData {
  cvFile: string;
  documents: string[];
}

// Dummy data
const dummyPersonalInfo: ProfileFormData = {
  firstName: "Zizipho",
  initial: "ZN",
  title: "Mrs",
  lastName: "Nceku",
  idNumber: "9001016281082",
  age: "33",
  race: "black",
  dateOfBirth: "1990-01-01",
  gender: "Female",
  passportNumber: "AB123456",
  rightToWork: "South African Citizen"
};

const dummyContactInfo: ContactFormData = {
  email: "zizipho.nceku@example.com",
  mobileNumber: "082 123 4567",
  alternativeNumber: "011 555 1234"
};

const dummyCVInfo: CVFormData = {
  cvFile: "zizipho_nceku_CV.pdf",
  documents: ["ID_Document.pdf", "Qualification_Certificate.pdf", "Reference_Letter.pdf"]
};

const ProfilePage: React.FC = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<string>("personal");
  
  // Form data states
  const [personalFormData, setPersonalFormData] = useState<ProfileFormData>(dummyPersonalInfo);
  const [contactFormData, setContactFormData] = useState<ContactFormData>(dummyContactInfo);
  const [cvFormData, setCvFormData] = useState<CVFormData>(dummyCVInfo);
  const [activeDocTab, setActiveDocTab] = useState<string>("cv");

  // Personal Info handlers
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (value: string) => {
    setPersonalFormData((prev) => ({ ...prev, title: value }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveTab("personal");
  };

  const handleSaveSubscription = (data) => {
    console.log('Subscription data:', data);

    setActiveTab("personal");
    // Process subscription data
  };

  // Contact Info handlers
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Personal Info:", personalFormData);
    console.log("Contact Info:", contactFormData);
    console.log("CV Info:", cvFormData);
    
    // Redirect to /jobs
    window.location.href = '/jobs';
  };

  // File upload handling (mock)
  const handleFileUpload = () => {
    alert("File upload functionality would be implemented here");
  };

  // Delete document handling (mock)
  const handleDeleteDocument = (docName: string) => {
    setCvFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc !== docName)
    }));
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7]">
      {/* Header with navigation - simplified for focus */}
      {/* <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded flex items-center justify-center">
              <img src="/logo-2.svg" alt="EZRA Logo" className="w-6 h-6" />
            </div>
            <nav className="ml-8 hidden md:flex space-x-6">
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">Home</a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">
                EZRA Jobs <span className="ml-1"></span>
              </a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">
                EZRA News <span className="ml-1"></span>
              </a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">Contact Us</a>
            </nav>
          </div>
        </div>
      </header> */}
      <HeaderV2 />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <Card 
          className="w-full min-h-[180px] mb-10 text-white border-none" 
          style={{ background: "linear-gradient(27deg, #182230 8.28%, #344054 91.72%)" }}
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-8">Profile</CardTitle>
            <p className="text-gray-300 font-normal text-xl mt-2">Manage your profile here</p>
          </CardHeader>
        </Card>
        
        <div className="mb-8">
          <ProgressStepsProgressIconsCentered />
        </div>

        {/* Content Area */}
        <div className="flex bg-white rounded-xl flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl p-5">
            <div className="space-y-2">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab("personal"); }}
                className={`block font-semibold rounded-md text-left pl-3 py-2 ${activeTab === "personal" ? "text-[#2B6EDF] bg-[#F6F9FE]" : "text-gray-600 hover:text-blue-500"}`}
              >
                Personal Info
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab("contact"); }}
                className={`block font-semibold rounded-md text-left pl-3 py-2 ${activeTab === "contact" ? "text-[#2B6EDF] bg-[#F6F9FE]" : "text-gray-600 hover:text-blue-500"}`}
              >
                Contact Info
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab("cv"); }}
                className={`block font-semibold rounded-md text-left pl-3 py-2 ${activeTab === "cv" ? "text-[#2B6EDF] bg-[#F6F9FE]" : "text-gray-600 hover:text-blue-500"}`}
              >
                Manage My CV
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab("alerts"); }}
                className={`block font-semibold rounded-md text-left pl-3 py-2 ${activeTab === "alerts" ? "text-[#2B6EDF] bg-[#F6F9FE]" : "text-gray-600 hover:text-blue-500"}`}
              >
                Subscribe to Alerts
              </a>
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1 mb-20 rounded-lg">
            <Card className="bg-white border-none rounded-lg shadow-none">
              <CardContent className="pt-6 rounded-lg">
              <SubscribeAlertsModal
        isOpen={activeTab === "alerts"}
        onClose={handleCloseModal}
        onSave={handleSaveSubscription}
      />
                
                {/* Personal Info Tab */}
                {activeTab === "personal" && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Personal info</h2>
                    <p className="text-gray-500 text-sm mb-4">
                      Please provide some information about yourself. The First Name and Last Name you provide will be displayed alongside any comments, forum posts, or ideas you make on the site.
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                      The Email Address and Phone number will not be displayed on the site. Your Organization and Title are optional. They will be displayed with your comments and forum posts.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <Label htmlFor="title">Title</Label>
                          <Select value={personalFormData.title} onValueChange={handleTitleChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a title" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mr">Mr.</SelectItem>
                              <SelectItem value="mrs">Mrs.</SelectItem>
                              <SelectItem value="ms">Ms.</SelectItem>
                              <SelectItem value="dr">Dr.</SelectItem>
                              <SelectItem value="prof">Prof.</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Input 
                            id="age" 
                            name="age"
                            value={personalFormData.age}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="race">Race</Label>
                          <Input 
                            id="race" 
                            name="race"
                            value={personalFormData.race}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
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
                          <Input 
                            id="gender" 
                            name="gender"
                            value={personalFormData.gender}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
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
                          <Input 
                            id="rightToWork" 
                            name="rightToWork"
                            value={personalFormData.rightToWork}
                            onChange={handlePersonalChange}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
                        <Button variant="outline" type="button" className="bg-white border border-[#0086C9] text-[#0086C9] w-[180px]">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#0086C9] w-[180px] hover:bg-[#0086C9]">
                          Save
                        </Button>
                      </div>
                    </form>
                  </>
                )}

                {/* Contact Info Tab */}
                {activeTab === "contact" && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Contact info</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Please provide your contact information. This information will be used to communicate with you regarding job applications and other important updates.
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
                        <Button variant="outline" type="button" className="bg-white border border-[#0086C9] text-[#0086C9] w-[180px]">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#0086C9] w-[180px] hover:bg-[#0086C9]">
                          Save
                        </Button>
                      </div>
                    </form>
                  </>
                )}

                {/* CV Management Tab */}
                {activeTab === "cv" && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Manage my CV</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Upload your CV and supporting documents. These documents will be attached to your job applications.
                    </p>

                    <Tabs defaultValue="cv" className="w-full mb-6">
                      <TabsList className="grid w-fit grid-cols-2 bg-white shadow-none text-[#026AA2]">
                        <TabsTrigger 
                          value="cv" 
                          onClick={() => setActiveDocTab("cv")}
                          className={activeDocTab === "cv" ? "text-[#026AA2] font-semibold shadow-none bg-[#F0F9FF]" : ""}
                        >
                          My CV
                        </TabsTrigger>
                        <TabsTrigger 
                          value="documents" 
                          onClick={() => setActiveDocTab("documents")}
                          className={activeDocTab === "documents" ? "text-[#026AA2] font-semibold shadow-none bg-[#F0F9FF]" : ""}
                        >
                          Documents
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="cv" className="mt-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">Upload CV</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Drag and drop your CV file here, or click to browse
                            </p>
                            <p className="text-xs text-gray-400 mb-4">
                              Supported formats: PDF, DOC, DOCX (Max size: 5MB)
                            </p>
                            <Button onClick={handleFileUpload} className="bg-[#0086C9] hover:bg-[#0086C9]">
                              Browse Files
                            </Button>
                          </div>
                        </div>
                        
                        {cvFormData.cvFile && (
                          <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-6 w-6 mr-2 text-[#0086C9]" />
                                <div>
                                  <p className="font-medium">{cvFormData.cvFile}</p>
                                  <p className="text-xs text-gray-500">Uploaded on April 8, 2025</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setCvFormData(prev => ({ ...prev, cvFile: "" }))}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="documents" className="mt-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Drag and drop your documents here, or click to browse
                            </p>
                            <p className="text-xs text-gray-400 mb-4">
                              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max size: 10MB)
                            </p>
                            <Button onClick={handleFileUpload} className="bg-[#0086C9] hover:bg-[#0086C9]">
                              Browse Files
                            </Button>
                          </div>
                        </div>
                        
                        {cvFormData.documents.length > 0 && (
                          <div className="mt-6 space-y-4">
                            <h3 className="font-medium">Your Documents</h3>
                            {cvFormData.documents.map((doc, index) => (
                              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <FileText className="h-6 w-6 mr-2 text-[#0086C9]" />
                                    <div>
                                      <p className="font-medium">{doc}</p>
                                      <p className="text-xs text-gray-500">Uploaded on April 8, 2025</p>
                                    </div>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDeleteDocument(doc)}
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
                      <Button variant="outline" type="button" className="bg-white border border-[#0086C9] text-[#0086C9] w-[180px]">
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} className="bg-[#0086C9] w-[180px] hover:bg-[#0086C9]">
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
      <footer className="bg-[#0086C9] text-white w-full bottom-0 py-6 mt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            {/* <img src="/logo-2.svg" alt="EZRA Logo" className="w-8 h-8" /> */}
          </div>
          <div>
            <p className="text-sm">© 2077 EZRA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;