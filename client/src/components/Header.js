import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setLogout } from "../modules/isLogin";
import { deleteUserInfo } from "../modules/userInfo";

const Header = ({ isChat }) => {
  const { userInfo, isLogin } = useSelector((state) => ({
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }));
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className={`header--container${isChat ? " chat" : ""}`}>
      <div className="header--inner">
        <div className="logo--container">
          <Link to="/main">
            <div className="img">
              <img src="https://via.placeholder.com/350x150" alt="logo" />
            </div>
          </Link>
        </div>

        <div className={`btn--container${!isLogin ? " logout" : ""}`}>
          <Link to="/tournament">
            <div className="btn">
              <span>대회</span>
            </div>
          </Link>
          <Link to="/ranking">
            <div className="btn">랭킹</div>
          </Link>
          {!isLogin ? null : (
            <Link to="/chat">
              <div className="btn">메세지</div>
            </Link>
          )}

          {!isLogin ? null : (
            <Link to={`/profile/${userInfo.userId}`}>
              <div className="btn">프로필</div>
            </Link>
          )}

          {!isLogin ? (
            <Link to="/login">
              <div className="btn">로그인</div>
            </Link>
          ) : (
            <Link
              to="/main"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setLogout());
                dispatch(deleteUserInfo());
                history.push("/main");
              }}
            >
              <div className="btn">로그아웃</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
