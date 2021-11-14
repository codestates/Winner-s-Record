import React, { useEffect, useState } from "react";
import axios from "axios";
import ListRoom from "../components/Chat/ListRoom";
import uuid from "react-uuid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopButton from "../components/TopButton";
import BackButton from "../components/BackButton";

const Chat = () => {
  const [roomList, setRoomList] = useState([]);

  const getData = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get("http://ec2-13-124-226-101.ap-northeast-2.compute.amazonaws.com/room", {
        headers: { Authorization },
      })
      .then((res) => {
        setRoomList(res.data.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="chatroomlist--container">
      <Header />
      <div className="chatroomlist--title">
        <span>채팅</span>
      </div>
      <ul className="room--container">
        {roomList.map((roomData) => {
          return <ListRoom roomData={roomData} key={uuid()} />;
        })}
      </ul>
      <TopButton />
      <BackButton />
      <Footer />
    </div>
  );
};

export default Chat;
