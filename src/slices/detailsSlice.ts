import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define initial state structure based on the given details data
const initialState = {
  profileDetails: {
    UserType: null,
    Name: null,
    Surname: null,
    Email: null,
    IdNumber: null,
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
