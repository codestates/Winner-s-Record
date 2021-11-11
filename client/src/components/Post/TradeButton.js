import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { modalOn } from "../../modules/isModalOpen";
import { setModalText } from "../../modules/modalText";
import { setChatPost } from "../../modules/chatPost";

const TradeButton = ({ hostId, status, setModalBtnType }) => {
  const { postId } = useParams();
  const userInfo = useSelector((state) => state.userInfo);
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
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .post(
        `https://3.36.30.63/room`,
        { docId: postId },
        { headers: { Authorization } }
      )
      .then((res) => {
        // console.log(res.data.id);
        dispatch(setChatPost(Number(postId)));
        history.push(`/chat/${res.data.id}`);
      });
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
