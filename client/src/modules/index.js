import { combineReducers } from "redux";

import loginReducer from "./isLogin";
import userInfoReducer from "./userInfo";

const rootReducer = combineReducers({
  loginReducer,
  userInfoReducer,
});

export default rootReducer;
