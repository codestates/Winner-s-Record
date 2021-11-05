import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalOn } from "../../modules/isModalOpen";
import { setModalText } from "../../modules/modalText";

const TournamentMatch = ({
  host,
  matchData,
  setMatchToEdit,
  setIsEditModalOpen,
  canEdit,
}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { id, event, winner, loser, docId, player = "" } = matchData;
  const players = player.split("vs");

  useEffect(() => {
    console.log(userInfo.userId, host);
  }, [userInfo]);

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
                  if (userInfo.userId !== host) {
                    dispatch(
                      setModalText("해당 조작은 주최자만 할 수 있어요.")
                    );
                    dispatch(modalOn());
                  } else {
                    setMatchToEdit([id, docId, players[0], players[1]]);
                    setIsEditModalOpen(true);
                  }
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
                if (userInfo.userId !== host) {
                  dispatch(setModalText("해당 조작은 주최자만 할 수 있어요."));
                  dispatch(modalOn());
                } else {
                  setMatchToEdit([id, docId, players[0], players[1]]);
                  setIsEditModalOpen(true);
                }
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
