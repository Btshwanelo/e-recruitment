// formStepsConfig.js - Configuration for form steps
import PersonalInformation from '../indivisual/PersonalInformation';
import ContactInformation from '../indivisual/ContactInformation';
import IdentificationStep from './indivisual/Indetification';

// Define your form steps
export const formSteps = [
  {
    id: 'personalInformation',
    tabLabel: 'Personal Information',
    title: 'Personal Information',
    contentTitle: 'Personal Information',
    component: PersonalInformation,
    apiEndpoint: '/api/application/personal-info',
    validate: (data) => {
      const errors = {};
      const required = ['title', 'firstName', 'surname', 'nationality'];

      required.forEach((field) => {
        if (!data[field]) {
          errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        }
      });

      return {
        valid: Object.keys(errors).length === 0,
        errors,
      };
    },
  },
  {
    id: 'contactInformation',
    tabLabel: 'Contact Information',
    title: 'Contact Information',
    contentTitle: 'Contact Information',
    component: ContactInformation,
    apiEndpoint: '/api/application/contact-info',
    validate: (data) => {
      const errors = {};

      if (!data.postalCode) {
        errors.postalCode = 'Postal code is required';
      }

      if (!data.cellNumber) {
        errors.cellNumber = 'Cell number is required';
      }

      if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          errors.email = 'Please enter a valid email address';
        }
      } else {
        errors.email = 'Email address is required';
      }

      return {
        valid: Object.keys(errors).length === 0,
        errors,
      };
    },
  },
  {
    id: 'identification',
    tabLabel: 'Identification',
    title: 'Identification',
    contentTitle: 'Identification Details',
    component: IdentificationStep,
    apiEndpoint: '/api/application/identification',
    validate: (data) => {
      const errors = {};
      const required = ['martialStatus', 'dateOfBirth', 'gender'];

      required.forEach((field) => {
        if (!data[field]) {
          errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        }
      });

      return {
        valid: Object.keys(errors).length === 0,
        errors,
      };
    },
  },
  {
    id: 'financial',
    tabLabel: 'Financial History',
    title: 'Financial History',
    contentTitle: 'Financial History Details',
    component: () => null, // Placeholder component
    apiEndpoint: '/api/application/financial',
  },
  {
    id: 'assets',
    tabLabel: 'Assets',
    title: 'Assets',
    contentTitle: 'Asset Details',
    component: () => null, // Placeholder component
    apiEndpoint: '/api/application/assets',
  },
  {
    id: 'income',
    tabLabel: 'Income Details',
    title: 'Income Details',
    contentTitle: 'Income Information',
    component: () => null, // Placeholder component
    apiEndpoint: '/api/application/income',
  },
  {
    id: 'offer',
    tabLabel: 'Loan Offer',
    title: 'Loan Offer',
    contentTitle: 'Loan Offer Details',
    component: () => null, // Placeholder component
    apiEndpoint: '/api/application/offer',
  },
  {
    id: 'selfie',
    tabLabel: 'Selfie Verification',
    title: 'Selfie Verification',
    contentTitle: 'Identity Verification',
    component: () => null, // Placeholder component
    apiEndpoint: '/api/application/selfie',
  },
];

// Field configurations for each step
export const personalInfoFields = [
  {
    name: 'title',
    label: 'Title',
    type: 'select',
    options: [
      { value: 'Mr', label: 'Mr' },
      { value: 'Mrs', label: 'Mrs' },
      { value: 'Ms', label: 'Ms' },
      { value: 'Dr', label: 'Dr' },
    ],
    required: true,
  },
  {
    name: 'firstName',
    label: 'First Name',
    required: true,
  },
  {
    name: 'surname',
    label: 'Surname',
    required: true,
  },
  {
    name: 'nationality',
    label: 'Nationality',
    type: 'select',
    options: [
      { value: 'South African', label: 'South African' },
      { value: 'Other', label: 'Other' },
    ],
    required: true,
  },
];

export const contactInfoFields = [
  {
    name: 'postalCode',
    label: 'Postal Code',
    required: true,
  },
  {
    name: 'cellNumber',
    label: 'Cell Number',
    type: 'tel',
    required: true,
  },
  {
    name: 'telNumber',
    label: 'Tel Number',
    type: 'tel',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
  },
];

export const identificationFields = [
  {
    name: 'martialStatus',
    label: 'Marital Status',
    type: 'select',
    options: [
      { value: 'Single', label: 'Single' },
      { value: 'Married', label: 'Married' },
      { value: 'Divorced', label: 'Divorced' },
      { value: 'Widowed', label: 'Widowed' },
    ],
    required: true,
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    required: true,
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    disabled: true, // Auto-calculated field
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
    required: true,
  },
  {
    name: 'race',
    label: 'Race',
    type: 'select',
    options: [
      { value: 'Black', label: 'Black' },
      { value: 'White', label: 'White' },
      { value: 'Indian', label: 'Indian' },
      { value: 'Coloured', label: 'Coloured' },
      { value: 'Asian', label: 'Asian' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    name: 'criminalRecord',
    label: 'Criminal Record',
    type: 'select',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
  },
];
