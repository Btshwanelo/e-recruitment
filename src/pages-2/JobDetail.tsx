import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Briefcase, DollarSign, X, Building, MapPin, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import HeaderV2 from './Header';

const JobDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationLevel, setEducationLevel] = useState('');
  const [isEmployed, setIsEmployed] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock navigate function
  const navigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use react-router-dom's useNavigate
  };

  const handleApply = () => {
    setIsModalOpen(true);
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);

    console.log('Application submitted with:', {
      educationLevel,
      isEmployed,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Navigate to applications page after showing success for 2 seconds
    setTimeout(() => {
      navigate('/applications');
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowSuccess(false);
    setEducationLevel('');
    setIsEmployed(null);
    setIsSubmitting(false);
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
            <CardTitle className="text-4xl font-bold">Applying for a vacancy</CardTitle>
          </CardHeader>
        </Card>

        {/* Job Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-8">Analyst: Operational Risk Management</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" className="bg-white border border-[#D0D5DD]">
              Save to Favorite
            </Button>
            <Button className="bg-blue-500 hover:bg-[#578CE5] rounded-lg" onClick={handleApply}>
              Apply Now
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <Briefcase className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">Permanent</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <Clock className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">Full Time</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">Closes: 25 April 2024</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] text-[#0086C9] mr-2 p-2 rounded-full">R</div>
              <span className="text-lg font-semibold">Negotiable</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">Pretoria</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <Building className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">Grade: D1-D5</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-8">Introduction</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <div className="text-gray-900 space-y-4">
              <p>
                <strong>19 April 2024</strong>
              </p>
              <p>
                The Public Investment Corporation (PIC) invests funds on behalf of public sector entities including the Government Employees
                Pension Fund. The organisation is the largest investment manager in the country and the continent. Applications are invited
                from dynamic individuals for the following challenging position:
              </p>
              <p>
                <strong>Position:</strong> Analyst: Operational Risk Management
                <br />
                <strong>Job Grade:</strong> D1 – D5
                <br />
                <strong>(Ref: AORM001)</strong>
              </p>
              <p>
                <strong>Salary:</strong> All-inclusive remuneration package negotiable
                <br />
                <strong>Centre:</strong> Public Investment Corporation, Pretoria
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Requirements</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-900">
              <li>Relevant degree in Risk or Audit or equivalent relevant qualification</li>
              <li>Sound understanding of operational risk management principles</li>
              <li>Financial services industry knowledge and experience (Preferably Asset Management)</li>
              <li>A good understanding of the key areas of the organization</li>
              <li>2 - 4 Years relevant experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Duties & Responsibilities</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-900">
              <li>
                Conduct day-to-day operational risk activities in terms of the Operational Risk Management Framework (ORMF) and related
                frameworks, policies, and procedures
              </li>
              <li>
                Assist the Senior Manager: Operational Risk in the identification, assessment, responses, and monitoring of Operational Risk
                in the PIC
              </li>
              <li>Co-ordinate the risk analysis activities of the PIC Business Units, including both listed and unlisted investments</li>
              <li>
                Work with Compliance, Internal & External Audit functions and other Assurance Providers to direct their efforts towards
                reviewing controls that mitigate the identified risks across the organization
              </li>
              <li>
                Support process of identifying and reporting risk incidents and assist in the design of risk mitigation and control
                procedures within PIC
              </li>
              <li>Support process of identifying and reporting issues and actions within PIC</li>
              <li>Conduct control environment assessments for the organization</li>
              <li>Conduct, implement and assess key risk indicators</li>
              <li>Assist the ORM Department with reporting to various governance structures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Competencies and Skills</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Problem-solving skills</li>
              <li>Attention to detail</li>
              <li>Good communication skills both verbal and written</li>
              <li>Knowledge of compliance, risk, and financial management</li>
              <li>Knowledge of financial markets - capital, money, equity, foreign exchange, and financial derivatives</li>
              <li>Knowledge of insurance coverage, industry standards</li>
              <li>
                Knowledge of the ISO 31000 standards, Basel Operational Risk principles, COSO risk governance principles, corporate
                governance principles e.g., King IV
              </li>
              <li>Knowledge of (ORX) Operational Risk Reporting Standards</li>
              <li>Knowledge of enterprise risk management principles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Additional Information</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <div className="text-gray-900 space-y-4">
              <p>
                With the PIC having topped the R2,6 trillion mark in assets under management and in the process of entering the global
                investment market, it is the best asset manager any serious professional would want to be associated with. It is also one of
                the better places from which one can serve South Africa.
              </p>
              <p>PIC is an equal opportunities employer and as such appointments will be in line with the PIC Employment Equity plan.</p>
              <p>
                <strong>Closing Date: 25 April 2024</strong>
              </p>
              <p>Please email a copy of your comprehensive CV to Recruitment4@pic.gov.za</p>
              <p>
                <em>* Grade range is from D1 – D5 commensurate with applicable minimum requirements.</em>
              </p>
              <p>
                <strong>Privacy Notice:</strong> By submitting your job application, you consent to PIC's processing of your personal
                information for the purposes of assessing your job application. PIC will process your Personal Information in accordance
                with applicable laws and the PIC Privacy Policy available here (www.pic.gov.za). You are free to withdraw your consent at
                any time, after which, PIC may no longer be able consider your job application.
              </p>
            </div>
          </section>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/jobs')}
              className="bg-white border border-[#0086C9] text-[#0086C9] w-[180px]"
            >
              Back
            </Button>
            <Button className="bg-[#0086C9] w-[180px] hover:bg-[#0086C9]" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-md bg-white">
          {!showSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Complete Your Application</DialogTitle>
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
                  <RadioGroup value={isEmployed || ''} onValueChange={setIsEmployed}>
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
                <Button variant="outline" onClick={handleCloseModal} className="bg-white border border-[#0086C9] text-[#0086C9]">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApplication}
                  className="bg-[#0086C9] hover:bg-[#0086C9]"
                  disabled={!educationLevel || !isEmployed || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-center">Application Submitted!</DialogTitle>
              </DialogHeader>

              <div className="py-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600 mb-4">
                  Your application for <strong>Analyst: Operational Risk Management</strong> has been successfully submitted.
                </p>
                <p className="text-sm text-gray-500">You will be redirected to your applications page shortly...</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#0086C9] text-white w-full bottom-0 py-6 mt-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">{/* <img src="/logo-2.svg" alt="EZRA Logo" className="w-8 h-8" /> */}</div>
          <div>
            <p className="text-sm">© 2077 EZRA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobDetailPage;
