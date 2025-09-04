import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define job types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Learnership';
  category: 'Permanent' | 'Temporary' | 'Contract' | 'Learnership';
  salary?: string;
  closingDate: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  grade?: string;
  duration?: string; // For learnerships/contracts
  stipend?: string; // For learnerships
  reference: string;
  isFavorite: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'rejected' | 'accepted';
  educationLevel: string;
  isEmployed: string;
  applicationData?: {
    educationLevel: string;
    isEmployed: string;
    [key: string]: any;
  };
}

interface JobsState {
  jobs: Job[];
  applications: JobApplication[];
  favorites: string[]; // Array of job IDs
  isLoading: boolean;
  error: string | null;
  filters: {
    location: string;
    type: string;
    category: string;
    searchTerm: string;
  };
}

const initialState: JobsState = {
  jobs: [
    // Learnerships
    {
      id: 'itl2024001',
      title: 'Information Technology Learnership',
      company: 'Department of Correctional Services',
      location: 'Johannesburg',
      type: 'Learnership',
      category: 'Learnership',
      stipend: 'R4,500/month',
      duration: '12 months',
      closingDate: '2025-03-31',
      postedDate: '2025-03-10',
      description:
        'A comprehensive 12-month IT learnership program designed to equip learners with essential IT skills within the correctional services environment.',
      requirements: [
        'Grade 12 certificate with Mathematics and Physical Science',
        'South African citizen between ages 18-35',
        'Unemployed and not studying full-time',
        'Basic computer literacy skills',
      ],
      responsibilities: [
        'Computer hardware installation and maintenance',
        'Operating systems support',
        'Network fundamentals',
        'IT support for correctional facilities',
      ],
      skills: ['Technical problem-solving', 'Customer service', 'Time management', 'Attention to detail'],
      reference: 'ITL2024001',
      isFavorite: false,
    },
    {
      id: 'csl2024001',
      title: 'Correctional Services Learnership',
      company: 'Department of Correctional Services',
      location: 'Pretoria',
      type: 'Learnership',
      category: 'Learnership',
      stipend: 'R3,800/month',
      duration: '18 months',
      closingDate: '2025-04-15',
      postedDate: '2025-03-20',
      description:
        'An 18-month learnership program focused on correctional services operations, rehabilitation programs, and offender management.',
      requirements: [
        'Grade 12 certificate',
        'South African citizen between ages 18-35',
        'Unemployed and not studying full-time',
        'No criminal record',
        'Physical and mental fitness',
      ],
      responsibilities: [
        'Assist in offender supervision and care',
        'Support rehabilitation programs',
        'Administrative duties in correctional facilities',
        'Safety and security protocol implementation',
      ],
      skills: ['Communication skills', 'Conflict resolution', 'Team work', 'Attention to detail'],
      reference: 'CSL2024001',
      isFavorite: false,
    },
    {
      id: 'afl2024001',
      title: 'Administration and Finance Learnership',
      company: 'Department of Correctional Services',
      location: 'Cape Town',
      type: 'Learnership',
      category: 'Learnership',
      stipend: 'R4,200/month',
      duration: '12 months',
      closingDate: '2025-05-10',
      postedDate: '2025-04-01',
      description: 'A 12-month learnership focusing on administrative and financial management within correctional services.',
      requirements: [
        'Grade 12 certificate with Mathematics',
        'South African citizen between ages 18-35',
        'Unemployed and not studying full-time',
        'Basic computer literacy',
      ],
      responsibilities: [
        'Financial record keeping and reporting',
        'Administrative support functions',
        'Budget monitoring and control',
        'Procurement assistance',
      ],
      skills: ['Numerical skills', 'Organizational skills', 'Computer literacy', 'Communication'],
      reference: 'AFL2024001',
      isFavorite: false,
    },

    // Permanent Positions
    {
      id: 'co2024001',
      title: 'Correctional Officer',
      company: 'Department of Correctional Services',
      location: 'Durban',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R180,000 - R220,000 per annum',
      grade: 'B1-B4',
      closingDate: '2025-05-20',
      postedDate: '2025-04-10',
      description: 'Responsible for the custody, care, and rehabilitation of offenders in correctional facilities.',
      requirements: [
        'Grade 12 certificate',
        'South African citizenship',
        'No criminal record',
        'Physical and mental fitness',
        'Age between 18-35 years',
      ],
      responsibilities: [
        'Supervise and monitor offenders',
        'Maintain security and order in facilities',
        'Conduct searches and inspections',
        'Implement rehabilitation programs',
        'Write incident reports',
      ],
      skills: ['Leadership skills', 'Communication', 'Conflict resolution', 'Physical fitness', 'Attention to detail'],
      reference: 'CO2024001',
      isFavorite: false,
    },
    {
      id: 'sw2024001',
      title: 'Social Worker',
      company: 'Department of Correctional Services',
      location: 'Bloemfontein',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R350,000 - R420,000 per annum',
      grade: 'C2-C4',
      closingDate: '2025-06-01',
      postedDate: '2025-04-15',
      description: 'Provide social work services to offenders including assessment, counseling, and reintegration planning.',
      requirements: [
        'Bachelor of Social Work degree',
        'Registration with SACSSP',
        '2-3 years experience preferred',
        'South African citizenship',
        'No criminal record',
      ],
      responsibilities: [
        'Conduct psychosocial assessments',
        'Provide individual and group counseling',
        'Develop reintegration plans',
        'Facilitate family reunification programs',
        'Court report writing',
      ],
      skills: ['Counseling skills', 'Report writing', 'Empathy', 'Problem-solving', 'Case management'],
      reference: 'SW2024001',
      isFavorite: false,
    },
    {
      id: 'aorm001',
      title: 'Analyst: Operational Risk Management',
      company: 'Department of Correctional Services',
      location: 'Pretoria',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R400,000 - R480,000 per annum',
      grade: 'D1-D5',
      closingDate: '2025-04-25',
      postedDate: '2025-04-19',
      description: 'Responsible for identifying, assessing, and mitigating operational risks within correctional facilities.',
      requirements: [
        'Relevant degree in Risk Management, Audit, or related field',
        'Sound understanding of operational risk management principles',
        'Experience in correctional services or similar environment preferred',
        '2-4 years relevant experience',
        'South African citizenship',
      ],
      responsibilities: [
        'Conduct operational risk assessments',
        'Develop risk mitigation strategies',
        'Monitor compliance with safety protocols',
        'Prepare risk management reports',
        'Coordinate with facility management on risk issues',
      ],
      skills: ['Risk assessment', 'Analytical thinking', 'Report writing', 'Attention to detail', 'Problem-solving'],
      reference: 'AORM001',
      isFavorite: false,
    },
    {
      id: 'hr2024001',
      title: 'Human Resources Officer',
      company: 'Department of Correctional Services',
      location: 'Port Elizabeth',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R280,000 - R340,000 per annum',
      grade: 'C1-C3',
      closingDate: '2025-05-15',
      postedDate: '2025-04-20',
      description: 'Manage human resources functions including recruitment, employee relations, and performance management.',
      requirements: [
        "Bachelor's degree in Human Resources or related field",
        '2-3 years HR experience',
        'Knowledge of labor relations',
        'South African citizenship',
        'No criminal record',
      ],
      responsibilities: [
        'Recruitment and selection processes',
        'Employee relations management',
        'Performance management systems',
        'Training and development coordination',
        'HR policy implementation',
      ],
      skills: ['HR management', 'Communication', 'Interpersonal skills', 'Conflict resolution', 'Computer literacy'],
      reference: 'HR2024001',
      isFavorite: false,
    },
    {
      id: 'psych2024001',
      title: 'Psychologist',
      company: 'Department of Correctional Services',
      location: 'Johannesburg',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R450,000 - R550,000 per annum',
      grade: 'D1-D3',
      closingDate: '2025-06-10',
      postedDate: '2025-04-25',
      description: 'Provide psychological services to offenders including assessment, therapy, and rehabilitation support.',
      requirements: [
        'Masters degree in Psychology',
        'Registration with HPCSA',
        'Experience in forensic or clinical psychology',
        '1-2 years experience preferred',
        'South African citizenship',
      ],
      responsibilities: [
        'Conduct psychological assessments',
        'Provide individual and group therapy',
        'Develop treatment plans',
        'Risk assessment for parole boards',
        'Crisis intervention',
      ],
      skills: ['Clinical assessment', 'Therapeutic techniques', 'Report writing', 'Empathy', 'Professional ethics'],
      reference: 'PSYCH2024001',
      isFavorite: false,
    },

    // Contract Positions
    {
      id: 'sec2024001',
      title: 'Security Supervisor',
      company: 'Department of Correctional Services',
      location: 'Kimberley',
      type: 'Contract',
      category: 'Contract',
      salary: 'R25,000/month',
      duration: '24 months',
      closingDate: '2025-05-30',
      postedDate: '2025-04-28',
      description: 'Supervise security operations and personnel at correctional facilities.',
      requirements: [
        'Grade 12 certificate',
        'Security qualification/certification',
        '3-5 years security experience',
        'Leadership experience',
        'South African citizenship',
      ],
      responsibilities: [
        'Supervise security personnel',
        'Monitor facility security systems',
        'Conduct security briefings',
        'Emergency response coordination',
        'Security protocol compliance',
      ],
      skills: ['Leadership', 'Security operations', 'Emergency response', 'Communication', 'Decision making'],
      reference: 'SEC2024001',
      isFavorite: false,
    },
    {
      id: 'nurse2024001',
      title: 'Professional Nurse',
      company: 'Department of Correctional Services',
      location: 'Polokwane',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R320,000 - R380,000 per annum',
      grade: 'C2-C4',
      closingDate: '2025-06-05',
      postedDate: '2025-05-01',
      description: 'Provide nursing care and healthcare services to offenders in correctional facilities.',
      requirements: [
        'Diploma/Degree in Nursing',
        'Registration with SANC',
        '2+ years nursing experience',
        'South African citizenship',
        'No criminal record',
      ],
      responsibilities: [
        'Provide primary healthcare services',
        'Administer medication',
        'Health assessments and screening',
        'Medical emergency response',
        'Health education programs',
      ],
      skills: ['Clinical nursing', 'Patient care', 'Medical procedures', 'Compassion', 'Attention to detail'],
      reference: 'NURSE2024001',
      isFavorite: false,
    },
    {
      id: 'teacher2024001',
      title: 'Adult Education Teacher',
      company: 'Department of Correctional Services',
      location: 'East London',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R280,000 - R350,000 per annum',
      grade: 'C1-C3',
      closingDate: '2025-06-15',
      postedDate: '2025-05-05',
      description: 'Provide adult education and skills development programs to offenders.',
      requirements: [
        'Teaching qualification (PGCE/B.Ed)',
        'SACE registration',
        'Adult education experience preferred',
        'South African citizenship',
        'No criminal record',
      ],
      responsibilities: [
        'Develop and deliver education programs',
        'Assess learner progress',
        'Prepare learning materials',
        'Support literacy and numeracy development',
        'Coordinate with rehabilitation programs',
      ],
      skills: ['Teaching methods', 'Curriculum development', 'Communication', 'Patience', 'Adaptability'],
      reference: 'TEACHER2024001',
      isFavorite: false,
    },
    {
      id: 'maint2024001',
      title: 'Maintenance Technician',
      company: 'Department of Correctional Services',
      location: 'Nelspruit',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R220,000 - R280,000 per annum',
      grade: 'B3-B5',
      closingDate: '2025-05-25',
      postedDate: '2025-04-30',
      description: 'Perform maintenance and repair work on facility infrastructure and equipment.',
      requirements: [
        'Grade 12 certificate',
        'Trade qualification in relevant field',
        '3+ years maintenance experience',
        'South African citizenship',
        'No criminal record',
      ],
      responsibilities: [
        'Preventive and corrective maintenance',
        'Equipment repairs and installations',
        'Facility infrastructure maintenance',
        'Emergency repair response',
        'Maintenance record keeping',
      ],
      skills: ['Technical skills', 'Problem-solving', 'Manual dexterity', 'Safety consciousness', 'Time management'],
      reference: 'MAINT2024001',
      isFavorite: false,
    },
  ],
  applications: [
    {
      id: 'teacher2024001',
      title: 'Adult Education Teacher',
      company: 'Department of Correctional Services',
      location: 'East London',
      type: 'Full Time',
      category: 'Permanent',
      salary: 'R280,000 - R350,000 per annum',
      grade: 'C1-C3',
      closingDate: '2025-06-15',
      postedDate: '2025-05-05',
      description: 'Provide adult education and skills development programs to offenders.',
      requirements: [
        'Teaching qualification (PGCE/B.Ed)',
        'SACE registration',
        'Adult education experience preferred',
        'South African citizenship',
        'No criminal record',
      ],
      responsibilities: [
        'Develop and deliver education programs',
        'Assess learner progress',
        'Prepare learning materials',
        'Support literacy and numeracy development',
        'Coordinate with rehabilitation programs',
      ],
      skills: ['Teaching methods', 'Curriculum development', 'Communication', 'Patience', 'Adaptability'],
      reference: 'TEACHER2024001',
      isFavorite: false,
    },
  ],
  favorites: [],
  isLoading: false,
  error: null,
  filters: {
    location: '',
    type: '',
    category: '',
    searchTerm: '',
  },
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    // Job management
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },

    // Application management
    addApplication: (state, action: PayloadAction<JobApplication>) => {
      // Check if already applied
      const existingApplication = state.applications.find((app) => app.jobId === action.payload.jobId);
      if (!existingApplication) {
        state.applications.push(action.payload);
      }
    },
    updateApplicationStatus: (
      state,
      action: PayloadAction<{
        applicationId: string;
        status: JobApplication['status'];
      }>
    ) => {
      const application = state.applications.find((app) => app.id === action.payload.applicationId);
      if (application) {
        application.status = action.payload.status;
      }
    },
    deleteApplication: (state, action: PayloadAction<string>) => {
      state.applications = state.applications.filter((app) => app.id !== action.payload);
    },

    // Favorites management
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      const jobIndex = state.jobs.findIndex((job) => job.id === jobId);

      if (jobIndex !== -1) {
        state.jobs[jobIndex].isFavorite = !state.jobs[jobIndex].isFavorite;

        if (state.jobs[jobIndex].isFavorite) {
          if (!state.favorites.includes(jobId)) {
            state.favorites.push(jobId);
          }
        } else {
          state.favorites = state.favorites.filter((id) => id !== jobId);
        }
      }
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      if (!state.favorites.includes(jobId)) {
        state.favorites.push(jobId);
        const jobIndex = state.jobs.findIndex((job) => job.id === jobId);
        if (jobIndex !== -1) {
          state.jobs[jobIndex].isFavorite = true;
        }
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      state.favorites = state.favorites.filter((id) => id !== jobId);
      const jobIndex = state.jobs.findIndex((job) => job.id === jobId);
      if (jobIndex !== -1) {
        state.jobs[jobIndex].isFavorite = false;
      }
    },

    // Filters
    setFilters: (state, action: PayloadAction<Partial<JobsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        location: '',
        type: '',
        category: '',
        searchTerm: '',
      };
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear all data
    clearJobs: () => initialState,
  },
});

