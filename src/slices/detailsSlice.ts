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
