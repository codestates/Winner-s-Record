import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import io from "socket.io-client";

const socket = io.connect("http:localhost:8080");

const Chatroom = () => {
  const roomId = useParams();
  const userInfo = useSelector((state) => state.userInfo);

  const [payload, setPayload] = useState({
    message: "",
    username: "",
  });
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    socket.emit("join", "여기 룸 아이디 들어갈 자리");
    setPayload({ ...payload, username: userInfo.nickname });

    // ?? api 이해가 안되는데
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get(`http://localhost:8080/${roomId}`, {
        headers: { Authorization },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log(data);
    });
  }, [socket]);

  const submitHandler = (e) => {
    e.defaultPrevented();
  };

  const sendMessage = async () => {
    if (payload.message === "") {
      // do nothing
    } else {
      await socket.emit("sendMessage", payload);
    }
  };

  return (
    <div className="chatroom--container">
      {/* 채팅 헤더 */}
      <div className="chatroom--header">
        <div className="backbtn">
          <div className="btn">룸으로 리디렉션</div>
        </div>
        <div className="otherUser">
          <div classname="title">유저이름</div>
        </div>
        <div className="otherBtn">
          <div className="btn">채팅방 나가기</div>
        </div>
      </div>
      {/* 채팅방 */}
      <div className="chatroom--chat--container">
        <div>chatcontext</div>
      </div>
      {/* 입력창 */}
      <form className="chatroom--input--container" onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => {
            setPayload({ ...payload, message: e.target.value });
          }}
          value={payload.message}
        />
        <button>입력</button>
      </form>
    </div>
  );
};

export default Chatroom;
