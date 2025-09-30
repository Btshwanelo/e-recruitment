// Master data types
export interface MasterDataOption {
  lable: string;
  value: string;
}

export interface MasterDataSchema {
  schemaName: string;
  options: MasterDataOption[];
}

export interface MasterDataResponse {
  staticData: MasterDataSchema[];
  clientMessage: string | null;
  results: any;
  gotoUrl: string | null;
}

// File upload interfaces
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  file: File;
}

export interface FileUploadError {
  message: string;
  type: 'size' | 'type' | 'general';
}

// Form data interfaces
export interface Language {
  id: string;
  language: string;
  speakingProficiency: string;
  readWriteProficiency: string;
}

export interface Qualification {
  id: string;
  qualification: string;
  institution: string;
  yearObtained: string;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  fromDate: string;
  toDate: string;
  reasonForLeaving: string;
}

export interface ProfileFormData {
  firstName: string;
  initial: string;
  title: string;
  lastName: string;
  idNumber: string;
  age: string;
  race: string;
  dateOfBirth: string;
  gender: string;
  passportNumber: string;
  rightToWork: string;
  disabilityStatus: string;
  disabilityNature: string;
  languages: Language[];
  qualifications: Qualification[];
  workExperience: WorkExperience[];
}

export interface ContactFormData {
  email: string;
  mobileNumber: string;
  alternativeNumber: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

// Default empty form data
export const defaultPersonalInfo: ProfileFormData = {
  firstName: '',
  initial: '',
  title: '',
  lastName: '',
  idNumber: '',
  age: '',
  race: '',
  dateOfBirth: '',
  gender: '',
  passportNumber: '',
  rightToWork: '',
  disabilityStatus: '',
  disabilityNature: '',
  languages: [],
  qualifications: [],
  workExperience: [],
};

export const defaultContactInfo: ContactFormData = {
  email: '',
  mobileNumber: '',
  alternativeNumber: '',
  streetAddress: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
};
