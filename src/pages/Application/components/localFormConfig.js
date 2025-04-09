import PersonalInformation from '../components/Indivisual/PersonalInformation';
import ContactInformation from '../components/Indivisual/ContactInformation';
import Identification from '../components/Indivisual/Identification';
import AssetInformation from '../components/Indivisual/AssetInformation';
import FinancialInformation from '../components/Indivisual/FinancialInformation';
import IncomeInformation from '../components/Indivisual/IncomeInformation';
import ProfessionalQualifications from '../components/Indivisual/ProfessionalQualifications';
import Documents from '../components/Indivisual/Documents';
import Verify from '../components/Indivisual/Verify';
import Offer from '../components/Indivisual/Offer';
import DebitOrder from '../components/Indivisual/DebitOrder';

// Define your form steps
export const LocalFormSteps = [
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

      if (!data.address) {
        errors.address = 'Address is required';
      }

      if (!data.mobile) {
        errors.mobile = 'Mobile number is required';
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
    contentTitle: 'Identification',
    component: Identification,
    apiEndpoint: '/api/application/identification',
    validate: (data) => {
      const errors = {};
      const required = ['maritalStatus', 'dateOfBirth', 'gender'];

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
    id: 'professionalQualification',
    tabLabel: 'Professional Qualification',
    title: 'Professional Qualification',
    contentTitle: 'Professional Qualification',
    component: ProfessionalQualifications,
    apiEndpoint: '/api/application/qualification',
    validate: (data) => {
      const errors = {};
      const required = ['qualificationType', 'qualificationStatus'];

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
    id: 'financialInformation',
    tabLabel: 'Financial Information',
    title: 'Financial Information',
    contentTitle: 'Financial Information',
    component: FinancialInformation,
    apiEndpoint: '/api/application/financial',
    validate: (data) => {
      const errors = {};
      const required = ['totalCreditCards', 'totalLoans', 'vehicleFinance', 'others'];

      required.forEach((field) => {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
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
    id: 'assetInformation',
    tabLabel: 'Asset Information',
    title: 'Asset Information',
    contentTitle: 'Asset Information',
    component: AssetInformation,
    apiEndpoint: '/api/application/assets',
    validate: (data) => {
      const errors = {};
      const required = ['assetType', 'assetCatergory'];

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
    id: 'incomeInformation',
    tabLabel: 'Income Information',
    title: 'Income Information',
    contentTitle: 'Income Information',
    component: IncomeInformation,
    apiEndpoint: '/api/application/income',
    validate: (data) => {
      const errors = {};
      
      if (data.salary === undefined || data.salary === null || data.salary === '' || data.salary <= 0) {
        errors.salary = 'Monthly Salary is required and must be greater than 0';
      }

      return {
        valid: Object.keys(errors).length === 0,
        errors,
      };
    },
  },
  {
    id: 'documents',
    tabLabel: 'Documents',
    title: 'Required Documents',
    contentTitle: 'Upload Required Documents',
    component: Documents,
    apiEndpoint: '/api/application/documents',
    validate: (data) => {
      const errors = {};
      const required = ['latestPayslip', 'idDocument', 'proofOfBank'];

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
    id: 'verify',
    tabLabel: 'Verify Identity',
    title: 'Identity Verification',
    contentTitle: 'Verify Your Identity',
    component: Verify,
    apiEndpoint: '/api/application/verify',
    validate: (data) => {
      const errors = {};
      
      if (!data.selfie) {
        errors.selfie = 'Selfie is required for identity verification';
      }
      
      if (!data.isverified) {
        errors.isverified = 'Identity verification is required to proceed';
      }

      return {
        valid: Object.keys(errors).length === 0,
        errors,
      };
    },
  },
  {
    id: 'offer',
    tabLabel: 'Loan Offer',
    title: 'Loan Offer',
    contentTitle: 'Your Loan Offer',
    component: Offer,
    apiEndpoint: '/api/application/offer',
    readOnly: true,
  },
  {
    id: 'debutOrder',
    tabLabel: 'Debit Order',
    title: 'Debit Order Authorization',
    contentTitle: 'Set Up Automatic Payments',
    component: DebitOrder,
    apiEndpoint: '/api/application/debit-order',
    validate: (data) => {
      const errors = {};
      const required = ['bank', 'accountType', 'accountNo', 'accountHolder', 'branch', 'debitDate', 'consent'];

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
];

// Field configurations for each step
export const personalInfoFields = [
  {
    name: 'title',
    label: 'Title',
    type: 'select',
    options: [
      { value: 781, label: 'Mr' },
      { value: 780, label: 'Mrs' },
      { value: 779, label: 'Miss' },
      { value: 1036, label: 'Dr' },
      { value: 1037, label: 'Prof' },
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
      { value: 1085, label: 'South African' },
      { value: 1086, label: 'Permanent Resident' },
      { value: 1087, label: 'Non-South African Citizen' },
    ],
    required: true,
  },
];

export const contactInfoFields = [
  {
    name: 'address',
    label: 'Postal Address',
    required: true,
  },
  {
    name: 'mobile',
    label: 'Mobile Number',
    type: 'tel',
    required: true,
  },
  {
    name: 'tellNo',
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
    name: 'maritalStatus',
    label: 'Marital Status',
    type: 'select',
    options: [
      { value: 1048, label: 'Single' },
      { value: 1049, label: 'Married' },
      { value: 1050, label: 'Divorced' },
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
      { value: 1, label: 'Male' },
      { value: 2, label: 'Female' },
      { value: 841, label: 'Other' },
    ],
    required: true,
  },
  {
    name: 'race',
    label: 'Race',
    type: 'select',
    options: [
      { value: 920, label: 'African' },
      { value: 921, label: 'Colored' },
      { value: 922, label: 'Chinese' },
      { value: 923, label: 'Indian' },
      { value: 924, label: 'White' },
    ],
  },
  {
    name: 'criminalRecord',
    label: 'Criminal Record',
    type: 'select',
    options: [
      { value: 1041, label: 'Yes' },
      { value: 1042, label: 'No' },
    ],
  },
];

export const professionalQualificationFields = [
  {
    name: 'certificationNO',
    label: 'Certification Number',
  },
  {
    name: 'institutionName',
    label: 'Institution Name',
  },
  {
    name: 'qualificationName',
    label: 'Qualification Name',
  },
  {
    name: 'qualificationType',
    label: 'Qualification Type',
    type: 'select',
    options: [
      { value: 1051, label: 'Higher Certificate' },
      { value: 1052, label: 'Diploma' },
      { value: 1053, label: 'Advanced Diploma' },
      { value: 1054, label: "Bachelor's Degree" },
      { value: 1055, label: 'Postgraduate Diploma' },
      { value: 1056, label: "Master's Degree" },
      { value: 1057, label: 'Doctorate' },
    ],
    required: true,
  },
  {
    name: 'qualificationStatus',
    label: 'Qualification Status',
    type: 'select',
    options: [
      { value: 1058, label: 'Awarded' },
      { value: 1059, label: 'Graduated' },
      { value: 1060, label: 'In-Progress' },
      { value: 1061, label: 'Pending Result' },
      { value: 1062, label: 'Awaiting Graduation' },
      { value: 1063, label: 'Partially Completed' },
      { value: 1064, label: 'Suspended' },
    ],
    required: true,
  },
  {
    name: 'qualificationYear',
    label: 'Year of Qualification',
    type: 'number',
  },
  {
    name: 'qualificationDetails',
    label: 'Additional Qualification Details',
    type: 'textarea',
  },
];

export const financialInformationFields = [
  {
    name: 'totalCreditCards',
    label: 'Total Credit Cards',
    type: 'number',
    required: true,
  },
  {
    name: 'totalLoans',
    label: 'Total Loans',
    type: 'number',
    required: true,
  },
  {
    name: 'vehicleFinance',
    label: 'Vehicle Finance',
    type: 'number',
    required: true,
  },
  {
    name: 'others',
    label: 'Other Financial Obligations',
    type: 'number',
    required: true,
  },
  {
    name: 'monthsBankStatement',
    label: 'Months of Bank Statements',
    type: 'number',
    required: true,
  },
  {
    name: 'uploadBankStatemnt',
    label: 'Upload Bank Statements',
    type: 'file',
  },
];

export const assetInformationFields = [
  {
    name: 'assetType',
    label: 'Asset Type',
    type: 'select',
    options: [
      { value: 973, label: 'In Use' },
      { value: 974, label: 'Disposed' },
    ],
    required: true,
  },
  {
    name: 'assetCatergory',
    label: 'Asset Category',
    type: 'select',
    options: [
      { value: 1065, label: 'Fixed Assets' },
      { value: 1066, label: 'Current Assets' },
      { value: 1067, label: 'Intangible Assets' },
      { value: 1068, label: 'Financial Assets' },
    ],
    required: true,
  },
  {
    name: 'assetName',
    label: 'Asset Name/Description',
  },
  {
    name: 'assetAddress',
    label: 'Asset Address/Location',
  },
  {
    name: 'assetTelNo',
    label: 'Asset Contact Number',
    type: 'tel',
  },
  {
    name: 'assetCellNo',
    label: 'Asset Mobile Number',
    type: 'number',
  },
];

export const incomeInformationFields = [
  {
    name: 'employmentType',
    label: 'Employment Type',
    type: 'select',
    options: [
      { value: 1080, label: 'Full-time' },
      { value: 1081, label: 'Part-time' },
      { value: 1082, label: 'Contract' },
      { value: 1083, label: 'Temporary' },
      { value: 1084, label: 'Internship' },
    ],
  },
  {
    name: 'salary',
    label: 'Monthly Salary',
    type: 'number',
    required: true,
  },
  {
    name: 'otherIncome',
    label: 'Other Income',
    type: 'number',
  },
  {
    name: 'additionalIncomeInvestment',
    label: 'Additional Income from Investments',
    type: 'number',
  },
  {
    name: 'rent',
    label: 'Monthly Rent/Mortgage',
    type: 'number',
  },
  {
    name: 'vehicleAssetFinance',
    label: 'Monthly Vehicle Finance Payment',
    type: 'number',
  },
  {
    name: 'grocery',
    label: 'Monthly Grocery Expenses',
    type: 'number',
  },
  {
    name: 'entertainment',
    label: 'Monthly Entertainment Expenses',
    type: 'number',
  },
  {
    name: 'schoolFeel',
    label: 'Monthly School Fees',
    type: 'number',
  },
  {
    name: 'fuel',
    label: 'Monthly Fuel Expenses',
    type: 'number',
  },
  {
    name: 'medicalAid',
    label: 'Monthly Medical Aid',
    type: 'number',
  },
];

export const documentsFields = [
  {
    name: 'latestPayslip',
    label: 'Latest Payslip',
    type: 'file',
    required: true,
  },
  {
    name: 'idDocument',
    label: 'ID Document',
    type: 'file',
    required: true,
  },
  {
    name: 'proofOfBank',
    label: 'Proof of Banking',
    type: 'file',
    required: true,
  },
];

export const verifyFields = [
  {
    name: 'selfie',
    label: 'Take a Selfie',
    type: 'camera',
    required: true,
  },
  {
    name: 'isverified',
    label: 'Verification Status',
    type: 'boolean',
    hidden: true,
  },
];

export const offerFields = [
  {
    name: 'status',
    label: 'Application Status',
    readOnly: true,
  },
  {
    name: 'amount',
    label: 'Approved Amount',
    type: 'currency',
    readOnly: true,
  },
  {
    name: 'interestRate',
    label: 'Interest Rate',
    type: 'percentage',
    readOnly: true,
  },
  {
    name: 'paymentTerm',
    label: 'Payment Term',
    readOnly: true,
  },
  {
    name: 'monthlyPayment',
    label: 'Monthly Payment',
    type: 'currency',
    readOnly: true,
  },
];

export const debitOrderFields = [
  {
    name: 'bank',
    label: 'Bank Name',
    type: 'select',
    options: [
      { value: 'fnb', label: 'First National Bank' },
      { value: 'standard', label: 'Standard Bank' },
      { value: 'absa', label: 'ABSA' },
      { value: 'nedbank', label: 'Nedbank' },
      { value: 'capitec', label: 'Capitec' },
    ],
    required: true,
  },
  {
    name: 'accountType',
    label: 'Account Type',
    type: 'select',
    options: [
      { value: 'checking', label: 'Checking Account' },
      { value: 'savings', label: 'Savings Account' },
      { value: 'credit', label: 'Credit Account' },
    ],
    required: true,
  },
  {
    name: 'accountNo',
    label: 'Account Number',
    required: true,
  },
  {
    name: 'accountHolder',
    label: 'Account Holder Name',
    required: true,
  },
  {
    name: 'branch',
    label: 'Branch Code',
    required: true,
  },
  {
    name: 'debitDate',
    label: 'Debit Date',
    type: 'select',
    options: [
      { value: '1', label: '1st of the month' },
      { value: '15', label: '15th of the month' },
      { value: '25', label: '25th of the month' },
      { value: '30', label: 'Last day of the month' },
    ],
    required: true,
  },
  {
    name: 'consent',
    label: 'I authorize the debit order from my account',
    type: 'checkbox',
    required: true,
  },
];

// Helper function to get field configurations for specific steps
export const getFieldsByStep = (stepId) => {
  switch (stepId) {
    case 'personalInformation':
      return personalInfoFields;
    case 'contactInformation':
      return contactInfoFields;
    case 'identification':
      return identificationFields;
    case 'professionalQualification':
      return professionalQualificationFields;
    case 'financialInformation':
      return financialInformationFields;
    case 'assetInformation':
      return assetInformationFields;
    case 'incomeInformation':
      return incomeInformationFields;
    case 'documents':
      return documentsFields;
    case 'verify':
      return verifyFields;
    case 'offer':
      return offerFields;
    case 'debutOrder':
      return debitOrderFields;
    default:
      return [];
  }
};