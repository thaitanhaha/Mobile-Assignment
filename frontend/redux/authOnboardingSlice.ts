import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthOnboardingState {
  isAuthenticated: boolean;
  isFirstLaunch: boolean | null;
}

const initialState: AuthOnboardingState = {
  isAuthenticated: false,
  isFirstLaunch: null,
};

const authOnboardingSlice = createSlice({
  name: 'authOnboarding',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setFirstLaunch: (state, action: PayloadAction<boolean | null>) => {
      state.isFirstLaunch = action.payload;
    },
  },
});

export const { setAuthenticated, setFirstLaunch } = authOnboardingSlice.actions;

export default authOnboardingSlice.reducer;
