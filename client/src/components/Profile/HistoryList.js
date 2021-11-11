export default function HistoryList({ list, nickname }) {
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
      Mon: "월",
      Tue: "화",
      Wed: "수",
      Thu: "목",
      Fri: "금",
      Sat: "토",
      Sun: "일",
    };
    const mon = {
      Jan: "1",
      Feb: "2",
      Mar: "3",
      Feb: "4",
      Mar: "5",
      Jun: "6",
      Jul: "7",
      Aug: "8",
      Sep: "9",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return `${arr[3]}.${mon[arr[1]]}.${arr[2]} ${day[arr[0]]}`;
  };

  return (
    <ul className="profile--historybox">
      {list.map((e, index) => {
        return (
          <li
            className={
              e.winner === nickname
                ? "profile--history-winbox"
                : "profile--history-losebox"
            }
            key={index}
          >
            <div
              className={
                e.winner === nickname
                  ? "profile--history-win"
                  : "profile--history-lose"
              }
            >
              {e.winner === nickname ? "Win" : "Lose"}
            </div>
            <div className="profile--history-event">
              {gameSelector(e.event)}
            </div>
            <div className="profile--history-vs">
              {e.loser === nickname ? e.winner : e.loser}
            </div>
            <div className="profile--history-date">{dateSelector(e.date)}</div>
          </li>
        );
      })}
    </ul>
  );
}
