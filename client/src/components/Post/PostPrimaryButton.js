import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

const TradeButton = ({
  hostId,
  status,
  setIsModalActive,
  setModalBtnType,
  setModalText,
}) => {
  const userInfo = useSelector((state) => state.userInfo);

  const changeStatus = () => {
    if (status === "대기") {
      setModalText("완료 상태로 변경하시겠습니까?");
    } else {
      setModalText("대기 상태로 변경하시겠습니까?");
    }
    setModalBtnType("status");
    setIsModalActive(true);
  };

  const startChat = () => {
    // 소켓 io 구현 후 사용
  };

  return (
    <>
      {hostId === userInfo.userId ? (
        <div className="post--primarybtn" onClick={changeStatus}>
          판매 상태 변경
        </div>
      ) : (
        <div className="post--primarybtn" onClick={startChat}>
          채팅 보내기
        </div>
      )}
    </>
  );
};

const MatchButton = ({ hostId, setLoginModal, status, player = [] }) => {
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
    } else if (buttonName === "결과확인") {
      // 결과 페이지로 리디렉션
      history.push(`/post`);
    } else if (buttonName === "참가 신청" || buttonName === "신청자 목록") {
      history.push(`/post/${postId}/entry`);
    } else {
      // 결과 입력
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

const PostPrimaryButton = ({
  hostId,
  type,
  status,
  setIsModalActive,
  setModalText,
  setModalBtnType,
}) => {
  return (
    <>
      {type === "trade" ? (
        <TradeButton
          hostId={hostId}
          status={status}
          setIsModalActive={setIsModalActive}
          setModalText={setModalText}
          setModalBtnType={setModalBtnType}
        />
      ) : (
        <MatchButton hostId={hostId} />
      )}
    </>
  );
};

export default PostPrimaryButton;
