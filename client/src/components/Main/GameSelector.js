import { useState } from "react";

const GameSelector = ({ setGame }) => {
  const [displayGame, setDisplayGame] = useState("전체");
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="search--game--container">
      <div
        className="search--dropdown--selector"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        {displayGame}
      </div>
      {isClicked ? (
        <ul className="search--dropdown--container">
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setGame("all");
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            전체
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setGame("tennis");
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            테니스
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setGame("tabletennis");
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            탁구
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setGame("badminton");
              setIsClicked(false);
              setDisplayGame(e.target.textContent);
            }}
          >
            배드민턴
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setGame("squash");
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
