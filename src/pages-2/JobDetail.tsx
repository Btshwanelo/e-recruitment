import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Briefcase, Building, MapPin, CheckCircle, GraduationCap, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectJobById, selectHasApplied, selectApplicationByJobId, addApplication, toggleFavorite } from '@/slices/jobsSlice';
import HeaderV2 from './Header';
import Footer from '@/components/Footer';

const JobDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationLevel, setEducationLevel] = useState('');
  const [isEmployed, setIsEmployed] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Criminal offence questions
  const [criminalOffence, setCriminalOffence] = useState<string | null>(null);
  const [criminalOffenceDetails, setCriminalOffenceDetails] = useState('');
  const [pendingCriminalCase, setPendingCriminalCase] = useState<string | null>(null);
  const [pendingCriminalCaseDetails, setPendingCriminalCaseDetails] = useState('');

  // Dismissal and disciplinary questions
  const [dismissedForMisconduct, setDismissedForMisconduct] = useState<string | null>(null);
  const [dismissedForMisconductDetails, setDismissedForMisconductDetails] = useState('');
  const [pendingDisciplinaryCase, setPendingDisciplinaryCase] = useState<string | null>(null);
  const [pendingDisciplinaryCaseDetails, setPendingDisciplinaryCaseDetails] = useState('');

  // Resignation questions
  const [resignedPendingDisciplinary, setResignedPendingDisciplinary] = useState<string | null>(null);

  // Discharge/retirement questions
  const [dischargedOnIllHealth, setDischargedOnIllHealth] = useState<string | null>(null);

  // Business interests questions
  const [businessWithState, setBusinessWithState] = useState<string | null>(null);
  const [businessWithStateDetails, setBusinessWithStateDetails] = useState('');
  const [relinquishBusinessInterests, setRelinquishBusinessInterests] = useState<string | null>(null);

  // Experience questions
  const [privateSectorExperience, setPrivateSectorExperience] = useState('');
  const [publicSectorExperience, setPublicSectorExperience] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: jobId } = useParams<{ id: string }>();

  // Get job data from Redux store
  const job = useSelector((state: any) => selectJobById(state, jobId || ''));
  const hasApplied = useSelector((state: any) => selectHasApplied(state, jobId || ''));
  const application = useSelector((state: any) => selectApplicationByJobId(state, jobId || ''));

  useEffect(() => {
    if (!job && jobId) {
      navigate('/jobs');
    }
  }, [job, jobId, navigate]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <Button onClick={() => navigate('/jobs')} className="bg-[#0086C9] hover:bg-[#0086C9]">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    setIsModalOpen(true);
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create application
    const newApplication = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'submitted' as const,
      educationLevel,
      isEmployed: isEmployed || '',
      applicationData: {
        educationLevel,
        isEmployed: isEmployed || '',
        criminalOffence,
        criminalOffenceDetails,
        pendingCriminalCase,
        pendingCriminalCaseDetails,
        dismissedForMisconduct,
        dismissedForMisconductDetails,
        pendingDisciplinaryCase,
        pendingDisciplinaryCaseDetails,
        resignedPendingDisciplinary,
        dischargedOnIllHealth,
        businessWithState,
        businessWithStateDetails,
        relinquishBusinessInterests,
        privateSectorExperience,
        publicSectorExperience,
      },
    };

    dispatch(addApplication(newApplication));

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

    // Reset all new form fields
    setCriminalOffence(null);
    setCriminalOffenceDetails('');
    setPendingCriminalCase(null);
    setPendingCriminalCaseDetails('');
    setDismissedForMisconduct(null);
    setDismissedForMisconductDetails('');
    setPendingDisciplinaryCase(null);
    setPendingDisciplinaryCaseDetails('');
    setResignedPendingDisciplinary(null);
    setDischargedOnIllHealth(null);
    setBusinessWithState(null);
    setBusinessWithStateDetails('');
    setRelinquishBusinessInterests(null);
    setPrivateSectorExperience('');
    setPublicSectorExperience('');
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(job.id));
  };

  const handleViewApplication = () => {
    navigate('/applications');
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Get appropriate icon based on job type
  const getJobTypeIcon = () => {
    return job.type === 'Learnership' ? GraduationCap : Briefcase;
  };

  const JobTypeIcon = getJobTypeIcon();

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
            <CardTitle className="text-4xl font-bold">{hasApplied ? 'Applied Position Details' : 'Job Details'}</CardTitle>
          </CardHeader>
        </Card>

        {/* Job Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">
            {job.title}
            {job.postNumber && <span className="text-lg font-normal text-gray-600 ml-2">({job.postNumber})</span>}
          </h1>

          {/* Applied Status Banner */}
          {hasApplied && application && (
            <div className="bg-green-50 border border-green-200 rounded-lg py-1 px-4  mb-8">
              <div className="flex items-center">
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Application Submitted</h3>
                  <p className="text-green-700">
                    You applied for this position on {formatDate(application.appliedDate)} - Status:{' '}
                    <span className="font-medium capitalize">{application.status.replace('_', ' ')}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant="outline"
              className={`bg-white border border-[#D0D5DD] ${job.isFavorite ? 'text-red-600' : ''}`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`w-4 h-4 mr-2 ${job.isFavorite ? 'fill-red-600' : ''}`} />
              {job.isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
            </Button>

            {!hasApplied ? (
              <Button className="bg-[#005f33]" onClick={handleApply}>
                Apply Now
              </Button>
            ) : (
              <>
                <Button className="bg-[#005f33] cursor-default" disabled>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Applied
                </Button>
                <Button variant="outline" className="bg-[#005f33]  text-white border-none" onClick={handleViewApplication}>
                  View My Application
                </Button>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <JobTypeIcon className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">{job.category}</span>
            </div>
            {/* <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <Clock className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">{job.type}</span>
            </div> */}
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">Closing Date: {formatDate(job.closingDate)}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] text-[#0086C9]mr-2 p-2 rounded-full">R</div>
              <span className="text-lg font-semibold">
                {job.stipend ? `${job.stipend} per annum` : job.salary ? `${job.salary} per annum` : 'Salary not specified'}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">{job.location}</span>
            </div>
            {job.grade && (
              <div className="flex items-center text-gray-700">
                <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                  <Building className="w-5 h-5 text-[#0086C9]" />
                </div>
                <span className="text-lg font-semibold">Grade: {job.grade}</span>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-8">{job.type === 'Learnership' ? 'Program Overview' : 'Introduction'}</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <div className="text-gray-900 space-y-4">
              <p>
                <strong>Posted Date: {formatDate(job.postedDate)}</strong>
              </p>
              <p>{job.description}</p>
              <p>
                <strong>Post:</strong> {job.title}
                <br />
                {job.postNumber && (
                  <>
                    <strong>Post Number:</strong> {job.postNumber}
                    <br />
                  </>
                )}
                {job.grade && (
                  <>
                    <strong>Job Grade:</strong> {job.grade}
                    <br />
                  </>
                )}
                <strong>(Ref: {job.reference})</strong>
              </p>
              <p>
                <strong>Salary:</strong>{' '}
                {job.stipend ? `${job.stipend} per annum` : job.salary ? `${job.salary} per annum` : 'Not specified'}
                <br />
                <strong>{job.type === 'Learnership' ? 'Location:' : 'Centre:'}</strong> {job.company}, {job.location}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">{job.type === 'Learnership' ? 'Entry Requirements' : 'Requirements'}</h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-900">
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">
              {job.type === 'Learnership' ? 'Learning Areas & Responsibilities' : 'Duties & Responsibilities'}
            </h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-900">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </section>

          {/* Enquiries Section */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Enquiries</h2>
            <hr className="mb-6 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Need Help or Have Questions?</h3>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this position or need assistance with your application, please don't hesitate to contact
                    us.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Log a Case</h4>
                    <p className="text-sm text-gray-600">
                      For technical issues, application problems, or general inquiries about this position.
                    </p>
                    <Button
                      variant="outline"
                      className="bg-white border border-[#005f33] text-[#005f33] hover:bg-[#005f33] hover:text-white"
                      onClick={() => window.open('mailto:recruitment@dcs.gov.za?subject=Job Application Enquiry - ' + job.title, '_blank')}
                    >
                      Log a Case
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Direct Contact</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Email:</strong> recruitment@dcs.gov.za
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Subject Line:</strong> Job Application Enquiry - {job.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Reference:</strong> {job.reference}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Please include the job reference number in your email subject</li>
                    <li>• Response time: 2-3 business days</li>
                    <li>• For urgent matters, please call our helpline: 0800 123 456</li>
                    <li>• Keep your application reference number for tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => navigate('/jobs')} className="bg-[#005f33] border-none text-white w-[180px]">
              Back to Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-2xl bg-white">
          {!showSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Complete Your Application</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="education">What is your Highest Education Level?</Label>
                  <Select value={educationLevel} onValueChange={setEducationLevel}>
                    <SelectTrigger id="education" className="w-full">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="National Senior Certificate (NSC)">National Senior Certificate (NSC)</SelectItem>
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

                {/* Criminal Offence Questions */}
                <div className="space-y-3">
                  <Label>Have you been convicted or found guilty of a criminal offence (including an admission of guilt)?</Label>
                  <RadioGroup value={criminalOffence || ''} onValueChange={setCriminalOffence}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="criminal-yes" />
                      <Label htmlFor="criminal-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="criminal-no" />
                      <Label htmlFor="criminal-no">No</Label>
                    </div>
                  </RadioGroup>
                  {criminalOffence === 'yes' && (
                    <div className="space-y-2">
                      <Label htmlFor="criminal-details">If yes, provide the details:</Label>
                      <Input
                        id="criminal-details"
                        value={criminalOffenceDetails}
                        onChange={(e) => setCriminalOffenceDetails(e.target.value)}
                        placeholder="Please provide details of the criminal offence"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Do you have any pending criminal case against you?</Label>
                  <RadioGroup value={pendingCriminalCase || ''} onValueChange={setPendingCriminalCase}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pending-criminal-yes" />
                      <Label htmlFor="pending-criminal-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pending-criminal-no" />
                      <Label htmlFor="pending-criminal-no">No</Label>
                    </div>
                  </RadioGroup>
                  {pendingCriminalCase === 'yes' && (
                    <div className="space-y-2">
                      <Label htmlFor="pending-criminal-details">If yes, provide the details:</Label>
                      <Input
                        id="pending-criminal-details"
                        value={pendingCriminalCaseDetails}
                        onChange={(e) => setPendingCriminalCaseDetails(e.target.value)}
                        placeholder="Please provide details of the pending criminal case"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                {/* Dismissal and Disciplinary Questions */}
                <div className="space-y-3">
                  <Label>Have you ever been dismissed for misconduct from the Public Service?</Label>
                  <RadioGroup value={dismissedForMisconduct || ''} onValueChange={setDismissedForMisconduct}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="dismissed-yes" />
                      <Label htmlFor="dismissed-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="dismissed-no" />
                      <Label htmlFor="dismissed-no">No</Label>
                    </div>
                  </RadioGroup>
                  {dismissedForMisconduct === 'yes' && (
                    <div className="space-y-2">
                      <Label htmlFor="dismissed-details">If yes, provide the details:</Label>
                      <Input
                        id="dismissed-details"
                        value={dismissedForMisconductDetails}
                        onChange={(e) => setDismissedForMisconductDetails(e.target.value)}
                        placeholder="Please provide details of the dismissal"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Do you have any pending disciplinary case against you?</Label>
                  <RadioGroup value={pendingDisciplinaryCase || ''} onValueChange={setPendingDisciplinaryCase}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pending-disciplinary-yes" />
                      <Label htmlFor="pending-disciplinary-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pending-disciplinary-no" />
                      <Label htmlFor="pending-disciplinary-no">No</Label>
                    </div>
                  </RadioGroup>
                  {pendingDisciplinaryCase === 'yes' && (
                    <div className="space-y-2">
                      <Label htmlFor="pending-disciplinary-details">If yes, provide the details:</Label>
                      <Input
                        id="pending-disciplinary-details"
                        value={pendingDisciplinaryCaseDetails}
                        onChange={(e) => setPendingDisciplinaryCaseDetails(e.target.value)}
                        placeholder="Please provide details of the pending disciplinary case"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                {/* Resignation Question */}
                <div className="space-y-3">
                  <Label>Have you resigned from a recent job pending any disciplinary proceeding against you?</Label>
                  <RadioGroup value={resignedPendingDisciplinary || ''} onValueChange={setResignedPendingDisciplinary}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="resigned-yes" />
                      <Label htmlFor="resigned-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="resigned-no" />
                      <Label htmlFor="resigned-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Discharge/Retirement Question */}
                <div className="space-y-3">
                  <Label>
                    Have you been discharged or retired from the Public Service on grounds of Ill-health or on condition that you cannot be
                    re-employed?
                  </Label>
                  <RadioGroup value={dischargedOnIllHealth || ''} onValueChange={setDischargedOnIllHealth}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="discharged-yes" />
                      <Label htmlFor="discharged-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="discharged-no" />
                      <Label htmlFor="discharged-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Business Interests Questions */}
                <div className="space-y-3">
                  <Label>
                    Are you conducting business with the State or are you a Director of a Public or Private company conducting business with
                    the State?
                  </Label>
                  <RadioGroup value={businessWithState || ''} onValueChange={setBusinessWithState}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="business-yes" />
                      <Label htmlFor="business-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="business-no" />
                      <Label htmlFor="business-no">No</Label>
                    </div>
                  </RadioGroup>
                  {businessWithState === 'yes' && (
                    <div className="space-y-2">
                      <Label htmlFor="business-details">If yes, provide the details:</Label>
                      <Input
                        id="business-details"
                        value={businessWithStateDetails}
                        onChange={(e) => setBusinessWithStateDetails(e.target.value)}
                        placeholder="Please provide details of your business interests"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                {businessWithState === 'yes' && (
                  <div className="space-y-3">
                    <Label>
                      In the event that you are employed in the Public Service, will you immediately relinquish such business interests?
                    </Label>
                    <RadioGroup value={relinquishBusinessInterests || ''} onValueChange={setRelinquishBusinessInterests}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="relinquish-yes" />
                        <Label htmlFor="relinquish-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="relinquish-no" />
                        <Label htmlFor="relinquish-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Experience Questions */}
                <div className="space-y-3">
                  <Label>Please specify the total number of years of experience you have:</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="private-experience">Private Sector</Label>
                      <Input
                        id="private-experience"
                        type="number"
                        value={privateSectorExperience}
                        onChange={(e) => setPrivateSectorExperience(e.target.value)}
                        placeholder="Years"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="public-experience">Public Sector</Label>
                      <Input
                        id="public-experience"
                        type="number"
                        value={publicSectorExperience}
                        onChange={(e) => setPublicSectorExperience(e.target.value)}
                        placeholder="Years"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="sm:justify-between">
                <Button variant="outline" onClick={handleCloseModal} className="bg-white border border-[#005f33] text-[#005f33]">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApplication}
                  className="bg-[#005f33] border-none text-white"
                  disabled={
                    !educationLevel ||
                    !isEmployed ||
                    !criminalOffence ||
                    !pendingCriminalCase ||
                    !dismissedForMisconduct ||
                    !pendingDisciplinaryCase ||
                    !resignedPendingDisciplinary ||
                    !dischargedOnIllHealth ||
                    !businessWithState ||
                    (businessWithState === 'yes' && !relinquishBusinessInterests) ||
                    !privateSectorExperience ||
                    !publicSectorExperience ||
                    isSubmitting
                  }
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
                    <CheckCircle className="w-12 h-12 text-[#005f33]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600 mb-4">
                  Your application for <strong>{job.title}</strong> has been successfully submitted.
                </p>
                <p className="text-sm text-gray-500">You will be redirected to your applications page shortly...</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobDetailPage;
