import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const loginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    setLogin() {
      return true;
    },
    setLogout() {
      return false;
    },
  },
});

const { actions, reducer } = loginSlice;

export const { setLogin, setLogout } = actions;
export default reducer;
