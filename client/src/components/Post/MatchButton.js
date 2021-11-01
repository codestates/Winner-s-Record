import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { modalOn } from "../../modules/isModalOpen";
import { setModalText } from "../../modules/modalText";

const MatchButton = ({
  hostId,
  setLoginModal,
  status,
  player = [],
  setModalBtnType,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [buttonName, setButtonName] = useState("신청자 목록");
  const { userInfo, isLogin } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }));

  const clickHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (buttonName === "결과 확인") {
      // 결과 페이지 모달
      history.push(`/post`);
    } else if (buttonName === "참가 신청" || buttonName === "신청자 목록") {
      history.push(`/post/${postId}/entry`);
    } else {
      dispatch(setModalText("승자를 선택해주세요!"));
      setModalBtnType("choosewinner");
      dispatch(modalOn());
    }
  };

  useEffect(() => {
    if (status === "완료") {
      setButtonName("결과 확인");
    } else if (
      hostId !== userInfo.userId &&
      !player.includes(userInfo.nickname)
    ) {
      setButtonName("참가 신청");
    } else if (hostId !== userInfo.userId) {
      setButtonName("신청자 목록");
    } else if (status === "진행") {
      setButtonName("결과 입력");
    } else {
      setButtonName("신청자 목록");
    }

    // 여기하는 중
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="post--primarybtn" onClick={clickHandler}>
      {buttonName}
    </div>
  );
};

export default MatchButton;
