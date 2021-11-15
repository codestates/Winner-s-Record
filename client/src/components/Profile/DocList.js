import ProfilePostList from "../Profile/MypagePostList";
import HistoryList from "./HistoryList";
import NoPost from "./NoPost";
import NoHistory from "./NoHistory";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIndicator from "../LoadingIndicator";

export default function DocList({ userId, isMypage, nickname }) {
  const [list, setList] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectTabHandler = (index) => {
    setCurrentTab(index);
  };

  const handleCreatedList = () => {
    setIsLoading(true);
    axios
      .get(
        `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/doc?hostId=${userId}`
      )
      .then((res) => {
        setList(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
        setIsLoading(false);
      });
  };

  const handleLikeList = () => {
    setIsLoading(true);
    axios
      .get(
        `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/like/${userId}`
      )
      .then((res) => {
        setList(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
        setIsLoading(false);
      });
  };

  const handleProgressList = () => {
    setIsLoading(true);
    axios
      .get(
        `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/doc?guestId=${userId}`
      )
      .then((res) => {
        setList(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
        setIsLoading(false);
      });
  };

  const handleHistoryList = () => {
    setIsLoading(true);
    axios
      .get(
        `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/match/history?userId=${userId}`
      )
      .then((res) => {
        setHistory(res.data.myMatch);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleCreatedList();
    handleHistoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const docTap = isMypage
    ? [
        { content: "작성글", func: handleCreatedList },
        { content: "진행중", func: handleProgressList },
        { content: "관심글", func: handleLikeList },
        { content: "최근 전적", func: handleHistoryList },
      ]
    : [
        { content: "작성글", func: handleCreatedList },
        { content: "진행중", func: handleProgressList },
        { content: "최근 전적", func: handleHistoryList },
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
      {docTap[currentTab].content !== "최근 전적" ? (
        isLoading ? (
          <LoadingIndicator />
        ) : list.length ? (
          <ProfilePostList postList={list} />
        ) : (
          <NoPost />
        )
      ) : null}
      {docTap[currentTab].content === "최근 전적" ? (
        isLoading ? (
          <LoadingIndicator />
        ) : history.length ? (
          <HistoryList nickname={nickname} list={history} />
        ) : (
          <NoHistory />
        )
      ) : null}
    </>
  );
}
