import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalOn } from "../../modules/isModalOpen";
import { setModalText } from "../../modules/modalText";

const PostEditBtns = ({ hostId, setLoginModal, setModalBtnType }) => {
  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }));
  const dispatch = useDispatch();

  const deleteHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (userInfo.userId !== hostId) {
      dispatch(setModalText("권한이 없습니다."));
      setModalBtnType("close");
      dispatch(modalOn());
    } else {
      dispatch(setModalText("정말 삭제하시겠습니까 ?"));
      setModalBtnType("delete");
      dispatch(modalOn());
    }
  };

  const editHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (userInfo.userId !== hostId) {
      dispatch(setModalText("권한이 없습니다."));
      setModalBtnType("close");
      dispatch(modalOn());
    }
  };

  return (
    <div className="post--editbtns--container">
      <div onClick={editHandler}>수정</div>
      <div onClick={deleteHandler}>삭제</div>
    </div>
  );
};

export default PostEditBtns;
