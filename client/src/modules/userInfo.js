import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userInfo") || {
  id: null,
  type: null,
  email: null,
  nickname: null,
  password: null,
  img: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      return { ...state, ...payload };
    },
    deleteUserInfo(state, { payload }) {
      localStorage.removeItem("userInfo");
      return initialState;
    },
  },
});

const { actions, reducer } = userInfoSlice;

export const { setUserInfo, deleteUserInfo } = actions;
export default reducer;
