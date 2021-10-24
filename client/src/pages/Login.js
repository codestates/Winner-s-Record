import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

export default function Login() {
  const history = useHistory();
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
        // const { userId, userName, accessToken } = res.data.data;
        // localStorage.setItem("token", accessToken);
        // localStorage.setItem("userId", userId);
        // localStorage.setItem("userName", userName);
        // const token = localStorage.getItem("token");
        // if (token) {
        //   // dispatch(login());
        //   // dispatch(setUserInfo({ token, userId, userName }));
        //   history.push("/main");
        // }
      })
      .catch((err) => {
        setErrorMessage("이메일 또는 비밀번호를 확인해주세요");
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
        <button>카카오</button>
        <button>네이버</button>
        <button>구글</button>
      </div>
      <div className="login--copyright">
        © Copyright 2021 Team MeltingBrain. All rights reserved.
      </div>
    </>
  );
}
