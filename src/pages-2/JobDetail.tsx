import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Briefcase, DollarSign, X, Building, MapPin, CheckCircle, GraduationCap, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

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
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <Clock className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">{job.type}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] mr-2 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-[#0086C9]" />
              </div>
              <span className="text-lg font-semibold">
                {job.type === 'Learnership' && job.duration ? `Duration: ${job.duration}` : `Closes: ${formatDate(job.closingDate)}`}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-[#E0F2FE] text-[#0086C9]mr-2 p-2 rounded-full">R</div>
              <span className="text-lg font-semibold">{job.stipend || job.salary}</span>
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
                <strong>{formatDate(job.postedDate)}</strong>
              </p>
              <p>{job.description}</p>
              <p>
                <strong>Position:</strong> {job.title}
                <br />
                {job.grade && (
                  <>
                    <strong>Job Grade:</strong> {job.grade}
                    <br />
                  </>
                )}
                <strong>(Ref: {job.reference})</strong>
              </p>
              <p>
                <strong>{job.stipend ? 'Stipend:' : 'Salary:'}</strong> {job.stipend || job.salary}
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

          <section>
            <h2 className="text-xl font-semibold mb-3">
              {job.type === 'Learnership' ? "Skills You'll Develop" : 'Competencies and Skills'}
            </h2>
            <hr className="mb-8 bg-[#E4E7EC] text-[#E4E7EC] border border-[#E4E7EC]" />
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
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
                <Button variant="outline" onClick={handleCloseModal} className="bg-white border border-[#005f33] text-[#005f33]">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApplication}
                  className="bg-[#005f33] border-none text-white"
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
