import React from "react";
import { useSelector } from "react-redux";

const NoPost = ({ setLoginModal }) => {
  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }));

  const clickHandler = () => {
    //게시글 작성 리디렉트
  };

  return (
    <div className="main--nopost--container">
      <div className="img">
        <img src="#" alt="noresult" />
      </div>
      <div className="text--container">
        <div className="text">검색한 게시글을 찾을 수 없었어요.</div>
        {isLogin ? (
          <>
            <div className="text">{`${userInfo.nickname}님이 게시글을 등록해보시는건 어떠신가요 ?`}</div>
            <div className="btn" onClick={clickHandler}>
              게시글 작성하기
            </div>
          </>
        ) : (
          <>
            <div className="text">
              로그인 하시고 게시글을 등록해보시는건 어떠신가요 ?
            </div>
            <div
              className="btn"
              onClick={() => {
                setLoginModal(true);
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
