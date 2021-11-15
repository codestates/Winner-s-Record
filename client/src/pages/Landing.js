import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Footer from "../components/Footer";
import { tennis, pingpong, badminton } from "../images";

const Landing = () => {
  const history = useHistory();
  const [initialLoading, setInitailLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    setInitailLoading(true);
  }, []);

  useEffect(() => {
    console.log(scrollY);
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="landing--container">
      <div className="landing--top">
        <div className="content--container">
          <div className="text--container">
            <span className="title">
              라켓스포츠에 흥미가 생겼는데 <br /> 같이 즐길 사람이 없으신가요 ?
            </span>
            <span className="text">
              지금 위너스 레코드와 스포츠 메이트를 찾아보세요.
            </span>
            <div
              className="btn"
              onClick={() => {
                history.push("/main");
              }}
            >
              <span>지금 시작하기</span>
            </div>
          </div>
          <div className={`img--container${initialLoading ? "" : " before"}`}>
            <img src={tennis} alt="tennis" />
            <img src={pingpong} alt="pingpong" />
            <img src={badminton} alt="badminton" />
          </div>
        </div>
        <div className="wavedivider">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <div className="landing--wrapper">
        <div className="container">
          <div className="content--container">
            <div className={`text--container${scrollY > 200 ? "" : " before"}`}>
              <span className="title">매치 경기</span>
              <span className="text">
                원하는 종목의 매치 글을 작성하거나 검색이 가능해요.
                <br />
                원하는 매치 상대와 실시간 채팅으로 매치 일정을 맞춰보세요
              </span>
            </div>
            <div className={`img--container${scrollY > 200 ? "" : " before"}`}>
              <img
                src={
                  "https://github.com/glen15/final-img/blob/master/%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%89%E1%85%A1%E1%84%80%E1%85%A1%E1%86%A8%20%E1%84%86%E1%85%A2%E1%84%8E%E1%85%B5%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%92%E1%85%AE%20%E1%84%89%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%BC%201.5.gif?raw=true"
                }
                alt="match"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content--container">
            <div className={`text--container${scrollY > 900 ? "" : " before"}`}>
              <span className="title">토너먼트</span>
              <span className="text">
                8강 토너먼트로 진행되는 나만의 대회를 개최할 수 있어요.
                <br /> 대진표는 저희가 만들어드릴게요!
              </span>
            </div>
            <div className={`img--container${scrollY > 900 ? "" : " before"}`}>
              <img
                src="https://github.com/glen15/final-img/blob/master/%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%89%E1%85%A1%E1%84%80%E1%85%A1%E1%86%A8%20%E1%84%90%E1%85%A9%E1%84%82%E1%85%A5%E1%84%86%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%92%E1%85%A2%E1%86%BC%201.5.gif?raw=true"
                alt="match"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content--container">
            <div
              className={`text--container${scrollY > 1730 ? "" : " before"}`}
            >
              <span className="title">랭킹</span>
              <span className="text">
                종목별 상위 랭킹과 나의 랭킹을 확인할 수 있어요.
                <br />
                대전기록을 확인하여 나와 맞는 상대방과 경기하실 수 있어요.
              </span>
            </div>
            <div className={`img--container${scrollY > 1730 ? "" : " before"}`}>
              <img
                src="https://github.com/glen15/final-img/blob/master/%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%89%E1%85%A1%E1%84%80%E1%85%A1%E1%86%A8%20%E1%84%85%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%B5%E1%86%BC%201.5.gif?raw=true"
                alt="match"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content--container">
            <div
              className={`text--container${scrollY > 2520 ? "" : " before"}`}
            >
              <span className="title">거래</span>
              <span className="text">
                사용하지 않는 스포츠 용품이 있으신가요 ?
                <br />
                안쓰는 스포츠 용품을 판매하고, 필요한 용품을 구매해보세요 !
              </span>
            </div>
            <div className={`img--container${scrollY > 2520 ? "" : " before"}`}>
              <img
                src="https://github.com/glen15/final-img/blob/master/%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%89%E1%85%A1%E1%84%80%E1%85%A1%E1%86%A8%20%E1%84%80%E1%85%A5%E1%84%85%E1%85%A2%E1%84%8E%E1%85%A2%E1%84%90%E1%85%B5%E1%86%BC%E1%84%87%E1%85%A1%E1%86%BC%201.5.gif?raw=true"
                alt="match"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content--container">
            <span className="text">
              위너스레코드와 함께 즐거운 스포츠라이프를 지금 시작해보세요 !
            </span>
          </div>
          <div className="btn--container">
            <div
              className="btn"
              onClick={() => {
                history.push("/main");
              }}
            >
              <span>지금 시작하기</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
