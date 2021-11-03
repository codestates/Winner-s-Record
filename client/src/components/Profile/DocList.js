import ProfilePostList from "../Profile/MypagePostList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DocList({ userId, isMypage }) {
  const [list, setList] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const selectTabHandler = (index) => {
    setCurrentTab(index);
  };
  const handleCreatedList = () => {
    axios
      .get(`http://localhost:8080/doc?hostId=${userId}`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  };

  const handleLikeList = () => {
    axios
      .get(`http://localhost:8080/like/${userId}`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  };

  const handleProgressList = () => {
    axios
      .get(`http://localhost:8080/doc?guestId=${userId}`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  };

  useEffect(() => {
    handleCreatedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const docTap = isMypage
    ? [
        { content: "작성글", func: handleCreatedList },
        { content: "진행중", func: handleProgressList },
        { content: "관심글", func: handleLikeList },
      ]
    : [
        { content: "작성글", func: handleCreatedList },
        { content: "진행중", func: handleProgressList },
      ];

  return (
    <>
      <ul className="profile--doclist">
        {docTap.map((e, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                selectTabHandler(index);
                e.func();
              }}
              className={
                currentTab === index
                  ? "profile--doctap-selected"
                  : "profile--doctap"
              }
            >
              {e.content}
            </li>
          );
        })}
      </ul>
      <div className="profile--postcontainer">
        {list.length ? (
          <ProfilePostList postList={list} />
        ) : (
          <div className="profile--nopost">목록이 비었습니다.</div>
        )}
      </div>
    </>
  );
}
