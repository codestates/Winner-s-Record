import { combineReducers } from "redux";

import isLogin from "./isLogin";
import userInfo from "./userInfo";
import prevPage from "./prevPage";

const rootReducer = combineReducers({
  isLogin,
  userInfo,
  prevPage,
});

export default rootReducer;
