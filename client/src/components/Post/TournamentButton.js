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
      // 토너먼트 페이지로 리디렉션
    } else {
      history.push(`/post/${postId}/result`);
      // 토너먼트 결과 조회로 리디렉션
    }
  };

  useEffect(() => {
    if (status === "대기" && userInfo.userId === hostId) {
      setButtonName("신청자 목록");
    } else if (status === "대기") {
      setButtonName("참가 신청");
    } else if (status === "진행") {
      setButtonName("토너먼트 확인");
    } else {
      setButtonName("결과 조회");
    }
  }, []);

  return (
    <div className="post-primarybtn" onClick={clickHandler}>
      {buttonName}
    </div>
  );
};

export default TournamentButton;
