import { createSlice } from "@reduxjs/toolkit";

type PostState = {
  postFilter: any;
};

const initialState: PostState = {
  postFilter: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostFilter: (state, action) => {
      state.postFilter = action.payload;
    },
  },
});

export const { setPostFilter } = postSlice.actions;

export default postSlice.reducer;
