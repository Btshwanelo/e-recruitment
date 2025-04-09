import React, { useState, useEffect } from 'react';
import { X, Plus, ArrowRight, HelpCircle, PlusCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ApplicationLayout from '@/Layouts/ApplicationLayout';
import { useNavigate } from 'react-router-dom';
import { useCreateUserProfileReqMutation } from '@/service/debtorAccountService';
import useAuth from '@/hooks/useAuth';
import LoadingScreenExact from '../LoadingScreen';
import { useRetrieveCurrentUserMutation } from '@/service/genericServices';
import { updateProfileDetails } from '@/slices/detailsSlice';
import { useDispatch } from 'react-redux';

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();

  // Form states
  const [applicationType, setApplicationType] = useState('individual');
  const [formData, setFormData] = useState({
    idNumber: '',
    name: '',
    surname: '',
  });
  const [consents, setConsents] = useState({
    academic: false,
    credit: false,
    notBlacklisted: false,
  });

  // Validation states
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // API hook
  const [createUserProfile, { isLoading, isSuccess, isError, error: apiErrorData }] = useCreateUserProfileReqMutation();
  const [RetrieveCurrentUser, retriveProps] = useRetrieveCurrentUserMutation();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Clear API error when user makes any change
    if (apiError) {
      setApiError('');
    }
  };

  // Handle consent checkboxes
  const handleConsent = (field) => {
    setConsents((prev) => ({ ...prev, [field]: !prev[field] }));

    // Clear API error when user makes any change
    if (apiError) {
      setApiError('');
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // ID Number validation
    if (!formData.idNumber) {
      newErrors.idNumber = 'ID number is required';
    } else if (!/^\d{13}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'ID number must be 13 digits';
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Surname validation
    if (!formData.surname) {
      newErrors.surname = 'Surname is required';
    } else if (formData.surname.length < 2) {
      newErrors.surname = 'Surname must be at least 2 characters';
    }

    // Consent validation
    if (!consents.academic || !consents.credit || !consents.notBlacklisted) {
      newErrors.consents = 'All consents are required to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleNext = async () => {
    // First validate the form
    if (!validateForm()) {
      return;
    }
    console.log({
      entityName: 'DebtorAccount',
      requestName: 'CreateUserProfile',
      inputParamters: {
        Profile: {
          ExternalLogonId: auth.user?.externalLogonId,
          UserType: applicationType === 'individual' ? 'Individual' : 'Business',
          RsaId: formData.idNumber,
          Name: formData.name,
          Surname: formData.surname,
        },
      },
    });
    try {
      // Call the API
      await createUserProfile({
        body: {
          entityName: 'DebtorAccount',
          requestName: 'CreateUserProfile',
          inputParamters: {
            Profile: {
              ExternalLogonId: auth.user?.externalLogonId,
              UserType: applicationType === 'individual' ? 'Individual' : 'Business',
              RsaId: formData.idNumber,
              Name: formData.name,
              Surname: formData.surname,
            },
          },
        },
      }).unwrap();

      // Success handled in useEffect
    } catch (err) {
      // Error handled in useEffect
    }
  };

  // Handle API response
  useEffect(() => {
    // Handle error
    if (isError && apiErrorData) {
      setApiError(apiErrorData.data || 'Failed to create profile. Please try again.');
    }

    // Handle success
    if (isSuccess) {
      //   navigate('/dashboard');
      RetrieveCurrentUser({
        body: {
          requestName: 'RetrieveCurrentUser',
          inputParamters: { ExternalLogonId: auth.user.externalLogonId },
        },
      });
    }
  }, [isSuccess, isError, apiErrorData, navigate]);

  useEffect(() => {
    if (retriveProps.isSuccess) {
      console.log('props', retriveProps.data);

      dispatch(updateProfileDetails(retriveProps.data));
      navigate('/dashboard');
    }
  }, [retriveProps.isSuccess]);

  // Check if all required fields and consents are filled/checked
  const isFormValid =
    formData.idNumber && formData.name && formData.surname && consents.academic && consents.credit && consents.notBlacklisted;

  // Show loading screen when API call is in progress
  //   if (isLoading) {
  //     return <LoadingScreenExact />;
  //   }

  return (
    <ApplicationLayout>
      {/* Main Content */}
      <main className="flex-grow flex flex-col pt-4 pb-24 px-4 md:px-8">
        {/* Application Container */}
        <div className="mx-auto w-full max-w-5xl flex flex-col flex-grow">
          {/* Top Section */}
          <div className="bg-white rounded-lg p-4 md:p-6 mb-4 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Get started with your profile</h1>
              <Button
                variant="outline"
                className="text-[#58B6E9] border-[#58B6E9] hover:bg-blue-50 w-full md:w-auto"
                onClick={() => navigate('/dashboard')}
              >
                Save & Exit
              </Button>
            </div>

            {/* Collapsible Information Panel */}
            <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
              <h2 className="text-sm md:text-base text-gray-700">Important Information About Our Integrated Verification Process</h2>
              <button className="text-gray-400 flex-shrink-0">
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          {/* Form Section */}
          <div className="bg-white rounded-lg p-4 md:p-6 mb-4 shadow-sm">
            {/* Application Type Toggle */}
            <div className="flex mb-6 max-w-2xl">
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-center border-2 ${
                  applicationType === 'individual'
                    ? 'bg-white border-primary text-gray-800 font-medium'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                } rounded-l-md transition-colors`}
                onClick={() => setApplicationType('individual')}
              >
                Individual
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-center border-2 ${
                  applicationType === 'business'
                    ? 'bg-white border-primary text-gray-800 font-medium'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                } rounded-r-md transition-colors`}
                onClick={() => setApplicationType('business')}
              >
                Business / Entity
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6 max-w-2xl">
              {/* ID Number Field */}
              <div>
                <div className="flex items-center mb-1">
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                    ID Number
                  </label>
                  <span className="text-red-500 ml-1">*</span>
                  <button type="button" className="ml-2 text-gray-400">
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </div>
                <Input
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className={`w-full ${errors.idNumber ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your ID number"
                />
                {errors.idNumber && <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>}
              </div>

              {/* Name Field */}
              <div>
                <div className="flex items-center mb-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Surname Field */}
              <div>
                <div className="flex items-center mb-1">
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                    Surname
                  </label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Input
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className={`w-full ${errors.surname ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your surname"
                />
                {errors.surname && <p className="mt-1 text-sm text-red-600">{errors.surname}</p>}
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-3 mt-4">
                <div className="flex items-start">
                  <Checkbox
                    id="academicConsent"
                    checked={consents.academic}
                    onCheckedChange={() => handleConsent('academic')}
                    className="mt-1"
                  />
                  <label htmlFor="academicConsent" className="ml-2 text-sm text-gray-700">
                    I consent to having my academic record queried for this application
                  </label>
                </div>

                <div className="flex items-start">
                  <Checkbox id="creditConsent" checked={consents.credit} onCheckedChange={() => handleConsent('credit')} className="mt-1" />
                  <label htmlFor="creditConsent" className="ml-2 text-sm text-gray-700">
                    I consent to having my credit record queried for this application
                  </label>
                </div>

                <div className="flex items-start">
                  <Checkbox
                    id="blacklistConsent"
                    checked={consents.notBlacklisted}
                    onCheckedChange={() => handleConsent('notBlacklisted')}
                    className="mt-1"
                  />
                  <label htmlFor="blacklistConsent" className="ml-2 text-sm text-gray-700">
                    I'm not blacklisted or sequestrated or under debt review
                  </label>
                </div>

                {errors.consents && <p className="mt-1 text-sm text-red-600">{errors.consents}</p>}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white rounded-lg p-4 md:p-6 mb-2 shadow-sm">
            <div className="flex justify-start">
              <Button
                type="button"
                onClick={handleNext}
                className={`flex items-center text-white w-40 px-4 md:px-6 py-3 md:py-5 ${
                  isFormValid ? 'bg-[#58B6E9] hover:bg-blue-400' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                } transition-colors`}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? 'Processing...' : 'Next'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </ApplicationLayout>
  );
};

export default CreateProfilePage;
