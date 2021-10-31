import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { modalOn } from "../modules/isModalOpen";
import { setModalText } from "../modules/modalText";
import TournamentEditModal from "../components/Tournament/TournamentEditModal";
import TournamentMatch from "../components/Tournament/TournamentMatch";
import TournamentModal from "../components/Tournament/TournamentModal";

const Tournament = () => {
  const { userInfo, isModalOpen } = useSelector((state) => ({
    userInfo: state.userInfo,
    isModalOpen: state.isModalOpen,
  }));
  const history = useHistory();
  const [matches, setMatches] = useState([]);
  const dispatch = useDispatch();

  const [canEdit, setCanEdit] = useState([true, true, true]);

  // [ 매치id, postId, player1, player2 ]
  const [matchToEdit, setMatchToEdit] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    console.log("토너먼트 매치 데이터", matches);
    console.log("유저정보 확인", userInfo);

    const r2 = matches.filter((match) => {
      return match.type === "tournamentR2";
    });
    const r3 = matches.filter((match) => {
      return match.type === "tournamentR3";
    });

    const winner = r3.filter((match) => {
      return match.winner;
    });
    if (r2.length) {
      setCanEdit([false, true, true]);
    } else if (r3.length) {
      setCanEdit([false, false, true]);
    } else if (winner.length) {
      setCanEdit([false, false, false]);
    }
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

  const endRound = (round) => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;

    let matchId = [];

    if (round === 1) {
      matchId = matches
        .filter((match) => {
          return match.type === "tournamentR1" && match.winner;

          // if (match.type !== "tournamentR1" || !match.winner) {
          //   return false;
          // } else {
          //   return true;
          // }
        })
        .map((match) => {
          return match.id;
        });
    } else if (round === 2) {
      matchId = matches
        .filter((match) => {
          return match.type === "tournamentR1" && match.winner;

          // if (match.type !== "tournamentR2" || !match.winner) {
          //   return false;
          // } else {
          //   return true;
          // }
        })
        .map((match) => {
          return match.id;
        });
    } else {
      matchId = matches
        .filter((match) => {
          return match.type === "tournamentR1" && match.winner;

          // if (match.type !== "tournamentR3" || !match.winner) {
          //   return false;
          // } else {
          //   return true;
          // }
        })
        .map((match) => {
          return match.id;
        });
    }

    const event = matches[0].event;
    console.log(matches);
    console.log("매치 아이디", matchId);

    if (round === 1 && matchId.length !== 4) {
      dispatch(setModalText("진행중인 경기가 있습니다."));
      dispatch(modalOn());
    } else if (round === 2 && matchId.length !== 2) {
      dispatch(setModalText("진행중인 경기가 있습니다."));
      dispatch(modalOn());
    } else if (round === 3 && matchId.length !== 1) {
      dispatch(setModalText("진행중인 경기가 있습니다."));
      dispatch(modalOn());
    } else if (round === 3) {
      axios
        .post(
          `http://localhost:8080/record/${postId}`,
          { event, matchId },
          {
            headers: {
              Authorization,
            },
          }
        )
        .then((res) => {
          setMatches(res.data.data);
          history.push(`/post/${postId}`);
          dispatch(modalOn());
          dispatch(setModalText("대회가 종료되었습니다 !"));
        });
    } else {
      axios
        .post(
          `http://localhost:8080/record/${postId}`,
          { event, matchId },
          {
            headers: {
              Authorization,
            },
          }
        )
        .then((res) => {
          setMatches(res.data.data);
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
                canEdit={canEdit[0]}
                setIsEditModalOpen={setIsEditModalOpen}
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
                canEdit={canEdit[1]}
                setIsEditModalOpen={setIsEditModalOpen}
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
                canEdit={canEdit[2]}
                setIsEditModalOpen={setIsEditModalOpen}
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
      </div>
      {isEditModalOpen ? (
        <TournamentEditModal
          matchToEdit={matchToEdit}
          setMatches={setMatches}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      ) : null}
      {isModalOpen ? <TournamentModal /> : null}
    </div>
  );
};

export default Tournament;
