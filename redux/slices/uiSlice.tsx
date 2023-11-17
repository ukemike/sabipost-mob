import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  activePay4MeStep: number;
}

const initialState: UIState = {
  activePay4MeStep: 1,
};

const uiSlice: any = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActivePay4MeStep: (state, action) => {
        state.activePay4MeStep = action.payload;
    },
  },
});

export const { setActivePay4MeStep } = uiSlice.actions;

export default uiSlice.reducer;
