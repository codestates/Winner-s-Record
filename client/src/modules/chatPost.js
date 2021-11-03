import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const chatPostSlice = createSlice({
  name: "chatPost",
  initialState,
  reducers: {
    setChatPost(state, { payload }) {
      return payload;
    },
  },
});

const { actions, reducer } = chatPostSlice;
export const { setChatPost } = actions;
export default reducer;