// Selectors (helper functions to get specific data from state)
export const selectJobs = (state: { jobs: JobsState }) => state.jobs.jobs;
export const selectApplications = (state: { jobs: JobsState }) => state.jobs.applications;
export const selectFavorites = (state: { jobs: JobsState }) => state.jobs.favorites;
export const selectJobById = (state: { jobs: JobsState }, jobId: string) => state.jobs.jobs.find((job) => job.id === jobId);
export const selectHasApplied = (state: { jobs: JobsState }, jobId: string) => state.jobs.applications.some((app) => app.jobId === jobId);
export const selectApplicationByJobId = (state: { jobs: JobsState }, jobId: string) =>
  state.jobs.applications.find((app) => app.jobId === jobId);
export const selectFilteredJobs = (state: { jobs: JobsState }) => {
  const { jobs, filters } = state.jobs;

  return jobs.filter((job) => {
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesCategory = !filters.category || job.category === filters.category;
    const matchesSearch =
      !filters.searchTerm ||
      job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return matchesLocation && matchesType && matchesCategory && matchesSearch;
  });
};

// Export actions
export const {
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  addApplication,
  updateApplicationStatus,
  deleteApplication,
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  setFilters,
  clearFilters,
  setLoading,
  setError,
  clearJobs,
} = jobsSlice.actions;

// Export reducer
export default jobsSlice.reducer;
