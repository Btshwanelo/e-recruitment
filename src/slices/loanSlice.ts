import { createSlice } from '@reduxjs/toolkit';
import { string } from 'yup';

const initialState = {
  currentApplicationId: null,
  currentStep: 0,
  isNewApplication: false,
  isExistingApplication: false,
  isResumeApplication: false,
  applicationData: {
    personalInformation: {
      title: 0,
      firstName: string || null,
      surname: string || null,
      email: string || null,
      nationality: 1,
    },
    contactInformation: {
      address: string || null,
      mobile: string || null,
      tellNo: string || null,
      email: string || null,
    },
    identification: {
      maritalStatus: 0,
      dateOfBirth: string || null,
      age: 0,
      gender: 0,
      race: 0,
      criminalRecord: 0,
    },
    professionalQualification: {
      certificationNO: string || null,
      institutionName: string || null,
      qualificationName: string || null,
      qualificationType: 0,
      qualificationStatus: 0,
      qualificationYear: string || null,
      qualificationDetails: string || null,
    },
    financialInformation: {
      totalCreditCards: 0,
      totalLoans: 0,
      vehicleFinance: 0,
      others: 0,
      monthsBankStatement: 0,
      uploadBankStatemnt: string || null,
    },
    assetInformation: {
      assetType: 0,
      assetCatergory: 0,
      assetName: string || null,
      assetAddress: string || null,
      assetTelNo: string || null,
      assetCellNo: 0,
    },
    incomeInformation: {
      employmentType: string || null,
      rent: 0.0,
      vehicleAssetFinance: 0,
      grocery: 0.0,
      entertainment: 0,
      schoolFeel: 0.0,
      fuel: 0.0,
      medicalAid: 0.0,
      salary: 0.0,
      otherIncome: 0.0,
      additionalIncomeInvestment: 0.0,
    },
  },
};

export const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    resetForm: (state) => {
      state.currentApplicationId = null;
      state.currentStep = 0;
      state.isExistingApplication = false;
      state.isNewApplication = false;
      state.isResumeApplication = false;
    },

    setCurrentLoanStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setApplicationData: (state, action) => {
      state.applicationData = action.payload;
    },
    applicationResume: (state, action) => {
      state.applicationData = action.payload;
      state.isExistingApplication = true;
      state.isNewApplication = false;
    },
    newApplication: (state) => {
      state.currentApplicationId = null;
      state.currentStep = 0;
      state.isExistingApplication = false;
      state.isNewApplication = true;
      state.isResumeApplication = false;
      state.applicationData = initialState.applicationData;
    },
    setResumeApplication: (state, action) => {
      state.currentApplicationId = action.payload.currentApplicationId;
      state.isResumeApplication = action.payload.isResumeApplication;
    },
    updateApplication: (state, action) => {
      state.currentApplicationId = action.payload.currentApplicationId;
      state.currentStep = action.payload.currentStep;
      state.isExistingApplication = action.payload.isExistingApplication;
      state.isNewApplication = action.payload.isNewApplication;
      state.isResumeApplication = action.payload.isResumeApplication;
    },
  },
});

export const { resetForm, updateApplication, setCurrentLoanStep, applicationResume, setResumeApplication, newApplication,setApplicationData } =
  loanSlice.actions;

export default loanSlice.reducer;
