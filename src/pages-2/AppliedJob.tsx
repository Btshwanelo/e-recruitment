import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Briefcase, DollarSign, X, Building, MapPin, CheckCircle, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import HeaderV2 from './Header';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const AppliedJob: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock navigate function
  const navigate = useNavigate();

  const handleViewApplication = () => {
    navigate('/applications');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderV2 />

      <div className="container mx-auto px-4 py-8">
        {/* Title Card */}
        <Card
          className="w-full min-h-[180px] mb-10 text-white border-none"
          style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold">Applied Position Details</CardTitle>
          </CardHeader>
        </Card>

        {/* Job Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Information Technology Learnership</h1>

          {/* Applied Status Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Application Submitted</h3>
                <p className="text-green-700">You have already applied for this position on March 15, 2024</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {/* <Button variant="outline" className="bg-white border border-[#D0D5DD]">
              Save to Favorite
            </Button> */}
            {/* <Button className="bg-green-600 hover:bg-green-700 rounded-lg cursor-default" disabled>
              <CheckCircle className="w-4 h-4 mr-2" />
              Applied
            </Button> */}
            <Button variant="outline" className="bg-[#005f33]  text-white" onClick={handleViewApplication}>
              View My Application
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center text-gray-700">
              <div className="bg-green-200 mr-2 p-2 rounded-full">
                <GraduationCap className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-lg font-semibold">Learnership</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-green-200 mr-2 p-2 rounded-full">
                <Clock className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-lg font-semibold">Full Time</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-green-200 mr-2 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-lg font-semibold">Duration: 12 Months</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-green-200 text-green-500 mr-2 p-2 rounded-full">R</div>
              <span className="text-lg font-semibold">Stipend: R4,500/month</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-green-200 mr-2 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-lg font-semibold">Johannesburg</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-green-200 mr-2 p-2 rounded-full">
                <Building className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-lg font-semibold">Level: NQF 5</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-8">Program Overview</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <div className="text-gray-900 space-y-4">
              <p>
                <strong>Posted: 10 March 2024</strong>
              </p>
              <p>
                Our Information Technology Learnership program offers a comprehensive 12-month training opportunity designed to equip young
                South Africans with essential IT skills and practical work experience. This program combines theoretical learning with
                hands-on workplace training to prepare participants for successful careers in the technology sector.
              </p>
              <p>
                <strong>Program:</strong> Information Technology Learnership
                <br />
                <strong>Qualification:</strong> National Certificate in Information Technology (Systems Support) NQF Level 5
                <br />
                <strong>(Ref: ITL2024001)</strong>
              </p>
              <p>
                <strong>Stipend:</strong> R4,500 per month
                <br />
                <strong>Location:</strong> Johannesburg, Gauteng
                <br />
                <strong>Start Date:</strong> May 2024
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Entry Requirements</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-900">
              <li>Grade 12 certificate with Mathematics and Physical Science</li>
              <li>South African citizen between ages 18-35</li>
              <li>Unemployed and not studying full-time</li>
              <li>Basic computer literacy skills</li>
              <li>Strong interest in information technology</li>
              <li>Good communication skills in English</li>
              <li>Willingness to commit to the full 12-month program</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Learning Areas & Responsibilities</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-900">
              <li>Computer hardware installation, configuration, and maintenance</li>
              <li>Operating systems support (Windows and Linux environments)</li>
              <li>Network fundamentals and basic network support</li>
              <li>Help desk operations and customer service</li>
              <li>Basic programming concepts and web development</li>
              <li>Database management fundamentals</li>
              <li>IT security awareness and best practices</li>
              <li>Software installation and troubleshooting</li>
              <li>Technical documentation and reporting</li>
              <li>Project management basics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Skills You'll Develop</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Technical problem-solving and analytical thinking</li>
              <li>Customer service and communication skills</li>
              <li>Time management and organizational abilities</li>
              <li>Teamwork and collaboration</li>
              <li>Attention to detail and quality assurance</li>
              <li>Adaptability to new technologies</li>
              <li>Professional work ethics and responsibility</li>
              <li>Critical thinking and decision-making</li>
              <li>Continuous learning mindset</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Program Benefits</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <div className="text-gray-900 space-y-4">
              <p>
                This learnership provides participants with a nationally recognized qualification and valuable work experience in the IT
                industry. Upon successful completion, learners will have the skills and certification needed to pursue various entry-level
                positions in information technology.
              </p>
              <p>
                <strong>What's included:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Monthly stipend of R4,500</li>
                <li>Comprehensive training and mentorship</li>
                <li>Industry-recognized NQF Level 5 qualification</li>
                <li>Practical work experience</li>
                <li>Career guidance and job placement assistance</li>
                <li>Access to modern IT equipment and software</li>
              </ul>
              <p>
                <strong>Application Deadline: 31 March 2024</strong>
              </p>
              <p>
                This is an equal opportunity program committed to supporting the development of previously disadvantaged individuals in the
                technology sector.
              </p>
            </div>
          </section>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => navigate('/jobs')} className="bg-[#005f33]  text-white w-[180px]">
              Back to Jobs
            </Button>
            {/* <Button className="bg-green-text-green-500 w-[180px] hover:bg-green-text-green-500" onClick={handleViewApplication}>
              View Application Status
            </Button> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppliedJob;
