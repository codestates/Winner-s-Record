import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import io from "socket.io-client";
import Message from "../components/Chat/Message";
import ChatPost from "../components/Chat/ChatPost";

const socket = io.connect("http://3.36.30.63:8080");

const Chatroom = () => {
  const { roomId } = useParams();
  const { userInfo, chatPost } = useSelector((state) => ({
    userInfo: state.userInfo,
    chatPost: state.chatPost,
  }));

  const [chatroomInfo, setChatroomInfo] = useState({
    id: null,
    nickname: null,
    img: null,
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
        `http://3.36.30.63/room/${roomId}`,
        { docId: chatPost },
        {
          headers: { Authorization },
        }
      )
      .then((res) => {
        if (res.data.docData) {
          socket.emit("sendDocData", { ...res.data.docData, roomId });
        }
        const data = res.data.data.map((e) => {
          if (e.content.split("tlstjdgnsdbeoguddlwjdgnsdjagPwls|")[1]) {
            return JSON.parse(
              e.content.split("tlstjdgnsdbeoguddlwjdgnsdjagPwls|")[1]
            );
          } else {
            return e;
          }
        });
        setChatData(data);
        setChatroomInfo(res.data.userData);
      });
  }, [chatPost]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("receive", data);
      setChatData((chats) => [...chats, data]);
    });

    socket.on("receiveDocData", (data) => {
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
            <Link to={`/profile/${chatroomInfo.id}`}>
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
            <ChatPost chatData={chatData} />
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
          onKeyUp={(e) => {
            // 여기 수정
            if (e.Key === "Enter") {
              sendMessage();
            }
          }}
          value={payload.content}
        />
        <button onClick={sendMessage}>입력</button>
      </div>
    </div>
  );
};

export default Chatroom;
