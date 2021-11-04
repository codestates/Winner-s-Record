import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfileRank({ isMypage, nickname }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [history, setHistory] = useState({ win: "", lose: "" });
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

  const handleHistory = (event) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/match?nickname=${nickname}&event=${event}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHistory(res.data);
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
              key={index}
              onClick={() => {
                handleRank(e.name);
                handleHistory(e.name);
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
      {isMypage ? (
        <div className="profile--history">
          <span>나와의 전적</span>
          <span>
            {history.win}승 {history.lose}패
          </span>
        </div>
      ) : null}
    </div>
  );
}
