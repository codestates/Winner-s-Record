import React from "react";

const TournamentMatch = ({
  matchData,
  setMatchToEdit,
  setIsEditModalOpen,
  canEdit,
}) => {
  const { id, event, winner, loser, docId, player = "" } = matchData;
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
            {canEdit ? (
              <div
                onClick={() => {
                  setMatchToEdit([id, docId, players[0], players[1]]);
                  setIsEditModalOpen(true);
                }}
              >
                수정
              </div>
            ) : null}
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
                setMatchToEdit([id, docId, players[0], players[1]]);
                setIsEditModalOpen(true);
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
