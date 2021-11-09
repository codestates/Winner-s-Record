import { useState } from "react";
import Search from "../components/Ranking/Search";
import EventTap from "../components/Ranking/EventTap";
import RankList from "../components/Ranking/RankList";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Ranking() {
  const [list, setList] = useState([]);
  const [event, setEvent] = useState("");

  return (
    <>
      <Header />
      <div className="ranking--background">
        <Search event={event} setList={setList} />
        <EventTap setList={setList} setEvent={setEvent} />
        <div className="ranking--title">{event.toUpperCase()} Ranking</div>
        <ul className="ranking--list">
          {list.length ? (
            list.map((e, index) => {
              return <RankList key={index} content={e} />;
            })
          ) : (
            <div>존재하지 않는 유저입니다.</div>
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
}
