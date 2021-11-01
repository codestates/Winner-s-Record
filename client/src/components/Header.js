import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <div className="header--contaienr">
      <div className="logo--container"></div>
      <div className="btn--container">
        <div className="btn--outer">
          <Link to="/tournament">대회</Link>
        </div>
        <div className="btn">
          <Link to="/rank">랭킹</Link>
        </div>
        <div className="btn">
          <Link to="/chat">메세지</Link>
        </div>
        <div className="btn">
          <Link to={`/profile/${userInfo.userId}`}>프로필</Link>
        </div>
        <div className="btn">
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
