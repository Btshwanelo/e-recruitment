import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import {
  useExternalRequestMutation,
  useExecuteRequest2Mutation,
  useExecuteRequest3Mutation,
  useExecuteRequest5Mutation,
} from '@/slices/services';
import { setAuthData } from '@/slices/authSlice';
import { updateProfileDetails } from '@/slices/detailsSlice';
import { RootState } from '@/store';
import OTPModal from '@/components/OTPModal';
import { showErrorToast } from '@/components/ErrorToast ';
import { showSuccessToast } from '@/components/SuccessToast';

// Validation schemas
const signupValidationSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  idNumber: Yup.string().min(13, 'ID number must be at least 13 digits').required('ID number is required'),
  phone: Yup.string().required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AuthPageV2 = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectPath = useSelector((state: RootState) => state.auth.redirectPath);

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const [userLogin] = useExternalRequestMutation();
  const [registerUser] = useExecuteRequest3Mutation();
  const [retrieveCurrentUser] = useExecuteRequest2Mutation();

  const [supplierGeneratOTPExecuteRequest, { isLoading: isLoadingOTP }] = useExecuteRequest3Mutation();
  const [supplierConfirmOTPExecuteRequest, { isLoading: isLoadingConfirm, isError: isErrorConfirmOTP, error: errorConfirmOTP }] =
    useExecuteRequest5Mutation();

  // API error states
  const [apiErrors, setApiErrors] = useState<{
    signup?: string;
    auth?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Handle login
  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    setApiErrors({});

    try {
      const loginResponse = await userLogin({
        body: {
          username: values.email,
          password: values.password,
        },
      }).unwrap();

      // Save auth data to Redux store
      dispatch(
        setAuthData({
          accessToken: loginResponse.accessToken,
          refreshToken: loginResponse.refreshToken,
          expiresIn: loginResponse.expiresIn,
          user: loginResponse.user,
        })
      );

      // Retrieve current user profile
      const profileResponse = await retrieveCurrentUser({
        body: {
          requestName: 'RetrieveCurrentUser',
          inputParamters: {
            externalLogonId: loginResponse.user.externalLogonId,
          },
        },
      }).unwrap();

      // Save profile data to Redux store
      console.log('Profile Response:', profileResponse);
      console.log('Profile Response Status:', profileResponse.results?.StatusCode);
      console.log('Profile Response Output:', profileResponse);

      if (profileResponse.results?.StatusCode === 200) {
        // Handle both old and new response structures
        const response = profileResponse?.response || profileResponse;

        if (response) {
          dispatch(
            updateProfileDetails({
              UserType: null, // Not provided in API response
              Name: response.Name,
              Surname: response.Surname,
              Email: response.Email,
              IdNumber: response.IdNumber,
              Mobile: response.Mobile,
              ProfileSteps: response.ProfileSteps?.toString() || null,
              isProfileComplete: response.isProfileComplete,
              currentProfileStep: response.ProfileSteps,
              currentStepDescription: response.currentStepDescription,
              completionPercentage: response.completionPercentage,
              progressSteps: response.progressSteps || [],
              applicantDetails: response.applicantDetails || {
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
                languages: {
                  language: null,
                  proficiencyLevel: null,
                },
              },
            })
          );

          // Navigate based on profile completion status
          if (response.isProfileComplete) {
            navigate(redirectPath);
          } else {
            navigate('/profile');
          }
        } else {
          // Fallback navigation if response structure doesn't match
          console.log('Profile response structure mismatch, using fallback navigation');
          navigate('/profile');
        }
      } else {
        // Fallback navigation if status code is not 200
        console.log('Profile response status not 200, using fallback navigation');
        navigate('/profile');
      }
    } catch (error) {
      setApiErrors({ auth: 'Login failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOTP = async (email: string) => {
    try {
      await supplierGeneratOTPExecuteRequest({
        body: {
          requestName: 'GenerateOTP',
          inputParamters: {
            OTPInformation: {
              email: email,
            },
          },
        },
      }).unwrap();
      setPendingEmail(email);
      setOtpModalOpen(true);
      showSuccessToast('OTP sent to your email');
    } catch (error) {
      showErrorToast('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    if (!otp) {
      showErrorToast('Please enter OTP');
      return;
    }

    try {
      await supplierConfirmOTPExecuteRequest({
        body: {
          requestName: 'ConfirmOTP',
          inputParamters: {
            OTPInformation: {
              OTPNo: otp,
              email: pendingEmail,
            },
          },
        },
      }).unwrap();
      setOtpModalOpen(false);
      setEmailVerified(true);
      showSuccessToast('Email verified successfully');
    } catch (error) {
      console.log('error : confirm OTP');
      showErrorToast('Invalid OTP. Please try again.');
    }
  };

  // Handle signup
  const handleSignup = async (values: {
    email: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    phone: string;
    password: string;
  }) => {
    if (!emailVerified) {
      showErrorToast('Please verify your email before proceeding');
      return;
    }

    setIsLoading(true);
    setApiErrors({});

    try {
      // Step 1: Register user
      await registerUser({
        body: {
          entityName: 'Applicant',
          requestName: 'CreateExternalLogon',
          inputParamters: {
            account: {
              FirstName: values.firstName,
              LastName: values.lastName,
              Password: values.password,
              Mobile: values.phone,
              Email: values.email,
              RsaId: values.idNumber,
            },
          },
        },
      }).unwrap();

      // Step 2: Automatically login the user after successful registration
      const loginResponse = await userLogin({
        body: {
          username: values.email,
          password: values.password,
        },
      }).unwrap();

      // Step 3: Save auth data to Redux store
      dispatch(
        setAuthData({
          accessToken: loginResponse.accessToken,
          refreshToken: loginResponse.refreshToken,
          expiresIn: loginResponse.expiresIn,
          user: loginResponse.user,
        })
      );

      // Step 4: Retrieve current user profile
      const profileResponse = await retrieveCurrentUser({
        body: {
          requestName: 'RetrieveCurrentUser',
          inputParamters: {
            externalLogonId: loginResponse.user.externalLogonId,
          },
        },
      }).unwrap();

      if (profileResponse.results?.StatusCode === 200) {
        // Handle both old and new response structures
        const response = profileResponse?.response || profileResponse;

        if (response) {
          dispatch(
            updateProfileDetails({
              UserType: null, // Not provided in API response
              Name: response.Name,
              Surname: response.Surname,
              Email: response.Email,
              IdNumber: response.IdNumber,
              Mobile: response.Mobile,
              ProfileSteps: response.ProfileSteps?.toString() || null,
              isProfileComplete: response.isProfileComplete,
              currentProfileStep: response.ProfileSteps,
              currentStepDescription: response.currentStepDescription,
              completionPercentage: response.completionPercentage,
              progressSteps: response.progressSteps || [],
              applicantDetails: response.applicantDetails || {
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
                languages: {
                  language: null,
                  proficiencyLevel: null,
                },
              },
            })
          );

          // Step 6: Navigate based on profile completion status
          if (response.isProfileComplete) {
            navigate(redirectPath);
          } else {
            navigate('/profile');
          }
        } else {
          // Fallback navigation if response structure doesn't match
          console.log('Signup profile response structure mismatch, using fallback navigation');
          navigate('/profile');
        }
      } else {
        // Fallback navigation if status code is not 200
        console.log('Signup profile response status not 200, using fallback navigation');
        navigate('/profile');
      }
    } catch (error) {
      setApiErrors({ signup: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear errors when switching tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setApiErrors({});
    setEmailVerified(false);
    setPendingEmail('');
  };

  // Reset verification when email changes
  const handleEmailChange = (email: string) => {
    if (email !== pendingEmail) {
      setEmailVerified(false);
      setPendingEmail('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Logo */}
      <div className="mb-2">
        <img src="/dcs-logo.png" alt="RHS Services Logo" className="h-20" />
      </div>

      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            {activeTab === 'signup' ? 'Create Your Account' : 'Sign In to Your Account'}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex mb-8">
          <button
            className={`flex-1 py-2 text-center border-2 ${
              activeTab === 'signup' ? 'bg-white border-primary text-gray-800 font-medium' : 'bg-gray-50 border-gray-200 text-gray-500'
            } rounded-l-md transition-colors`}
            onClick={() => handleTabChange('signup')}
            type="button"
          >
            Sign up
          </button>
          <button
            className={`flex-1 py-2 text-center border-2 ${
              activeTab === 'login' ? 'bg-white border-primary text-gray-800 font-medium' : 'bg-gray-50 border-gray-200 text-gray-500'
            } rounded-r-md transition-colors`}
            onClick={() => handleTabChange('login')}
            type="button"
          >
            Log in
          </button>
        </div>

        {/* API Error messages */}
        {apiErrors.signup && (
          <div className="p-3 mb-4 text-sm rounded bg-red-100 text-red-700 flex items-center">
            <AlertCircle size={16} className="mr-2" /> {apiErrors.signup}
          </div>
        )}

        {apiErrors.auth && (
          <div className="p-3 mb-4 text-sm rounded bg-red-100 text-red-700 flex items-center">
            <AlertCircle size={16} className="mr-2" /> {apiErrors.auth}
          </div>
        )}

        {/* Form */}
        {activeTab === 'signup' ? (
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              idNumber: '',
              phone: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignup}
          >
            {({ values, errors, touched }) => {
              // Password validation checks for visual indicators
              const hasMinLength = values.password.length >= 8;
              const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(values.password);
              const passwordsMatch = values.password === values.confirmPassword;

              return (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Field name="email">
                      {({ field }: any) => (
                        <div className="flex gap-2">
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`flex-1 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                            onChange={(e: any) => {
                              field.onChange(e);
                              handleEmailChange(e.target.value);
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              if (field.value && !errors.email) {
                                handleRequestOTP(field.value);
                              } else {
                                showErrorToast('Please enter a valid email first');
                              }
                            }}
                            disabled={!field.value || !!errors.email || isLoadingOTP}
                            className="px-4 py-2 bg-[#005f33] text-white text-sm font-medium disabled:bg-gray-400"
                          >
                            {isLoadingOTP ? 'Sending...' : emailVerified ? 'Verified ✓' : 'Verify'}
                          </Button>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
                    {emailVerified && (
                      <p className="mt-1 text-sm text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Email verified successfully
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Field name="firstName">
                        {({ field }: any) => (
                          <Input
                            {...field}
                            id="firstName"
                            type="text"
                            placeholder="Enter first name"
                            disabled={!emailVerified}
                            className={`w-full ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'} ${!emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="firstName" component="p" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Field name="lastName">
                        {({ field }: any) => (
                          <Input
                            {...field}
                            id="lastName"
                            type="text"
                            placeholder="Enter last name"
                            disabled={!emailVerified}
                            className={`w-full ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'} ${!emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="lastName" component="p" className="mt-1 text-sm text-red-600" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      ID Number <span className="text-red-500">*</span>
                    </label>
                    <Field name="idNumber">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          id="idNumber"
                          type="text"
                          placeholder="Enter your ID number"
                          disabled={!emailVerified}
                          className={`w-full ${errors.idNumber && touched.idNumber ? 'border-red-500' : 'border-gray-300'} ${!emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="idNumber" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Cellphone Number <span className="text-red-500">*</span>
                    </label>
                    <Field name="phone">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          id="phone"
                          type="tel"
                          placeholder="Enter your cellphone number"
                          disabled={!emailVerified}
                          className={`w-full ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'} ${!emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <Field name="password">
                      {({ field }: any) => (
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
                            disabled={!emailVerified}
                            className={`w-full pr-10 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} ${!emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={!emailVerified}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                          </button>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <Field name="confirmPassword">
                      {({ field }: any) => (
                        <div className="relative">
                          <Input
                            {...field}
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            disabled={!emailVerified}
                            className={`w-full pr-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} ${!emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={!emailVerified}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                          </button>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Password requirements */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle
                        className={`mr-2 h-5 w-5 ${hasMinLength ? 'text-green-500' : 'text-gray-300'}`}
                        fill={hasMinLength ? 'rgba(34, 197, 94, 0.2)' : 'none'}
                      />
                      <span className="text-gray-600">Must be at least 8 characters</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle
                        className={`mr-2 h-5 w-5 ${hasSpecialChar ? 'text-green-500' : 'text-gray-300'}`}
                        fill={hasSpecialChar ? 'rgba(34, 197, 94, 0.2)' : 'none'}
                      />
                      <span className="text-gray-600">Must contain one special character</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle
                        className={`mr-2 h-5 w-5 ${passwordsMatch ? 'text-green-500' : 'text-gray-300'}`}
                        fill={passwordsMatch ? 'rgba(34, 197, 94, 0.2)' : 'none'}
                      />
                      <span className="text-gray-600">Passwords must match</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-6 bg-[#005f33] font-semibold text-white disabled:bg-gray-400"
                    disabled={isLoading || !emailVerified}
                  >
                    {isLoading ? 'Creating account...' : !emailVerified ? 'Verify email to continue' : 'Get started'}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field name="email">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        id="loginEmail"
                        type="email"
                        placeholder="Enter your email"
                        className={`w-full ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Field name="password">
                    {({ field }: any) => (
                      <div className="relative">
                        <Input
                          {...field}
                          id="loginPassword"
                          type={showLoginPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className={`w-full pr-10 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                    )}
                  </Field>
                  <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
                  <p className="mt-1 text-xs text-gray-500">Try test@example.com / Password123!</p>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-[#005f33] hover:text-[#004d2a] font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full py-6 bg-[#005f33] font-semibold text-white" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {activeTab === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              className="text-[#005f33] font-medium"
              onClick={() => handleTabChange(activeTab === 'signup' ? 'login' : 'signup')}
            >
              {activeTab === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>

        {/* Log a Case Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Need help or have a query?</p>
            <button
              type="button"
              onClick={() => navigate('/cases')}
              className="inline-flex items-center px-4 py-2 border border-[#005f33] text-sm font-medium rounded-md text-[#005f33] bg-white hover:bg-[#005f33] hover:text-white transition-colors duration-200"
            >
              Log a Case
            </button>
          </div>
        </div>
      </div>

      {otpModalOpen && (
        <OTPModal
          isOpen={otpModalOpen}
          onClose={() => setOtpModalOpen(false)}
          onConfirm={handleVerifyOTP}
          onNewOtp={handleRequestOTP}
          length={4}
          isLoading={isLoadingOTP}
          isLoadingSubmit={isLoadingConfirm}
          isError={isErrorConfirmOTP}
          errorMessage={errorConfirmOTP?.data || 'Incorrect OTP'}
          data-testid="signup-otp-modal"
          title="please check your phone"
          description={`We've sent a code to your phone number`}
        />
      )}
    </div>
  );
};

export default AuthPageV2;
