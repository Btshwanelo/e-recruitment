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
import { Check, CircleUser } from "lucide-react";
import ProgressStepsProgressIconsCentered from "@/components/ProgressStepsProgressIconsCentered";

// Form data interface
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

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    initial: "",
    title: "",
    lastName: "",
    idNumber: "",
    age: "",
    race: "",
    dateOfBirth: "",
    gender: "",
    passportNumber: "",
    rightToWork: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, title: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Submit logic here
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7]">
      {/* Header with navigation - simplified for focus */}
      <header className="bg-white py-4 shadow-sm">
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
      </header>

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
        <div className="flex bg-white rounded-xl  flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl p-5">
            <div className="space-y-2">
              <a href="#" className="block text-[#2B6EDF] bg-[#F6F9FE] font-semibold rounded-md text-center py-2">Personal Info</a>
              <a href="#" className="block text-gray-600 hover:text-blue-500 font-semibold rounded-md text-center py-2">Contact Info</a>
              <a href="#" className="block text-gray-600 hover:text-blue-500 font-semibold rounded-md text-center py-2">Manage My CV</a>
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1 mb-20 rounded-lg">
            <Card className="bg-white border-none rounded-lg shadow-none">
              <CardContent className="pt-6 rounded-lg">
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
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="initial">Initial</Label>
                      <Input 
                        id="initial" 
                        name="initial"
                        value={formData.initial}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Select value={formData.title} onValueChange={handleTitleChange}>
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
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">ID number</Label>
                      <Input 
                        id="idNumber" 
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">Your ID number as it appears in your SA ID</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="race">Race</Label>
                      <Input 
                        id="race" 
                        name="race"
                        value={formData.race}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of birth</Label>
                      <Input 
                        id="dateOfBirth" 
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input 
                        id="gender" 
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passportNumber">Passport Number (optional)</Label>
                      <Input 
                        id="passportNumber" 
                        name="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="rightToWork">Right to Work status</Label>
                      <Input 
                        id="rightToWork" 
                        name="rightToWork"
                        value={formData.rightToWork}
                        onChange={handleChange}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0086C9] text-white  w-full bottom-0 py-6 mt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/logo-2.svg" alt="EZRA Logo" className="w-8 h-8" />
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