import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { modalOn } from "../../modules/isModalOpen";
import { setModalText } from "../../modules/modalText";
import { setChatPost } from "../../modules/chatPost";

const TradeButton = ({ hostId, status, setModalBtnType, setLoginModal }) => {
  const { postId } = useParams();
  const { userInfo, isLogin } = useSelector((state) => ({
    userInfo: state.userInfo,
    isLoign: state.isLogin,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  const changeStatus = () => {
    if (status === "대기") {
      dispatch(setModalText("완료 상태로 변경하시겠습니까?"));
    } else {
      dispatch(setModalText("대기 상태로 변경하시겠습니까?"));
    }
    setModalBtnType("status");
    dispatch(modalOn());
  };

  const startChat = () => {
    if (!isLogin) {
      // 로그인 모달
      setLoginModal(true);
    } else {
      const Authorization = `Bearer ${localStorage.getItem("token")}`;
      axios
        .post(
          `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/room`,
          { docId: postId },
          { headers: { Authorization } }
        )
        .then((res) => {
          dispatch(setChatPost(Number(postId)));
          history.push(`/chat/${res.data.id}`);
        });
    }
  };

  return (
    <div className="post--primarybtn--container">
      {hostId === userInfo.userId ? (
        <div className="btn one colored" onClick={changeStatus}>
          판매 상태 변경
        </div>
      ) : (
        <div className="btn one colored" onClick={startChat}>
          채팅 보내기
        </div>
      )}
    </div>
  );
};

export default TradeButton;
