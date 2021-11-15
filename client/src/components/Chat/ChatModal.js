import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

const ChatModal = ({ roomId, setIsModalOn }) => {
  const history = useHistory();

  const exitChat = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .delete(`http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/room/${roomId}`, {
        headers: {
          Authorization,
        },
      })
      .then((res) => {
        history.push("/chat");
        setIsModalOn(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="modal--backdrop">
      <div className="modal--view chat">
        <div className="modal--text--container">
          <span className="text">정말 나가시겠습니까 ?</span>
        </div>
        <div className="modal--btns--container">
          <div
            className="btn"
            onClick={() => {
              setIsModalOn(false);
            }}
          >
            아니요
          </div>
          <div className="btn colored" onClick={exitChat}>
            네
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
