import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const isModalOpen = createSlice({
  name: "isModalOpen",
  initialState,
  reducers: {
    modalOn() {
      return true;
    },
    modalOff() {
      return false;
    },
  },
});

const { actions, reducer } = isModalOpen;
export const { modalOn, modalOff } = actions;
export default reducer;
