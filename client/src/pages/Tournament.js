import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import TournamentEditModal from "../components/Tournament/TournamentEditModal";
import TournamentMatch from "../components/Tournament/TournamentMatch";

const Tournament = () => {
  const { userInfo, isModalOpen } = useSelector((state) => ({
    userInfo: state.userInfo,
    isModalOpen: state.isModalOpen,
  }));
  const history = useHistory();
  const [matches, setMatches] = useState([]);
  const [event, setEvent] = useState("");

  // [ 매치id, postId, player1, player2 ]
  const [matchToEdit, setMatchToEdit] = useState([]);

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
        // setEvent(res.data.data[0].event);
      });
  };

  const endRound = (round) => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;

    let matchId = [];

    if (round === 1) {
      matchId = matches
        .filter((match) => {
          if (match.type !== "tournamentR1" && !match.winner) {
            return false;
          } else {
            return true;
          }
        })
        .map((match) => {
          return match.matchId;
        });
    } else if (round === 2) {
      matchId = matches
        .filter((match) => {
          if (match.type !== "tournamentR2" && !match.winner) {
            return false;
          } else {
            return true;
          }
        })
        .map((match) => {
          return match.matchId;
        });
    } else {
      matchId = matches
        .filter((match) => {
          if (match.type !== "tournamentR3" && !match.winner) {
            return false;
          } else {
            return true;
          }
        })
        .map((match) => {
          return match.matchId;
        });
    }

    if (round === 1 && matchId.length !== 4) {
      console.log("진행중인 경기가 있습니다.");
      // 선택 완료하라는 모달
    } else if (round === 2 && matchId.length !== 2) {
      console.log("진행중인 경기가 있습니다.");

      // 선택 완료하라는 모달
    } else if (round === 3 && matchId.length !== 1) {
      console.log("진행중인 경기가 있습니다.");

      // 선택 완료하라는 모달
    } else {
      axios
        .post(
          `http://localhost:8080/record/${postId}`,
          { matchId },
          {
            headers: {
              Authorization,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="tournament--container">
      <div className="title">토너먼트 페이지</div>
      <div className="round">
        <div className="text">예선</div>
        <div
          className="btn"
          onClick={() => {
            endRound(1);
          }}
        >
          라운드 종료
        </div>
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
                setMatchToEdit={setMatchToEdit}
              />
            );
          })}
      </ul>
      <div className="round">
        <div className="text">준결승</div>
        <div
          className="btn"
          onClick={() => {
            endRound(2);
          }}
        >
          라운드 종료
        </div>
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
                setMatchToEdit={setMatchToEdit}
              />
            );
          })}
      </ul>
      <div className="round">
        <div className="text">결승</div>
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
                setMatchToEdit={setMatchToEdit}
              />
            );
          })}
      </ul>
      <div className="tournament--btn--container">
        <div
          onClick={() => {
            endRound(3);
          }}
        >
          대회 종료
        </div>
        <div
          onClick={() => {
            history.go(-1);
          }}
        >
          돌아가기
        </div>
      </div>
      {isModalOpen ? (
        <TournamentEditModal
          matchToEdit={matchToEdit}
          setMatches={setMatches}
        />
      ) : null}
    </div>
  );
};

export default Tournament;
