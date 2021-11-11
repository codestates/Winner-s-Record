import { useHistory } from "react-router";
import Footer from "../components/Footer.js";

export default function Landing() {
  const history = useHistory();
  return (
    <>
      <div className="landing--container">
        <div className="landing--box first">
          <div className="first--container">
            <div className="first--top">
              <img
                src="https://github.com/glen15/final-img/blob/master/%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9%20%E1%84%90%E1%85%AE%E1%84%86%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC.png?raw=true"
                width="150rem"
                height="60rem"
              />
            </div>
            <div className="first--bottom">
              <div className="first--bottom--left">
                <img src="https://github.com/glen15/final-img/blob/master/%E1%84%90%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%20%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC%E1%84%90%E1%85%AE%E1%84%86%E1%85%A7%E1%86%BC.gif?raw=true" />
              </div>
              <div className="first--bottom--right">
                <div className="first--title">'오늘 테니스 경기 하실 분?'</div>
                <div className="first--text">
                  다양한 종목의 경기들이 기다리고 있어요!
                  <br />
                  당신의 승리를 기록할 준비가 되셨나요?
                </div>
              </div>
              <img
                className="first--bottom--img"
                src="https://github.com/glen15/final-img/blob/master/%E1%84%85%E1%85%A1%E1%84%8F%E1%85%A6%E1%86%BA%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%A9%E1%86%AB.png?raw=true"
              />
            </div>
          </div>
        </div>
        <div className="landing--box second">
          <div className="second--container">
            <div className="second--top">
              <span className="second--title">Our Services</span>
            </div>
            <div className="second--bottom">
              <div className="second--card">
                <div className="second--card--img">
                  <img src="https://github.com/glen15/final-img/blob/master/vs.png?raw=true" />
                </div>
                <div className="second--card--contents">
                  <div className="second--card--title">매치경기</div>
                  <div className="second--card--text">
                    원하는 종목의 매치 글을 작성하거나 검색이 가능해요. <br />{" "}
                    매치 상대가 확정되면 실시간 채팅으로 매치 일정을 맞춰보실 수
                    있어요.
                  </div>
                </div>
              </div>
              <div className="second--card">
                <div className="second--card--img">
                  <img src="https://github.com/glen15/final-img/blob/master/%E1%84%90%E1%85%A9%E1%84%82%E1%85%A5%E1%84%86%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%A9%E1%86%AB.png?raw=true" />
                </div>
                <div className="second--card--contents">
                  <div className="second--card--title">토너먼트</div>
                  <div className="second--card--text">
                    8강 토너먼트로 진행되는 나만의 대회를 개최할 수 있어요.{" "}
                    <br /> 대진표는 저희가 만들어드려요!
                  </div>
                </div>
              </div>
              <div className="second--card">
                <div className="second--card--img">
                  <img src="https://github.com/glen15/final-img/blob/master/%E1%84%86%E1%85%A6%E1%84%83%E1%85%A1%E1%86%AF.png?raw=true" />
                </div>
                <div className="second--card--contents">
                  <div className="second--card--title">랭킹</div>
                  <div className="second--card--text">
                    종목별 상위 랭킹과 나의 랭킹을 확인할 수 있어요. <br />{" "}
                    대전기록을 확인하여 나와 맞는 상대방과 경기하실 수 있어요.{" "}
                  </div>
                </div>
              </div>
              <div className="second--card">
                <div className="second--card--img">
                  <img src="https://github.com/glen15/final-img/blob/master/%E1%84%80%E1%85%A5%E1%84%85%E1%85%A2%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%A9%E1%86%AB.png?raw=true" />
                </div>
                <div className="second--card--contents">
                  <div className="second--card--title">거래</div>
                  <div className="second--card--text">
                    안쓰는 스포츠 용품을 판매하고, 필요한 용품을 구매하실 수
                    있어요.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing--box third">
          <div className="third--container">
            <div className="third--box--content">
              gif 들어가는 자리임
              <img
                src="https://github.com/glen15/final-img/blob/master/%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB2.png?raw=true"
                width="750rem"
                height="500rem"
              />
            </div>
            <div className="third--box--img">
              <img src="https://github.com/glen15/final-img/blob/master/%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A7%E1%84%8C%E1%85%A1.png?raw=true" />
            </div>
          </div>
        </div>
        <button className="button" onClick={() => history.replace("/main")}>
          Let's go
        </button>
      </div>
      <Footer />
    </>
  );
}
