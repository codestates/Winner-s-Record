import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import io from "socket.io-client";
import Message from "../components/Chat/Message";
import ChatPost from "../components/Chat/ChatPost";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatmodal from "../components/Chat/Chatmodal";

const socket = io.connect("http://3.36.30.63:8080");

const Chatroom = () => {
  const { roomId } = useParams();
  const scrollBottom = useRef(null);
  const history = useHistory();
  const { userInfo, chatPost } = useSelector((state) => ({
    userInfo: state.userInfo,
    chatPost: state.chatPost,
  }));

  const [isModalOn, setIsModalOn] = useState(false);

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
          scrollToBottom();
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
        scrollToBottom();
      });
  }, [chatPost]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("receive", data);
      setChatData((chats) => [...chats, data]);
      scrollToBottom();
    });

    socket.on("receiveDocData", (data) => {
      setChatData((chats) => [...chats, data]);
      scrollToBottom();
    });
  }, [socket]);

  const sendMessage = async () => {
    if (payload.content === "") {
      // do nothing
    } else {
      await socket.emit("sendMessage", payload);
      setPayload({ ...payload, content: "" });
    }
  };

  const scrollToBottom = () => {
    if (scrollBottom.current) {
      scrollBottom.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <div className="chatroom--container">
      <Header isChat />
      {/* 채팅 헤더 */}
      <div className="chatroom--inner">
        <div className="chatroom--header">
          <div className="backbtn">
            <div
              className="btn"
              onClick={() => {
                history.push("/chat");
              }}
            >
              <span>
                <i className="fas fa-chevron-left"></i>돌아가기
              </span>
            </div>
          </div>
          <div className="otherUser">
            <Link to={`/profile/${chatroomInfo.id}`}>
              <div className="userinfo--container">
                <div className="img">
                  <img src={chatroomInfo.img} alt={chatroomInfo.nickname} />
                </div>
                <span>{chatroomInfo.nickname}</span>
              </div>
            </Link>
          </div>
          <div className="otherBtn">
            <div
              className="btn"
              onClick={() => {
                setIsModalOn(true);
              }}
            >
              채팅방 나가기
            </div>
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
          <div className="chatroom--chat--dummy" ref={scrollBottom} />
        </div>
        {/* 입력창 */}
        <div className="chatroom--input--wrapper">
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
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              value={payload.content}
            />
            <div className="btn" onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i>
            </div>
          </div>
        </div>
      </div>
      {isModalOn ? (
        <Chatmodal roomId={roomId} setIsModalOn={setIsModalOn} />
      ) : null}
      <Footer />
    </div>
  );
};

export default Chatroom;
