import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfileRank({ nickname }) {
  const [currentTab, setCurrentTab] = useState(0);
  const selectTabHandler = (index) => {
    setCurrentTab(index);
  };
  const [rank, setRank] = useState({
    win: "",
    lose: "",
    point: "",
    rank: "",
  });

  const handleRank = (event) => {
    axios
      .get(`http://localhost:8080/rank?event=${event}&nickname=${nickname}`)
      .then((res) => {
        const filterd = res.data.data.filter((e) => e.nickname === nickname);
        setRank(...filterd);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const events = [
    {
      name: "tennis",
      content: "테니스",
    },
    {
      name: "squash",
      content: "스쿼시",
    },
    {
      name: "badminton",
      content: "배드민턴",
    },
    {
      name: "pingpong",
      content: "탁구",
    },
  ];

  useEffect(() => {
    handleRank("tennis");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile--rankingcontainer">
      <ul className="profile--rankingtap">
        {events.map((e, index) => {
          return (
            <li
              key={e}
              onClick={() => {
                handleRank(e.name);
                selectTabHandler(index);
              }}
              className={
                currentTab === index
                  ? "profile--rankingbtn-selected"
                  : "profile--rankingbtn"
              }
            >
              {e.content}
            </li>
          );
        })}
      </ul>
      <div className="profile--ranking">{rank.rank}위</div>
      <div className="profile--score">
        {rank.win}승 {rank.lose}패 {rank.point}점
      </div>
    </div>
  );
}
