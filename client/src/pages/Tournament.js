import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import TournamentEditModal from "../components/Tournament/TournamentEditModal";
import TournamentMatch from "../components/Tournament/TournamentMatch";

const Tournament = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const [matches, setMatches] = useState([]);
  // [ 매치id, postId, player1, player2 ]
  const [matchToEdit, setMatchToEdit] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    console.log("토너먼트 매치 데이터", matches);
    console.log("유저정보 확인", userInfo);
  }, [matches]);

  useEffect(() => {
    getData();
  }, []);

  const { postId } = useParams();

  const getData = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(`http://localhost:8080/tournament/${postId}`, {
        headers: { Authorization },
      })
      .then((res) => {
        setMatches(res.data.data);
      });
  };

  return (
    <div className="tournament--container">
      <div className="title">토너먼트 페이지</div>
      <div className="round">
        <div className="text">예선</div>
        <div className="btn">라운드 종료</div>
      </div>
      <ul className="player--container">
        {matches
          .filter((matchData) => {
            if (matchData.type !== "tournamentR1") {
              return false;
            } else {
              return true;
            }
          })
          .map((matchData) => {
            return (
              <TournamentMatch
                matchData={matchData}
                setIsModalActive={setIsModalActive}
                setMatchToEdit={setMatchToEdit}
              />
            );
          })}
      </ul>
      <div className="round">
        <div className="text">준결승</div>
        <div className="btn">라운드 종료</div>
      </div>
      <ul className="player--container">
        {matches
          .filter((matchData) => {
            if (matchData.type !== "tournamentR2") {
              return false;
            } else {
              return true;
            }
          })
          .map((matchData) => {
            return (
              <TournamentMatch
                matchData={matchData}
                setIsModalActive={setIsModalActive}
                setMatchToEdit={setMatchToEdit}
              />
            );
          })}
      </ul>
      <div className="round">
        <div className="text">결승</div>
        <div className="btn">토너먼트 종료</div>
      </div>
      <ul className="player--container">
        {matches
          .filter((matchData) => {
            if (matchData.type !== "tournamentR3") {
              return false;
            } else {
              return true;
            }
          })
          .map((matchData) => {
            return (
              <TournamentMatch
                matchData={matchData}
                setIsModalActive={setIsModalActive}
                setMatchToEdit={setMatchToEdit}
              />
            );
          })}
      </ul>
      <div className="backbutton">돌아가기</div>
      {isModalActive ? (
        <TournamentEditModal
          matchToEdit={matchToEdit}
          setMatches={setMatches}
          setIsModalActive={setIsModalActive}
        />
      ) : null}
    </div>
  );
};

export default Tournament;
