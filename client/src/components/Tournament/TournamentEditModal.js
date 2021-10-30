import axios from "axios";
import React from "react";
import { useParams } from "react-router";

const TournamentEditModal = ({ matchToEdit, setMatches, setIsModalActive }) => {
  const clickHandler = (winner, loser) => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .put(
        `http://localhost:8080/tournament/${matchToEdit[1]}`,
        {
          matchId: matchToEdit[0],
          winner,
          loser,
        },
        { headers: { Authorization } }
      )
      .then((res) => {
        setMatches(res.data.data);
        setIsModalActive(false);
      })
      .catch((err) => {
        console.error(err);
        window.alert("에러 발생! 개발자에게 문의해주세요.");
      });
  };
  return (
    <div className="modal--backdrop">
      <div className="modal--view">
        <div className="text">승자를 선택하세요 !</div>
        <div className="modal--btns--container">
          <div
            className="btn"
            onClick={() => {
              clickHandler(matchToEdit[2], matchToEdit[3]);
            }}
          >
            {matchToEdit[2]}
          </div>
          <div
            className="btn"
            onClick={() => {
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
