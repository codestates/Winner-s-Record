import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

const TradeButton = ({
  hostId,
  status,
  setIsModalActive,
  setModalBtnType,
  setModalText,
}) => {
  const { postId } = useParams();
  const userInfo = useSelector((state) => state.userInfo);
  const history = useHistory();

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
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .post(
        `http://localhost:8080/room`,
        { docId: postId },
        { headers: { Authorization } }
      )
      .then((res) => {
        history.push(`/room/${res.data.data.id}`);
      });
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

export default TradeButton;
