import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

const Result = () => {
  const { postId } = useParams();
  const [host, setHost] = useState("");
  const [firstplace, setFirstplace] = useState("");
  const [secondplace, setSecondplace] = useState("");
  const [others, setOthers] = useState(["대회 진행중 입니다."]);
  const history = useHistory();

  const getData = () => {
    axios.get(`http://localhost:8080/tournament/${postId}`).then((res) => {
      const data = res.data.data;
      console.log(data);

      const others = [];
      for (let match of data) {
        if (match.type === "tournamentR3") {
          setFirstplace(match.winner);
          setSecondplace(match.loser);
        } else {
          others.push(match.loser);
        }
      }
      setOthers(others);
    });
  };

  const getHost = () => {
    axios.get(`http://localhost:8080/doc/${postId}`).then((res) => {
      setHost(res.data.data.userData.nickname);
    });
  };

  useEffect(() => {
    getData();
    getHost();
  }, []);

  return (
    <div className="tournament--result">
      {firstplace ? (
        <>
          <div className="title--container">
            <div className="title">Tournament Result</div>
          </div>
          <div className="host--container">
            <div className="host">{`${host}님의 대회 결과`}</div>
          </div>
          <div className="winner--container">
            <div className="firstplace">{`우승  ${firstplace}`}</div>
            <div className="secondplace">{`준우승 ${secondplace}`}</div>
          </div>
          <div className="entry--container">
            <div className="text">참가자</div>
            {others.map((e) => {
              return <div className="entries">{e}</div>;
            })}
          </div>
        </>
      ) : (
        <>
          <div className="img--container">
            <div className="img">
              <img src="#" alt="tournamentnotfinished" />
            </div>
          </div>
          <div className="title--container">
            <div className="title">대회 진행중 입니다.</div>
          </div>
          <div className="text--contaienr">
            <div className="text">
              결과는 대회 종료 후에 조회할 수 있습니다.
            </div>
          </div>
        </>
      )}
      <div
        className="tournament--result--btn"
        onClick={() => {
          history.go(-1);
        }}
      >
        돌아가기
      </div>
    </div>
  );
};

export default Result;
