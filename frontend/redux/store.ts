import { configureStore } from '@reduxjs/toolkit';
import authOnboardingReducer from './authOnboardingSlice';

export const store = configureStore({
  reducer: {
    authOnboarding: authOnboardingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
