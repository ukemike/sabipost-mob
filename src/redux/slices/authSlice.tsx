import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  userInfo: any;
  viewedOnboarding: boolean;
  signupData: any;

  isPushTokenUpdated: boolean;
  pushToken: string;
};

const initialState: AuthState = {
  userInfo: null,
  viewedOnboarding: false,
  signupData: null,

  isPushTokenUpdated: false,
  pushToken: "",
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

    setPushTokenUpdated: (state, action) => {
      state.isPushTokenUpdated = action.payload;
    },
    setPushToken: (state, action) => {
      state.pushToken = action.payload;
    },
  },
});

export const {
  setCredentials,
  setViewedOnboarding,
  logOut,
  setSignupData,
  setPushTokenUpdated,
  setPushToken,
} = authSlice.actions;

export default authSlice.reducer;
