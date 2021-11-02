import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ListRoom = ({ roomData }) => {
  const { id, img, nickname, content, updatedAt } = roomData;

  const getDate = () => {
    const date = new Date(updatedAt);
    return `${date.getMonth()}월 ${date.getDate()}일`;
  };

  return (
    <li>
      <Link to={`chat/${id}`}>
        <div className="img--container">
          <div className="img">
            <img src={img} alt={nickname} />
          </div>
        </div>
        <div className="userinfo--container">
          <div className="username">{nickname}</div>
          <div className="lastchat">{content}</div>
        </div>
        <div className="date--container">
          <div className="date">{getDate()}</div>
        </div>
      </Link>
    </li>
  );
};

export default ListRoom;
