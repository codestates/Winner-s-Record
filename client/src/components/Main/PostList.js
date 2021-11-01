import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostListContent from "./PostListContent";
import uuid from "react-uuid";

const PostList = ({ postList, setPostList, searchOption, setSearchOption }) => {
  const [fetching, setFetching] = useState(false);
  const [offset, setOffset] = useState(10);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100 && !fetching) {
      infiniteScroll();
    }
  };

  const infiniteScroll = () => {
    const { postType, game, option, input } = searchOption;
    setFetching(true);
    axios
      .get(
        `http://localhost:8080/doc?type=${postType}&event=${game}&${option}=${input}&offset=${offset}&limit=10`
      )
      .then((res) => {
        if (res.status === 404) {
        } else {
          const sorted = [...postList, ...res.data.data].sort((a, b) => {
            if (a.status === "대기" && b.status !== "대기") {
              return -1;
            } else if (a.status !== "대기" && b.status === "대기") {
              return 1;
            } else {
              return 0;
            }
          });
          setPostList(sorted);
          setOffset(offset + 10);
        }
      })
      .then((e) => {
        setFetching(false);
      });
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
            <Link to={`/post/${e.id}`}>
              <PostListContent postInfo={e} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
