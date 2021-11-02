import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import uuid from "react-uuid";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8081");

// const socket = () => {};

const Chatroom = ({ match }) => {
  const { roomId } = useParams();
  const { userInfo, chatPost } = useSelector((state) => ({
    userInfo: state.userInfo,
    chatPost: state.chatPost,
  }));

  const [payload, setPayload] = useState({
    message: "",
    userId: userInfo.userId,
    roomId,
    time: new Date(Date.now()),
  });

  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    if (!userInfo.userId) {
    } else {
      setPayload({ ...payload, userId: userInfo.userId });
      socket.emit("join", { roomId, nickname: userInfo.nickname });
    }

    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .post(
        `http://localhost:8080/room/${roomId}`,
        { docId: chatPost },
        {
          headers: { Authorization },
        }
      )
      .then((res) => {
        // console.log(res);
      });

    return () => {
      socket.emit("socketDisconnect", {
        roomId,
        nickname: userInfo.nickname,
      });
    };
  }, [userInfo]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("receive", data);
      setChatData((chats) => [...chats, data]);
    });
    socket.on("onConnect", (data) => {
      console.log("onconnect", data);
      setChatData((chats) => [...chats, data]);
    });
    socket.on("onDisconnect", (data) => {
      setChatData((chats) => [...chats, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    setPayload({ ...payload, time: new Date(Date.now()) });
    if (payload.message === "") {
      // do nothing
    } else {
      await socket.emit("sendMessage", payload);
    }
  };

  useEffect(() => {}, [payload.message]);

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
        {chatData.map((chat) => {
          return chat.userId ? (
            <div key={uuid()}>{chat.message}</div>
          ) : (
            <div key={uuid()}>{chat.content}</div>
          );
        })}
        <div>chatcontext</div>
      </div>
      {/* 입력창 */}
      <div className="chatroom--input--container">
        <input
          type="text"
          onChange={(e) => {
            setPayload({
              ...payload,
              message: e.target.value,
              time: new Date(Date.now()),
            });
          }}
          value={payload.message}
        />
        <button onClick={sendMessage}>입력</button>
      </div>
    </div>
  );
};

export default Chatroom;
