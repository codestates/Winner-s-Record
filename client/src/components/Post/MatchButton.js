import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { modalOn } from "../../modules/isModalOpen";
import { setModalText } from "../../modules/modalText";
import { setChatPost } from "../../modules/chatPost";
import axios from "axios";

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
    if (buttonName === "종료된 경기입니다.") {
      // 아무것도 하지마~~
    } else if (!isLogin) {
      setLoginModal(true);
    } else if (buttonName === "참가 신청" || buttonName === "신청자 목록") {
      history.push(`/post/${postId}/entry`);
    } else {
      dispatch(setModalText("승자를 선택해주세요!"));
      setModalBtnType("choosewinner");
      dispatch(modalOn());
    }
  };

  const startChat = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (status === "진행") {
      dispatch(setModalText("이미 진행중인 경기입니다."));
      setModalBtnType("close");
      dispatch(modalOn());
    } else if (status === "완료") {
      dispatch(setModalText("이미 종료된 경기입니다."));
      setModalBtnType("close");
      dispatch(modalOn());
    } else {
      const Authorization = `Bearer ${localStorage.getItem("token")}`;
      axios
        .post(
          `https://server.winner-s-record.link/room`,
          { docId: postId },
          { headers: { Authorization } }
        )
        .then((res) => {
          dispatch(setChatPost(Number(postId)));
          history.push(`/chat/${res.data.id}`);
        });
    }
  };

  useEffect(() => {
    if (status === "완료") {
      setButtonName("종료된 경기입니다.");
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="post--primarybtn--container">
      {status === "대기" && hostId !== userInfo.userId ? (
        <div className="btn two" onClick={startChat}>
          <span>채팅 보내기</span>
        </div>
      ) : null}
      <div
        className={`btn ${
          status === "대기" && hostId !== userInfo.userId ? "two" : "one"
        } ${status === "완료" ? "" : "colored"}`}
        onClick={clickHandler}
      >
        <span>{buttonName}</span>
      </div>
    </div>
  );
};

export default MatchButton;
