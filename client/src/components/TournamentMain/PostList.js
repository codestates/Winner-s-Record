import { useState, useEffect } from "react";
import PostListContent from "./PostListContent";
import axios from "axios";
import uuid from "react-uuid";

const PostList = ({ postList, setPostList, searchOption }) => {
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (clientHeight + scrollTop > scrollHeight - 100 && !fetching) {
      infiniteScroll();
    }
  };

  const infiniteScroll = () => {
    const { game, option, input } = searchOption;
    setFetching(true);
    if (noMoreData) {
      // 받아올 데이터가 없음
    } else {
      axios
        .get(
          `https://server.winner-s-record.link/doc?type=$tournament&event=${game}&${option}=${input}&page=${page}`
        )
        .then((res) => {
          if (!res.data.data.length) {
            setNoMoreData(true);
          } else {
            const sorted = [...postList, ...res.data.data];
            setPostList(sorted);
            setPage(page + 1);
            setFetching(false);
          }
        });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <ul className="list--container">
      {postList.map((e) => {
        return (
          <li className="list--link--container" key={uuid()}>
            <PostListContent postInfo={e} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
