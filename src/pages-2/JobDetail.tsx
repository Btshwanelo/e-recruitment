import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Briefcase,
  Building,
  MapPin,
  CheckCircle,
  GraduationCap,
  Heart,
  Loader2,
  RotateCcw,
  CircleCheck,
  BadgePlus,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectHasApplied, selectApplicationByJobId, addApplication, toggleFavorite } from '@/slices/jobsSlice';
import HeaderV2 from './Header';
import Footer from '@/components/Footer';
import {
  useExecuteRequest1Mutation,
  useExecuteRequest2Mutation,
  useExecuteRequest3Mutation,
  useExecuteRequest5Mutation,
  useExecuteRequest6Mutation,
} from '@/slices/services';
import Loader from '@/components/Loader';
import { showSuccessToast } from '@/components/SuccessToast';
import useAuth from '@/hooks/useAuth';
import { formatNumber } from '@/lib/utils';

// Signature Capture Component
const SignatureCapture: React.FC<{
  signatureData: string;
  onSignatureChange: (signature: string) => void;
}> = ({ signatureData, onSignatureChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onSignatureChange(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onSignatureChange('');
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#005f33';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-3">Digital Signature</h3>
        <p className="text-lg text-gray-600 mb-6">Please sign in the box below using your mouse or touchpad</p>
      </div>

      <div className="flex justify-center">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="border border-gray-200 rounded cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button type="button" variant="outline" onClick={clearSignature} className="flex items-center space-x-2 px-6 py-3">
          <RotateCcw className="w-5 h-5" />
          <span>Clear Signature</span>
        </Button>
      </div>

      {signatureData && (
        <div className="text-center">
          <p className="text-lg text-green-600 font-medium">✓ Signature captured successfully</p>
        </div>
      )}
    </div>
  );
};

const JobDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Step management for 3-step application flow
  const [currentStep, setCurrentStep] = useState(1);
  const [signatureData, setSignatureData] = useState<string>('');
  const [criteriaQuestions, setCriteriaQuestions] = useState<any[]>([]);
  const [criteriaAnswers, setCriteriaAnswers] = useState<{ [key: string]: string }>({});

  // Application data from Z83 submission
  const [applicationRef, setApplicationRef] = useState<string>('');
  const [jobApplicationId, setJobApplicationId] = useState<string>('');

  console.log('criteriaQuestions', criteriaQuestions);
  console.log('applicationRef', applicationRef);
  console.log('criteriaAnswers', criteriaAnswers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: jobId } = useParams<{ id: string }>();

  // Job data state
  const [jobData, setJobData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [getJob] = useExecuteRequest1Mutation();
  const [getMasterData, getMasterDataProps] = useExecuteRequest2Mutation();
  const [jobApply] = useExecuteRequest3Mutation();
  const [getQuestionaire] = useExecuteRequest6Mutation();
  const [submitCriteria] = useExecuteRequest5Mutation();

  // Handle criteria answer changes
  const handleCriteriaAnswerChange = (questionId: string, answer: string) => {
    setCriteriaAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Submit criteria questions
  const handleSubmitCriteria = async () => {
    try {
      const skillMetrics = Object.entries(criteriaAnswers).map(([questionId, answer]) => ({
        QualifyingCriteria: questionId,
        SelectedAnswer: answer,
      }));

      console.log('Submitting criteria with skillMetrics:', skillMetrics);
      console.log('Using Job Application ID:', jobApplicationId);

      await submitCriteria({
        body: {
          entityName: 'JobApplication',
          requestName: 'UpsertRegEricruit',
          RecordId: jobApplicationId, // Use job application ID from Z83 response
          inputParamters: {
            Entity: {},
            SkillMetrics: skillMetrics,
          },
        },
      }).unwrap();

      console.log('Criteria submitted successfully');
      // Move to success step
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting criteria:', error);
      setError('Failed to submit criteria. Please try again.');
    }
  };

  useEffect(() => {
    if (jobId) {
      getQuestionaire({
        body: {
          entityName: 'JobApplication',
          requestName: 'RetrieveJobQualifyingCriteria',
          inputParamters: {
            JobVacancyId: jobId,
          },
        },
      })
        .unwrap()
        .then((response) => {
          console.log('Criteria questions response:', response);

          // Extract questions from the response structure
          const questions = response?.QualifyingCriteria || [];

          // Transform the questions to match our expected format
          const transformedQuestions = questions.map((q: any) => ({
            id: q.qualifyingCriteriaId,
            question: q.description,
            text: q.description,
            options: [
              { value: '636', label: 'Yes' },
              { value: '637', label: 'No' },
            ],
          }));

          console.log('Transformed criteria questions:', transformedQuestions);
          setCriteriaQuestions(transformedQuestions);
        })
        .catch((error) => {
          console.error('Error fetching criteria questions:', error);
          // Even if there's an error, check if we have data in the error response
          if (error?.data?.QualifyingCriteria) {
            const questions = error.data.QualifyingCriteria;
            const transformedQuestions = questions.map((q: any) => ({
              id: q.qualifyingCriteriaId,
              question: q.description,
              text: q.description,
              options: [
                { value: '636', label: 'Yes' },
                { value: '637', label: 'No' },
              ],
            }));
            console.log('Using data from error response:', transformedQuestions);
            setCriteriaQuestions(transformedQuestions);
          }
        });
    }
  }, [jobId, getQuestionaire]);

  // Helper function to get options from master data
  const getMasterOptions = (schemaName: string) => {
    const masterData = getMasterDataProps?.data?.staticData;
    if (!masterData) return [];

    const schema = masterData.find((item: any) => item.schemaName === schemaName);
    return schema?.options || [];
  };
  useEffect(() => {
    getMasterData({
      body: {
        entityName: 'Applicant',
        requestName: 'RetrieveMasterValues',
        inputParamters: {
          Page: 'z83',
        },
      },
    });
    const fetchJobDetails = async () => {
      if (!jobId) {
        setError('Job ID not found');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await getJob({
          body: {
            entityName: 'JobVacancy',
            requestName: 'JobDetails',
            recordId: jobId, // Use the job ID from URL parameters
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
  }, [jobId, getJob]); // Add jobId as dependency

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

  // Registration details
  const [registrationDate, setRegistrationDate] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  // Correspondence method
  const [correspondenceMethod, setCorrespondenceMethod] = useState<string | null>(null);

  // Previous employment conditions
  const [prevEmploymentCondition, setPrevEmploymentCondition] = useState<string | null>(null);
  const [prevEmploymentDetails, setPrevEmploymentDetails] = useState('');

  // Additional fields for API payload
  const [publicServiceBackground, setPublicServiceBackground] = useState<string | null>(null);
  const [lastPublicServicePosition, setLastPublicServicePosition] = useState('');

  // For now, we'll use a mock job ID since we're getting data from API
  const mockJobId = jobId || '';
  const hasApplied = useSelector((state: any) => selectHasApplied(state, mockJobId));
  const application = useSelector((state: any) => selectApplicationByJobId(state, mockJobId));
  const authDetails = useAuth();

  // Create a job object from API data for compatibility
  const job = jobData
    ? {
        id: jobId || '',
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
      }
    : null;

  useEffect(() => {
    if (!jobData && !isLoading && error) {
      navigate('/');
    }
  }, [jobData, isLoading, error, navigate]);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Job</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/')} className="bg-[#005f33] text-white">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#005f33]" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Job Details...</h2>
          <p className="text-gray-600">Please wait while we fetch the job information.</p>
        </div>
      </div>
    );
  }

  // Job not found state (only show after loading is complete)
  if (!job && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} className="bg-[#005f33] text-white">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  // If we reach here, job should be defined, but add a safety check
  if (!job) {
    return null;
  }

  const handleApply = () => {
    // Check if user is authenticated
    if (!authDetails.isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/auth');
      return;
    }
    
    // Open application modal if authenticated
    setIsModalOpen(true);
  };

  // Validation function
  const validateForm = () => {
    const errors: string[] = [];

    if (!criminalOffence) errors.push('criminalOffence');
    if (!pendingCriminalCase) errors.push('pendingCriminalCase');
    if (!dismissedForMisconduct) errors.push('dismissedForMisconduct');
    if (!pendingDisciplinaryCase) errors.push('pendingDisciplinaryCase');
    if (!resignedPendingDisciplinary) errors.push('resignedPendingDisciplinary');
    // dischargedOnIllHealth is commented out in the form, so removed from validation
    if (!businessWithState) errors.push('businessWithState');
    if (businessWithState === '636' && !relinquishBusinessInterests) errors.push('relinquishBusinessInterests');
    if (!privateSectorExperience || privateSectorExperience === '') errors.push('privateSectorExperience');
    if (!publicSectorExperience || publicSectorExperience === '') errors.push('publicSectorExperience');
    if (!correspondenceMethod) errors.push('correspondenceMethod');
    if (!prevEmploymentCondition) errors.push('prevEmploymentCondition');
    if (!publicServiceBackground) errors.push('publicServiceBackground');

    console.log('Validation errors:', errors);
    console.log('Field values:', {
      criminalOffence,
      pendingCriminalCase,
      dismissedForMisconduct,
      pendingDisciplinaryCase,
      resignedPendingDisciplinary,
      businessWithState,
      relinquishBusinessInterests,
      privateSectorExperience,
      publicSectorExperience,
      correspondenceMethod,
      prevEmploymentCondition,
      publicServiceBackground,
    });

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

    try {
      // Prepare API payload
      const payload = {
        entityName: 'JobApplication',
        requestName: 'UpsertRegEricruit',
        inputParamters: {
          Entity: {
            yearsExperiencePrivateSector: privateSectorExperience,
            YearsExperiencePublicSector: publicSectorExperience,
            BusinessInterests: businessWithState,
            HasPendingDisciplinaryCase: pendingDisciplinaryCase,
            // DismissalDetails: dismissedForMisconduct === '636' ? dismissedForMisconductDetails : '',
            // DismissedFromPublicService: dismissedForMisconduct === '636' ? 'Yes' : 'No',
            HasPendingCriminalCase: pendingCriminalCase,
            HasCriminalConviction: criminalOffence,
            HasBusinessWithState: businessWithState,
            BusinessWithStateDetails: businessWithState === '636' ? businessWithStateDetails : '',
            PublicServiceBackground: publicServiceBackground,
            LastPublicServicePosition: publicServiceBackground === '636' ? lastPublicServicePosition : '',
            JobApplicantId: authDetails.user.relatedObjectId, // This should come from auth context
            JobVacencyId: jobId,
          },
        },
      };

      console.log('Submitting application with payload:', payload);

      // Call the API
      const response = await jobApply({ body: payload }).unwrap();

      console.log('Z83 Application submitted successfully:', response);

      // Extract application reference and job application ID from response
      const responseApplicationRef =
        response?.UpsertResponse?.applicationReference ||
        `APP-${Date.now().toString().slice(-8)}-${job.postNumber || job.id.slice(-4).toUpperCase()}`;
      const responseJobApplicationId = response?.UpsertResponse?.recordId;
      showSuccessToast(`z83 submitted! Application Reference', ${responseApplicationRef} `);
      setApplicationRef(responseApplicationRef);
      setJobApplicationId(responseJobApplicationId);

      console.log('Application Reference:', responseApplicationRef);
      console.log('Job Application ID:', responseJobApplicationId);
      console.log('Full UpsertResponse:', response?.UpsertResponse);

      // Create application for local state
      const newApplication = {
        id: `app_${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'submitted' as const,
        applicationRef: responseApplicationRef,
        educationLevel: '', // Not used in new form
        isEmployed: '', // Not used in new form
        applicationData: {
          educationLevel: '', // Not used in new form
          isEmployed: '', // Not used in new form
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
          correspondenceMethod,
          prevEmploymentCondition,
          prevEmploymentDetails,
          registrationDate,
          registrationNumber,
          publicServiceBackground,
          lastPublicServicePosition,
        },
      };

      dispatch(addApplication(newApplication));

      setIsSubmitting(false);
      // Move to next step instead of showing success
      setCurrentStep(2);
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
      // You might want to show an error message to the user here
      setError('Failed to submit application. Please try again.');
    }
  };

  // Step validation
  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return validateForm();
      case 2:
        return signatureData ? [] : ['signature'];
      case 3:
        const unansweredQuestions = criteriaQuestions.filter((q) => !criteriaAnswers[q.id]);
        return unansweredQuestions.map((q) => q.id);
      default:
        return [];
    }
  };

  // Step navigation functions
  const nextStep = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (currentStep === 2) {
      // Step 2: Log signature data and move to step 3
      console.log('Signature captured:', signatureData);
      console.log('Application Reference:', applicationRef);
      console.log('Job Application ID:', jobApplicationId);
      setCurrentStep(3);
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }

    setValidationErrors([]);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors([]);
    }
  };

  const handleStepSubmit = async () => {
    if (currentStep === 1) {
      // Step 1: Submit Z83 application
      await handleSubmitApplication();
    } else if (currentStep === 2) {
      // Step 2: Just log signature and move to next step
      console.log('Signature captured:', signatureData);
      console.log('Application Reference:', applicationRef);
      console.log('Job Application ID:', jobApplicationId);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Step 3: Submit criteria questions
      await handleSubmitCriteria();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowSuccess(false);
    setIsSubmitting(false);
    setValidationErrors([]);
    setCurrentStep(1);
    setSignatureData('');
    setCriteriaAnswers({});
    setApplicationRef('');
    setJobApplicationId('');

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
    setCorrespondenceMethod(null);
    setPrevEmploymentCondition(null);
    setPrevEmploymentDetails('');
    setRegistrationDate('');
    setRegistrationNumber('');
    setPublicServiceBackground(null);
    setLastPublicServicePosition('');
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

  // Helper function to convert plain text to list items
  const convertTextToList = (text: string) => {
    if (!text) return [];

    // Split by common separators and clean up
    const items = text
      .split(/[,\n\r]+/) // Split by comma, newline, or carriage return
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return items;
  };

  const JobTypeIcon = getJobTypeIcon();

  return (
    <div className="min-h-screen bg-gray-50 grid grid-rows-[auto_1fr_auto]">
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* Job Title Section */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">
                {job.title}
                {/* {job.postNumber && <span className="text-lg font-normal text-gray-600 ml-2">({job.postNumber})</span>} */}
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
                  <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                  <BadgePlus className="w-5 h-5 text-[#0086C9]" />
                  </div>
                  <span className="text-lg font-semibold px-2">
                    {job.stipend ? `R ${formatNumber(job.stipend)} per annum` : job.salary ? `R ${formatNumber(job.salary)} per annum` : 'Salary not specified'}
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
                    {job.stipend ? `R ${formatNumber(job.stipend)} per annum` : job.salary ? `R ${formatNumber(job.salary)} per annum` : 'Not specified'}
                    <br />
                    <strong>{job.type === 'Learnership' ? 'Location:' : 'Centre:'}</strong> {job.company}, {job.location}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-4">{job.type === 'Learnership' ? 'Entry Requirements' : 'Requirements'}</h2>
                <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
                <div className="text-gray-900">
                  <ul className="space-y-2">
                    {convertTextToList(job.requirements).map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-4">
                  {job.type === 'Learnership' ? 'Learning Areas & Responsibilities' : 'Duties & Responsibilities'}
                </h2>
                <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
                <div className="text-gray-900">
                  <ul className="space-y-2">
                    {convertTextToList(job.responsibilities).map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Enquiries Section */}
              <section className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Enquiries</h2>
                <hr className="mb-6 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />

                <div className="bg-gray-50 rounded-lg ">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-semibold text-gray-800 mb-2">Need Help or Have Questions?</h3>
                      <p className="text-gray-600 mb-4">
                        If you have any questions about this position or need assistance with your application, please don't hesitate to
                        contact us.
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
                          onClick={() =>
                            window.open('mailto:recruitment@dcs.gov.za?subject=Job Application Enquiry - ' + job.title, '_blank')
                          }
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

                    {/* <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Please include the job reference number in your email subject</li>
                    <li>• Response time: 2-3 business days</li>
                    <li>• For urgent matters, please call our helpline: 0800 123 456</li>
                    <li>• Keep your application reference number for tracking</li>
                  </ul>
                </div> */}
                  </div>
                </div>
              </section>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => navigate('/')} className="bg-[#005f33] border-none text-white w-[180px]">
                  Back to Jobs
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Application Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="w-screen h-screen max-w-none max-h-none m-0 p-0 bg-white rounded-none">
          {!showSuccess ? (
            <>
              <DialogHeader className=" px-6 py-4">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-semibold">Complete Your Application</DialogTitle>
                </div>

                {/* Step Progress Indicator */}
                <div className="flex items-center justify-center mt-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center ml-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          step <= currentStep ? 'bg-[#005f33] text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {step}
                      </div>
                      {step < 3 && <div className={`w-60 h-[2px]  ${step < currentStep ? 'bg-[#005f33]' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-3">
                  <p className="text-lg font-medium text-gray-700">
                    {currentStep === 1 ? 'Z83 Questions' : currentStep === 2 ? 'Digital Signature' : 'Criteria Questions'}
                  </p>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Step 1: Z83 Questions */}
                  {currentStep === 1 && (
                    <>
                      {/* Question 1: Criminal Offence */}
                      <div className="space-y-3 px-2" id="criminalOffence">
                        <Label className={hasError('criminalOffence') ? 'text-red-600' : ''}>
                          Have you been convicted or found guilty of a criminal offence (including an admission of guilt)?{' '}
                          {hasError('criminalOffence') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={criminalOffence || ''} onValueChange={setCriminalOffence}>
                          <SelectTrigger
                            className={`w-full bg-white ${hasError('criminalOffence') ? 'border-red-500 focus:border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('YesNoId').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {criminalOffence === '636' && (
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

                      {/* Question 2: Pending Criminal Case */}
                      <div className="space-y-3 px-2" id="pendingCriminalCase">
                        <Label className={hasError('pendingCriminalCase') ? 'text-red-600' : ''}>
                          Do you have any pending criminal case against you?{' '}
                          {hasError('pendingCriminalCase') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={pendingCriminalCase || ''} onValueChange={setPendingCriminalCase}>
                          <SelectTrigger
                            className={`w-full ${hasError('pendingCriminalCase') ? 'border-red-500 focus:border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('YesNoId').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {pendingCriminalCase === '636' && (
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

                      {/* Question 3: Dismissed for Misconduct */}
                      <div className="space-y-3 px-2" id="dismissedForMisconduct">
                        <Label className={hasError('dismissedForMisconduct') ? 'text-red-600' : ''}>
                          Have you ever been dismissed for misconduct from the Public Service?{' '}
                          {hasError('dismissedForMisconduct') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={dismissedForMisconduct || ''} onValueChange={setDismissedForMisconduct}>
                          <SelectTrigger
                            className={`w-full ${hasError('dismissedForMisconduct') ? 'border-red-500 focus:border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('YesNoId').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {dismissedForMisconduct === '636' && (
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

                      {/* Question 4: Pending Disciplinary Case */}
                      <div className="space-y-3 px-2" id="pendingDisciplinaryCase">
                        <Label className={hasError('pendingDisciplinaryCase') ? 'text-red-600' : ''}>
                          Do you have any pending disciplinary case against you?{' '}
                          {hasError('pendingDisciplinaryCase') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={pendingDisciplinaryCase || ''} onValueChange={setPendingDisciplinaryCase}>
                          <SelectTrigger
                            className={`w-full ${hasError('pendingDisciplinaryCase') ? 'border-red-500 focus:border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('YesNoId').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {pendingDisciplinaryCase === '636' && (
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

                      {/* Question 5: Resigned Pending Disciplinary */}
                      <div className="space-y-3 px-2" id="resignedPendingDisciplinary">
                        <Label className={hasError('resignedPendingDisciplinary') ? 'text-red-600' : ''}>
                          Have you resigned from a recent job pending any disciplinary proceeding against you?{' '}
                          {hasError('resignedPendingDisciplinary') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={resignedPendingDisciplinary || ''} onValueChange={setResignedPendingDisciplinary}>
                          <SelectTrigger
                            className={`w-full ${hasError('resignedPendingDisciplinary') ? 'border-red-500 focus:border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('YesNoId').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Question 6: Discharged on Ill-health */}
                      {/* <div className="space-y-3 px-2" id="dischargedOnIllHealth">
                  <Label className={hasError('dischargedOnIllHealth') ? 'text-red-600' : ''}>
                    Have you been discharged or retired from the Public Service on grounds of Ill-health or on condition that you cannot be
                    re-employed? {hasError('dischargedOnIllHealth') && <span className="text-red-500">*</span>}
                  </Label>
                  <Select value={dischargedOnIllHealth || ''} onValueChange={setDischargedOnIllHealth}>
                    <SelectTrigger className={`w-full ${hasError('dischargedOnIllHealth') ? 'border-red-500 focus:border-red-500' : ''}`}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {getMasterOptions('YesNoId').map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.lable}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}

                      {/* Question 7: Business with State */}
                      <div className="space-y-3 px-2" id="businessWithState">
                        <Label className={hasError('businessWithState') ? 'text-red-600' : ''}>
                          Are you conducting business with the State or are you a Director of a Public or Private company conducting
                          business with the State? {hasError('businessWithState') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={businessWithState || ''} onValueChange={setBusinessWithState}>
                          <SelectTrigger className={`w-full ${hasError('businessWithState') ? 'border-red-500 focus:border-red-500' : ''}`}>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('YesNoId').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {businessWithState === '636' && (
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

                      {/* Question 8: Relinquish Business Interests */}
                      {businessWithState === '636' && (
                        <div className="space-y-3 px-2" id="relinquishBusinessInterests">
                          <Label className={hasError('relinquishBusinessInterests') ? 'text-red-600' : ''}>
                            In the event that you are employed in the Public Service, will you immediately relinquish such business
                            interests? {hasError('relinquishBusinessInterests') && <span className="text-red-500">*</span>}
                          </Label>
                          <Select value={relinquishBusinessInterests || ''} onValueChange={setRelinquishBusinessInterests}>
                            <SelectTrigger
                              className={`w-full ${hasError('relinquishBusinessInterests') ? 'border-red-500 focus:border-red-500' : ''}`}
                            >
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              {getMasterOptions('YesNoId').map((option: any) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.lable}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Question 9: Experience */}
                      <div className="space-y-3 px-2">
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

                      {/* Question 10: Registration Details */}
                      <div className="space-y-3 px-2">
                        <Label>
                          If your profession or occupation requires official registration, provide date and particulars of registration:
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="registration-date">Date</Label>
                            <Input
                              id="registration-date"
                              type="date"
                              value={registrationDate}
                              onChange={(e) => setRegistrationDate(e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="registration-number">Reg. No</Label>
                            <Input
                              id="registration-number"
                              value={registrationNumber}
                              onChange={(e) => setRegistrationNumber(e.target.value)}
                              placeholder="Registration Number"
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Question 11: Correspondence Method */}
                      <div className="space-y-3 px-2" id="correspondenceMethod">
                        <Label className={hasError('correspondenceMethod') ? 'text-red-600' : ''}>
                          Method for correspondence {hasError('correspondenceMethod') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={correspondenceMethod || ''} onValueChange={setCorrespondenceMethod}>
                          <SelectTrigger
                            className={`w-full ${hasError('correspondenceMethod') ? 'border-red-500 focus:border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select a method" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('MethodsOfCommunicating').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Question 12: Previous Employment Condition */}
                      <div className="space-y-3 px-2" id="prevEmploymentCondition">
                        <Label className={hasError('prevEmploymentCondition') ? 'text-red-600' : ''}>
                          If you were previously employed in the Public Service, is there any condition that prevents your reappointment?{' '}
                          {hasError('prevEmploymentCondition') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={prevEmploymentCondition || ''} onValueChange={setPrevEmploymentCondition}>
                          <SelectTrigger
                            className={`w-full ${hasError('prevEmploymentCondition') ? 'border-red-500 focus:border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('YesNoId').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {prevEmploymentCondition === '636' && (
                          <div className="space-y-2">
                            <Label htmlFor="prev-employment-details">
                              If yes, provide the name of the previous employing department and indicate the nature of the condition:
                            </Label>
                            <Input
                              id="prev-employment-details"
                              value={prevEmploymentDetails}
                              onChange={(e) => setPrevEmploymentDetails(e.target.value)}
                              placeholder="Please provide details of the condition"
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>

                      {/* Question 13: Public Service Background */}
                      <div className="space-y-3 px-2" id="publicServiceBackground">
                        <Label className={hasError('publicServiceBackground') ? 'text-red-600' : ''}>
                          Do you have a Public Service Background?{' '}
                          {hasError('publicServiceBackground') && <span className="text-red-500">*</span>}
                        </Label>
                        <Select value={publicServiceBackground || ''} onValueChange={setPublicServiceBackground}>
                          <SelectTrigger
                            className={`w-full ${hasError('publicServiceBackground') ? 'border-red-500 focus:border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {getMasterOptions('YesNoId').map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.lable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Question 14: Last Public Service Position - Only show if Yes is selected */}
                      {publicServiceBackground === '636' && (
                        <div className="space-y-3 px-2">
                          <Label htmlFor="last-public-service-position">Last Public Service Position</Label>
                          <Input
                            id="last-public-service-position"
                            value={lastPublicServicePosition}
                            onChange={(e) => setLastPublicServicePosition(e.target.value)}
                            placeholder="Your last position in public service"
                            className="w-full"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Step 2: Digital Signature */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <SignatureCapture signatureData={signatureData} onSignatureChange={setSignatureData} />
                    </div>
                  )}

                  {/* Step 3: Criteria Questions */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Qualifying Criteria</h3>
                        <p className="text-sm text-gray-600 mb-6">Please answer the following questions to complete your application</p>
                      </div>

                      {criteriaQuestions.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Loading criteria questions...</p>
                        </div>
                      ) : (
                        criteriaQuestions.map((question, index) => (
                          <div key={question.id} className="space-y-3 px-2" id={question.id}>
                            <Label className={hasError(question.id) ? 'text-red-600' : ''}>
                              {question.question || question.text || `Question ${index + 1}`}
                              {hasError(question.id) && <span className="text-red-500">*</span>}
                            </Label>
                            <Select
                              value={criteriaAnswers[question.id] || ''}
                              onValueChange={(value) => handleCriteriaAnswerChange(question.id, value)}
                            >
                              <SelectTrigger className={`w-full ${hasError(question.id) ? 'border-red-500 focus:border-red-500' : ''}`}>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {question.options?.map((option: any) => (
                                  <SelectItem key={option.value || option.id} value={option.value || option.id}>
                                    {option.label || option.text || option.name}
                                  </SelectItem>
                                )) ||
                                  getMasterOptions('YesNoId').map((option: any) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.lable}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                <Button variant="outline" onClick={handleCloseModal} className="bg-white border border-[#005f33] text-[#005f33]">
                  Cancel
                </Button>

                <div className="flex space-x-2">
                  {/* {currentStep > 1 && (
                    <Button variant="outline" onClick={prevStep} className="bg-white border border-gray-300 text-gray-700">
                      Previous
                    </Button>
                  )} */}

                  {currentStep === 1 ? (
                    <Button onClick={handleStepSubmit} className="bg-[#005f33] border-none text-white" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  ) : currentStep < 3 ? (
                    <Button onClick={nextStep} className="bg-[#005f33] border-none text-white">
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleStepSubmit} className="bg-[#005f33] border-none text-white" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader className=" px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* <DialogTitle className="text-xl font-medium">Application Submitted!</DialogTitle> */}
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="flex justify-center mb-6">
                    <div className="border border-gray-100 shadow-sm p-4 rounded-xl">
                      <CircleCheck className="w-8 h-8 text-[#005f33]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Success!</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Your application for <strong>{job.title}</strong> has been successfully submitted.
                  </p>

                  {/* Application Reference Number */}
                  <div className=" rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Application Reference Number</h4>
                    <div className="bg-white rounded-md p-3 mb-3">
                      <code className="text-2xl font-mono font-bold text-[#005f33] tracking-wider">{applicationRef}</code>
                    </div>
                    <p className="text-sm text-gray-600">
                      Please save this reference number for your records. You can use it to track your application status.
                    </p>
                  </div>
                  <Button onClick={handleSuccessOK} className="bg-[#005f33] py-6 hover:bg-[#004d2a] text-white font-semibold px-8 text-lg">
                    View My Applications
                  </Button>
                </div>
              </div>

              <DialogFooter className=" px-6 py-4 justify-center"></DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Sticky Apply Button */}
      {!isLoading && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <JobTypeIcon className="w-5 h-5 text-[#0086C9]" />
                  <span className="font-medium text-gray-900">{job.title}</span>
                  {/* {job.postNumber && <span className="text-sm text-gray-500">({job.postNumber})</span>} */}
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
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobDetailPage;
