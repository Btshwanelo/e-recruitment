import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Briefcase, Building, MapPin, CheckCircle, GraduationCap, Heart, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectHasApplied, selectApplicationByJobId, addApplication, toggleFavorite } from '@/slices/jobsSlice';
import HeaderV2 from './Header';
import Footer from '@/components/Footer';
import { useExecuteRequest1Mutation } from '@/slices/services';

const JobDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationLevel, setEducationLevel] = useState('');
  const [isEmployed, setIsEmployed] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [applicationRef, setApplicationRef] = useState<string>('');

  // Job data state
  const [jobData, setJobData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [getJob] = useExecuteRequest1Mutation();
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getJob({
          body: {
            entityName: 'JobVacancy',
            requestName: 'JobDetails',
            recordId: 'c2a165e8-f48c-416f-8949-4851385954e2',
          },
        }).unwrap();
        
        console.log('jobsProps', response);
        setJobData(response);
      } catch (err) {
        setError('Failed to load job details');
        console.error('Error fetching job details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, []);

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

  // For now, we'll use a mock job ID since we're getting data from API
  const mockJobId = jobId || 'c2a165e8-f48c-416f-8949-4851385954e2';
  const hasApplied = useSelector((state: any) => selectHasApplied(state, mockJobId));
  const application = useSelector((state: any) => selectApplicationByJobId(state, mockJobId));

  // Create a job object from API data for compatibility
  const job = jobData ? {
    id: mockJobId,
    title: jobData['Job Vacancy']?.name || '',
    postNumber: jobData['Job Vacancy']?.postNumber || '',
    type: jobData['Job Vacancy']?.employmentType || '',
    category: jobData['Job Vacancy']?.departmentIdName || '',
    closingDate: jobData['Job Vacancy']?.closesOn || '',
    salary: jobData['Job Vacancy']?.salary || '',
    location: jobData['Job Vacancy']?.location || '',
    description: jobData['Job Vacancy']?.jobDescription || '',
    requirements: jobData['Job Vacancy']?.requirements || '',
    status: jobData['Job Vacancy']?.status || '',
    isFavorite: false, // This would need to be managed separately
    // Additional properties for compatibility
    company: jobData['Job Vacancy']?.departmentIdName || '',
    stipend: jobData['Job Vacancy']?.salary || '',
    grade: '', // Not provided in API response
    postedDate: jobData['Job Vacancy']?.postedOn || '',
    reference: jobData['Job Vacancy']?.postNumber || '',
    responsibilities: jobData['Job Vacancy']?.jobDescription || '', // Use jobDescription as responsibilities
  } : null;

  useEffect(() => {
    if (!jobData && !isLoading && error) {
      navigate('/jobs');
    }
  }, [jobData, isLoading, error, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#005f33]" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Job Details</h2>
          <p className="text-gray-600">Please wait while we fetch the job information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Job</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/jobs')} className="bg-[#005f33] text-white">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  // Job not found state
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')} className="bg-[#005f33] text-white">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    setIsModalOpen(true);
  };

  // Validation function
  const validateForm = () => {
    const errors: string[] = [];

    if (!educationLevel) errors.push('education');
    if (!isEmployed) errors.push('isEmployed');
    if (!criminalOffence) errors.push('criminalOffence');
    if (!pendingCriminalCase) errors.push('pendingCriminalCase');
    if (!dismissedForMisconduct) errors.push('dismissedForMisconduct');
    if (!pendingDisciplinaryCase) errors.push('pendingDisciplinaryCase');
    if (!resignedPendingDisciplinary) errors.push('resignedPendingDisciplinary');
    if (!dischargedOnIllHealth) errors.push('dischargedOnIllHealth');
    if (!businessWithState) errors.push('businessWithState');
    if (businessWithState === 'yes' && !relinquishBusinessInterests) errors.push('relinquishBusinessInterests');
    if (!privateSectorExperience) errors.push('privateSectorExperience');
    if (!publicSectorExperience) errors.push('publicSectorExperience');

    return errors;
  };

  // Scroll to first missing field
  const scrollToFirstError = (errors: string[]) => {
    if (errors.length > 0) {
      const firstError = errors[0];
      const element = document.getElementById(firstError);

      if (element) {
        // Scroll the element into view within the modal
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });

        // Focus the first radio button or input in the field
        setTimeout(() => {
          const firstInput = element.querySelector('input[type="radio"], input[type="text"], input[type="number"], select');
          if (firstInput) {
            (firstInput as HTMLElement).focus();
          }
        }, 300);
      }
    }
  };

  // Check if field has validation error
  const hasError = (fieldName: string) => {
    return validationErrors.includes(fieldName);
  };

  const handleSubmitApplication = async () => {
    // Clear previous validation errors
    setValidationErrors([]);

    // Validate form
    const errors = validateForm();

    if (errors.length > 0) {
      setValidationErrors(errors);
      scrollToFirstError(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate application reference number
    const generatedApplicationRef = `APP-${Date.now().toString().slice(-8)}-${job.postNumber || job.id.slice(-4).toUpperCase()}`;
    setApplicationRef(generatedApplicationRef);

    // Create application
    const newApplication = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'submitted' as const,
      applicationRef: generatedApplicationRef,
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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowSuccess(false);
    setEducationLevel('');
    setIsEmployed(null);
    setIsSubmitting(false);
    setValidationErrors([]);
    setApplicationRef('');

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

  const handleSuccessOK = () => {
    handleCloseModal();
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

      <div className="container mx-auto px-4 py-8 pb-24">
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
                {job.stipend ? `${job.stipend}` : job.salary ? `${job.salary}` : 'Salary not specified'}
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
            <div 
              className="text-gray-900 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: job.requirements }}
            />
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">
              {job.type === 'Learnership' ? 'Learning Areas & Responsibilities' : 'Duties & Responsibilities'}
            </h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <div 
              className="text-gray-900 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: job.responsibilities }}
            />
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

              {validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Please complete all required fields</h3>
                      <p className="text-sm text-red-700 mt-1">
                        {validationErrors.length} field{validationErrors.length !== 1 ? 's' : ''} still need
                        {validationErrors.length === 1 ? 's' : ''} to be completed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6 py-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="education" className={hasError('education') ? 'text-red-600' : ''}>
                    What is your Highest Education Level? {hasError('education') && <span className="text-red-500">*</span>}
                  </Label>
                  <Select value={educationLevel} onValueChange={setEducationLevel}>
                    <SelectTrigger
                      id="education"
                      className={`w-full ${hasError('education') ? 'border-red-500 focus:border-red-500' : ''}`}
                    >
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

                <div className="space-y-3" id="isEmployed">
                  <Label className={hasError('isEmployed') ? 'text-red-600' : ''}>
                    Are you currently employed? {hasError('isEmployed') && <span className="text-red-500">*</span>}
                  </Label>
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
                <div className="space-y-3" id="criminalOffence">
                  <Label className={hasError('criminalOffence') ? 'text-red-600' : ''}>
                    Have you been convicted or found guilty of a criminal offence (including an admission of guilt)?{' '}
                    {hasError('criminalOffence') && <span className="text-red-500">*</span>}
                  </Label>
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

                <div className="space-y-3" id="pendingCriminalCase">
                  <Label className={hasError('pendingCriminalCase') ? 'text-red-600' : ''}>
                    Do you have any pending criminal case against you?{' '}
                    {hasError('pendingCriminalCase') && <span className="text-red-500">*</span>}
                  </Label>
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
                <div className="space-y-3" id="dismissedForMisconduct">
                  <Label className={hasError('dismissedForMisconduct') ? 'text-red-600' : ''}>
                    Have you ever been dismissed for misconduct from the Public Service?{' '}
                    {hasError('dismissedForMisconduct') && <span className="text-red-500">*</span>}
                  </Label>
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

                <div className="space-y-3" id="pendingDisciplinaryCase">
                  <Label className={hasError('pendingDisciplinaryCase') ? 'text-red-600' : ''}>
                    Do you have any pending disciplinary case against you?{' '}
                    {hasError('pendingDisciplinaryCase') && <span className="text-red-500">*</span>}
                  </Label>
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
                <div className="space-y-3" id="resignedPendingDisciplinary">
                  <Label className={hasError('resignedPendingDisciplinary') ? 'text-red-600' : ''}>
                    Have you resigned from a recent job pending any disciplinary proceeding against you?{' '}
                    {hasError('resignedPendingDisciplinary') && <span className="text-red-500">*</span>}
                  </Label>
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
                <div className="space-y-3" id="dischargedOnIllHealth">
                  <Label className={hasError('dischargedOnIllHealth') ? 'text-red-600' : ''}>
                    Have you been discharged or retired from the Public Service on grounds of Ill-health or on condition that you cannot be
                    re-employed? {hasError('dischargedOnIllHealth') && <span className="text-red-500">*</span>}
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
                <div className="space-y-3" id="businessWithState">
                  <Label className={hasError('businessWithState') ? 'text-red-600' : ''}>
                    Are you conducting business with the State or are you a Director of a Public or Private company conducting business with
                    the State? {hasError('businessWithState') && <span className="text-red-500">*</span>}
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
                  <div className="space-y-3" id="relinquishBusinessInterests">
                    <Label className={hasError('relinquishBusinessInterests') ? 'text-red-600' : ''}>
                      In the event that you are employed in the Public Service, will you immediately relinquish such business interests?{' '}
                      {hasError('relinquishBusinessInterests') && <span className="text-red-500">*</span>}
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
                      <Label htmlFor="private-experience" className={hasError('privateSectorExperience') ? 'text-red-600' : ''}>
                        Private Sector {hasError('privateSectorExperience') && <span className="text-red-500">*</span>}
                      </Label>
                      <Input
                        id="private-experience"
                        type="number"
                        value={privateSectorExperience}
                        onChange={(e) => setPrivateSectorExperience(e.target.value)}
                        placeholder="Years"
                        className={`w-full ${hasError('privateSectorExperience') ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="public-experience" className={hasError('publicSectorExperience') ? 'text-red-600' : ''}>
                        Public Sector {hasError('publicSectorExperience') && <span className="text-red-500">*</span>}
                      </Label>
                      <Input
                        id="public-experience"
                        type="number"
                        value={publicSectorExperience}
                        onChange={(e) => setPublicSectorExperience(e.target.value)}
                        placeholder="Years"
                        className={`w-full ${hasError('publicSectorExperience') ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="sm:justify-between">
                <Button variant="outline" onClick={handleCloseModal} className="bg-white border border-[#005f33] text-[#005f33]">
                  Cancel
                </Button>
                <Button onClick={handleSubmitApplication} className="bg-[#005f33] border-none text-white" disabled={isSubmitting}>
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
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="w-16 h-16 text-[#005f33]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Success!</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Your application for <strong>{job.title}</strong> has been successfully submitted.
                </p>

                {/* Application Reference Number */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Application Reference Number</h4>
                  <div className="bg-white border border-gray-300 rounded-md p-3 mb-3">
                    <code className="text-2xl font-mono font-bold text-[#005f33] tracking-wider">{applicationRef}</code>
                  </div>
                  <p className="text-sm text-gray-600">
                    Please save this reference number for your records. You can use it to track your application status.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-700 text-left space-y-1">
                    <li>• You will receive a confirmation email shortly</li>
                    <li>• Your application will be reviewed by our HR team</li>
                    <li>• We'll contact you if you're selected for an interview</li>
                    <li>• You can track your application status in your dashboard</li>
                  </ul>
                </div>
              </div>

              <DialogFooter className="justify-center">
                <Button onClick={handleSuccessOK} className="bg-[#005f33] hover:bg-[#004d2a] text-white font-semibold px-8 py-3 text-lg">
                  OK - View My Applications
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Sticky Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <JobTypeIcon className="w-5 h-5 text-[#0086C9]" />
                <span className="font-medium text-gray-900">{job.title}</span>
                {job.postNumber && <span className="text-sm text-gray-500">({job.postNumber})</span>}
              </div>
              <div className="text-sm text-gray-600">Closing: {formatDate(job.closingDate)}</div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className={`${job.isFavorite ? 'text-red-600 border-red-300' : 'text-gray-600 border-gray-300'}`}
                onClick={handleToggleFavorite}
                size="sm"
              >
                <Heart className={`w-4 h-4 mr-2 ${job.isFavorite ? 'fill-red-600' : ''}`} />
                {job.isFavorite ? 'Saved' : 'Save'}
              </Button>

              {!hasApplied ? (
                <Button
                  className="bg-[#005f33] hover:bg-[#004d2a] text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleApply}
                >
                  Apply Now
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 cursor-default" disabled>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Applied
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#005f33] text-[#005f33] hover:bg-[#005f33] hover:text-white font-semibold px-6 py-2"
                    onClick={handleViewApplication}
                  >
                    View Application
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobDetailPage;
