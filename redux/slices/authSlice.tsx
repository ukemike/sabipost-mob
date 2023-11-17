import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  userInfo: any;
  signUpdData: any;
}

const initialState: IAuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
  signUpdData: null,
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
      window.location.href = "/";
    },
    setSignUpData: (state, action) => {
      state.signUpdData = action.payload;
    },
  },
});

export const { setCredentials, logout, setSignUpData } = authSlice.actions;

export default authSlice.reducer;
