import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ chatData }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const { userId, content, updatedAt } = chatData;
  const [isMine, setIsMine] = useState(true);

  useEffect(() => {
    if (userInfo.userId === userId) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, []);

  return (
    <div className={`chat--container message${isMine ? " mine" : ""}`}>
      <div className="content--wrapper">
        <div className="content--box">
          <span>{`${content}`}</span>
        </div>
        <div className="time">{`${
          new Date(updatedAt).getMonth() + 1
        }-${new Date(updatedAt).getDate()} ${new Date(
          updatedAt
        ).getHours()}:${new Date(updatedAt).getMinutes()}`}</div>
      </div>
    </div>
  );
};

export default Message;
