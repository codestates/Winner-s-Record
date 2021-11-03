import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import io from "socket.io-client";
import ChatAlert from "../components/Chat/ChatAlert";
import Message from "../components/Chat/Message";

const socket = io.connect("http://localhost:8081");

const Chatroom = () => {
  const { roomId } = useParams();
  const { userInfo, chatPost } = useSelector((state) => ({
    userInfo: state.userInfo,
    chatPost: state.chatPost,
  }));

  const [chatroomInfo, setChatroomInfo] = useState({
    userId: null,
    nickname: null,
  });

  const [payload, setPayload] = useState({
    content: "",
    userId: userInfo.userId,
    roomId,
    updatedAt: new Date(Date.now()),
  });

  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    if (!userInfo.userId) {
    } else {
      setPayload({ ...payload, userId: userInfo.userId });
      socket.emit("join", { roomId, nickname: userInfo.nickname });
    }
  }, [userInfo]);

  useEffect(() => {
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
        if (!res.data.docData) {
          socket.emit("sendDocData", { ...res.data.docData, roomId });
        }
        setChatData(res.data.data);
        setChatroomInfo(res.data.room);
      });
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("receive", data);
      setChatData((chats) => [...chats, data]);
    });

    socket.on("onConnect", (data) => {
      console.log("onconnect", data);
      setChatData((chats) => [...chats, data]);
    });

    socket.on("receiveDocData", (data) => {
      setChatData((chats) => [...chats, data]);
    });

    socket.on("receiveDocData", (data) => {
      setChatData((chats) => [...chats, data]);
    });

    socket.on("onDisconnect", (data) => {
      console.log("data", data);
      setChatData((chats) => [...chats, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (payload.content === "") {
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
          <div classname="title">
            <Link to={`/profile/${chatroomInfo.userId}`}>
              {chatroomInfo.nickname}
            </Link>
          </div>
        </div>
        <div className="otherBtn">
          <div className="btn">채팅방 나가기</div>
        </div>
      </div>
      {/* 채팅방 */}
      <div className="chatroom--chat--container">
        {chatData.map((chatData) => {
          return chatData.userId ? (
            <Message key={uuid()} chatData={chatData} />
          ) : (
            <ChatAlert key={uuid()} chatData={chatData} />
          );
        })}
      </div>
      {/* 입력창 */}
      <div className="chatroom--input--container">
        <input
          type="text"
          onChange={(e) => {
            setPayload({
              ...payload,
              content: e.target.value,
              updatedAt: new Date(Date.now()),
            });
          }}
          value={payload.content}
        />
        <button onClick={sendMessage}>입력</button>
      </div>
    </div>
  );
};

export default Chatroom;
