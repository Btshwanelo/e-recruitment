import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define initial state structure based on the given details data
const initialState = {
  profileDetails: {
    UserType: null as string | null,
    Name: null as string | null,
    Surname: null as string | null,
    Email: null as string | null,
    IdNumber: null as string | null,
    Mobile: null as string | null,
    ProfileSteps: null as string | null,
    isProfileComplete: false as boolean,
    currentProfileStep: null as number | null,
    currentStepDescription: null as string | null,
    completionPercentage: 0 as number,
    progressSteps: [] as Array<{
      title: string;
      step: number;
      isComplete: boolean;
      isCurrent: boolean;
    }>,
    applicantDetails: {
      personalInfo: {
        firstName: null as string | null,
        lastName: null as string | null,
        initial: null as string | null,
        idNumber: null as string | null,
        age: null as number | null,
        dateOfBirth: null as string | null,
        passportNumber: null as string | null,
        genderId: 0 as number,
        titleId: 0 as number,
        raceId: 0 as number,
        rightToWorkStatusId: 0 as number,
        disabilityStatusId: 0 as number,
      },
      contactInfo: {
        email: null as string | null,
        mobile: null as string | null,
        alternativeNumber: null as string | null,
        streetAddress: null as string | null,
        city: null as string | null,
        provinceId: 0 as number,
        postalCode: null as string | null,
        country: null as string | null,
      },
      qualifications: {
        qualificationName: null as string | null,
        institution: null as string | null,
        yearObtained: 0 as number,
      },
      workExperience: {
        companyName: null as string | null,
        position: null as string | null,
        fromDate: null as string | null,
        toDate: null as string | null,
        reasonForLeaving: null as string | null,
      },
      documents: {
        cv: null as string | null,
        idDocument: null as string | null,
        qualificationsDoc: null as string | null,
      },
      languages: {
        language: null as string | null,
        proficiencyLevel: null as string | null,
      },
    },
  },
};

// Create the details slice
const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    // updateProfileComplete: (state, action: PayloadAction<boolean>) => {
    //   state.isProfileComplete = action.payload;
    // },
    // updateIsCreateProfile: (state, action: PayloadAction<boolean>) => {
    //   state.isCreateProfile = action.payload;
    // },
    // updateInProgressStep: (state, action: PayloadAction<typeof initialState.inProgressStep>) => {
    //   state.inProgressStep = { ...action.payload };
    // },
    // updateNavigation: (state, action: PayloadAction<typeof initialState.navigation>) => {
    //   state.navigation = [...action.payload];
    // },
    updateProfileDetails: (state, action: PayloadAction<typeof initialState.profileDetails>) => {
      state.profileDetails = { ...action.payload };
    },
    // updateRequestResults: (state, action: PayloadAction<typeof initialState.requestResults>) => {
    //   state.requestResults = { ...action.payload };
    // },
    // updateTsAndCsAccepted: (state, action: PayloadAction<typeof initialState.requestResults.tsAndCsAccepted>) => {
    //   state.requestResults.tsAndCsAccepted = action.payload;
    // },
    clearDetails: () => initialState,
  },
});

// Export actions
export const { updateProfileDetails, clearDetails } = detailsSlice.actions;

// Export reducer to include in the store
export default detailsSlice.reducer;
