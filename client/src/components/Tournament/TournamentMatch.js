import React from "react";
import { useDispatch } from "react-redux";
import { modalOn } from "../../modules/isModalOpen";

const TournamentMatch = ({ matchData, setMatchToEdit }) => {
  const dispatch = useDispatch();
  const { matchId, event, winner, loser, docId, player = "" } = matchData;
  console.log(matchData);
  const players = player.split("vs");

  return (
    <li className="tournament--match--container">
      {winner ? (
        <>
          <div className="content">
            <div className="win">승</div>
            <div className="player">{winner}</div>
            <div className="vs">vs</div>
            <div className="player">{loser}</div>
            <div className="lose">패</div>
          </div>
          <div className="btn">
            <div
              onClick={() => {
                setMatchToEdit([matchId, docId, players[0], players[1]]);
                dispatch(modalOn());
              }}
            >
              수정
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="content">
            <div className="player">{players[0]}</div>
            <div className="vs">vs</div>
            <div className="player">{players[1]}</div>
          </div>
          <div className="btn">
            <div
              onClick={() => {
                setMatchToEdit([matchId, docId, players[0], players[1]]);
                dispatch(modalOn());
              }}
            >
              결과 입력
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default TournamentMatch;
