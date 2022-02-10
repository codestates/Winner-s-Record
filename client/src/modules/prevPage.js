import { createSlice } from "@reduxjs/toolkit";

const initialState = "/main";

const prevPageSlice = createSlice({
  name: "prevPage",
  initialState,
  reducers: {
    setPrevPage(state, { payload }) {
      return payload;
    },
  },
});

const { actions, reducer } = prevPageSlice;

export const { setPrevPage } = actions;
export default reducer;
