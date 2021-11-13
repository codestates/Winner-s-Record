import axios from "axios";
import { useEffect, useState } from "react";

export default function EventTap({ setList, setEvent, setIsLoading }) {
  const [currentTab, setCurrenTab] = useState(0);
  const handleCurrentTab = (tab) => {
    setCurrenTab(tab);
  };

  const handleList = (event) => {
    setIsLoading(true);
    axios
      .get(
        `https://server.winner-s-record.link/rank?event=${event}&nickname=all`
      )
      .then((res) => {
        setEvent(event);
        setList(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        setList([]);
      });
  };

  const eventTab = [
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
    handleList("tennis");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="ranking--taplist">
      {eventTab.map((e, index) => {
        return (
          <li
            className={
              currentTab === index ? "ranking--tap-selected" : "ranking--tap"
            }
            key={index}
            onClick={() => {
              handleCurrentTab(index);
              handleList(e.name);
            }}
          >
            {e.content}
          </li>
        );
      })}
    </ul>
  );
}
