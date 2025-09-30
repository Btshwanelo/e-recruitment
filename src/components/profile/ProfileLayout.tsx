import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useExecuteRequest2Mutation } from '@/slices/services';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateProfileDetails } from '@/slices/detailsSlice';
import { useMasterData } from '@/hooks/useMasterData';
import {
  ProfileFormData,
  ContactFormData,
  UploadedFile,
  FileUploadError,
  Language,
  Qualification,
  WorkExperience,
  defaultPersonalInfo,
  defaultContactInfo,
} from '@/types/profile';
import ProgressSteps from './ProgressSteps';
import ProfileSidebar from './ProfileSidebar';
import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import Qualifications from './Qualifications';
import WorkExperienceComponent from './WorkExperience';
import CVManagement from './CVManagement';
import { showSuccessToast } from '../SuccessToast';
import { showErrorToast } from '../ErrorToast ';

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

const ProfileLayout: React.FC = () => {
  // Get profile data from Redux store
  const profileData = useSelector((state: RootState) => state.profile.profileDetails);
  const authData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // Active tab state - initialize with current profile step
  const getInitialTab = () => {
    if (profileData.currentProfileStep) {
      const stepMap: { [key: number]: string } = {
        1070: 'personal',
        1071: 'contact',
        1072: 'qualifications',
        1073: 'work-experience',
        1074: 'cv',
      };
      return stepMap[profileData.currentProfileStep] || 'personal';
    }
    return 'personal';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab());

  // Use the custom master data hook
  const { getOptionsForSchema } = useMasterData(activeTab);

  // API mutations
  const [updateProfile, updateProps] = useExecuteRequest2Mutation();

  // Helper function to map profile slice data to form data
  const mapProfileDataToForm = () => {
    const personalData: ProfileFormData = {
      firstName: profileData.applicantDetails?.personalInfo?.firstName || profileData.Name || defaultPersonalInfo.firstName,
      initial: profileData.applicantDetails?.personalInfo?.initial || defaultPersonalInfo.initial,
      title: profileData.applicantDetails?.personalInfo?.titleId?.toString() || defaultPersonalInfo.title,
      lastName: profileData.applicantDetails?.personalInfo?.lastName || profileData.Surname || defaultPersonalInfo.lastName,
      idNumber: profileData.applicantDetails?.personalInfo?.idNumber || profileData.IdNumber || defaultPersonalInfo.idNumber,
      age: profileData.applicantDetails?.personalInfo?.age?.toString() || defaultPersonalInfo.age,
      race: profileData.applicantDetails?.personalInfo?.raceId?.toString() || defaultPersonalInfo.race,
      dateOfBirth: profileData.applicantDetails?.personalInfo?.dateOfBirth || defaultPersonalInfo.dateOfBirth,
      gender: profileData.applicantDetails?.personalInfo?.genderId?.toString() || defaultPersonalInfo.gender,
      passportNumber: profileData.applicantDetails?.personalInfo?.passportNumber || defaultPersonalInfo.passportNumber,
      rightToWork: profileData.applicantDetails?.personalInfo?.rightToWorkStatusId?.toString() || defaultPersonalInfo.rightToWork,
      disabilityStatus: profileData.applicantDetails?.personalInfo?.disabilityStatusId?.toString() || defaultPersonalInfo.disabilityStatus,
      disabilityNature: defaultPersonalInfo.disabilityNature,
      languages:
        profileData.applicantDetails?.languages && profileData.applicantDetails.languages.length > 0
          ? profileData.applicantDetails.languages.map((lang, index) => ({
              id: (index + 1).toString(),
              language: lang.language || '',
              speakingProficiency: lang.proficiencyLevel || '',
              readWriteProficiency: lang.proficiencyLevel || '',
            }))
          : defaultPersonalInfo.languages,
      qualifications: profileData.applicantDetails?.qualifications?.qualificationName
        ? [
            {
              id: '1',
              qualification: profileData.applicantDetails.qualifications.qualificationName,
              institution: profileData.applicantDetails.qualifications.institution || '',
              yearObtained: profileData.applicantDetails.qualifications.yearObtained?.toString() || '',
            },
          ]
        : defaultPersonalInfo.qualifications,
      workExperience: profileData.applicantDetails?.workExperience?.companyName
        ? [
            {
              id: '1',
              companyName: profileData.applicantDetails.workExperience.companyName,
              position: profileData.applicantDetails.workExperience.position || '',
              fromDate: profileData.applicantDetails.workExperience.fromDate || '',
              toDate: profileData.applicantDetails.workExperience.toDate || '',
              reasonForLeaving: profileData.applicantDetails.workExperience.reasonForLeaving || '',
            },
          ]
        : defaultPersonalInfo.workExperience,
    };

    const contactData: ContactFormData = {
      email: profileData.applicantDetails?.contactInfo?.email || profileData.Email || defaultContactInfo.email,
      mobileNumber: profileData.applicantDetails?.contactInfo?.mobile || profileData.Mobile || defaultContactInfo.mobileNumber,
      alternativeNumber: profileData.applicantDetails?.contactInfo?.alternativeNumber || defaultContactInfo.alternativeNumber,
      streetAddress: profileData.applicantDetails?.contactInfo?.streetAddress || defaultContactInfo.streetAddress,
      city: profileData.applicantDetails?.contactInfo?.city || defaultContactInfo.city,
      province: profileData.applicantDetails?.contactInfo?.provinceId?.toString() || defaultContactInfo.province,
      postalCode: profileData.applicantDetails?.contactInfo?.postalCode || defaultContactInfo.postalCode,
      country: profileData.applicantDetails?.contactInfo?.country || defaultContactInfo.country,
    };

    return { personalData, contactData };
  };

  // Initialize form data with profile slice data
  const { personalData, contactData } = mapProfileDataToForm();

  // Form data states - initialize with profile data
  const [personalFormData, setPersonalFormData] = useState<ProfileFormData>(personalData);
  const [contactFormData, setContactFormData] = useState<ContactFormData>(contactData);

  // Update form data when profile data changes
  useEffect(() => {
    const { personalData: newPersonalData, contactData: newContactData } = mapProfileDataToForm();
    setPersonalFormData(newPersonalData);
    setContactFormData(newContactData);
  }, [profileData]);

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // File upload states
  const [cvFile, setCvFile] = useState<UploadedFile | null>(null);
  const [idDocument, setIdDocument] = useState<UploadedFile | null>(null);
  const [uploadErrors, setUploadErrors] = useState<FileUploadError[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Profile update states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // File input refs
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const idDocumentInputRef = useRef<HTMLInputElement>(null);

  // Mock navigate function
  const navigate = useNavigate();

  // Step navigation logic
  const getNextStep = (currentStep: string): string => {
    const stepOrder = ['personal', 'contact', 'qualifications', 'work-experience', 'documents', 'cv'];
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : 'cv';
  };

  // Form handlers
  const handlePersonalChange = (data: ProfileFormData) => {
    setPersonalFormData(data);
  };

  const handleContactChange = (data: ContactFormData) => {
    setContactFormData(data);
  };

  const handleTitleChange = (value: string) => {
    setPersonalFormData((prev) => ({ ...prev, title: value }));
  };

  const handleDisabilityStatusChange = (value: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      disabilityStatus: value,
      disabilityNature: value === 'No' ? '' : prev.disabilityNature,
    }));
  };

  const handleLanguageAdd = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      language: '',
      speakingProficiency: '',
      readWriteProficiency: '',
    };
    setPersonalFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLanguage],
    }));
  };

  const handleLanguageChange = (id: string, field: 'language' | 'speakingProficiency' | 'readWriteProficiency', value: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    }));
  };

  const handleLanguageRemove = (id: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  // Qualification handlers
  const handleQualificationAdd = () => {
    const newQualification: Qualification = {
      id: Date.now().toString(),
      qualification: '',
      institution: '',
      yearObtained: '',
    };
    setPersonalFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, newQualification],
    }));
  };

  const handleQualificationChange = (id: string, field: 'qualification' | 'institution' | 'yearObtained', value: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.map((qual) => (qual.id === id ? { ...qual, [field]: value } : qual)),
    }));
  };

  const handleQualificationRemove = (id: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((qual) => qual.id !== id),
    }));
  };

  // Work Experience handlers
  const handleWorkExperienceAdd = () => {
    const newWorkExperience: WorkExperience = {
      id: Date.now().toString(),
      companyName: '',
      position: '',
      fromDate: '',
      toDate: '',
      reasonForLeaving: '',
    };
    setPersonalFormData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newWorkExperience],
    }));
  };

  const handleWorkExperienceChange = (id: string, field: keyof WorkExperience, value: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((work) => (work.id === id ? { ...work, [field]: value } : work)),
    }));
  };

  const handleWorkExperienceRemove = (id: string) => {
    setPersonalFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((work) => work.id !== id),
    }));
  };

  // File validation
  const validateFile = (file: File, isCV: boolean = false): FileUploadError | null => {
    const maxSize = isCV ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
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

  // Handle ID document file upload
  const handleIdDocumentUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const error = validateFile(file, false);

    if (error) {
      setUploadErrors([error]);
      return;
    }

    setIsUploading(true);
    setUploadErrors([]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        file: file,
      };

      setIdDocument(uploadedFile);

      if (idDocumentInputRef.current) {
        idDocumentInputRef.current.value = '';
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

  // Delete file handlers
  const handleDeleteCV = () => {
    setCvFile(null);
  };

  const handleDeleteIdDocument = () => {
    setIdDocument(null);
  };

  // Clear errors
  const clearErrors = () => {
    setUploadErrors([]);
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Personal Info:', personalFormData);
    console.log('Contact Info:', contactFormData);
    console.log('CV File:', cvFile);
    console.log('ID Document:', idDocument);

    // Use step navigation logic
    handleStepSave(e);
  };

  const handleStepSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Update profile with current form data
      await handleUpdateProfile();

      const nextStep = getNextStep(activeTab);

      if (activeTab === 'cv') {
        // After CV step, navigate to jobs
        navigate('/jobs');
      } else {
        setActiveTab(nextStep);
      }
    } catch (error) {
      console.error('Error saving step:', error);
      const nextStep = getNextStep(activeTab);
      if (activeTab === 'cv') {
        navigate('/jobs');
      } else {
        setActiveTab(nextStep);
      }
    }
  };

  // Helper function to update profile slice with current step data
  const updateProfileSlice = (stepData: any) => {
    const updatedProfileData = { ...profileData };

    switch (activeTab) {
      case 'personal':
        updatedProfileData.Name = stepData.FirstName || updatedProfileData.Name;
        updatedProfileData.Surname = stepData.LastName || updatedProfileData.Surname;
        updatedProfileData.IdNumber = stepData.IdNumber || updatedProfileData.IdNumber;
        updatedProfileData.Email = stepData.Email || updatedProfileData.Email;

        const currentApplicantDetails = updatedProfileData.applicantDetails || {
          personalInfo: {
            firstName: null,
            lastName: null,
            initial: null,
            idNumber: null,
            age: null,
            dateOfBirth: null,
            passportNumber: null,
            genderId: 0,
            titleId: 0,
            raceId: 0,
            rightToWorkStatusId: 0,
            disabilityStatusId: 0,
          },
          contactInfo: {
            email: null,
            mobile: null,
            alternativeNumber: null,
            streetAddress: null,
            city: null,
            provinceId: 0,
            postalCode: null,
            country: null,
          },
          qualifications: {
            qualificationName: null,
            institution: null,
            yearObtained: 0,
          },
          workExperience: {
            companyName: null,
            position: null,
            fromDate: null,
            toDate: null,
            reasonForLeaving: null,
          },
          documents: {
            cv: null,
            idDocument: null,
            qualificationsDoc: null,
          },
          languages: [],
        };

        const updatedPersonalInfo = {
          ...currentApplicantDetails.personalInfo,
          firstName: stepData.FirstName || currentApplicantDetails.personalInfo.firstName,
          lastName: stepData.LastName || currentApplicantDetails.personalInfo.lastName,
          initial: stepData.Initial || currentApplicantDetails.personalInfo.initial,
          idNumber: stepData.IdNumber || currentApplicantDetails.personalInfo.idNumber,
          age: stepData.Age ? parseInt(stepData.Age) : currentApplicantDetails.personalInfo.age,
          dateOfBirth: stepData.DateOfBirth || currentApplicantDetails.personalInfo.dateOfBirth,
          passportNumber: stepData.PassportNumber || currentApplicantDetails.personalInfo.passportNumber,
          genderId: stepData.GenderId ? parseInt(stepData.GenderId) : currentApplicantDetails.personalInfo.genderId,
          titleId: stepData.TitleId ? parseInt(stepData.TitleId) : currentApplicantDetails.personalInfo.titleId,
          raceId: stepData.RaceId ? parseInt(stepData.RaceId) : currentApplicantDetails.personalInfo.raceId,
          rightToWorkStatusId: stepData.RightToWorkStatusId
            ? parseInt(stepData.RightToWorkStatusId)
            : currentApplicantDetails.personalInfo.rightToWorkStatusId,
          disabilityStatusId: stepData.DisabilityStatusId
            ? parseInt(stepData.DisabilityStatusId)
            : currentApplicantDetails.personalInfo.disabilityStatusId,
        };

        updatedProfileData.applicantDetails = {
          ...currentApplicantDetails,
          personalInfo: updatedPersonalInfo,
        };
        break;

      case 'contact':
        updatedProfileData.Mobile = stepData.Mobile || updatedProfileData.Mobile;

        const currentContactApplicantDetails = updatedProfileData.applicantDetails || {
          personalInfo: {
            firstName: null,
            lastName: null,
            initial: null,
            idNumber: null,
            age: null,
            dateOfBirth: null,
            passportNumber: null,
            genderId: 0,
            titleId: 0,
            raceId: 0,
            rightToWorkStatusId: 0,
            disabilityStatusId: 0,
          },
          contactInfo: {
            email: null,
            mobile: null,
            alternativeNumber: null,
            streetAddress: null,
            city: null,
            provinceId: 0,
            postalCode: null,
            country: null,
          },
          qualifications: {
            qualificationName: null,
            institution: null,
            yearObtained: 0,
          },
          workExperience: {
            companyName: null,
            position: null,
            fromDate: null,
            toDate: null,
            reasonForLeaving: null,
          },
          documents: {
            cv: null,
            idDocument: null,
            qualificationsDoc: null,
          },
          languages: [],
        };

        const updatedContactInfo = {
          ...currentContactApplicantDetails.contactInfo,
          email: stepData.Email || currentContactApplicantDetails.contactInfo.email,
          mobile: stepData.Mobile || currentContactApplicantDetails.contactInfo.mobile,
          alternativeNumber: stepData.AlternativeNumber || currentContactApplicantDetails.contactInfo.alternativeNumber,
          streetAddress: stepData.StreetAddress || currentContactApplicantDetails.contactInfo.streetAddress,
          city: stepData.City || currentContactApplicantDetails.contactInfo.city,
          provinceId: stepData.ProvinceId ? parseInt(stepData.ProvinceId) : currentContactApplicantDetails.contactInfo.provinceId,
          postalCode: stepData.PostalCode || currentContactApplicantDetails.contactInfo.postalCode,
          country: stepData.Country || currentContactApplicantDetails.contactInfo.country,
        };

        updatedProfileData.applicantDetails = {
          ...currentContactApplicantDetails,
          contactInfo: updatedContactInfo,
        };
        break;

      case 'qualifications':
        const currentQualApplicantDetails = updatedProfileData.applicantDetails || {
          personalInfo: {
            firstName: null,
            lastName: null,
            initial: null,
            idNumber: null,
            age: null,
            dateOfBirth: null,
            passportNumber: null,
            genderId: 0,
            titleId: 0,
            raceId: 0,
            rightToWorkStatusId: 0,
            disabilityStatusId: 0,
          },
          contactInfo: {
            email: null,
            mobile: null,
            alternativeNumber: null,
            streetAddress: null,
            city: null,
            provinceId: 0,
            postalCode: null,
            country: null,
          },
          qualifications: {
            qualificationName: null,
            institution: null,
            yearObtained: 0,
          },
          workExperience: {
            companyName: null,
            position: null,
            fromDate: null,
            toDate: null,
            reasonForLeaving: null,
          },
          documents: {
            cv: null,
            idDocument: null,
            qualificationsDoc: null,
          },
          languages: [],
        };

        const updatedQualifications = {
          ...currentQualApplicantDetails.qualifications,
          qualificationName: stepData.QualificationName || currentQualApplicantDetails.qualifications.qualificationName,
          institution: stepData.Institution || currentQualApplicantDetails.qualifications.institution,
          yearObtained: stepData.YearObtained ? parseInt(stepData.YearObtained) : currentQualApplicantDetails.qualifications.yearObtained,
        };

        updatedProfileData.applicantDetails = {
          ...currentQualApplicantDetails,
          qualifications: updatedQualifications,
        };
        break;

      case 'work-experience':
        const currentWorkApplicantDetails = updatedProfileData.applicantDetails || {
          personalInfo: {
            firstName: null,
            lastName: null,
            initial: null,
            idNumber: null,
            age: null,
            dateOfBirth: null,
            passportNumber: null,
            genderId: 0,
            titleId: 0,
            raceId: 0,
            rightToWorkStatusId: 0,
            disabilityStatusId: 0,
          },
          contactInfo: {
            email: null,
            mobile: null,
            alternativeNumber: null,
            streetAddress: null,
            city: null,
            provinceId: 0,
            postalCode: null,
            country: null,
          },
          qualifications: {
            qualificationName: null,
            institution: null,
            yearObtained: 0,
          },
          workExperience: {
            companyName: null,
            position: null,
            fromDate: null,
            toDate: null,
            reasonForLeaving: null,
          },
          documents: {
            cv: null,
            idDocument: null,
            qualificationsDoc: null,
          },
          languages: [],
        };

        const updatedWorkExperience = {
          ...currentWorkApplicantDetails.workExperience,
          companyName: stepData.CompanyName || currentWorkApplicantDetails.workExperience.companyName,
          position: stepData.Position || currentWorkApplicantDetails.workExperience.position,
          fromDate: stepData.FromDate || currentWorkApplicantDetails.workExperience.fromDate,
          toDate: stepData.ToDate || currentWorkApplicantDetails.workExperience.toDate,
          reasonForLeaving: stepData.ReasonForLeaving || currentWorkApplicantDetails.workExperience.reasonForLeaving,
        };

        updatedProfileData.applicantDetails = {
          ...currentWorkApplicantDetails,
          workExperience: updatedWorkExperience,
        };
        break;

      case 'cv':
        const currentCvApplicantDetails = updatedProfileData.applicantDetails || {
          personalInfo: {
            firstName: null,
            lastName: null,
            initial: null,
            idNumber: null,
            age: null,
            dateOfBirth: null,
            passportNumber: null,
            genderId: 0,
            titleId: 0,
            raceId: 0,
            rightToWorkStatusId: 0,
            disabilityStatusId: 0,
          },
          contactInfo: {
            email: null,
            mobile: null,
            alternativeNumber: null,
            streetAddress: null,
            city: null,
            provinceId: 0,
            postalCode: null,
            country: null,
          },
          qualifications: {
            qualificationName: null,
            institution: null,
            yearObtained: 0,
          },
          workExperience: {
            companyName: null,
            position: null,
            fromDate: null,
            toDate: null,
            reasonForLeaving: null,
          },
          documents: {
            cv: null,
            idDocument: null,
            qualificationsDoc: null,
          },
          languages: [],
        };

        const formLanguages = personalFormData.languages || [];
        const updatedLanguages = formLanguages.map((lang) => ({
          language: lang.language,
          proficiencyLevel: lang.speakingProficiency, // Using speaking proficiency as the main one for now
        }));

        const updatedDocuments = {
          ...currentCvApplicantDetails.documents,
          ...(stepData.CVFileName && { cv: stepData.CVFileName }),
        };

        updatedProfileData.applicantDetails = {
          ...currentCvApplicantDetails,
          languages: updatedLanguages,
          documents: updatedDocuments,
        };
        break;
    }

    dispatch(updateProfileDetails(updatedProfileData));
  };

  // Helper function to get current step data with new API structure
  const getCurrentStepData = () => {
    const baseEntity = {
      FirstName: personalFormData.firstName,
      LastName: personalFormData.lastName,
      IdNumber: personalFormData.idNumber,
      Email: contactFormData.email || profileData.Email || '',
      GenderId: personalFormData.gender,
      TitleId: personalFormData.title,
      RaceId: personalFormData.race,
      Age: personalFormData.age,
      DateOfBirth: personalFormData.dateOfBirth,
      Initial: personalFormData.initial,
      PassportNumber: personalFormData.passportNumber,
      RightToWorkStatusId: personalFormData.rightToWork,
      DisabilityStatusId: personalFormData.disabilityStatus,
      Mobile: contactFormData.mobileNumber,
      AlternativeNumber: contactFormData.alternativeNumber,
    };

    const result: any = {
      Entity: baseEntity,
    };

    // Add Language array if we have languages
    if (personalFormData.languages.length > 0) {
      result.Language = personalFormData.languages.map(lang => ({
        LanguageId: lang.language,
        SpeakingProficiencyId: parseInt(lang.speakingProficiency) || 0,
        ReadOrWriteProficiencyId: parseInt(lang.readWriteProficiency) || 0,
      }));
    }

    // Add WorkExperience array if we have work experience
    if (personalFormData.workExperience.length > 0) {
      result.WorkExperience = personalFormData.workExperience.map(work => ({
        CompanyName: work.companyName,
        Position: work.position,
        FromDate: work.fromDate ? new Date(work.fromDate).toISOString() : '',
        ToDate: work.toDate ? new Date(work.toDate).toISOString() : '',
        ReasonForLeaving: work.reasonForLeaving,
      }));
    }

    // Add Qualification array if we have qualifications
    if (personalFormData.qualifications.length > 0) {
      result.Qualification = personalFormData.qualifications.map(qual => ({
        QualificationName: qual.qualification,
        Institution: qual.institution,
        YearObtained: parseInt(qual.yearObtained) || 0,
      }));
    }

    // Add Address array if we have contact info
    if (contactFormData.streetAddress || contactFormData.city) {
      result.Address = [{
        StreetAddress: contactFormData.streetAddress,
        City: contactFormData.city,
        Province: parseInt(contactFormData.province) || 0,
        PostalCode: contactFormData.postalCode,
        Country: contactFormData.country,
      }];
    }

    return result;
  };

  // Validation function for current step
  const validateCurrentStep = () => {
    switch (activeTab) {
      case 'personal':
        return personalFormData.firstName && personalFormData.lastName && personalFormData.idNumber;
      case 'contact':
        return contactFormData.mobileNumber && contactFormData.email;
      case 'qualifications':
        return personalFormData.qualifications.length > 0 && personalFormData.qualifications[0].qualification;
      case 'work-experience':
        return personalFormData.workExperience.length > 0 && personalFormData.workExperience[0].companyName;
      case 'documents':
        // For documents step, we only require at least one document (CV or ID Document)
        return cvFile !== null || idDocument !== null;
      case 'cv':
        // For CV step, we only require at least one document (CV or ID Document)
        return cvFile !== null || idDocument !== null;
      default:
        return true;
    }
  };

  // Update profile function - only saves current step data
  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const isValid = validateCurrentStep();
      console.log(`Validation for ${activeTab} step:`, isValid);
      console.log('CV File:', cvFile);
      console.log('ID Document:', idDocument);
      
      if (!isValid) {
        setError(`Please fill in all required fields for the ${activeTab} step`);
        showErrorToast(`Please fill in all required fields for the ${activeTab} step`);
        return;
      }

      let currentStepData = getCurrentStepData();
      let documentsArray: any[] = [];

      // Prepare documents array for documents and CV steps
      if (activeTab === 'documents' || activeTab === 'cv') {
        if (cvFile) {
          const cvFileContent = await fileToBase64(cvFile.file);
          documentsArray.push({
            DocLibId: null,
            DocumentType: 1248, // CV Document Type
            Name: cvFile.name,
            FileExtension: cvFile.name.split('.').pop()?.toLowerCase() || 'pdf',
            VersionNumber: '1.0.0',
            FileContent: cvFileContent,
          });
        }

        if (idDocument) {
          const idFileContent = await fileToBase64(idDocument.file);
          documentsArray.push({
            DocLibId: null,
            DocumentType: 1249, // ID Document Type
            Name: idDocument.name,
            FileExtension: idDocument.name.split('.').pop()?.toLowerCase() || 'pdf',
            VersionNumber: '1.0.0',
            FileContent: idFileContent,
          });
        }
      }

      // Add Documents array to the inputParamters
      if (documentsArray.length > 0) {
        currentStepData.Documents = documentsArray;
      }

      const updatePayload = {
        body: {
          entityName: 'Applicant',
          requestName: 'UpsertRegEricruit',
          recordId: authData.user.relatedObjectId,
          inputParamters: currentStepData,
        },
      };

      console.log(`Update Profile Payload for ${activeTab} step:`, updatePayload);
      console.log('About to make API call...');

      const response = await updateProfile(updatePayload).unwrap();
      console.log(`Profile updated successfully for ${activeTab} step:`, response);

      updateProfileSlice(currentStepData);

      showSuccessToast('profile updated successfully.');
    } catch (err) {
      setError(`Failed to update ${activeTab} step`);
      showErrorToast('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfo
            formData={personalFormData}
            onFormDataChange={handlePersonalChange}
            onTitleChange={handleTitleChange}
            onDisabilityStatusChange={handleDisabilityStatusChange}
            onLanguageAdd={handleLanguageAdd}
            onLanguageChange={handleLanguageChange}
            onLanguageRemove={handleLanguageRemove}
            getOptionsForSchema={getOptionsForSchema}
            onSubmit={handleSubmit}
            isLoading={isLoading || updateProps.isLoading}
          />
        );
      case 'contact':
        return (
          <ContactInfo
            formData={contactFormData}
            onFormDataChange={handleContactChange}
            getOptionsForSchema={getOptionsForSchema}
            onSubmit={handleSubmit}
            isLoading={isLoading || updateProps.isLoading}
          />
        );
      case 'qualifications':
        return (
          <Qualifications
            qualifications={personalFormData.qualifications}
            onQualificationAdd={handleQualificationAdd}
            onQualificationChange={handleQualificationChange}
            onQualificationRemove={handleQualificationRemove}
            getOptionsForSchema={getOptionsForSchema}
            onSubmit={handleSubmit}
            isLoading={isLoading || updateProps.isLoading}
          />
        );
      case 'work-experience':
        return (
          <WorkExperienceComponent
            workExperience={personalFormData.workExperience}
            onWorkExperienceAdd={handleWorkExperienceAdd}
            onWorkExperienceChange={handleWorkExperienceChange}
            onWorkExperienceRemove={handleWorkExperienceRemove}
            onSubmit={handleSubmit}
            isLoading={isLoading || updateProps.isLoading}
          />
        );
      case 'documents':
        return (
          <CVManagement
            cvFile={cvFile}
            idDocument={idDocument}
            isUploading={isUploading}
            onCvFileUpload={handleCvFileUpload}
            onIdDocumentUpload={handleIdDocumentUpload}
            onDeleteCV={handleDeleteCV}
            onDeleteIdDocument={handleDeleteIdDocument}
            onSubmit={handleSubmit}
            isLoading={isLoading || updateProps.isLoading}
          />
        );
      case 'cv':
        return (
          <CVManagement
            cvFile={cvFile}
            idDocument={idDocument}
            isUploading={isUploading}
            onCvFileUpload={handleCvFileUpload}
            onIdDocumentUpload={handleIdDocumentUpload}
            onDeleteCV={handleDeleteCV}
            onDeleteIdDocument={handleDeleteIdDocument}
            onSubmit={handleSubmit}
            isLoading={isLoading || updateProps.isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7]">
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
          <ProgressSteps currentStep={activeTab} />
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

        {/* Profile Update Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Profile Update Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex bg-white rounded-xl flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Form */}
          <div className="flex-1 mb-20 rounded-lg">{renderCurrentTab()}</div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfileLayout;
