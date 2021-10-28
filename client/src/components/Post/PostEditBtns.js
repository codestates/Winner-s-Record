import React from "react";
import { useSelector } from "react-redux";

const PostEditBtns = ({
  hostId,
  setModalText,
  setIsModalActive,
  setLoginModal,
  setModalBtnType,
}) => {
  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }));

  const deleteHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (userInfo.userId !== hostId) {
      setModalText("권한이 없습니다.");
      setModalBtnType("close");
      setIsModalActive(true);
    } else {
      setModalText("정말 삭제하시겠습니까 ?");
      setModalBtnType("delete");
      setIsModalActive(true);
    }
  };

  const editHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (userInfo.userId !== hostId) {
      setModalText("권한이 없습니다.");
      setModalBtnType("close");
      setIsModalActive(true);
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
