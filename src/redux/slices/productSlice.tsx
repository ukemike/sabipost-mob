import { createSlice } from "@reduxjs/toolkit";

type ProductState = {
  productFilter: any;
};

const initialState: ProductState = {
  productFilter: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductFilter: (state, action) => {
      state.productFilter = action.payload;
    },
  },
});

export const { setProductFilter } = productSlice.actions;

export default productSlice.reducer;
