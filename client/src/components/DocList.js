import PostList from "./Main/PostList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DocList({ userId, isMypage }) {
  const [list, setList] = useState([]);
  const handleCreatedList = () => {
    axios
      .get(`http://localhost:8080/doc?hostId=${userId}`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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
      });
  };

  useEffect(() => {
    handleCreatedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile--tap">
      <ul>
        <li onClick={handleCreatedList}>작성글</li>
        {isMypage ? <li onClick={handleLikeList}>관심글</li> : null}
        <li onClick={handleProgressList}>진행중</li>
      </ul>
      <PostList postList={list} />
    </div>
  );
}
