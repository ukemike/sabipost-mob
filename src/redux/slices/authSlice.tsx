import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  userInfo: any;
  viewedOnboarding: boolean;
  signupData: any;
};

const initialState: AuthState = {
  userInfo: null,
  viewedOnboarding: false,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    setViewedOnboarding: (state, action) => {
      state.viewedOnboarding = action.payload;
    },
    logOut: (state) => {
      state.userInfo = null;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
  },
});

export const { setCredentials, setViewedOnboarding, logOut, setSignupData } =
  authSlice.actions;

export default authSlice.reducer;
