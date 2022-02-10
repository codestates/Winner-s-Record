import { useState } from "react";
import Search from "../components/Ranking/Search";
import EventTap from "../components/Ranking/EventTap";
import RankList from "../components/Ranking/RankList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoUser from "../components/Ranking/NoUser";
import LoadingIndicator from "../components/LoadingIndicator";
export default function Ranking() {
  const [list, setList] = useState([]);
  const [event, setEvent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header />
      <div className="ranking--background">
        <div className="ranking--box">
          <EventTap
            setList={setList}
            setEvent={setEvent}
            setIsLoading={setIsLoading}
          />
          <Search event={event} setList={setList} setIsLoading={setIsLoading} />
        </div>
        <div className="ranking--titlebox">
          <img
            className="ranking--tiara"
            alt="tiara"
            src="https://cdn-icons-png.flaticon.com/512/2531/2531918.png"
          />
          <div className="ranking--title">
            {event.slice(0, 1).toUpperCase() + event.slice(1)} Ranking
          </div>
        </div>
        <ul className="ranking--list">
          {isLoading ? (
            <LoadingIndicator />
          ) : list.length ? (
            list.map((e, index) => {
              return <RankList key={index} content={e} />;
            })
          ) : (
            <div className="ranking--nouse">
              <NoUser />
            </div>
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
}
