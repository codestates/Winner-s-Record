import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

const MatchButton = ({
  hostId,
  setLoginModal,
  status,
  player = [],
  setModalBtnType,
  setModalText,
  setIsModalActive,
}) => {
  const history = useHistory();
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
      // 결과 페이지로 리디렉션
      history.push(`/post`);
    } else if (buttonName === "참가 신청" || buttonName === "신청자 목록") {
      history.push(`/post/${postId}/entry`);
    } else {
      setModalText("승자를 선택해주세요!");
      setModalBtnType("choosewinner");
      setIsModalActive(true);
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
  }, []);

  return (
    <div className="post--primarybtn" onClick={clickHandler}>
      {buttonName}
    </div>
  );
};

export default MatchButton;
