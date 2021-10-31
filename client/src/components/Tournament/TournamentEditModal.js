import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { modalOff } from "../../modules/isModalOpen";

const TournamentEditModal = ({ matchToEdit, setMatches }) => {
  const dispatch = useDispatch();
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
        dispatch(modalOff());
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
        console.log("뭐야 왜 안꺼져");
        dispatch(modalOff());
      }}
    >
      <div className="modal--view">
        <div className="text">승자를 선택하세요 !</div>
        <div className="modal--btns--container">
          <div
            className="btn"
            onClick={() => {
              dispatch(modalOff());
              clickHandler(matchToEdit[2], matchToEdit[3]);
            }}
          >
            {matchToEdit[2]}
          </div>
          <div
            className="btn"
            onClick={() => {
              dispatch(modalOff());
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
