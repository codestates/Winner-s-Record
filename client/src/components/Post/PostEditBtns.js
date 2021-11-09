import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { modalOn } from "../../modules/isModalOpen";
import { setModalText } from "../../modules/modalText";

const PostEditBtns = ({ hostId, setLoginModal, setModalBtnType }) => {
  const history = useHistory();
  const { postId } = useParams();
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
    } else {
      history.push(`/edit/${postId}`);
    }
  };

  return (
    <div className="editbtns">
      <div onClick={editHandler}>
        <i className="fas fa-edit" />
      </div>
      <div onClick={deleteHandler}>
        <i className="fas fa-trash-alt" />
      </div>
    </div>
  );
};

export default PostEditBtns;
