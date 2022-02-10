import { combineReducers } from "redux";

import isLogin from "./isLogin";
import userInfo from "./userInfo";
import prevPage from "./prevPage";
import modalText from "./modalText";
import isModalOpen from "./isModalOpen";
import chatPost from "./chatPost";

const rootReducer = combineReducers({
  isLogin,
  userInfo,
  prevPage,
  modalText,
  isModalOpen,
  chatPost,
});

export default rootReducer;
