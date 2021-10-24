import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import EditCompleteModal from "../components/EditCompleteModal";
import axios from "axios";

export default function Edit() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const history = useHistory();
  const [editInfo, setEditInfo] = useState({
    nickname: "",
    oldpassword: "",
    password: "",
    checkPW: "",
  });

  const [validation, setValidation] = useState({
    nickname: false,
    checkNickname: false,
    oldpassword: false,
    password: false,
    checkPW: false,
  });

  const [message, setMessage] = useState({
    nickname: "닉네임은 2~7자리 한글로 입력해주세요",
    oldpassword: "현재 비밀번호를 입력해주세요",
    password: "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다",
    checkPW: "비밀번호를 확인해주세요",
  });

  function isNickname(asValue) {
    var regExp = /^[가-힣]+$/;
    return regExp.test(asValue);
  }

  function isPassword(asValue) {
    var regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regExp.test(asValue);
  }

  const handleOnblurName = () => {
    const { nickname } = editInfo;
    if (!isNickname(nickname)) {
      setMessage({ ...message, nickname: "한글만 입력해주세요" });
      return;
    }
    if (editInfo.nickname.length > 7 || editInfo.nickname.length < 2) {
      setMessage({ ...message, nickname: "2~7자로 입력해주세요" });
      return;
    }
    axios
      .post("http://localhost:8080/auth/nickname", { nickname })
      .then((res) => {
        setValidation({ ...validation, checkNickname: true });
        setMessage({ ...message, nickname: "사용 가능한 닉네임입니다" });
      })
      .catch((err) => {
        setValidation({ ...validation, checkNickname: false });
        setMessage({ ...message, nickname: "중복된 닉네임입니다" });
      });
  };

  const handleOnblurPassword = () => {
    const { oldpassword } = editInfo;
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8080/auth/password",
        { oldpassword },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setValidation({ ...validation, oldpassword: true });
        setMessage({ ...message, oldpassword: "새 비밀번호를 입력해주세요" });
      })
      .catch((err) => {
        setValidation({ ...validation, oldpassword: false });
        setMessage({ ...message, oldpassword: "비밀번호를 확인해주세요" });
      });
  };

  const handleInputValue = (key) => (e) => {
    setEditInfo({ ...editInfo, [key]: e.target.value });
  };

  const handleEditName = () => {
    const { nickname } = editInfo;
    const token = localStorage.getItem("token");
    axios
      .put(
        "http://localhost:8080/auth",
        { nickname },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        openModalHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditPW = () => {
    const { password } = editInfo;
    const token = localStorage.getItem("token");
    axios
      .put(
        "http://localhost:8080/auth",
        { password },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        openModalHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    const type = e.target.placeholder;
    if (e.type === "keypress" && e.code === "Enter") {
      if (type === "새 닉네임") {
        handleOnblurName();
        if (validation.checkNickname) {
          handleEditName();
        }
      } else {
        if (
          validation.oldpassword &&
          validation.password &&
          validation.checkPW
        ) {
          handleEditPW();
        }
      }
    }
  };

  useEffect(() => {
    setMessage({
      ...message,
      password:
        editInfo.password.length >= 8
          ? isPassword(editInfo.password)
            ? "사용할 수 있는 비밀번호 입니다"
            : "비밀번호는 숫자, 문자, 특수문자가 포함되어야합니다"
          : "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다",
      checkPW:
        editInfo.checkPW.length >= editInfo.password.length &&
        editInfo.password.length
          ? editInfo.checkPW === editInfo.password
            ? "비밀번호가 일치합니다"
            : "비밀번호가 불일치합니다"
          : "비밀번호를 확인해주세요",
    });
    setValidation({
      ...validation,
      nickname:
        isNickname(editInfo.nickname) &&
        editInfo.nickname.length >= 2 &&
        editInfo.nickname.length < 8,
      password: isPassword(editInfo.password),
      checkPW: editInfo.password === editInfo.checkPW,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editInfo]);
  return (
    <div>
      <div className="inputContainer">
        <div>
          <input
            type="nickname"
            placeholder="새 닉네임"
            onBlur={handleOnblurName}
            onChange={handleInputValue("nickname")}
            onKeyPress={handleKeyPress}
          />
          {message.nickname === "한글만 입력해주세요" ? (
            <div>{message.nickname}</div>
          ) : (
            <div>{message.nickname}</div>
          )}
          {validation.nickname && validation.checkNickname ? (
            <button style={{ color: "green" }} onClick={handleEditName}>
              수정하기
            </button>
          ) : (
            <button>수정하기</button>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="현재 비밀번호"
            onBlur={handleOnblurPassword}
            onChange={handleInputValue("oldpassword")}
            onKeyPress={handleKeyPress}
          />
          <div>{message.oldpassword}</div>
          <input
            type="password"
            placeholder="새 비밀번호"
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
            placeholder="새 비밀번호 확인"
            onChange={handleInputValue("checkPW")}
            onKeyPress={handleKeyPress}
          />
          {message.checkPW === "비밀번호가 불일치합니다" ? (
            <div>{message.checkPW}</div>
          ) : (
            <div>{message.checkPW}</div>
          )}
          {validation.oldpassword &&
          validation.password &&
          validation.checkPW ? (
            <button style={{ color: "green" }} onClick={handleEditPW}>
              수정하기
            </button>
          ) : (
            <button>수정하기</button>
          )}
        </div>
      </div>
      <div className="btnContainer">
        <button onClick={() => history.push("/mypage")}>돌아가기</button>
        <EditCompleteModal
          isModalOpen={isModalOpen}
          openModalHandler={openModalHandler}
        />
      </div>
    </div>
  );
}
