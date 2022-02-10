import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const NoPost = ({ setLoginModal }) => {
  const history = useHistory();

  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }));

  const clickHandler = () => {
    history.push("/doc");
  };

  return (
    <div className="main--nopost--container">
      <div className="icon">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <div className="text--container">
        <span className="title">검색한 게시글을 찾을 수 없었어요.</span>
        {isLogin ? (
          <>
            <span className="text">{`${userInfo.nickname}님이 게시글을 등록해보시는건 어떠신가요 ?`}</span>
            <div className="btn colored" onClick={clickHandler}>
              게시글 작성하기
            </div>
          </>
        ) : (
          <>
            <span className="text">
              로그인하시고 게시글을 등록해보시는 건 어떠신가요?
            </span>
            <div
              className="btn colored"
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인 하기
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoPost;
