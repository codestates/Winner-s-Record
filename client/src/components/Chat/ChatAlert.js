import React from "react";

const ChatAlert = ({ chatData }) => {
  const { content, updatedAt } = chatData;

  return (
    <div className="chat--container alert">
      <div className="text">{content}</div>
      <div className="time">{`${new Date(updatedAt).getMonth()}-${new Date(
        updatedAt
      ).getDate()} ${new Date(updatedAt).getHours()}:${new Date(
        updatedAt
      ).getMinutes()}`}</div>
    </div>
  );
};

export default ChatAlert;
