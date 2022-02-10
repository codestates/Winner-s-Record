import axios from "axios";
import React from "react";

const TournamentEditModal = ({
  matchToEdit,
  setMatches,
  setIsEditModalOpen,
}) => {
  const clickHandler = (winner, loser) => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .put(
        `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/tournament/${matchToEdit[1]}`,
        {
          matchId: matchToEdit[0],
          winner,
          loser,
        },
        { headers: { Authorization } }
      )
      .then((res) => {
        setMatches(res.data.data);
        setIsEditModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        window.alert("에러 발생! 개발자에게 문의해주세요.");
      });
  };
  return (
    <div
      className="modal--backdrop"
      onClick={() => {
        setIsEditModalOpen(false);
      }}
    >
      <div className="modal--view tournament">
        <div className="modal--text--container">
          <div className="text">승자를 선택하세요 !</div>
        </div>
        <div className="modal--btns--container player">
          <div
            className="btn colored"
            onClick={() => {
              setIsEditModalOpen(false);
              clickHandler(matchToEdit[2], matchToEdit[3]);
            }}
          >
            {matchToEdit[2]}
          </div>
          <div
            className="btn colored"
            onClick={() => {
              setIsEditModalOpen(false);
              clickHandler(matchToEdit[3], matchToEdit[2]);
            }}
          >
            {matchToEdit[3]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentEditModal;
