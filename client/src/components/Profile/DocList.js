import PostList from "../Main/PostList";
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

  const docTap = [
    { content: "작성글", onclick: { handleCreatedList } },
    { content: "진행중", onclick: { handleProgressList } },
    { content: "관심글", onclick: { handleLikeList } },
  ];

  return (
    <>
      <ul className="profile--doclist">
        {docTap.map((e, index) => {
          return (
            <li
              key={index}
              onClick={e.onclick}
              onClick={() => {
                selectTabHandler(index);
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
      {list.length ? (
        <PostList postList={list} />
      ) : (
        <div className="profile--nopost">게시글이 존재하지 않습니다</div>
      )}
    </>
  );
}
