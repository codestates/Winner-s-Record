import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import TopButton from "../components/TopButton";
import { useDispatch, useSelector } from "react-redux";
import { modalOff } from "../modules/isModalOpen";

const Result = () => {
  const { postId } = useParams();
  const { isModalOpen, modalText } = useSelector((state) => ({
    isModalOpen: state.isModalOpen,
    modalText: state.modalText,
  }));

  const [host, setHost] = useState("");
  const [firstplace, setFirstplace] = useState("");
  const [secondplace, setSecondplace] = useState("");
  const [others, setOthers] = useState(["대회 진행중 입니다."]);
  const history = useHistory();
  const dispatch = useDispatch();

  const getData = () => {
    axios
      .get(`https://server.winner-s-record.link/tournament/${postId}`)
      .then((res) => {
        const data = res.data.data;

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
    axios
      .get(`https://server.winner-s-record.link/doc/${postId}`)
      .then((res) => {
        setHost(res.data.data.userData.nickname);
      });
  };

  useEffect(() => {
    getData();
    getHost();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="tournament--result--container">
      <Header />
      <div className="result--inner">
        {firstplace ? (
          <>
            <div className="title">
              <span>Tournament Result</span>
            </div>
            <div className="host">
              <span>{`${host}님의 대회 결과`}</span>
            </div>
            <div className="firstplace">
              <span>
                <i className="fas fa-trophy"></i>
                {`우승`}
                <i className="fas fa-trophy"></i>
              </span>
              <span>{firstplace}</span>
            </div>
            <div className="secondplace">
              <span>
                <i className="fas fa-medal"></i>
                {`준우승`}
                <i className="fas fa-medal"></i>
              </span>
              <span>{secondplace}</span>
            </div>
            <div className="entry--container">
              <div className="text">
                <span>
                  <i className="fas fa-award"></i>참가자
                  <i className="fas fa-award"></i>
                </span>
              </div>
              <div className="inner">
                {others.map((e) => {
                  return (
                    <div className="entries">
                      <span>{e}</span>
                    </div>
                  );
                })}
              </div>
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
        <div className="result--btn--container">
          <div
            className="btn colored"
            onClick={() => {
              history.push(`/post/${postId}`);
            }}
          >
            <span>돌아가기</span>
          </div>
        </div>
      </div>
      <Footer />
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view entry">
            <div className="modal--text--container">
              <div className="text">{modalText}</div>
            </div>
            <div className="modal--btn--container">
              <div
                className="btn"
                onClick={() => {
                  dispatch(modalOff());
                }}
              >
                닫기
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <BackButton />
      <TopButton />
    </div>
  );
};

export default Result;
