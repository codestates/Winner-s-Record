import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListRoom = ({ roomData }) => {
  const { id, img, nickname, content, updatedAt } = roomData;
  const [isLoading, setIsLoading] = useState(true);

  const getDate = () => {
    const date = new Date(updatedAt);
    return `${date.getMonth()}월 ${date.getDate()}일`;
  };

  useEffect(() => {
    setIsLoading(false);
    console.log(roomData);
  }, [roomData]);
  return (
    <>
      {roomData.content ? (
        <li>
          {isLoading ? null : (
            <Link to={`/chat/${id}`}>
              <div className="img--container">
                <div className="img">
                  <img src={img} alt={nickname} />
                </div>
              </div>
              <div className="userinfo--container">
                <div className="username">{nickname}</div>
                <div className="lastchat">
                  {content.split("tlstjdgnsdbeoguddlwjdgnsdjagPwls|")[1]
                    ? JSON.parse(
                        content.split("tlstjdgnsdbeoguddlwjdgnsdjagPwls|")[1]
                      ).title
                    : content}
                </div>
              </div>
              <div className="date--container">
                <div className="date">{getDate()}</div>
              </div>
            </Link>
          )}
        </li>
      ) : null}
    </>
  );
};

export default ListRoom;
