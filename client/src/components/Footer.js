import React from "react";

const Footer = () => {
  return (
    <div className="footer--container">
      <div className="footer--inner">
        <div className="logo--container">
          <div className="logo">
            <img
              src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%89%E1%85%A5%E1%84%87%E1%85%B32%E1%84%83%E1%85%A1%E1%86%AB.png"
              alt="winnersrecord"
            />
          </div>
        </div>
        <div className="content--outer">
          <div className="content--container">
            <div className="title">About Service</div>
            <a href="https://github.com/codestates/Winner-s-Record/wiki">
              Winner's Record Wiki
            </a>
          </div>
          <div className="content--container">
            <div className="title">About Us</div>
            <div className="container">
              <div className="wrapper">
                <a href="https://github.com/glen15">
                  이정훈
                  <i className="fab fa-github" />
                </a>
                <a href="https://github.com/ydh94">
                  유대형
                  <i className="fab fa-github" />
                </a>
              </div>
              <div className="wrapper">
                <a href="https://github.com/planethoon">
                  신성훈
                  <i className="fab fa-github" />
                </a>
                <a href="https://github.com/Eom-Hyejin">
                  엄혜진
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        © Copyright 2021 Team MeltingBrain. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
