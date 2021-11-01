import React, { useEffect, useState } from "react";
import axios from "axios";
import ListRoom from "../components/Chat/ListRoom";

const Chat = () => {
  const [roomList, setRoomList] = useState([]);

  const getData = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get("http://localhost:8080/room", { headers: { Authorization } })
      .then((res) => {
        console.log(res.data);
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
          return <ListRoom roomData={roomData} key={roomData.id} />;
        })}
      </ul>
    </div>
  );
};

export default Chat;
