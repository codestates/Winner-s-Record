import React from "react";
import { useHistory } from "react-router";

const ChatPost = ({ chatData }) => {
  const { img, title, updatedAt, place, docId } = chatData;
  const history = useHistory();

  return (
    <div className="chat--container post">
      <div className="content--wrapper">
        <div
          className="content--box"
          onClick={() => {
            history.push(`/post/${docId}`);
          }}
        >
          <div className="img--container">
            <img src={img} alt="" />
          </div>
          <div className="content--container">
            <div className="title">{title}</div>
            <div className="place">{place.split("|")[4]}</div>
          </div>
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

export default ChatPost;
