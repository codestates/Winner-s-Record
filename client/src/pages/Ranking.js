import { useEffect, useState } from "react";
import Search from "../components/Ranking/Search";
import EventTap from "../components/Ranking/EventTap";
import RankList from "../components/Ranking/RankList";

export default function Ranking() {
  const [list, setList] = useState([]);
  const [event, setEvent] = useState("");

  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <>
      <Search event={event} setList={setList} />
      <EventTap setList={setList} setEvent={setEvent} />
      <div>{event.toUpperCase()}Ranking</div>
      <ul>
        {list.length ? (
          list.map((e, index) => {
            return <RankList key={index} content={e} />;
          })
        ) : (
          <div>존재하지 않는 유저입니다.</div>
        )}
      </ul>
    </>
  );
}
