import React, { useEffect, useState } from "react";
import axios from "axios";
import ListRoom from "../components/Chat/ListRoom";
import uuid from "react-uuid";

const Chat = () => {
  const [roomList, setRoomList] = useState([]);

  const getData = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get("http://3.36.30.63/room", { headers: { Authorization } })
      .then((res) => {
        setRoomList(res.data.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="chatroomlist--container">
      <ul className="room--container">
        {roomList.map((roomData) => {
          return <ListRoom roomData={roomData} key={uuid()} />;
        })}
      </ul>
    </div>
  );
};

export default Chat;
