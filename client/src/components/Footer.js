import React from "react";

const Footer = () => {
  return (
    <div className="footer--container">
      <div className="footer--inner">
        <div className="logo--container">
          <div className="logo">
            <img src="#" alt="winnersrecord" />
          </div>
        </div>
        <div className="aboutservice--container">
          <div className="title">About Service</div>
          <a href="https://github.com/codestates/Winner-s-Record/wiki">
            Winner's Record Wiki
          </a>
        </div>
        <div className="contact--container">
          <div className="title">About Us</div>
          <div className="container">
            <a href="https://github.com/glen15">이정훈</a>
            <a href="https://github.com/ydh94">유대형</a>
            <a href="https://github.com/planethoon">신성훈</a>
            <a href="https://github.com/Eom-Hyejin">엄혜진</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
