import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

const TournamentButton = ({ status, setLoginModal, hostId }) => {
  const history = useHistory();
  const { postId } = useParams();
  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }));
  const [buttonName, setButtonName] = useState("참가하기");

  const clickHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (buttonName === "참가 신청" || buttonName === "신청자 목록") {
      history.push(`/post/${postId}/entry`);
    } else if (buttonName === "진행 확인") {
      history.push(`/post/${postId}/tournament`);
    } else {
      history.push(`/post/${postId}/result`);
    }
  };

  useEffect(() => {
    if (status === "대기" && userInfo.userId === hostId) {
      setButtonName("신청자 목록");
    } else if (status === "대기") {
      setButtonName("참가 신청");
    } else if (status === "진행") {
      setButtonName("진행 확인");
    } else {
      setButtonName("결과 조회");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="post--primarybtn--container" onClick={clickHandler}>
      <div className="btn one colored">{buttonName}</div>
    </div>
  );
};

export default TournamentButton;
