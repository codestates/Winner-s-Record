export default function HistoryList({ list }) {
  const gameSelector = (event) => {
    if (event === "tennis") {
      return "테니스";
    }
    if (event === "squash") {
      return "스쿼시";
    }
    if (event === "badminton") {
      return "배드민턴";
    }
    if (event === "pingpong") {
      return "탁구";
    }
  };

  const dateSelector = (date) => {
    const arr = date.split(" ").slice(0, 4);
    const day = {
      Mon: "월요일",
      Tue: "화요일",
      Wed: "수요일",
      Thu: "목요일",
      Fri: "금요일",
      Sat: "토요일",
      Sun: "일요일",
    };
    const mon = {
      Jan: "1월",
      Feb: "2월",
      Mar: "3월",
      Feb: "4월",
      Mar: "5월",
      Jun: "6월",
      Jul: "7월",
      Aug: "8월",
      Sep: "9월",
      Oct: "10월",
      Nov: "11월",
      Dec: "12월",
    };
    return `${arr[3]}년 ${mon[arr[1]]} ${arr[2]}일 ${day[arr[0]]}`;
  };
  return (
    <ul className="profile--historybox">
      {list.map((e, index) => {
        return (
          <li className="profile--history" key={index}>
            <div className="profile--history-event">
              {gameSelector(e.event)}
            </div>
            <div className="profile--history-winner">{e.winner}</div>
            VS
            <div className="profile--history-loser">{e.loser}</div>
            <div className="profile--history-date">{dateSelector(e.date)}</div>
          </li>
        );
      })}
    </ul>
  );
}
