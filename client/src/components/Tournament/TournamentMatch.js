import React from "react";

const TournamentMatch = ({ matchInfo, setIsModalActive, setEditMatch }) => {
  const { matchId, event, winnerId, loserId, docId, player } = matchInfo;

  return (
    <li className="tournament--match--container">
      {winnerId ? (
        <>
          <div className="content">
            <div className="win">승</div>
            <div className="player">{winnerId}</div>
            <div className="vs">vs</div>
            <div className="player">{loserId}</div>
            <div className="lose">패</div>
          </div>
          <div className="btn">
            <div
              onClick={() => {
                setEditMatch(matchId);
              }}
            >
              수정
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="content">
            <div className="player">{player[0]}</div>
            <div className="vs">vs</div>
            <div className="player">{player[1]}</div>
          </div>
          <div className="btn">
            <div
              onClick={() => {
                setIsModalActive(true);
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
