import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";
import dotenv from "dotenv";
dotenv.config();

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const prevPage = useSelector((state) => state.prevPage);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
    setErrorMessage("");
  };

  const handleLogin = () => {
    const { email, password } = loginInfo;
    axios
      .post(
        "http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.setItem("token", token);
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
          dispatch(setLogin());
          dispatch(setUserInfo(userdata));
          history.push(prevPage);
        }
      })
      .catch((err) => {
        setErrorMessage("이메일 또는 비밀번호를 확인해주세요");
      });
  };

  const handleKakao = (e) => {
    e.preventDefault();
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=http://winners-record.click/redirect&&response_type=code`
    );
  };

  const handleNaver = () => {
    axios
      .get("http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/auth/naver/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogle = () => {
    axios
      .get("http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/auth/google/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter" && isValid) {
      handleLogin();
    }
  };

  const isValid = loginInfo.email && loginInfo.password;

  return (
    <div className="login--container">
      <div className="login--logo">
        <img
          onClick={() => history.push("/main")}
          alt="logo"
          src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB2%E1%84%83%E1%85%A1%E1%86%AB.png"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="login--inputcontainer">
          <input
            className="login--input"
            type="email"
            placeholder="E-mail"
            onChange={handleInputValue("email")}
            onKeyPress={handleKeyPress}
          />
          <input
            className="login--input"
            type="password"
            placeholder="비밀번호"
            onChange={handleInputValue("password")}
            onKeyPress={handleKeyPress}
          />
          <div className="login--error">{errorMessage}</div>
        </div>
        <div className="login--btncontainer">
          {isValid ? (
            <button className="login--btn-ok" onClick={handleLogin}>
              로그인
            </button>
          ) : (
            <button className="login--btn">로그인</button>
          )}
          <button
            className="login--btn"
            onClick={() => history.push("/signup")}
          >
            회원가입
          </button>
        </div>
        <div className="login--socialcontainer">
          <img
            className="login--socialbtn"
            alt="kakao"
            src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%86%8C%EC%85%9C%EC%95%84%EC%9D%B4%EC%BD%98/btn_kakao.png"
            onClick={handleKakao}
          />
          <img
            alt="naver"
            className="login--socialbtn"
            src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%86%8C%EC%85%9C%EC%95%84%EC%9D%B4%EC%BD%98/naver.png"
            onClick={handleNaver}
          />
          <img
            alt="google"
            className="login--socialbtn"
            src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%86%8C%EC%85%9C%EC%95%84%EC%9D%B4%EC%BD%98/google-icon-styl.png"
            onClick={handleGoogle}
          />
        </div>
      </form>
      <div className="login--copyright">
        © Copyright 2021 Team MeltingBrain. All rights reserved.
      </div>
    </div>
  );
}
