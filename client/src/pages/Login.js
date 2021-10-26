import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
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
        "http://localhost:8080/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        console.log(res.data.userdata);
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", userdata);
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
          dispatch(setLogin()); // 로그인 상태 변경
          dispatch(setUserInfo(userdata)); // 유저 정보 입력
          history.push("/main");
        }
      })
      .catch((err) => {
        setErrorMessage("이메일 또는 비밀번호를 확인해주세요");
      });
  };

  const handleKakao = () => {
    axios
      .get("http://localhost:8080/auth/kakao/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNaver = () => {
    axios
      .get("http://localhost:8080/auth/naver/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogle = () => {
    axios
      .get("http://localhost:8080/auth/google/login")
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
    <>
      <div onClick={() => history.push("/main")}>로고</div>
      <div className="login--inputContainer">
        <input
          type="email"
          placeholder="E-mail"
          onChange={handleInputValue("email")}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={handleInputValue("password")}
          onKeyPress={handleKeyPress}
        />
        <div>{errorMessage}</div>
      </div>
      <div className="login--btnContainer">
        {isValid ? (
          <button style={{ color: "green" }} onClick={handleLogin}>
            로그인
          </button>
        ) : (
          <button>로그인</button>
        )}
        <button onClick={() => history.push("/signup")}>회원가입</button>
      </div>
      <div className="login--socialContainer">
        <button onClick={handleKakao}>카카오</button>
        <button onClick={handleNaver}>네이버</button>
        <button onClick={handleGoogle}>구글</button>
      </div>
      <div className="login--copyright">
        © Copyright 2021 Team MeltingBrain. All rights reserved.
      </div>
    </>
  );
}
