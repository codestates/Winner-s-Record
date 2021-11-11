import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

const Chatmodal = ({ roomId, setIsModalOn }) => {
  const history = useHistory();

  const exitChat = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .delete(`http://3.36.30.63:8080/room/${roomId}`, {
        headers: {
          Authorization,
        },
      })
      .then((res) => {
        history.push("/chat");
        setIsModalOn(false);
      });
  };

  return (
    <div className="modal--backdrop">
      <div className="modal--view">
        <div className="text">
          <span>정말 나가시겠습니까 ?</span>
        </div>
        <div className="btn--container">
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

export default Chatmodal;
