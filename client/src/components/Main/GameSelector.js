import { useState } from "react";

const GameSelector = ({ searchOption, setSearchOption }) => {
  const [displayGame, setDisplayGame] = useState("전체");
  const [isClicked, setIsClicked] = useState(false);
  const [scrollEvent, setScrollEvent] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="search--option--container">
      <div
        className={`search--dropdown--selector${isClicked ? " active" : ""}`}
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        <span>
          {displayGame}
          {isClicked ? (
            <i className="fas fa-angle-up" />
          ) : (
            <i className="fas fa-angle-down" />
          )}
        </span>
      </div>
      {isClicked ? (
        <ul className="search--dropdown--container">
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setSearchOption({ ...searchOption, game: "all" });
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            전체
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setSearchOption({ ...searchOption, game: "tennis" });
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            테니스
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setSearchOption({ ...searchOption, game: "pingpong" });
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            탁구
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setSearchOption({ ...searchOption, game: "badminton" });
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            배드민턴
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setSearchOption({ ...searchOption, game: "squash" });
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            스쿼시
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default GameSelector;
