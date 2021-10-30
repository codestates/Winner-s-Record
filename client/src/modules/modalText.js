import { createSlice } from "@reduxjs/toolkit";

const initialState = "권한이 없습니다.";

const modalTextSlice = createSlice({
  name: "modalText",
  initialState,
  reducers: {
    setModalText(state, { payload }) {
      return payload;
    },
  },
});

const { actions, reducer } = modalTextSlice;

export const { setModalText } = actions;
export default reducer;
