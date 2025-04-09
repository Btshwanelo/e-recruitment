import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Briefcase, DollarSign, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import HeaderV2 from "./Header";

const JobDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationLevel, setEducationLevel] = useState("");
  const [isEmployed, setIsEmployed] = useState<string | null>(null);

  const navigate = useNavigate()

  const handleApply = () => {
    setIsModalOpen(true);
  };

  const handleSubmitApplication = () => {
    console.log("Application submitted with:", {
      educationLevel,
      isEmployed
    });
    
    // Redirect to /applications
    // window.location.href = '/applications';
    navigate('/applications')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-[#F2F4F7] py-4 shadow-sm">
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
        {/* Title Card */}
        <Card 
          className="w-full min-h-[180px] mb-10 text-white border-none" 
          style={{ background: "linear-gradient(27deg, #182230 8.28%, #344054 91.72%)" }}
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold">Applying for a vacancy</CardTitle>
          </CardHeader>
        </Card>

        {/* Job Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-8">Prototype Designer</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" className="bg-white border border-[#D0D5DD]">
              Save to Favorite
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-[#578CE5] rounded-lg"
              onClick={handleApply}
            >
              Apply Now
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center text-gray-700">
                <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                    
              <Briefcase className="w-5 h-5  text-[#0086C9]" />
                </div>
              <span className="text-lg font-semibold">Permanent</span>
            </div>
            <div className="flex items-center text-gray-700">
            <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">

              <Clock className="w-5 h-5  text-[#0086C9]" />
                </div>
              <span className="text-lg font-semibold">Full Time</span>
            </div>
            <div className="flex items-center text-gray-700">
            <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">

              <Calendar className="w-5 h-5  text-[#0086C9]" />
                </div>
              <span className="text-lg font-semibold">Closes: 30 April 2025</span>
            </div>
            <div className="flex items-center text-gray-700">
            <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">

              <DollarSign className="w-5 h-5  text-[#0086C9]" />
                </div>
              <span className="text-lg font-semibold">R 35 000 - R 40 000</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-8">Introduction</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]"/>
            <div className="text-gray-900 space-y-4">
              <p>
                The Prototype Designer for Case Goods is responsible for ensuring the creation and accuracy of jigs and tools for the prototype and
                production process of case goods. This includes maintaining and updating existing jigs to ensure they are up-to-date and accurate, as
                well as designing and fabricating new jigs to support the prototype frame making process. The role focuses on improving production
                quality and efficiency by developing innovative jigs and techniques.
              </p>
              <p>
                Key responsibilities also include providing technical support to the machine shop, utilizing 3D CAD software for designing and
                modelling prototypes, and programming CNC machines for precise wood working and fabrication. The position requires collaboration
                with various departments to optimize production timelines while maintaining high-quality standards in the manufacturing of case
                goods.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Duties & Responsibility</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]"/>
            <ul className="list-disc pl-6 space-y-2 text-gray-900">
              <li>
                <span className="font-medium">Jig Design & Fabrication:</span> Indepth knowledge of designing, fabricating, and maintaining jigs for prototype and production processes. 
                Ability to modify and update existing jigs for improved accuracy and performance.
              </li>
              <li>
                <span className="font-medium">Woodworking Techniques:</span> Strong understanding of woodworking principles, tools, and materials used in case goods manufacturing. 
                Experience with various woodworking techniques, including cutting, shaping, and finishing wood components.
              </li>
              <li>
                <span className="font-medium">3D CAD Software Proficiency:</span> Expertise in using 3D CAD software (such as AutoCAD, Inventor or similar) for designing prototypes, 
                jigs, and components. Ability to create detailed drawings, models, and assemblies for production and prototyping.
              </li>
              <li>
                <span className="font-medium">CNC Programming & Operation:</span> Knowledge of CNC machine programming, including Gcode and other CNC-related software. 
                Experience setting up and operating CNC machines for accurate wood part fabrication.
              </li>
              <li>
                <span className="font-medium">Manufacturing Process Optimization:</span> Understanding of production workflows, and ability to design jigs that enhance both quality 
                and speed of manufacturing. Ability to identify areas for improvement in the production process, suggesting and implementing 
                changes for better efficiency.
              </li>
              <li>
                <span className="font-medium">Technical Support & Collaboration:</span> Strong technical support skills to assist the machine shop and production team in 
                troubleshooting and resolving issues. Ability to collaborate effectively with different teams, including engineers, machinists, and 
                production staff, to ensure smooth operations.
              </li>
              <li>
                <span className="font-medium">Material Knowledge:</span> Familiarity with various materials used in case goods, including different types of wood.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Desired Experience & Qualification</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]"/>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Prototyping & Jig Design Experience:</span> Minimum 3.5 years of experience in designing, fabricating, and maintaining jigs for prototype 
                or production environments. Hands-on experience with creating and improving jigs and fixtures to support the production of case 
                goods or similar products.
              </li>
              <li>
                <span className="font-medium">Woodworking & Manufacturing:</span> 3.5 years of experience in woodworking, with a strong focus on case goods or furniture 
                manufacturing. Proven experience working with wood, laminates, veneers, and other materials commonly used in the industry.
              </li>
              <li>
                <span className="font-medium">CAD Design & 3D Modelling:</span> 3+ years of experience using 3D CAD software (such as Inventor, AutoCAD, or similar) for product and 
                prototype design, including creating detailed drawings and assembly models.
              </li>
              <li>
                <span className="font-medium">CNC Programming & Machine Operation:</span> At least 2.5 years of experience in CNC machine programming (G-code or equivalent) and 
                operation, specifically in woodworking or case goods production.
              </li>
              <li>
                <span className="font-medium">Production Process Improvement:</span> Proven track record of identifying and implementing process improvements to increase 
                production efficiency, quality, and timeframes.
              </li>
              <li>
                <span className="font-medium">Technical Support & Collaboration:</span> Experience providing technical support to manufacturing teams (e.g., machine shops, production) 
                and collaborating with cross-functional teams to resolve issues.
              </li>
              <li>
                <span className="font-medium">Quality Control & Testing:</span> Experience in quality control processes, ensuring prototypes and production parts meet both design 
                specifications and functional requirements.
              </li>
              <li>
                <span className="font-medium">Project Management & ProblemSolving:</span> Strong project management skills with the ability to manage multiple tasks and a small 
                team, prioritize, and meet deadlines. Experience solving complex production or design-related problems with innovative solutions.
              </li>
              <li>
                <span className="font-medium">Industry-Specific Knowledge:</span> Experience in the case goods or furniture manufacturing industry is preferred, with a deep understanding 
                of materials, design, and fabrication techniques.
              </li>
            </ul>
          </section>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={()=>navigate('/jobs')} className="bg-white border border-[#0086C9] text-[#0086C9] w-[180px]">
              Back
            </Button>
            <Button 
              className="bg-[#0086C9] w-[180px] hover:bg-[#0086C9]"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold ">Complete Your Application</DialogTitle>
            {/* <DialogDescription>
              Please provide the following information to complete your application for the Prototype Designer position.
            </DialogDescription> */}
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="education">What is your Highest Education Level?</Label>
              <Select value={educationLevel} onValueChange={setEducationLevel}>
                <SelectTrigger id="education" className="w-full">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School / GED</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="associates">Associate's Degree</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="doctorate">Doctorate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label>Are you currently employed?</Label>
              <RadioGroup value={isEmployed || ""} onValueChange={setIsEmployed}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="employed-yes" />
                  <Label htmlFor="employed-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="employed-no" />
                  <Label htmlFor="employed-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="bg-white border border-[#0086C9] text-[#0086C9]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitApplication}
              className="bg-[#0086C9] hover:bg-[#0086C9]"
              disabled={!educationLevel || !isEmployed}
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#0086C9] text-white  w-full bottom-0 py-6 mt-10">
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

export default JobDetailPage;