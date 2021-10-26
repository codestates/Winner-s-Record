import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import SignupCompleteModal from "../components/Signup/SignupCompleteModal";
import axios from "axios";

export default function Signup() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const history = useHistory();
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    checkPW: "",
  });

  const [validation, setValidation] = useState({
    email: false,
    checkEmail: false,
    nickname: false,
    checkNickname: false,
    password: false,
    checkPW: false,
  });

  const [message, setMessage] = useState({
    email: "이메일 주소를 입력해주세요",
    nickname: "닉네임은 2~7자리 한글로 입력해주세요",
    password: "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다",
    checkPW: "비밀번호를 확인해주세요",
  });

  function isEmail(asValue) {
    var regExp =
      /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  }

  function isNickname(asValue) {
    var regExp = /^[가-힣]+$/;
    return regExp.test(asValue);
  }

  function isPassword(asValue) {
    var regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regExp.test(asValue);
  }

  const handleOnblurEmail = (key) => (e) => {
    if (!isEmail(signupInfo.email)) {
      setMessage({ ...message, email: "올바른 이메일 주소가 아닙니다" });
      return;
    }
    axios
      .post("http://localhost:8080/auth/email", { [key]: e.target.value }) //
      .then((res) => {
        setValidation({ ...validation, checkEmail: true });
        setMessage({ ...message, email: "사용 가능한 이메일입니다" });
      })
      .catch((err) => {
        setValidation({ ...validation, checkEmail: false });
        setMessage({ ...message, email: "이미 가입된 이메일입니다" });
      });
  };

  const handleOnblurName = (key) => (e) => {
    if (!isNickname(signupInfo.nickname)) {
      setMessage({ ...message, nickname: "한글만 입력해주세요" });
      return;
    }
    if (signupInfo.nickname.length > 7 || signupInfo.nickname.length < 2) {
      setMessage({ ...message, nickname: "2~7자로 입력해주세요" });
      return;
    }
    axios
      .post("http://localhost:8080/auth/nickname", { [key]: e.target.value }) //
      .then((res) => {
        setValidation({ ...validation, checkNickname: true });
        setMessage({ ...message, nickname: "사용 가능한 닉네임입니다" });
      })
      .catch((err) => {
        setValidation({ ...validation, checkNickname: false });
        setMessage({ ...message, nickname: "중복된 닉네임입니다" });
      });
  };

  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value.toLowerCase() });
  };

  const handleSignup = () => {
    const { email, nickname, password } = signupInfo;
    axios
      .post("http://localhost:8080/auth", {
        email,
        nickname,
        password,
        type: "web",
      })
      .then((res) => {
        openModalHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter" && isValid) {
      handleSignup();
    }
  };

  const isValid =
    validation.email &&
    validation.checkEmail &&
    validation.nickname &&
    validation.checkNickname &&
    validation.password &&
    validation.checkPW;

  useEffect(() => {
    setMessage({
      ...message,
      password:
        signupInfo.password.length >= 8
          ? isPassword(signupInfo.password)
            ? "사용할 수 있는 비밀번호 입니다"
            : "비밀번호는 숫자, 문자, 특수문자가 포함되어야합니다"
          : "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다",
      checkPW:
        signupInfo.checkPW.length >= signupInfo.password.length &&
        signupInfo.password.length
          ? signupInfo.checkPW === signupInfo.password
            ? "비밀번호가 일치합니다"
            : "비밀번호가 불일치합니다"
          : "비밀번호를 확인해주세요",
    });
    setValidation({
      ...validation,
      email: isEmail(signupInfo.email),
      nickname:
        isNickname(signupInfo.nickname) &&
        signupInfo.nickname.length >= 2 &&
        signupInfo.nickname.length < 8,
      password: isPassword(signupInfo.password),
      checkPW: signupInfo.password === signupInfo.checkPW,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupInfo]);

  return (
    <div>
      <div>
        <div
          onClick={() => {
            history.replace("/main");
          }}
        >
          로고
        </div>
      </div>
      <div className="inputContainer">
        <input
          type="email"
          placeholder="E-mail"
          onBlur={handleOnblurEmail("email")}
          onChange={handleInputValue("email")}
          onKeyPress={handleKeyPress}
        />
        {message.email === "이메일 주소를 입력해주세요" ? (
          <div>{message.email}</div>
        ) : message.email === "사용 가능한 이메일입니다" ? (
          <div>{message.email}</div>
        ) : (
          <div>{message.email}</div>
        )}
        <input
          type="nickname"
          placeholder="닉네임"
          onBlur={handleOnblurName("nickname")}
          onChange={handleInputValue("nickname")}
          onKeyPress={handleKeyPress}
        />
        {message.nickname === "한글만 입력해주세요" ? (
          <div>{message.nickname}</div>
        ) : (
          <div>{message.nickname}</div>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          onChange={handleInputValue("password")}
          onKeyPress={handleKeyPress}
        />
        {message.password ===
        "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다" ? (
          <div>{message.password}</div>
        ) : message.password === "사용할 수 있는 비밀번호 입니다" ? (
          <div>{message.password}</div>
        ) : (
          <div>{message.password}</div>
        )}
        <input
          type="password"
          placeholder="비밀번호 확인"
          onChange={handleInputValue("checkPW")}
          onKeyPress={handleKeyPress}
        />
        {message.checkPW === "비밀번호가 불일치합니다" ? (
          <div>{message.checkPW}</div>
        ) : (
          <div>{message.checkPW}</div>
        )}
      </div>
      <div className="btnContainer">
        {isValid ? (
          <button
            style={{ color: "green" }}
            type="submit"
            onClick={handleSignup}
          >
            가입하기
          </button>
        ) : (
          <button>가입하기</button>
        )}
        <SignupCompleteModal
          isModalOpen={isModalOpen}
          openModalHandler={openModalHandler}
        />
      </div>
    </div>
  );
}
